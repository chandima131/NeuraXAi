$ErrorActionPreference = "Stop"

$projectDirectory = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$stagingDirectory = [IO.Path]::GetFullPath((Join-Path $projectDirectory ".namecheap-staging"))
$deployDirectory = [IO.Path]::GetFullPath((Join-Path $projectDirectory "deploy"))
$archivePath = [IO.Path]::GetFullPath((Join-Path $deployDirectory "neuraxai-namecheap.zip"))
$projectPrefix = $projectDirectory.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar

foreach ($target in @($stagingDirectory, $deployDirectory, $archivePath)) {
  if (-not $target.StartsWith($projectPrefix, [StringComparison]::OrdinalIgnoreCase)) {
    throw "Refusing to package outside the project directory: $target"
  }
}

if (-not (Test-Path -LiteralPath (Join-Path $projectDirectory "dist\server\index.js"))) {
  throw "Production build not found. Run npm run build first."
}

if (Test-Path -LiteralPath $stagingDirectory) {
  Remove-Item -LiteralPath $stagingDirectory -Recurse -Force
}

New-Item -ItemType Directory -Path $stagingDirectory | Out-Null
New-Item -ItemType Directory -Path $deployDirectory -Force | Out-Null

Copy-Item -LiteralPath (Join-Path $projectDirectory "dist") -Destination $stagingDirectory -Recurse
Copy-Item -LiteralPath (Join-Path $projectDirectory "public") -Destination $stagingDirectory -Recurse
Copy-Item -LiteralPath (Join-Path $projectDirectory "server.js") -Destination $stagingDirectory
Copy-Item -LiteralPath (Join-Path $projectDirectory "package.json") -Destination $stagingDirectory
Copy-Item -LiteralPath (Join-Path $projectDirectory "package-lock.json") -Destination $stagingDirectory
Copy-Item -LiteralPath (Join-Path $projectDirectory "NAMECHEAP-DEPLOYMENT.md") -Destination $stagingDirectory

if (Test-Path -LiteralPath $archivePath) {
  Remove-Item -LiteralPath $archivePath -Force
}

# Compress-Archive writes Windows-style separators into entries on some systems.
# Namecheap's Linux extractor needs POSIX-style paths inside the ZIP.
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipStream = [IO.File]::Open($archivePath, [IO.FileMode]::CreateNew)
$zip = [System.IO.Compression.ZipArchive]::new($zipStream, [System.IO.Compression.ZipArchiveMode]::Create, $false)
try {
  Get-ChildItem -LiteralPath $stagingDirectory -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($stagingDirectory.Length).TrimStart([char[]]@('\', '/'))
    $entryName = $relativePath.Replace('\', '/')
    $entry = $zip.CreateEntry($entryName, [System.IO.Compression.CompressionLevel]::Optimal)
    $input = [IO.File]::OpenRead($_.FullName)
    $output = $entry.Open()
    try {
      $input.CopyTo($output)
    } finally {
      $output.Dispose()
      $input.Dispose()
    }
  }
} finally {
  $zip.Dispose()
  $zipStream.Dispose()
}

Remove-Item -LiteralPath $stagingDirectory -Recurse -Force

Write-Host "Namecheap package created: $archivePath"
