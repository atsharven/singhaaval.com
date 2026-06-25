Add-Type -AssemblyName System.IO.Compression

$docxPath = "C:\Code\images.docx"
$extractPath = "C:\Code\images_extracted"

if (Test-Path $extractPath) {
    Remove-Item -Path $extractPath -Recurse -Force
}
New-Item -ItemType Directory -Path $extractPath | Out-Null

$docx = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$mediaFiles = $docx.Entries | Where-Object { $_.FullName -like 'word/media/*' }

Write-Host "Images found in document:"
$count = 0
foreach ($file in $mediaFiles) {
    Write-Host $file.FullName
    $dest = Join-Path $extractPath $file.Name
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($file, $dest, $true)
    $count++
}
Write-Host "Total images extracted: $count"
$docx.Dispose()

Write-Host "---"
Write-Host "Extracted files:"
Get-ChildItem -Path $extractPath | Sort-Object Name | ForEach-Object { Write-Host $_.Name }
