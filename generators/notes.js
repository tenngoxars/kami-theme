module.exports = function generateNotes({ distDir, canvas, ansi, fs, path, ensureDir }) {
/* =========================================================================
   5. Note-taking & Productivity
   ========================================================================= */

// 5.1 Obsidian (CSS Snippet / Theme)
const obsidianDir = path.join(distDir, 'obsidian');
ensureDir(obsidianDir);
const obsidianCss = `/* Kami Theme for Obsidian */
/* Based on Kami Design System (https://github.com/tw93/Kami) */

.theme-light {
  --background-primary: ${canvas.background};
  --background-primary-alt: ${canvas.surface};
  --background-secondary: #E2DFD8;
  --background-secondary-alt: #DDD9D0;
  --text-normal: ${canvas.foreground};
  --text-muted: ${canvas.muted};
  --text-faint: ${canvas.dim};
  --text-accent: ${ansi.normal.blue};
  --text-accent-hover: ${ansi.bright.blue};
  --interactive-accent: ${ansi.normal.blue};
  --interactive-accent-hover: ${ansi.bright.blue};
  --divider-color: ${canvas.border};
  --tab-background-active: ${canvas.background};
  
  --h1-color: ${ansi.normal.blue};
  --h2-color: ${ansi.normal.blue};
  --h3-color: ${ansi.normal.blue};
  --h4-color: ${ansi.normal.blue};
  
  --code-normal: ${ansi.bright.red};
  --code-background: ${canvas.surface};
  
  --link-color: ${ansi.bright.blue};
  --link-color-hover: ${ansi.normal.blue};
}
`;
fs.writeFileSync(path.join(obsidianDir, 'theme.css'), obsidianCss);
fs.writeFileSync(path.join(obsidianDir, 'manifest.json'), JSON.stringify({
  "name": "Kami",
  "version": "0.1.0",
  "minAppVersion": "1.0.0",
  "author": "tenngo"
}, null, 2));
};
