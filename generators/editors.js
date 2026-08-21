module.exports = function generateEditors({ distDir, canvas, ansi, fs, path, ensureDir }) {
/* =========================================================================
   4. Editors
   ========================================================================= */

// 4.1 VS Code (Extension Package)
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
  "files": [
    "themes",
    "LICENSE"
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

// 4.2 Zed (JSON)
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

// 4.3 Neovim (Lua Treesitter Colorscheme)
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

// 4.4 Sublime Text (sublime-color-scheme)
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
};
