#!/bin/bash
set -e

echo "📦 Gerando APK de release com bundle embutido..."
export GRADLE_USER_HOME="${GRADLE_USER_HOME:-$PWD/.gradle-cache}"
mkdir -p "$GRADLE_USER_HOME"

pushd android >/dev/null
./gradlew assembleRelease
popd >/dev/null

APK="android/app/build/outputs/apk/release/app-release.apk"
if [ ! -f "$APK" ]; then
  echo "❌ APK de release não encontrado em $APK"
  exit 1
fi

echo "📲 Instalando APK de release no dispositivo..."
adb install -r "$APK" || {
  echo "⚠️  Falha ao instalar com adb install. Tentando via Gradle..."
  (cd android && ./gradlew installRelease)
}

echo "✅ Concluído. O app de release funciona sem Metro e sem USB."
