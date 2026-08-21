module.exports = function generate(distDir, palette) {
  const fs = require('fs');
  const path = require('path');
  const { canvas, ansi } = palette.colors;

  function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
  }

  function hexToRgb(hex) {
    const num = parseInt(hex.replace('#', ''), 16);
    return {
      rNorm: (((num >> 16) & 255) / 255).toFixed(6),
      gNorm: (((num >> 8) & 255) / 255).toFixed(6),
      bNorm: ((num & 255) / 255).toFixed(6)
    };
  }
  const context = { distDir, canvas, ansi, fs, path, ensureDir, hexToRgb };
  require('./generators/agents')(context);
  require('./generators/terminals')(context);
  require('./generators/cli')(context);
  require('./generators/editors')(context);
  require('./generators/notes')(context);


console.log('✨ All 19 distribution targets across Agents, Terminals, CLIs, Editors, and Notes compiled successfully in dist/ !');
};
