Add-Type -AssemblyName System.Drawing
$sourcePath = "C:\Users\91910\.gemini\antigravity-ide\brain\eb402253-6d35-4464-98d0-8a0e7419442d\gorillaz_guard_concept_a_1784980784276.png"
$img = [System.Drawing.Image]::FromFile($sourcePath)

$targetDir = "C:\Users\91910\.gemini\antigravity-ide\scratch\GorillazGuard\public\assets"
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir
}

$sizes = @(16, 32, 48, 128)
foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $size, $size)
    $g.Dispose()
    
    $outputPath = Join-Path $targetDir "icon-$size.png"
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Generated $outputPath ($size x $size)"
}

$img.Dispose()
