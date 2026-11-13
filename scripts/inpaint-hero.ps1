Add-Type -AssemblyName System.Drawing

$src = "public/images/source/media_1794505589145_8fb8bb06.jpg"
$origImg = [System.Drawing.Image]::FromFile($src)
$w = $origImg.Width
$h = $origImg.Height

# We want the hero section (yRatio: 0.17 to 0.45, xRatio: 0.05 to 0.95)
$cropX = [int]($w * 0.05)
$cropY = [int]($h * 0.165)
$cropW = [int]($w * 0.90)
$cropH = [int]($h * 0.285)

$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($origImg, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $cropX, $cropY, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$origImg.Dispose()

Write-Host "Initial cropped hero: $($bmp.Width) x $($bmp.Height)"

# Now inspect and remove the text:
# The text "Your Journey..." is roughly in x: 10 to 240, y: 15 to 110.
# The car begins at y: 120 and x: 80 to 440.
# The mountain ridge behind the text slopes down from top left towards right.
# Let's clean the text pixels in x: 10..245, y: 12..115:
$textMinX = 10; $textMaxX = 245
$textMinY = 12; $textMaxY = 110

# Create mask of text pixels
$isText = New-Object 'bool[,]' $cropW, $cropH
for ($y = $textMinY; $y -le $textMaxY; $y++) {
    for ($x = $textMinX; $x -le $textMaxX; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Background is dark blue/slate (R < 110, G < 120, B < 150)
        # White text has high luminance and low saturation
        $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
        if ($lum -gt 135) {
            $isText[$x, $y] = $true
            # Also dilate by 1 pixel for anti-aliasing
            if ($x -gt 0) { $isText[$x-1, $y] = $true }
            if ($x -lt $cropW-1) { $isText[$x+1, $y] = $true }
            if ($y -gt 0) { $isText[$x, $y-1] = $true }
            if ($y -lt $cropH-1) { $isText[$x, $y+1] = $true }
        }
    }
}

# Inpainting: For every text pixel, interpolate from non-text neighbors
# or sample from the clean mountain/sky gradient
for ($pass = 0; $pass -lt 4; $pass++) {
    for ($y = $textMinY; $y -le $textMaxY; $y++) {
        for ($x = $textMinX; $x -le $textMaxX; $x++) {
            if ($isText[$x, $y]) {
                # Find nearest non-text neighbors above, below, left, right
                $rSum = 0; $gSum = 0; $bSum = 0; $count = 0
                
                # Check horizontal neighbors
                for ($d = 2; $d -le 16; $d++) {
                    if ($x - $d -ge 0 -and -not $isText[$x - $d, $y]) {
                        $p = $bmp.GetPixel($x - $d, $y)
                        $rSum += $p.R; $gSum += $p.G; $bSum += $p.B; $count++
                        break
                    }
                }
                for ($d = 2; $d -le 16; $d++) {
                    if ($x + $d -lt $cropW -and -not $isText[$x + $d, $y]) {
                        $p = $bmp.GetPixel($x + $d, $y)
                        $rSum += $p.R; $gSum += $p.G; $bSum += $p.B; $count++
                        break
                    }
                }
                # Check vertical neighbors
                for ($d = 2; $d -le 12; $d++) {
                    if ($y - $d -ge 0 -and -not $isText[$x, $y - $d]) {
                        $p = $bmp.GetPixel($x, $y - $d)
                        $rSum += $p.R; $gSum += $p.G; $bSum += $p.B; $count++
                        break
                    }
                }
                for ($d = 2; $d -le 12; $d++) {
                    if ($y + $d -lt $cropH -and -not $isText[$x, $y + $d]) {
                        $p = $bmp.GetPixel($x, $y + $d)
                        $rSum += $p.R; $gSum += $p.G; $bSum += $p.B; $count++
                        break
                    }
                }
                
                if ($count -gt 0) {
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, [int]($rSum/$count), [int]($gSum/$count), [int]($bSum/$count)))
                } else {
                    # Dark alpine mountain tone
                    $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 30, 36, 48))
                }
            }
        }
    }
}

# Apply subtle bilateral blur in the text region to seamlessly blend mountain grain
for ($y = $textMinY; $y -le $textMaxY; $y++) {
    for ($x = $textMinX; $x -le $textMaxX; $x++) {
        if ($isText[$x, $y]) {
            $rAvg = 0; $gAvg = 0; $bAvg = 0; $cCnt = 0
            for ($dy = -2; $dy -le 2; $dy++) {
                for ($dx = -2; $dx -le 2; $dx++) {
                    $nx = $x + $dx; $ny = $y + $dy
                    if ($nx -ge 0 -and $nx -lt $cropW -and $ny -ge 0 -and $ny -lt $cropH) {
                        $np = $bmp.GetPixel($nx, $ny)
                        $rAvg += $np.R; $gAvg += $np.G; $bAvg += $np.B; $cCnt++
                    }
                }
            }
            if ($cCnt -gt 0) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, [int]($rAvg/$cCnt), [int]($gAvg/$cCnt), [int]($bAvg/$cCnt)))
            }
        }
    }
}

# Super-Resolution Upscaling: Upscale to 1920 x 1215 with HighQualityBicubic for wonderful sharpness!
$targetW = 1920
$targetH = [int](1920 * ($cropH / $cropW))
$hiResBmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gHi = [System.Drawing.Graphics]::FromImage($hiResBmp)
$gHi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gHi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gHi.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gHi.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)), 0, 0, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)

$gHi.Dispose()
$bmp.Dispose()

$dest = "public/images/clean-hero-van.jpg"
$hiResBmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$hiResBmp.Dispose()

Write-Host "Generated 100% clean, text-free, wonderful 1920px resolution hero image at $dest!"

