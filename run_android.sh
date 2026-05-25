#!/bin/bash

echo "🔍 Verificando se o ADB está instalado..."
if ! command -v adb &> /dev/null; then
    echo "❌ ADB não encontrado. Por favor, instale o Android Platform Tools."
    exit 1
fi

echo "✅ ADB encontrado: $(which adb)"
adb start-server

echo "📱 Verificando dispositivos conectados..."
adb devices

DEVICE_COUNT=$(adb devices | grep -w "device" | wc -l)
if [ "$DEVICE_COUNT" -eq "0" ]; then
    echo "❌ Nenhum dispositivo autorizado conectado. Verifique o cabo USB e permita a depuração no celular."
    exit 1
else
echo "✅ Dispositivo autorizado encontrado."
fi

echo "🔁 Configurando reverse da porta 8081 para os dispositivos..."
# Aplica o reverse para cada dispositivo autorizado conectado (limpa e recria)
DEVICE_IDS=$(adb devices | awk '/\tdevice$/{print $1}')
if [ -n "$DEVICE_IDS" ]; then
  for id in $DEVICE_IDS; do
    echo " - Limpando reverses antigos em $id"
    adb -s "$id" reverse --remove-all >/dev/null 2>&1 || true
    echo " - Aplicando reverse em $id (tcp:8081)"
    adb -s "$id" reverse tcp:8081 tcp:8081 || echo "   ⚠️  Falha ao aplicar reverse em $id"
    echo "   Reverses ativos em $id:"
    adb -s "$id" reverse --list 2>/dev/null | sed 's/^/     • /' || echo "     • (não suportado)"
  done
else
  # Fallback: tenta sem -s (quando há apenas um device padrão)
  adb reverse --remove-all >/dev/null 2>&1 || true
  adb reverse tcp:8081 tcp:8081 || true
  echo "   Reverses ativos (padrão):"
  adb reverse --list 2>/dev/null | sed 's/^/     • /' || echo "     • (não suportado)"
fi

# Configura cache do Gradle para um diretório gravável
if [ -z "$GRADLE_USER_HOME" ] || [ ! -w "$GRADLE_USER_HOME" ]; then
  export GRADLE_USER_HOME="$PWD/.gradle-cache"
fi
mkdir -p "$GRADLE_USER_HOME"
echo "🗃️  GRADLE_USER_HOME definido em: $GRADLE_USER_HOME"

echo "📦 Instalando dependências (caso necessário)..."
npm install

echo "🚀 Iniciando Metro Bundler..."
if lsof -i :8081 >/dev/null 2>&1; then
  echo "   Metro já em execução na porta 8081. Não iniciarei outro."
  METRO_PID=""
else
  npx react-native start --port 8081 --reset-cache &
  METRO_PID=$!
fi

# Encerra Metro se o script for interrompido
trap "if [ -n \"$METRO_PID\" ]; then echo '🛑 Encerrando Metro...'; kill $METRO_PID; fi; exit" INT TERM

sleep 3

PKG="com.bestoptionv3"
echo "📲 Verificando instalação do app ($PKG) nos dispositivos..."

if [ -n "$DEVICE_IDS" ]; then
  for id in $DEVICE_IDS; do
    if adb -s "$id" shell pm list packages | grep -q "$PKG"; then
      echo "✅ App já instalado em $id. Abrindo aplicativo..."
      adb -s "$id" shell monkey -p "$PKG" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1 || \
        adb -s "$id" shell am start -n "$PKG/.MainActivity" || true
    else
      echo "⬇️  Instalando o app em $id..."
      npx react-native run-android --deviceId "$id" || echo "⚠️  Falha ao instalar em $id (veja logs acima)."
    fi
  done
else
  echo "⬇️  Nenhum ID listado. Tentando instalação padrão..."
  npx react-native run-android || echo "⚠️  Falha ao instalar (veja logs acima)."
fi

echo "✅ Processo finalizado. O app deve estar rodando no celular."

# Espera o Metro terminar (fica aberto para logs)
if [ -n "$METRO_PID" ]; then
  wait $METRO_PID
else
  echo "ℹ️  Metro foi mantido externo a este script."
fi
