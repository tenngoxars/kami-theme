# Kami Theme Installer for Windows PowerShell
$ErrorActionPreference = "Stop"

Write-Host "📜 Kami Theme Installer" -ForegroundColor Cyan
Write-Host "----------------------------------------"

$ScriptDir = ""
$CleanupTmp = $false

if ($MyInvocation.MyCommand.Path) {
  $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

if (-not $ScriptDir -or -not (Test-Path "$ScriptDir\dist")) {
  $tempDir = Join-Path $env:TEMP "kami-theme-$([guid]::NewGuid().ToString('N'))"
  Write-Host "📥 Fetching latest release from GitHub..." -ForegroundColor Gray
  git clone --depth 1 https://github.com/tenngoxars/kami-theme.git $tempDir | Out-Null
  $ScriptDir = $tempDir
  $CleanupTmp = $true
}

try {
  Write-Host "📦 Deploying Kami Theme across your tools..." -ForegroundColor Cyan

  # 1. Warp for Windows
  $warpThemes1 = "$env:APPDATA\warp\Warp\data\themes"
  $warpThemes2 = "$HOME\.warp\themes"
  New-Item -ItemType Directory -Path $warpThemes1 -Force | Out-Null
  New-Item -ItemType Directory -Path $warpThemes2 -Force | Out-Null
  Copy-Item "$ScriptDir\dist\warp\kami.yaml" "$warpThemes1\kami.yaml" -Force
  Copy-Item "$ScriptDir\dist\warp\kami.yaml" "$warpThemes2\kami.yaml" -Force
  Write-Host "  ✓ Warp ($warpThemes1\kami.yaml)" -ForegroundColor Green

  # 2. Oh My Pi (omp)
  $ompThemes = "$HOME\.omp\agent\themes"
  New-Item -ItemType Directory -Path $ompThemes -Force | Out-Null
  Copy-Item "$ScriptDir\dist\omp\kami.json" "$ompThemes\kami.json" -Force
  Write-Host "  ✓ Oh My Pi ($ompThemes\kami.json)" -ForegroundColor Green

  # 3. VS Code
  if (Get-Command code -ErrorAction SilentlyContinue) {
    code --install-extension "$ScriptDir\dist\vscode\kami-theme-0.1.0.vsix" --force | Out-Null
    Write-Host "  ✓ VS Code (VSIX extension installed)" -ForegroundColor Green
  } else {
    $vscodeExt = "$HOME\.vscode\extensions\tenngo.kami-theme-0.1.0"
    New-Item -ItemType Directory -Path $vscodeExt -Force | Out-Null
    Copy-Item "$ScriptDir\dist\vscode\*" "$vscodeExt" -Recurse -Force
    Write-Host "  ✓ VS Code ($vscodeExt)" -ForegroundColor Green
  }

  # 4. Neovim
  $nvimColors = "$HOME\AppData\Local\nvim\colors"
  New-Item -ItemType Directory -Path $nvimColors -Force | Out-Null
  Copy-Item "$ScriptDir\dist\neovim\colors\kami.lua" "$nvimColors\kami.lua" -Force
  Write-Host "  ✓ Neovim ($nvimColors\kami.lua)" -ForegroundColor Green

  # 5. Lazygit
  $lazygitDir = "$env:LOCALAPPDATA\lazygit"
  if (Test-Path $lazygitDir) {
    Copy-Item "$ScriptDir\dist\lazygit\config.yml" "$lazygitDir\theme-kami.yml" -Force
    Write-Host "  ✓ Lazygit ($lazygitDir\theme-kami.yml)" -ForegroundColor Green
  }

  Write-Host "----------------------------------------"
  Write-Host "✨ Installation complete! You can now select 'Kami' in your tools." -ForegroundColor Cyan
}
finally {
  if ($CleanupTmp -and (Test-Path $ScriptDir)) {
    Remove-Item -Path $ScriptDir -Recurse -Force -ErrorAction SilentlyContinue
  }
}
