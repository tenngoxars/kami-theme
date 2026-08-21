-- Kami Theme for Neovim (Lua)
-- Based on Kami Design System (https://github.com/tw93/Kami)

vim.cmd("hi clear")
if vim.fn.exists("syntax_on") == 1 then
  vim.cmd("syntax reset")
end

vim.o.background = "light"
vim.g.colors_name = "kami"

local c = {
  bg = "#EAE7E1",
  fg = "#141413",
  cursor = "#1B365D",
  selection = "#DDD8CE",
  border = "#D3CFC4",
  surface = "#F4F2EC",
  muted = "#7A7871",
  dim = "#96948C",
  olive = "#504E49",
  dark_warm = "#3D3D3A",
  blue = "#1B365D",
  blue_bright = "#2D5A8A",
  green = "#20563D",
  yellow = "#9E6B00",
  red = "#A64036",
  red_bright = "#8B4513",
  cyan = "#2C5E6B",
  magenta = "#4A6B82"
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
