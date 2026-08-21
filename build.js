#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const palette = JSON.parse(fs.readFileSync(path.join(__dirname, 'palette.json'), 'utf8'));
const { canvas, ansi } = palette.colors;

function hexToRgb(hex) {
  const num = parseInt(hex.replace('#', ''), 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    rNorm: (((num >> 16) & 255) / 255).toFixed(6),
    gNorm: (((num >> 8) & 255) / 255).toFixed(6),
    bNorm: ((num & 255) / 255).toFixed(6)
  };
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const distDir = path.join(__dirname, 'dist');
ensureDir(distDir);
require('./generators')(distDir, palette);
fs.copyFileSync(path.join(__dirname, 'LICENSE'), path.join(distDir, 'vscode', 'LICENSE'));
