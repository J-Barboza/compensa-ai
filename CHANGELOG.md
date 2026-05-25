# Changelog — Best Option (React Native)

Formato baseado em Keep a Changelog. Datas em ISO (YYYY‑MM‑DD).

## [0.1.0] — 2025-09-15

### Added
- Script `run_android.sh` aprimorado: aplica `adb reverse`, limpa reverses antigos, valida reverses ativos, inicia Metro apenas se necessário (`--reset-cache`).
- Script `run_android_release.sh`: gera e instala APK de release (offline), configurando `GRADLE_USER_HOME` local.
- Script `scripts/generate-android-icons.js`: gera ícones Android a partir do `best_option_icon.svg` para todas as densidades.
- Script `scripts/generate-screenshots-placeholders.js`: cria placeholders de screenshots (uso eventual).
- Screenshots reais adicionados: `assets/screenshots/bo-android.jpeg` e `assets/screenshots/calc-android.jpeg` (README atualizado).
- Documentação: README reformulado; troubleshooting (porta 8081, Gradle lock), instruções Android/iOS, testes e lint.

### Changed
- `.gitignore`: inclusão de `android/app/.cxx/` e `.gradle-cache/` para evitar artefatos pesados em commits.
- `package.json`: adicionados scripts `icons:android`, `android:assembleRelease`, `android:installRelease` (com `GRADLE_USER_HOME` local).

### Removed
- Artefatos pesados e imagens de exemplo não essenciais (placeholders antigos e prints de erro) do histórico e da árvore atual.

### Repository
- Reescrita de histórico (branch órfã) para limpar caches/binaries do Gradle que impediam `git push`. `main` foi alinhada com `develop` via reset e push forçado com lease.

— Estado atual: branches `main` e `develop` têm o mesmo conteúdo.

