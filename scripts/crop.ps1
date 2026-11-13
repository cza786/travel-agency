Add-Type -AssemblyName System.Drawing

$src = Resolve-Path "public/images/source/media_1794505589145_8fb8bb06.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height
Write-Host "Source dimensions: $w x $h"

# Crop function
function Crop-Image($xRatio, $yRatio, $wRatio, $hRatio, $destPath) {
    $x = [int]($w * $xRatio)
    $y = [int]($h * $yRatio)
    $cw = [int]($w * $wRatio)
    $ch = [int]($h * $hRatio)

    $rect = New-Object System.Drawing.Rectangle($x, $y, $cw, $ch)
    $bmp = New-Object System.Drawing.Bitmap($cw, $ch)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $bmp.Dispose()
    Write-Host "Saved: $destPath ($cw x $ch)"
}

# 1. Hero car section (approx y: 0.17 to 0.44)
Crop-Image 0.05 0.18 0.90 0.27 "public/images/hero-van.jpg"

# 2. Airport card (approx y: 0.55 to 0.65, left)
Crop-Image 0.07 0.554 0.41 0.106 "public/images/service-airport.jpg"

# 3. Excursion card (approx y: 0.55 to 0.65, right)
Crop-Image 0.51 0.554 0.41 0.106 "public/images/service-excursions.jpg"

# 4. Bike card (approx y: 0.67 to 0.77, left)
Crop-Image 0.07 0.672 0.41 0.106 "public/images/service-bikes.jpg"

# 5. Taxi card (approx y: 0.67 to 0.77, right)
Crop-Image 0.51 0.672 0.41 0.106 "public/images/service-taxi.jpg"

# 6. Rental car card (approx y: 0.79 to 0.86)
Crop-Image 0.07 0.787 0.85 0.08 "public/images/service-rental.jpg"

$img.Dispose()
Write-Host "Cropping completed successfully!"

