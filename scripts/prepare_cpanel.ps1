# cPanel ga yuklash uchun paket tayyorlash (Windows)
# Ishlatish (loyiha ildizidan):
#   powershell -ExecutionPolicy Bypass -File scripts\prepare_cpanel.ps1 -ApiUrl "https://api.sizning-domen.uz/api"

param(
    [Parameter(Mandatory = $true)]
    [string]$ApiUrl
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

Write-Host "==> Frontend build (VITE_API_URL=$ApiUrl)"
$env:VITE_API_URL = $ApiUrl
npm run build
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed" }

$Out = Join-Path $Root "deploy_package"
if (Test-Path $Out) { Remove-Item -Recurse -Force $Out }
New-Item -ItemType Directory -Path $Out | Out-Null
New-Item -ItemType Directory -Path (Join-Path $Out "frontend_public_html") | Out-Null
New-Item -ItemType Directory -Path (Join-Path $Out "backend_app") | Out-Null

Write-Host "==> Frontend dist -> deploy_package/frontend_public_html"
Copy-Item -Recurse -Force (Join-Path $Root "dist\*") (Join-Path $Out "frontend_public_html\")
Copy-Item -Force (Join-Path $Root "deploy\public_html\.htaccess") (Join-Path $Out "frontend_public_html\.htaccess")

Write-Host "==> Backend -> deploy_package/backend_app (node_modules va venv yo'q)"
$BackendSrc = Join-Path $Root "backend"
$BackendDst = Join-Path $Out "backend_app"
$exclude = @("venv", ".venv", "__pycache__", "staticfiles", "node_modules", ".git")
Get-ChildItem $BackendSrc -Force | Where-Object {
    $exclude -notcontains $_.Name
} | ForEach-Object {
    Copy-Item -Recurse -Force $_.FullName (Join-Path $BackendDst $_.Name)
}

Copy-Item -Force (Join-Path $BackendSrc ".env.example") (Join-Path $BackendDst ".env.example")
Copy-Item -Force (Join-Path $Root "DEPLOY_CPANEL.md") (Join-Path $Out "DEPLOY_CPANEL.md")

Write-Host ""
Write-Host "Tayyor: $Out"
Write-Host "  frontend_public_html/  -> cPanel public_html (yoki asosiy domen)"
Write-Host "  backend_app/           -> Python App ildizi (masalan tillar-api)"
Write-Host ""
Write-Host "Keyingi qadam: DEPLOY_CPANEL.md ni o'qing."
