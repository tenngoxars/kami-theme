<div align="center">
  <h1>📜 Kami Theme</h1>
  <p><b>An eye-friendly light theme suite for terminals, coding agents, and editors.</b></p>
  <p><i>Soft linen canvas · Mineral inks · Low-glare readability</i></p>
</div>

---

## Acknowledgement

Kami Theme adapts the color philosophy of [tw93/Kami](https://github.com/tw93/Kami) for developer tools. Kami is a print-first design system built around warm paper and ink blue; this project applies those ideas to terminal, TUI, and editor color roles.

The base canvas is **`#EAE7E1` Soft Linen**: darker and more neutral than a bright paper white, without Solarized Light's yellow-green cast.

---

## Status

| Tier | Targets |
| :--- | :--- |
| **Verified** | Warp, Oh My Pi (`omp`), VS Code |
| **Experimental** | Pi, OpenCode, Ghostty, Windows Terminal, iTerm2, Alacritty, Kitty, Neovim, Zed, Sublime Text, Git Delta, Bat, Lazygit, FZF, Starship, Obsidian |

Experimental targets are generated from the same palette but are not yet verified in their real application. Their formats and installation instructions may change; please report incompatibilities.

---

## Palette

| Role | Hex | Usage |
| :--- | :--- | :--- |
| Canvas | `#EAE7E1` | Main background |
| Foreground | `#141413` | Main text |
| Ink Blue | `#1B365D` | Cursor, focus, keywords |
| Pine Green | `#20563D` | Functions, success, additions |
| Ochre | `#9E6B00` | Strings, warnings |
| Rust | `#8B4513` | Numbers, constants |
| Slate Teal | `#2C5E6B` | Types |
| Sand | `#DDD8CE` | Selection |
| Sand Border | `#D3CFC4` | Dividers and borders |
| Dim Stone | `#96948C` | Comments and metadata |

---

## Quick Install

The installers require **Git** when run as a one-liner. They deploy only detected, supported applications; they do not switch a user's active theme.

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/tenngoxars/kami-theme/main/install.sh | bash
```

### Windows PowerShell

```powershell
irm https://raw.githubusercontent.com/tenngoxars/kami-theme/main/install.ps1 | iex
```

Or clone the repository and run the platform script:

```bash
git clone https://github.com/tenngoxars/kami-theme.git
cd kami-theme
./install.sh
```

After installation, select **Kami** in the application's theme picker. For `omp` and Pi, select `kami` in `/settings`; for OpenCode, run `/theme` and select `kami`.

---

## Platform Support (19 Targets)

### AI Coding Agents

- **Oh My Pi (`omp`)** — `dist/omp/kami.json`
- **Pi (`pi`)** — `dist/pi/kami.json`
- **OpenCode** — `dist/opencode/kami.json`

### Code Editors

- **VS Code** — `dist/vscode/`, including a VSIX
- **Neovim** — `dist/neovim/colors/kami.lua`
- **Zed** — `dist/zed/themes/kami.json`
- **Sublime Text** — `dist/sublime-text/Kami.sublime-color-scheme`

### Terminal Emulators

- **Warp** — `dist/warp/kami.yaml`
- **Ghostty** — `dist/ghostty/kami.conf`
- **Windows Terminal** — `dist/windows-terminal/kami.json`
- **iTerm2** — `dist/iterm2/Kami.itermcolors`
- **Alacritty** — `dist/alacritty/kami.toml`
- **Kitty** — `dist/kitty/kami.conf`

### CLI and TUI Tools

- **Git Delta** — `dist/delta/kami.gitconfig`
- **Bat** — `dist/bat/Kami.tmTheme`
- **Lazygit** — `dist/lazygit/config.yml`
- **FZF** — `dist/fzf/kami.sh`
- **Starship** — `dist/starship/starship.toml`

### Notes

- **Obsidian** — `dist/obsidian/theme.css`

---

## Build

`palette.json` is the source for the shared base and ANSI colors. Generated targets may add application-specific surface colors where their APIs require them.

```bash
node build.js
```

---

## License

MIT. Core aesthetic inspiration is credited to [tw93/Kami](https://github.com/tw93/Kami).
