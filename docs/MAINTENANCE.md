# Operations Playbook

Guia rápido para manutenção futura do app.

## Ambiente
- Node 18+
- Android SDK / Xcode (iOS opcional)
- Defina o cache local do Gradle quando usar CLI: `export GRADLE_USER_HOME="$PWD/.gradle-cache"`

## Fluxos

### Android — Debug (USB)
1) Conectar o device, autorizar Depuração USB.
2) `./run_android.sh`
   - Faz `adb reverse tcp:8081 tcp:8081` por device.
   - Inicia Metro se porta 8081 livre, com `--reset-cache`.
   - Instala/abre o app (ou só abre se já instalado).

Wi‑Fi (sem USB): com Metro rodando, no Dev Menu do app definir `SEU_IP:8081` em “Debug server host & port”.

### Android — Release (offline)
Sem necessidade de Metro ou USB depois de instalado.

Opção A (atalho):
```
./run_android_release.sh
```

Opção B (manual via npm):
```
npm run android:assembleRelease
npm run android:installRelease
```
Saída: `android/app/build/outputs/apk/release/app-release.apk`.

### iOS (macOS)
```
cd ios && pod install && cd ..
npm start
npm run ios
```
Para device físico: abrir o workspace no Xcode, configurar “Signing & Capabilities” e rodar.

## Ícones
SVG fonte: `best_option_icon.svg` (raiz).
Gerar ícones Android (todas densidades):
```
npm run icons:android
```
Sobrescreve `mipmap-*/ic_launcher.png` e `ic_launcher_round.png`.

## Troubleshooting
### “Unable to load script” / Porta 8081
- Garantir Metro ativo: `npx react-native start --reset-cache`.
- USB: `./run_android.sh` já aplica `adb reverse` automaticamente.
- Wi‑Fi: configurar `SEU_IP:8081` no Dev Menu → Dev Settings.
- Porta ocupada: `lsof -i :8081` e encerrar o processo.
- Build sujo: `cd android && ./gradlew clean`.

### Gradle “Could not create parent directory for lock file /opt/gradle/…”
- Sem permissão em `/opt`. Use `GRADLE_USER_HOME=$PWD/.gradle-cache` (já configurado nos scripts npm e shell).

## Repositório e Branches
- Branches atuais: `main` e `develop` com o mesmo conteúdo (após limpeza).
- Evitar commitar artefatos: `.gradle-cache/`, `android/app/.cxx/`, `android/app/build/`, `ios/build/` já estão no `.gitignore`.
- Para grandes mudanças no futuro: abrir PR para `develop` e depois promover para `main`.

## Scripts úteis
- `./run_android.sh` — debug USB com reverse, Metro e instalação/abertura.
- `./run_android_release.sh` — build e instalação de release offline.
- `npm run icons:android` — gerar ícones a partir do SVG.
- `npm run android:assembleRelease` / `npm run android:installRelease` — alternativas npm.
- `npm test` / `npm run lint` — qualidade.

## Estado do App
- RN 0.80, React 19.
- Navegação: `@react-navigation/stack`.
- Reanimated / Gesture Handler configurados em `babel.config.js` e `index.js`.
- Telas: Best Option e Calculadora.

