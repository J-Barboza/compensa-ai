#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '..', 'assets', 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const mkSVG = (title) => `
<svg width="1080" height="2160" viewBox="0 0 1080 2160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#032240"/>
      <stop offset="100%" stop-color="#1976d2"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="1080" height="2160" fill="url(#g)"/>
  <circle cx="540" cy="680" r="180" fill="#ffffff22"/>
  <text x="540" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" fill="#fff" font-weight="bold">Best Option</text>
  <text x="540" y="780" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" fill="#fff">${title}</text>
  <rect x="120" y="980" width="840" height="720" rx="24" fill="#ffffff" opacity="0.9"/>
  <text x="540" y="1360" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" fill="#032240">Coloque aqui seu screenshot real</text>
  <text x="540" y="1412" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#03224099">assets/screenshots/*.png</text>
  <rect x="120" y="1780" width="840" height="8" fill="#ffffff55"/>
</svg>`;

async function make(name, title){
  const svg = mkSVG(title);
  const buf = Buffer.from(svg);
  const out = path.join(outDir, name);
  await sharp(buf, { density: 192 }).png().toFile(out);
  console.log('✅ Gerado', out);
}

(async () => {
  await make('android-home.png', 'Android — Home');
  await make('android-calculator.png', 'Android — Calculadora');
  await make('ios-home.png', 'iOS — Home');
})();

