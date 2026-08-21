#!/usr/bin/env bash
set -e

echo "📦 Installing Kami Theme Suite across your tools..."

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 1. Terminals
if [ -d "$HOME/.warp" ] || command -v warp-terminal &>/dev/null || [ -d "/Applications/Warp.app" ]; then
  mkdir -p "$HOME/.warp/themes"
  cp "$REPO_DIR/dist/warp/kami.yaml" "$HOME/.warp/themes/kami.yaml"
  echo "  ✓ Warp (~/.warp/themes/kami.yaml)"
fi

if [ -d "$HOME/.omp" ] || command -v omp &>/dev/null; then
  mkdir -p "$HOME/.omp/agent/themes" "$HOME/.omp/themes"
  cp "$REPO_DIR/dist/omp/kami.json" "$HOME/.omp/agent/themes/kami.json"
  cp "$REPO_DIR/dist/omp/kami.json" "$HOME/.omp/themes/kami.json"
  echo "  ✓ Oh My Pi (~/.omp/agent/themes/kami.json)"
fi

if [ -d "$HOME/.config/ghostty" ] || command -v ghostty &>/dev/null; then
  mkdir -p "$HOME/.config/ghostty/themes"
  cp "$REPO_DIR/dist/ghostty/kami.conf" "$HOME/.config/ghostty/themes/kami"
  echo "  ✓ Ghostty (~/.config/ghostty/themes/kami)"
fi

if [ -d "$HOME/.config/alacritty" ] || command -v alacritty &>/dev/null; then
  mkdir -p "$HOME/.config/alacritty/themes"
  cp "$REPO_DIR/dist/alacritty/kami.toml" "$HOME/.config/alacritty/themes/kami.toml"
  echo "  ✓ Alacritty (~/.config/alacritty/themes/kami.toml)"
fi

if [ -d "$HOME/.config/kitty" ] || command -v kitty &>/dev/null; then
  mkdir -p "$HOME/.config/kitty/themes"
  cp "$REPO_DIR/dist/kitty/kami.conf" "$HOME/.config/kitty/themes/kami.conf"
  echo "  ✓ Kitty (~/.config/kitty/themes/kami.conf)"
fi

# 2. Editors
CODE_BIN=""
if command -v code &>/dev/null; then
  CODE_BIN="code"
elif [ -f "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]; then
  CODE_BIN="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
fi

if [ -n "$CODE_BIN" ] && [ -f "$REPO_DIR/dist/vscode/kami-theme-0.1.0.vsix" ]; then
  "$CODE_BIN" --install-extension "$REPO_DIR/dist/vscode/kami-theme-0.1.0.vsix" --force &>/dev/null || true
  echo "  ✓ VS Code (tenngo.kami-theme extension installed)"
fi

if [ -d "$HOME/.config/nvim" ] || command -v nvim &>/dev/null; then
  mkdir -p "$HOME/.config/nvim/colors"
  cp "$REPO_DIR/dist/neovim/colors/kami.lua" "$HOME/.config/nvim/colors/kami.lua"
  echo "  ✓ Neovim (~/.config/nvim/colors/kami.lua)"
fi

if [ -d "$HOME/.config/zed" ] || [ -d "$HOME/Library/Application Support/Zed" ]; then
  mkdir -p "$HOME/.config/zed/themes"
  cp "$REPO_DIR/dist/zed/themes/kami.json" "$HOME/.config/zed/themes/kami.json"
  echo "  ✓ Zed (~/.config/zed/themes/kami.json)"
fi

# 3. CLI & TUI
if [ -d "$HOME/.config/lazygit" ] || command -v lazygit &>/dev/null; then
  mkdir -p "$HOME/.config/lazygit"
  cp "$REPO_DIR/dist/lazygit/config.yml" "$HOME/.config/lazygit/theme-kami.yml"
  echo "  ✓ Lazygit (~/.config/lazygit/theme-kami.yml)"
fi

if [ -d "$HOME/.config/bat" ] || command -v bat &>/dev/null; then
  BAT_THEMES="$(bat --config-dir 2>/dev/null || echo "$HOME/.config/bat")/themes"
  mkdir -p "$BAT_THEMES"
  cp "$REPO_DIR/dist/bat/Kami.tmTheme" "$BAT_THEMES/Kami.tmTheme"
  if command -v bat &>/dev/null; then
    bat cache --build &>/dev/null || true
  fi
  echo "  ✓ Bat ($BAT_THEMES/Kami.tmTheme)"
fi

echo "✨ Kami Theme installation complete!"
