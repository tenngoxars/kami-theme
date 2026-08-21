#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/tenngoxars/kami-theme.git"
CLEANUP_DIR=""
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || true)"

if [ ! -d "$SOURCE_DIR/dist" ]; then
  command -v git >/dev/null || {
    echo "Kami installer requires git when run with curl | bash. Clone $REPO_URL and run ./install.sh instead." >&2
    exit 1
  }
  CLEANUP_DIR="$(mktemp -d)"
  git clone --depth 1 "$REPO_URL" "$CLEANUP_DIR" >/dev/null
  SOURCE_DIR="$CLEANUP_DIR"
fi
trap '[ -n "$CLEANUP_DIR" ] && rm -rf "$CLEANUP_DIR"' EXIT

install_file() {
  local label="$1" source="$2" target="$3"
  mkdir -p "$(dirname "$target")"
  cp "$source" "$target"
  printf '  ✓ %s\n' "$label"
}

printf '📜 Kami Theme Installer\n'

if [ -d "$HOME/.warp" ] || [ -d "/Applications/Warp.app" ] || command -v warp-terminal >/dev/null 2>&1; then
  install_file "Warp: ~/.warp/themes/kami.yaml" "$SOURCE_DIR/dist/warp/kami.yaml" "$HOME/.warp/themes/kami.yaml"
fi

if [ -d "$HOME/.omp" ] || command -v omp >/dev/null 2>&1; then
  install_file "Oh My Pi: ~/.omp/agent/themes/kami.json" "$SOURCE_DIR/dist/omp/kami.json" "$HOME/.omp/agent/themes/kami.json"
fi

if [ -d "$HOME/.pi" ] || command -v pi >/dev/null 2>&1; then
  install_file "Pi: ~/.pi/agent/themes/kami.json" "$SOURCE_DIR/dist/pi/kami.json" "$HOME/.pi/agent/themes/kami.json"
fi

if [ -d "$HOME/.config/opencode" ] || command -v opencode >/dev/null 2>&1; then
  install_file "OpenCode: ~/.config/opencode/themes/kami.json" "$SOURCE_DIR/dist/opencode/kami.json" "$HOME/.config/opencode/themes/kami.json"
fi

CODE_BIN=""
if command -v code >/dev/null 2>&1; then
  CODE_BIN="code"
elif [ -x "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]; then
  CODE_BIN="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"
fi

if [ -n "$CODE_BIN" ]; then
  "$CODE_BIN" --install-extension "$SOURCE_DIR/dist/vscode/kami-theme-0.1.0.vsix" --force >/dev/null
  printf '  ✓ VS Code: tenngo.kami-theme\n'
fi

printf '\nSelect Kami in each tool after installation. Other dist targets are experimental and require their documented manual setup.\n'
