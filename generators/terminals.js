module.exports = function generateTerminals({ distDir, canvas, ansi, fs, path, ensureDir, hexToRgb }) {
/* =========================================================================
   2. Terminals
   ========================================================================= */

// 2.1 Warp (YAML)
const warpDir = path.join(distDir, 'warp');
ensureDir(warpDir);
const warpYaml = `accent: '${canvas.cursor}'
cursor: '${canvas.cursor}'
background: '${canvas.background}'
details: 'lighter'
foreground: '${canvas.foreground}'
terminal_colors:
  bright:
    black: '${ansi.bright.black}'
    blue: '${ansi.bright.blue}'
    cyan: '${ansi.bright.cyan}'
    green: '${ansi.bright.green}'
    magenta: '${ansi.bright.magenta}'
    red: '${ansi.bright.red}'
    white: '${ansi.bright.white}'
    yellow: '${ansi.bright.yellow}'
  normal:
    black: '${ansi.normal.black}'
    blue: '${ansi.normal.blue}'
    cyan: '${ansi.normal.cyan}'
    green: '${ansi.normal.green}'
    magenta: '${ansi.normal.magenta}'
    red: '${ansi.normal.red}'
    white: '${ansi.normal.white}'
    yellow: '${ansi.normal.yellow}'
`;
fs.writeFileSync(path.join(warpDir, 'kami.yaml'), warpYaml);

// 2.2 Ghostty (CONF)
const ghosttyDir = path.join(distDir, 'ghostty');
ensureDir(ghosttyDir);
const ghosttyConf = `# Kami Light Theme for Ghostty
# Based on Kami Design System (https://github.com/tw93/Kami)

background = ${canvas.background.toLowerCase()}
foreground = ${canvas.foreground.toLowerCase()}
cursor-color = ${canvas.cursor.toLowerCase()}
selection-background = ${canvas.selection.toLowerCase()}
selection-foreground = ${canvas.foreground.toLowerCase()}

palette = 0=${ansi.normal.black.toLowerCase()}
palette = 1=${ansi.normal.red.toLowerCase()}
palette = 2=${ansi.normal.green.toLowerCase()}
palette = 3=${ansi.normal.yellow.toLowerCase()}
palette = 4=${ansi.normal.blue.toLowerCase()}
palette = 5=${ansi.normal.magenta.toLowerCase()}
palette = 6=${ansi.normal.cyan.toLowerCase()}
palette = 7=${ansi.normal.white.toLowerCase()}
palette = 8=${ansi.bright.black.toLowerCase()}
palette = 9=${ansi.bright.red.toLowerCase()}
palette = 10=${ansi.bright.green.toLowerCase()}
palette = 11=${ansi.bright.yellow.toLowerCase()}
palette = 12=${ansi.bright.blue.toLowerCase()}
palette = 13=${ansi.bright.magenta.toLowerCase()}
palette = 14=${ansi.bright.cyan.toLowerCase()}
palette = 15=${ansi.bright.white.toLowerCase()}
`;
fs.writeFileSync(path.join(ghosttyDir, 'kami.conf'), ghosttyConf);

// 2.3 Windows Terminal (JSON)
const wtDir = path.join(distDir, 'windows-terminal');
ensureDir(wtDir);
const wtJson = {
  "name": "Kami",
  "background": canvas.background,
  "foreground": canvas.foreground,
  "cursorColor": canvas.cursor,
  "selectionBackground": canvas.selection,
  "black": ansi.normal.black,
  "red": ansi.normal.red,
  "green": ansi.normal.green,
  "yellow": ansi.normal.yellow,
  "blue": ansi.normal.blue,
  "purple": ansi.normal.magenta,
  "cyan": ansi.normal.cyan,
  "white": ansi.normal.white,
  "brightBlack": ansi.bright.black,
  "brightRed": ansi.bright.red,
  "brightGreen": ansi.bright.green,
  "brightYellow": ansi.bright.yellow,
  "brightBlue": ansi.bright.blue,
  "brightPurple": ansi.bright.magenta,
  "brightCyan": ansi.bright.cyan,
  "brightWhite": ansi.bright.white
};
fs.writeFileSync(path.join(wtDir, 'kami.json'), JSON.stringify(wtJson, null, 2));

// 2.4 Alacritty (TOML)
const alacrittyDir = path.join(distDir, 'alacritty');
ensureDir(alacrittyDir);
const alacrittyToml = `# Kami Theme for Alacritty
# Based on Kami Design System (https://github.com/tw93/Kami)

[colors.primary]
background = "${canvas.background}"
foreground = "${canvas.foreground}"

[colors.cursor]
text = "${canvas.background}"
cursor = "${canvas.cursor}"

[colors.selection]
text = "${canvas.foreground}"
background = "${canvas.selection}"

[colors.normal]
black   = "${ansi.normal.black}"
red     = "${ansi.normal.red}"
green   = "${ansi.normal.green}"
yellow  = "${ansi.normal.yellow}"
blue    = "${ansi.normal.blue}"
magenta = "${ansi.normal.magenta}"
cyan    = "${ansi.normal.cyan}"
white   = "${ansi.normal.white}"

[colors.bright]
black   = "${ansi.bright.black}"
red     = "${ansi.bright.red}"
green   = "${ansi.bright.green}"
yellow  = "${ansi.bright.yellow}"
blue    = "${ansi.bright.blue}"
magenta = "${ansi.bright.magenta}"
cyan    = "${ansi.bright.cyan}"
white   = "${ansi.bright.white}"
`;
fs.writeFileSync(path.join(alacrittyDir, 'kami.toml'), alacrittyToml);

// 2.5 Kitty (CONF)
const kittyDir = path.join(distDir, 'kitty');
ensureDir(kittyDir);
const kittyConf = `# Kami Theme for Kitty
# Based on Kami Design System (https://github.com/tw93/Kami)

background ${canvas.background}
foreground ${canvas.foreground}
cursor ${canvas.cursor}
selection_background ${canvas.selection}
selection_foreground ${canvas.foreground}

color0 ${ansi.normal.black}
color1 ${ansi.normal.red}
color2 ${ansi.normal.green}
color3 ${ansi.normal.yellow}
color4 ${ansi.normal.blue}
color5 ${ansi.normal.magenta}
color6 ${ansi.normal.cyan}
color7 ${ansi.normal.white}

color8  ${ansi.bright.black}
color9  ${ansi.bright.red}
color10 ${ansi.bright.green}
color11 ${ansi.bright.yellow}
color12 ${ansi.bright.blue}
color13 ${ansi.bright.magenta}
color14 ${ansi.bright.cyan}
color15 ${ansi.bright.white}
`;
fs.writeFileSync(path.join(kittyDir, 'kami.conf'), kittyConf);

// 2.6 iTerm2 (itermcolors plist)
const itermDir = path.join(distDir, 'iterm2');
ensureDir(itermDir);
function itermColorBlock(key, hex) {
  const rgb = hexToRgb(hex);
  return `\t<key>${key}</key>
\t<dict>
\t\t<key>Color Space</key>
\t\t<string>sRGB</string>
\t\t<key>Red Component</key>
\t\t<real>${rgb.rNorm}</real>
\t\t<key>Green Component</key>
\t\t<real>${rgb.gNorm}</real>
\t\t<key>Blue Component</key>
\t\t<real>${rgb.bNorm}</real>
\t\t<key>Alpha Component</key>
\t\t<real>1.0</real>
\t</dict>`;
}

const itermColors = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${itermColorBlock('Background Color', canvas.background)}
${itermColorBlock('Foreground Color', canvas.foreground)}
${itermColorBlock('Cursor Color', canvas.cursor)}
${itermColorBlock('Cursor Text Color', canvas.background)}
${itermColorBlock('Selection Color', canvas.selection)}
${itermColorBlock('Selected Text Color', canvas.foreground)}
${itermColorBlock('Ansi 0 Color', ansi.normal.black)}
${itermColorBlock('Ansi 1 Color', ansi.normal.red)}
${itermColorBlock('Ansi 2 Color', ansi.normal.green)}
${itermColorBlock('Ansi 3 Color', ansi.normal.yellow)}
${itermColorBlock('Ansi 4 Color', ansi.normal.blue)}
${itermColorBlock('Ansi 5 Color', ansi.normal.magenta)}
${itermColorBlock('Ansi 6 Color', ansi.normal.cyan)}
${itermColorBlock('Ansi 7 Color', ansi.normal.white)}
${itermColorBlock('Ansi 8 Color', ansi.bright.black)}
${itermColorBlock('Ansi 9 Color', ansi.bright.red)}
${itermColorBlock('Ansi 10 Color', ansi.bright.green)}
${itermColorBlock('Ansi 11 Color', ansi.bright.yellow)}
${itermColorBlock('Ansi 12 Color', ansi.bright.blue)}
${itermColorBlock('Ansi 13 Color', ansi.bright.magenta)}
${itermColorBlock('Ansi 14 Color', ansi.bright.cyan)}
${itermColorBlock('Ansi 15 Color', ansi.bright.white)}
</dict>
</plist>
`;
fs.writeFileSync(path.join(itermDir, 'Kami.itermcolors'), itermColors);

};
