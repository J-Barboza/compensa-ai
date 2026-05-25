#!/usr/bin/env node
/*
  Generates Android launcher icons from an SVG source.
  - Reads best_option_icon.svg in repo root
  - Writes ic_launcher.png and ic_launcher_round.png to mipmap-* folders
*/

const fs = require('fs');
const path = require('path');

async function main() {
  const sharp = require('sharp');

  const projectRoot = path.resolve(__dirname, '..');
  const svgPath = path.resolve(projectRoot, 'best_option_icon.svg');
  if (!fs.existsSync(svgPath)) {
    console.error(`❌ SVG não encontrado em ${svgPath}`);
    process.exit(1);
  }

  const resRoot = path.resolve(projectRoot, 'android', 'app', 'src', 'main', 'res');
  const densities = [
    { dir: 'mipmap-mdpi', size: 48 },
    { dir: 'mipmap-hdpi', size: 72 },
    { dir: 'mipmap-xhdpi', size: 96 },
    { dir: 'mipmap-xxhdpi', size: 144 },
    { dir: 'mipmap-xxxhdpi', size: 192 },
  ];

  const svgBuffer = fs.readFileSync(svgPath);

  for (const { dir, size } of densities) {
    const outDir = path.join(resRoot, dir);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const pipeline = sharp(svgBuffer, { density: 512 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png();

    const out = await pipeline.toBuffer();
    fs.writeFileSync(path.join(outDir, 'ic_launcher.png'), out);
    fs.writeFileSync(path.join(outDir, 'ic_launcher_round.png'), out);
    console.log(`✅ Gerado ${dir} (${size}x${size})`);
  }

  console.log('🎉 Ícones Android gerados com sucesso. Agora rode:');
  console.log('   npm run android  (ou ./run_android.sh)');
}

main().catch((err) => {
  console.error('Erro ao gerar ícones:', err);
  process.exit(1);
});

