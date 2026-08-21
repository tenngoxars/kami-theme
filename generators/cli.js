module.exports = function generateCli({ distDir, canvas, ansi, fs, path, ensureDir }) {
/* =========================================================================
   3. CLI & TUI Tools
   ========================================================================= */

// 3.1 Git Delta (gitconfig snippet)
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

// 3.2 Lazygit (YAML)
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

// 3.3 FZF (Shell environment script)
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

// 3.4 Starship (TOML)
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

// 3.5 Bat (TextMate tmTheme XML)
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

};
