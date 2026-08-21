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

/* =========================================================================
   1. Terminals
   ========================================================================= */

// 1.1 Warp (YAML)
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

// 1.2 Oh My Pi / OMP (JSON)
const ompDir = path.join(distDir, 'omp');
ensureDir(ompDir);
const ompJson = {
  "$schema": "https://raw.githubusercontent.com/can1357/oh-my-pi/main/packages/coding-agent/theme-schema.json",
  "name": "kami",
  "vars": {
    "parchment": canvas.background,
    "ivory": canvas.surface,
    "sand": canvas.selection,
    "sandBorder": canvas.border,
    "sandBorderSoft": canvas.borderSoft,
    "nearBlack": canvas.foreground,
    "darkWarm": canvas.darkWarm,
    "olive": canvas.olive,
    "stone": canvas.muted,
    "dimStone": canvas.dim,
    "inkBlue": ansi.normal.blue,
    "inkLight": ansi.bright.blue,
    "pineGreen": ansi.normal.green,
    "bambooGreen": ansi.bright.green,
    "ochre": ansi.normal.yellow,
    "amber": ansi.bright.yellow,
    "rust": ansi.bright.red,
    "terracotta": ansi.normal.red,
    "slateSlate": ansi.normal.magenta,
    "slateCyan": ansi.normal.cyan,
    "selectedBg": canvas.selection,
    "userMsgBg": canvas.surface,
    "toolPendingBg": "#E5EBF2",
    "toolSuccessBg": "#E4EBE5",
    "toolErrorBg": "#F2E4E4",
    "customMsgBg": "#EDEAE2"
  },
  "colors": {
    "accent": "inkBlue",
    "border": "sandBorder",
    "borderAccent": "inkBlue",
    "borderMuted": "sandBorderSoft",
    "success": "pineGreen",
    "error": "terracotta",
    "warning": "ochre",
    "muted": "olive",
    "dim": "dimStone",
    "text": "",
    "thinkingText": "stone",
    "selectedBg": "selectedBg",
    "userMessageBg": "userMsgBg",
    "userMessageText": "",
    "customMessageBg": "customMsgBg",
    "customMessageText": "",
    "customMessageLabel": "inkBlue",
    "toolPendingBg": "toolPendingBg",
    "toolSuccessBg": "toolSuccessBg",
    "toolErrorBg": "toolErrorBg",
    "toolTitle": "inkBlue",
    "toolOutput": "olive",
    "mdHeading": "inkBlue",
    "mdLink": "inkLight",
    "mdLinkUrl": "dimStone",
    "mdCode": "rust",
    "mdCodeBlock": "nearBlack",
    "mdCodeBlockBorder": "sandBorder",
    "mdQuote": "olive",
    "mdQuoteBorder": "inkBlue",
    "mdHr": "sandBorder",
    "mdListBullet": "pineGreen",
    "toolDiffAdded": "pineGreen",
    "toolDiffRemoved": "terracotta",
    "toolDiffContext": "stone",
    "syntaxComment": "dimStone",
    "syntaxKeyword": "inkBlue",
    "syntaxFunction": "pineGreen",
    "syntaxVariable": "nearBlack",
    "syntaxString": "ochre",
    "syntaxNumber": "rust",
    "syntaxType": "slateCyan",
    "syntaxOperator": "olive",
    "syntaxPunctuation": "stone",
    "thinkingOff": "sandBorder",
    "thinkingMinimal": "dimStone",
    "thinkingLow": "inkLight",
    "thinkingMedium": "slateCyan",
    "thinkingHigh": "slateSlate",
    "thinkingXhigh": "rust",
    "bashMode": "pineGreen",
    "pythonMode": "ochre",
    "statusLineBg": "#E2DFD8",
    "statusLineSep": "#C0BDB4",
    "statusLineModel": "inkBlue",
    "statusLinePath": "slateCyan",
    "statusLineGitClean": "pineGreen",
    "statusLineGitDirty": "ochre",
    "statusLineContext": "inkLight",
    "statusLineSpend": "slateSlate",
    "statusLineStaged": "pineGreen",
    "statusLineDirty": "ochre",
    "statusLineUntracked": "inkLight",
    "statusLineOutput": "sandBorder",
    "statusLineCost": "rust",
    "statusLineSubagents": "inkBlue"
  },
  "export": {
    "pageBg": "parchment",
    "cardBg": "ivory",
    "infoBg": "sand"
  }
};
fs.writeFileSync(path.join(ompDir, 'kami.json'), JSON.stringify(ompJson, null, 2));

// 1.3 Ghostty (CONF)
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

// 1.4 Windows Terminal (JSON)
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

// 1.5 Alacritty (TOML)
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

// 1.6 Kitty (CONF)
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

// 1.7 iTerm2 (itermcolors plist)
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

/* =========================================================================
   2. CLI & TUI Tools
   ========================================================================= */
// 2.1 Git Delta (gitconfig snippet)
const deltaDir = path.join(distDir, 'delta');
ensureDir(deltaDir);
const deltaGitconfig = `[delta "kami"]
    dark = false
    syntax-theme = "none"
    file-style = bold "${ansi.normal.blue}"
    file-decoration-style = "${canvas.border}" ul
    hunk-header-style = file line-number "${ansi.normal.cyan}"
    hunk-header-decoration-style = "${canvas.border}" box
    minus-style = syntax "${ansi.normal.red}"
    minus-non-emph-style = syntax "${ansi.normal.red}"
    minus-emph-style = bold "${ansi.bright.red}" "#F2E4E4"
    minus-empty-line-marker-style = normal normal
    zero-style = syntax normal
    plus-style = syntax "${ansi.normal.green}"
    plus-non-emph-style = syntax "${ansi.normal.green}"
    plus-emph-style = bold "${ansi.bright.green}" "#E4EBE5"
    plus-empty-line-marker-style = normal normal
    line-numbers-left-style = "${canvas.dim}"
    line-numbers-right-style = "${canvas.dim}"
    line-numbers-zero-style = "${canvas.dim}"
    line-numbers-minus-style = "${ansi.normal.red}"
    line-numbers-plus-style = "${ansi.normal.green}"
`;
fs.writeFileSync(path.join(deltaDir, 'kami.gitconfig'), deltaGitconfig);

// 2.2 Lazygit (YAML)
const lazygitDir = path.join(distDir, 'lazygit');
ensureDir(lazygitDir);
const lazygitConfig = `gui:
  theme:
    activeBorderColor:
      - "${ansi.normal.blue}"
      - "bold"
    inactiveBorderColor:
      - "${canvas.border}"
    optionsTextColor:
      - "${ansi.bright.blue}"
    selectedLineBgColor:
      - "${canvas.selection}"
    selectedRangeBgColor:
      - "${canvas.selection}"
    cherryPickedCommitBgColor:
      - "#E4EBE5"
    cherryPickedCommitFgColor:
      - "${ansi.normal.green}"
    unstagedChangesColor:
      - "${ansi.normal.red}"
    defaultFgColor:
      - "${canvas.foreground}"
`;
fs.writeFileSync(path.join(lazygitDir, 'config.yml'), lazygitConfig);

// 2.3 FZF (Shell environment script)
const fzfDir = path.join(distDir, 'fzf');
ensureDir(fzfDir);
const fzfOpts = `export FZF_DEFAULT_OPTS="\\
  --color=bg+:${canvas.selection},bg:${canvas.background},spinner:${ansi.normal.green} \\
  --color=hl:${ansi.normal.yellow},fg:${canvas.foreground},header:${ansi.normal.cyan} \\
  --color=info:${ansi.bright.blue},pointer:${ansi.normal.blue},marker:${ansi.normal.blue} \\
  --color=fg+:${canvas.foreground},prompt:${ansi.normal.blue},hl+:${ansi.normal.yellow} \\
  --color=border:${canvas.border}"
`;
fs.writeFileSync(path.join(fzfDir, 'kami.sh'), fzfOpts);

// 2.4 Starship (TOML)
const starshipDir = path.join(distDir, 'starship');
ensureDir(starshipDir);
const starshipToml = `palette = "kami"

[palettes.kami]
bg = "${canvas.background}"
fg = "${canvas.foreground}"
ink_blue = "${ansi.normal.blue}"
ink_light = "${ansi.bright.blue}"
pine_green = "${ansi.normal.green}"
ochre = "${ansi.normal.yellow}"
terracotta = "${ansi.normal.red}"
rust = "${ansi.bright.red}"
slate_teal = "${ansi.normal.cyan}"
stone = "${canvas.muted}"
sand = "${canvas.selection}"
`;
fs.writeFileSync(path.join(starshipDir, 'starship.toml'), starshipToml);

// 2.5 Bat (TextMate tmTheme XML)
const batDir = path.join(distDir, 'bat');
ensureDir(batDir);
const batTheme = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>name</key>
  <string>Kami</string>
  <key>settings</key>
  <array>
    <dict>
      <key>settings</key>
      <dict>
        <key>background</key>
        <string>${canvas.background}</string>
        <key>foreground</key>
        <string>${canvas.foreground}</string>
        <key>caret</key>
        <string>${canvas.cursor}</string>
        <key>selection</key>
        <string>${canvas.selection}</string>
        <key>lineHighlight</key>
        <string>#E2DFD7</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Comments</string>
      <key>scope</key>
      <string>comment</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${canvas.dim}</string>
        <key>fontStyle</key>
        <string>italic</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Keywords</string>
      <key>scope</key>
      <string>keyword, storage</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${ansi.normal.blue}</string>
        <key>fontStyle</key>
        <string>bold</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Functions</string>
      <key>scope</key>
      <string>entity.name.function, support.function</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${ansi.normal.green}</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Strings</string>
      <key>scope</key>
      <string>string</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${ansi.normal.yellow}</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Numbers</string>
      <key>scope</key>
      <string>constant.numeric</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${ansi.bright.red}</string>
      </dict>
    </dict>
    <dict>
      <key>name</key>
      <string>Types</string>
      <key>scope</key>
      <string>entity.name.type, support.type</string>
      <key>settings</key>
      <dict>
        <key>foreground</key>
        <string>${ansi.normal.cyan}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>
`;
fs.writeFileSync(path.join(batDir, 'Kami.tmTheme'), batTheme);

/* =========================================================================
   3. Editors
   ========================================================================= */

// 3.1 VS Code (Extension Package)
const vscodeDir = path.join(distDir, 'vscode');
const vscodeThemesDir = path.join(vscodeDir, 'themes');
ensureDir(vscodeThemesDir);

const vscodePackage = {
  "name": "kami-theme",
  "displayName": "Kami Theme",
  "description": "A refined, eye-friendly light theme for VS Code based on the Kami paper aesthetic.",
  "version": "0.1.0",
  "publisher": "tenngo",
  "repository": {
    "type": "git",
    "url": "https://github.com/tenngoxars/kami-theme"
  },
  "engines": {
    "vscode": "^1.70.0"
  },
  "categories": [
    "Themes"
  ],
  "contributes": {
    "themes": [
      {
        "label": "Kami",
        "uiTheme": "vs",
        "path": "./themes/kami-color-theme.json"
      }
    ]
  }
};
fs.writeFileSync(path.join(vscodeDir, 'package.json'), JSON.stringify(vscodePackage, null, 2));

const vscodeThemeJson = {
  "$schema": "vscode://schemas/color-theme",
  "name": "Kami",
  "type": "light",
  "colors": {
    "activityBar.background": "#DDD9D0",
    "activityBar.foreground": canvas.foreground,
    "activityBar.activeBorder": canvas.cursor,
    "activityBarBadge.background": canvas.cursor,
    "activityBarBadge.foreground": "#FAF9F5",
    "sideBar.background": "#E2DFD8",
    "sideBar.foreground": canvas.foreground,
    "sideBar.border": canvas.border,
    "sideBarTitle.foreground": canvas.foreground,
    "sideBarSectionHeader.background": "#DAD6CC",
    "sideBarSectionHeader.foreground": canvas.foreground,
    "editorGroupHeader.tabsBackground": "#DDD9D0",
    "editorGroupHeader.tabsBorder": canvas.border,
    "tab.activeBackground": canvas.background,
    "tab.activeForeground": canvas.foreground,
    "tab.activeBorderTop": canvas.cursor,
    "tab.inactiveBackground": "#D5D1C6",
    "tab.inactiveForeground": canvas.muted,
    "tab.border": canvas.border,
    "editor.background": canvas.background,
    "editor.foreground": canvas.foreground,
    "editorLineNumber.foreground": canvas.dim,
    "editorLineNumber.activeForeground": canvas.foreground,
    "editorCursor.foreground": canvas.cursor,
    "editor.selectionBackground": canvas.selection,
    "editor.inactiveSelectionBackground": "#E4E0D6",
    "editor.lineHighlightBackground": "#E2DFD7",
    "editorIndentGuide.background": "#D8D4C8",
    "editorIndentGuide.activeBackground": "#BCB8AC",
    "editorGroup.border": canvas.border,
    "panel.background": "#E2DFD8",
    "panel.border": canvas.border,
    "panelTitle.activeForeground": canvas.cursor,
    "panelTitle.activeBorder": canvas.cursor,
    "panelTitle.inactiveForeground": canvas.muted,
    "statusBar.background": canvas.cursor,
    "statusBar.foreground": "#FAF9F5",
    "statusBar.noFolderBackground": canvas.cursor,
    "statusBar.debuggingBackground": ansi.normal.red,
    "statusBarItem.remoteBackground": ansi.bright.blue,
    "titleBar.activeBackground": "#E2DFD8",
    "titleBar.activeForeground": canvas.foreground,
    "titleBar.inactiveBackground": "#E2DFD8",
    "titleBar.border": canvas.border,
    "input.background": canvas.surface,
    "input.foreground": canvas.foreground,
    "input.border": canvas.border,
    "dropdown.background": canvas.surface,
    "dropdown.foreground": canvas.foreground,
    "dropdown.border": canvas.border,
    "list.activeSelectionBackground": canvas.selection,
    "list.activeSelectionForeground": canvas.foreground,
    "list.inactiveSelectionBackground": "#E4E0D6",
    "list.hoverBackground": "#E6E3DC",
    "badge.background": canvas.cursor,
    "badge.foreground": "#FAF9F5",
    "button.background": canvas.cursor,
    "button.foreground": "#FAF9F5",
    "button.hoverBackground": ansi.bright.blue,
    "terminal.background": canvas.background,
    "terminal.foreground": canvas.foreground,
    "terminal.ansiBlack": ansi.normal.black,
    "terminal.ansiRed": ansi.normal.red,
    "terminal.ansiGreen": ansi.normal.green,
    "terminal.ansiYellow": ansi.normal.yellow,
    "terminal.ansiBlue": ansi.normal.blue,
    "terminal.ansiMagenta": ansi.normal.magenta,
    "terminal.ansiCyan": ansi.normal.cyan,
    "terminal.ansiWhite": ansi.normal.white,
    "terminal.ansiBrightBlack": ansi.bright.black,
    "terminal.ansiBrightRed": ansi.bright.red,
    "terminal.ansiBrightGreen": ansi.bright.green,
    "terminal.ansiBrightYellow": ansi.bright.yellow,
    "terminal.ansiBrightBlue": ansi.bright.blue,
    "terminal.ansiBrightMagenta": ansi.bright.magenta,
    "terminal.ansiBrightCyan": ansi.bright.cyan,
    "terminal.ansiBrightWhite": ansi.bright.white
  },
  "tokenColors": [
    {
      "name": "Comments",
      "scope": ["comment", "punctuation.definition.comment"],
      "settings": {
        "foreground": canvas.dim,
        "fontStyle": "italic"
      }
    },
    {
      "name": "Keywords & Storage",
      "scope": ["keyword", "storage.type", "storage.modifier", "keyword.control"],
      "settings": {
        "foreground": ansi.normal.blue,
        "fontStyle": "bold"
      }
    },
    {
      "name": "Functions & Methods",
      "scope": ["entity.name.function", "support.function", "meta.function-call entity.name.function"],
      "settings": {
        "foreground": ansi.normal.green
      }
    },
    {
      "name": "Strings",
      "scope": ["string", "string.quoted", "string.template"],
      "settings": {
        "foreground": ansi.normal.yellow
      }
    },
    {
      "name": "Numbers & Constants",
      "scope": ["constant.numeric", "constant.language", "constant.character", "constant.other"],
      "settings": {
        "foreground": ansi.bright.red
      }
    },
    {
      "name": "Types & Classes",
      "scope": ["entity.name.type", "entity.name.class", "support.class", "support.type", "entity.other.inherited-class"],
      "settings": {
        "foreground": ansi.normal.cyan
      }
    },
    {
      "name": "Variables & Parameters",
      "scope": ["variable", "variable.parameter", "variable.other"],
      "settings": {
        "foreground": canvas.foreground
      }
    },
    {
      "name": "Properties & Object Keys",
      "scope": ["variable.other.property", "meta.object-literal.key", "support.type.property-name"],
      "settings": {
        "foreground": canvas.foreground
      }
    },
    {
      "name": "Operators & Punctuation",
      "scope": ["keyword.operator", "punctuation.separator", "punctuation.terminator"],
      "settings": {
        "foreground": canvas.olive
      }
    }
  ]
};
fs.writeFileSync(path.join(vscodeThemesDir, 'kami-color-theme.json'), JSON.stringify(vscodeThemeJson, null, 2));

// 3.2 Zed (JSON)
const zedDir = path.join(distDir, 'zed', 'themes');
ensureDir(zedDir);
const zedJson = {
  "$schema": "https://zed.dev/schema/themes/v0.1.0.json",
  "name": "Kami",
  "author": "tenngo",
  "themes": [
    {
      "name": "Kami Light",
      "appearance": "light",
      "style": {
        "background": canvas.background,
        "editor.background": canvas.background,
        "editor.foreground": canvas.foreground,
        "editor.line_number": canvas.dim,
        "editor.active_line_number": canvas.foreground,
        "editor.active_line_background": "#E2DFD7",
        "tab_bar.background": "#DDD9D0",
        "tab.active_background": canvas.background,
        "tab.inactive_background": "#D5D1C6",
        "panel.background": "#E2DFD8",
        "status_bar.background": canvas.cursor,
        "status_bar.foreground": "#FAF9F5",
        "border": canvas.border,
        "syntax": {
          "comment": { "color": canvas.dim, "font_style": "italic" },
          "keyword": { "color": ansi.normal.blue, "font_weight": 700 },
          "function": { "color": ansi.normal.green },
          "string": { "color": ansi.normal.yellow },
          "number": { "color": ansi.bright.red },
          "type": { "color": ansi.normal.cyan },
          "variable": { "color": canvas.foreground },
          "operator": { "color": canvas.olive }
        }
      }
    }
  ]
};
fs.writeFileSync(path.join(zedDir, 'kami.json'), JSON.stringify(zedJson, null, 2));

// 3.3 Neovim (Lua Treesitter Colorscheme)
const nvimDir = path.join(distDir, 'neovim', 'colors');
ensureDir(nvimDir);
const nvimLua = `-- Kami Theme for Neovim (Lua)
-- Based on Kami Design System (https://github.com/tw93/Kami)

vim.cmd("hi clear")
if vim.fn.exists("syntax_on") == 1 then
  vim.cmd("syntax reset")
end

vim.o.background = "light"
vim.g.colors_name = "kami"

local c = {
  bg = "${canvas.background}",
  fg = "${canvas.foreground}",
  cursor = "${canvas.cursor}",
  selection = "${canvas.selection}",
  border = "${canvas.border}",
  surface = "${canvas.surface}",
  muted = "${canvas.muted}",
  dim = "${canvas.dim}",
  olive = "${canvas.olive}",
  dark_warm = "${canvas.darkWarm}",
  blue = "${ansi.normal.blue}",
  blue_bright = "${ansi.bright.blue}",
  green = "${ansi.normal.green}",
  yellow = "${ansi.normal.yellow}",
  red = "${ansi.normal.red}",
  red_bright = "${ansi.bright.red}",
  cyan = "${ansi.normal.cyan}",
  magenta = "${ansi.normal.magenta}"
}

local hl = function(group, opts)
  vim.api.nvim_set_hl(0, group, opts)
end

-- Core UI
hl("Normal", { fg = c.fg, bg = c.bg })
hl("NormalFloat", { fg = c.fg, bg = c.surface })
hl("FloatBorder", { fg = c.border, bg = c.surface })
hl("Cursor", { fg = c.bg, bg = c.cursor })
hl("CursorLine", { bg = "#E2DFD7" })
hl("CursorLineNr", { fg = c.fg, bold = true })
hl("LineNr", { fg = c.dim })
hl("Visual", { bg = c.selection })
hl("StatusLine", { fg = "#FAF9F5", bg = c.cursor, bold = true })
hl("StatusLineNC", { fg = c.muted, bg = "#DDD9D0" })
hl("VertSplit", { fg = c.border })
hl("WinSeparator", { fg = c.border })
hl("Pmenu", { fg = c.fg, bg = c.surface })
hl("PmenuSel", { fg = c.fg, bg = c.selection, bold = true })

-- Syntax
hl("Comment", { fg = c.dim, italic = true })
hl("Keyword", { fg = c.blue, bold = true })
hl("Statement", { fg = c.blue, bold = true })
hl("Function", { fg = c.green })
hl("String", { fg = c.yellow })
hl("Number", { fg = c.red_bright })
hl("Boolean", { fg = c.red_bright })
hl("Type", { fg = c.cyan, bold = true })
hl("Identifier", { fg = c.fg })
hl("Operator", { fg = c.olive })
hl("Delimiter", { fg = c.dark_warm })
hl("Special", { fg = c.magenta })
hl("Error", { fg = c.red, bold = true })
hl("WarningMsg", { fg = c.yellow, bold = true })

-- Treesitter Links
hl("@comment", { link = "Comment" })
hl("@keyword", { link = "Keyword" })
hl("@function", { link = "Function" })
hl("@function.call", { link = "Function" })
hl("@string", { link = "String" })
hl("@number", { link = "Number" })
hl("@type", { link = "Type" })
hl("@variable", { link = "Identifier" })
hl("@operator", { link = "Operator" })
`;
fs.writeFileSync(path.join(nvimDir, 'kami.lua'), nvimLua);

// 3.4 Sublime Text (sublime-color-scheme)
const sublimeDir = path.join(distDir, 'sublime-text');
ensureDir(sublimeDir);
const sublimeJson = {
  "name": "Kami",
  "author": "tenngo",
  "variables": {
    "bg": canvas.background,
    "fg": canvas.foreground,
    "cursor": canvas.cursor,
    "selection": canvas.selection,
    "blue": ansi.normal.blue,
    "green": ansi.normal.green,
    "yellow": ansi.normal.yellow,
    "red": ansi.bright.red,
    "cyan": ansi.normal.cyan,
    "dim": canvas.dim
  },
  "globals": {
    "background": "var(bg)",
    "foreground": "var(fg)",
    "caret": "var(cursor)",
    "selection": "var(selection)",
    "line_highlight": "#E2DFD7"
  },
  "rules": [
    { "scope": "comment", "foreground": "var(dim)", "font_style": "italic" },
    { "scope": "keyword, storage", "foreground": "var(blue)", "font_style": "bold" },
    { "scope": "entity.name.function, support.function", "foreground": "var(green)" },
    { "scope": "string", "foreground": "var(yellow)" },
    { "scope": "constant.numeric", "foreground": "var(red)" },
    { "scope": "entity.name.type, support.type", "foreground": "var(cyan)" }
  ]
};
fs.writeFileSync(path.join(sublimeDir, 'Kami.sublime-color-scheme'), JSON.stringify(sublimeJson, null, 2));

/* =========================================================================
   4. Note-taking & Productivity
   ========================================================================= */

// 4.1 Obsidian (CSS Snippet / Theme)
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

console.log('✨ All 17 distribution targets across Terminals, CLIs, Editors, and Notes compiled successfully in dist/ !');
