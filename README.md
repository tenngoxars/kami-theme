<div align="center">
  <h1>📜 Kami Theme</h1>
  <p><b>A refined, eye-friendly light theme suite for Terminals, Editors, and CLI tools inspired by the Kami paper aesthetic.</b></p>
  <p><i>Low-saturation linen parchment canvas · Mineral ink accents · Anti-glare readability</i></p>
</div>

---

## 💡 Acknowledgement & Heritage

This project’s aesthetic foundation and color philosophy are derived from **[tw93/Kami](https://github.com/tw93/Kami)** (Good content deserves good paper).

Kami was originally designed as a print-first document design system with a warm parchment canvas (`#f5f4ed`) and ink-blue accents (`#1B365D`). **Kami Theme** adapts and extends this philosophy to high-density CLI/TUI and Editor environments by:
- Tuning the background to **`#EAE7E1` (Soft Linen / 亚麻暖灰)** to completely eliminate monitor glare while avoiding the yellowish/greenish cast of classic Solarized Light.
- Expanding the single ink accent into a **calibrated 16-color ANSI mineral ink matrix** (Pine Green, Ochre, Terracotta, Slate Teal, and Ink Blue) with strictly balanced contrast and zero fluorescent eye strain.

---

## 🎨 Palette Specification

### Canvas & Surface

| Role | Name | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | Soft Linen (亚麻暖灰) | `#EAE7E1` | Default editor/terminal background (zero glare, no yellow tint) |
| **Foreground** | Near Black (暖墨黑) | `#141413` | Primary body text & commands |
| **Cursor / Accent** | Ink Blue (经典墨蓝) | `#1B365D` | Cursor, active highlights, key headings, status bar |
| **Selection** | Sand (暖沙高亮) | `#DDD8CE` | Text selection background |
| **Border / Divider** | Sand Border (素沙分割) | `#D3CFC4` | Box borders, separators, subtle lines |
| **Elevated Surface** | Ivory (象牙白) | `#F4F2EC` | Floated message containers, cards, inputs |
| **Sidebar / Panel** | Warm Muted (暖灰浮层) | `#E2DFD8` | Sidebar, titlebar, panels |
| **Muted / Dim** | Stone / Dim Stone | `#7A7871` / `#96948C` | Comments, line numbers, timestamps |

### ANSI & Syntax Inks (草木 / 矿物墨色)

| Role / ANSI | Color Name | Hex | Semantic Usage (Code & Terminal) |
| :--- | :--- | :--- | :--- |
| **Keyword / Blue** | 墨蓝 (Brand) | `#1B365D` | Keywords (`const`, `fn`, `import`), directories, headings |
| **Function / Green** | 松柏绿 | `#20563D` | Functions, methods, Git additions |
| **String / Yellow** | 焦茶黄 | `#9E6B00` | Strings, regex literals, warnings |
| **Constant / Red** | 熟褐色 | `#8B4513` | Numbers, booleans, constants, inline code |
| **Type / Cyan** | 远山青 | `#2C5E6B` | Types, interfaces, classes |
| **Operator / Olive** | 暖橄榄 | `#504E49` | Operators, punctuation |
| **Comment / Dim** | 暖石灰 | `#96948C` | Comments (italic, low contrast reduction) |
| **Special / Magenta** | 黛青蓝 | `#4A6B82` | Decorators, special tokens (no fluorescent pink) |

---
## 🚀 Quick Install

### One-Liner (No clone needed)

**macOS / Linux**:
```bash
curl -fsSL https://raw.githubusercontent.com/tenngoxars/kami-theme/main/install.sh | bash
```

**Windows PowerShell**:
```powershell
irm https://raw.githubusercontent.com/tenngoxars/kami-theme/main/install.ps1 | iex
```

---

### Or via Git Clone

```bash
git clone https://github.com/tenngoxars/kami-theme.git
cd kami-theme
./install.sh  # On Windows: .\install.ps1
```
---
## 🖥️ Platform Support (19 Targets)

### 1. AI Coding Agents
- **Oh My Pi (omp)**: `dist/omp/kami.json` (Full 66-token palette aligned with status line & tool tracers)
- **Pi (pi)**: `dist/pi/kami.json` (Upstream Pi coding agent theme)
- **OpenCode**: `dist/opencode/kami.json` (OpenCode TUI theme format)

### 2. Code Editors
- **VS Code**: `dist/vscode/` (Extension package & VSIX)
- **Neovim**: `dist/neovim/colors/kami.lua` (Full Treesitter syntax tree support)
- **Zed**: `dist/zed/themes/kami.json` (Zed Theme format)
- **Sublime Text**: `dist/sublime-text/Kami.sublime-color-scheme`
### 3. Terminal Emulators
- **Warp**: `dist/warp/kami.yaml`
- **Ghostty**: `dist/ghostty/kami.conf`
- **Windows Terminal**: `dist/windows-terminal/kami.json`
- **iTerm2**: `dist/iterm2/Kami.itermcolors`
- **Alacritty**: `dist/alacritty/kami.toml`
- **Kitty**: `dist/kitty/kami.conf`

### 4. CLI & TUI Tools
- **Git Delta**: `dist/delta/kami.gitconfig`
- **Bat**: `dist/bat/Kami.tmTheme`
- **Lazygit**: `dist/lazygit/config.yml`
- **FZF**: `dist/fzf/kami.sh`
- **Starship**: `dist/starship/starship.toml`

### 5. Note-Taking & Productivity
- **Obsidian**: `dist/obsidian/theme.css` + `manifest.json`

## 🛠️ Build & Extend

The repository follows a **Single Source of Truth** architecture:

```bash
# 1. Edit the core palette
vim palette.json

# 2. Recompile all 19 distributions
node build.js
```

---

## 📄 License

MIT License. Core aesthetic inspired by and attributed to [tw93/Kami](https://github.com/tw93/Kami).
