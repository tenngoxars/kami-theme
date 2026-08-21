# Kami Theme Installer for Windows PowerShell
$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/tenngoxars/kami-theme.git"
$SourceDir = if ($MyInvocation.MyCommand.Path) { Split-Path -Parent $MyInvocation.MyCommand.Path } else { $null }
$CleanupDir = $null

if (-not $SourceDir -or -not (Test-Path "$SourceDir\dist")) {
  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Kami installer requires git when run with irm | iex. Clone $RepoUrl and run .\install.ps1 instead."
  }
  $CleanupDir = Join-Path $env:TEMP "kami-theme-$([guid]::NewGuid().ToString('N'))"
  git clone --depth 1 $RepoUrl $CleanupDir | Out-Null
  $SourceDir = $CleanupDir
}

function Install-KamiFile([string]$Label, [string]$Source, [string]$Target) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Target) | Out-Null
  Copy-Item $Source $Target -Force
  Write-Host "  ✓ $Label" -ForegroundColor Green
}

try {
  Write-Host "📜 Kami Theme Installer" -ForegroundColor Cyan

  if ((Test-Path "$env:APPDATA\warp\Warp") -or (Test-Path "$HOME\.warp")) {
    Install-KamiFile "Warp: %APPDATA%\warp\Warp\data\themes\kami.yaml" "$SourceDir\dist\warp\kami.yaml" "$env:APPDATA\warp\Warp\data\themes\kami.yaml"
  }

  if ((Get-Command omp -ErrorAction SilentlyContinue) -or (Test-Path "$HOME\.omp")) {
    Install-KamiFile "Oh My Pi: ~/.omp/agent/themes/kami.json" "$SourceDir\dist\omp\kami.json" "$HOME\.omp\agent\themes\kami.json"
  }

  if ((Get-Command pi -ErrorAction SilentlyContinue) -or (Test-Path "$HOME\.pi")) {
    Install-KamiFile "Pi: ~/.pi/agent/themes/kami.json" "$SourceDir\dist\pi\kami.json" "$HOME\.pi\agent\themes\kami.json"
  }

  if ((Get-Command opencode -ErrorAction SilentlyContinue) -or (Test-Path "$HOME\.config\opencode")) {
    Install-KamiFile "OpenCode: ~/.config/opencode/themes/kami.json" "$SourceDir\dist\opencode\kami.json" "$HOME\.config\opencode\themes\kami.json"
  }

  if (Get-Command code -ErrorAction SilentlyContinue) {
    code --install-extension "$SourceDir\dist\vscode\kami-theme-0.1.0.vsix" --force | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "VS Code rejected the Kami VSIX." }
    Write-Host "  ✓ VS Code: tenngo.kami-theme" -ForegroundColor Green
  }

  Write-Host "`nSelect Kami in each tool after installation. Other dist targets are experimental and require their documented manual setup." -ForegroundColor Yellow
}
finally {
  if ($CleanupDir) { Remove-Item -Path $CleanupDir -Recurse -Force -ErrorAction SilentlyContinue }
}
