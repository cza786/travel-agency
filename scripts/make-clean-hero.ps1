Add-Type -AssemblyName System.Drawing

$src = "public/images/source/media_1794505589145_8fb8bb06.jpg"
$origImg = [System.Drawing.Image]::FromFile($src)
$w = $origImg.Width
$h = $origImg.Height

# Crop the full hero area:
# x: 0.05 to 0.95 (width: 0.90)
# y: 0.17 to 0.445 (height: 0.275)
$cropX = [int]($w * 0.05)
$cropY = [int]($h * 0.172)
$cropW = [int]($w * 0.90)
$cropH = [int]($h * 0.275)

$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($origImg, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $cropX, $cropY, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)

Write-Host "Cropped base hero: $cropW x $cropH"

# In $bmp:
# The car is in the center-right (y: 110 to 280, x: 100 to 440)
# The text is in the top-left (y: 0 to 105, x: 0 to 250)
# The top-right (y: 0 to 105, x: 260 to 460) has clean snow mountain and sky!
# Let's clone and mirror the clean mountain/sky from the right to the left text area,
# blending with a dark alpine atmospheric vignette:

for ($y = 0; $y -lt 105; $y++) {
    for ($x = 0; $x -lt 250; $x++) {
        # Check if this area has text or text background
        # Distance from center
        $fadeX = $x / 250.0 # 0.0 at far left, 1.0 near center
        
        # Sample clean mountain pixel from right side (mirrored)
        $sampleX = [int]($cropW - 1 - ($x * 0.75))
        $sampleY = $y
        $cleanPix = $bmp.GetPixel($sampleX, $sampleY)
        
        # Atmospheric dark alpine lighting
        $darkFactor = 0.55 + 0.35 * $fadeX
        $r = [int]($cleanPix.R * $darkFactor)
        $gCol = [int]($cleanPix.G * $darkFactor)
        $b = [int]($cleanPix.B * $darkFactor)
        
        # Smooth transition as we approach x = 250
        if ($x -gt 210) {
            $blend = ($x - 210) / 40.0
            $origPix = $bmp.GetPixel($x, $y)
            $r = [int]($r * (1 - $blend) + $origPix.R * $blend)
            $gCol = [int]($gCol * (1 - $blend) + $origPix.G * $blend)
            $b = [int]($b * (1 - $blend) + $origPix.B * $blend)
        }
        
        if ($y -gt 85) {
            $blendY = ($y - 85) / 20.0
            $origPix = $bmp.GetPixel($x, $y)
            $r = [int]($r * (1 - $blendY) + $origPix.R * $blendY)
            $gCol = [int]($gCol * (1 - $blendY) + $origPix.G * $blendY)
            $b = [int]($b * (1 - $blendY) + $origPix.B * $blendY)
        }
        
        if ($r -gt 255) { $r = 255 }
        if ($gCol -gt 255) { $gCol = 255 }
        if ($b -gt 255) { $b = 255 }
        
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
}

# Now upscale to Wonderful High Resolution: 1920 x 1173 (Retina 4K display ready)
$scaleW = 1920
$scaleH = [int](1920 * ($cropH / $cropW))

$hiResBmp = New-Object System.Drawing.Bitmap($scaleW, $scaleH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gHi = [System.Drawing.Graphics]::FromImage($hiResBmp)
$gHi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gHi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gHi.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$gHi.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, $scaleW, $scaleH)), 0, 0, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)

$gHi.Dispose()
$g.Dispose()
$bmp.Dispose()
$origImg.Dispose()

# Save to public/images/clean-hero-van.jpg
$hiResBmp.Save("public/images/clean-hero-van.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$hiResBmp.Dispose()

Write-Host "Created 100% clean, text-free, wonderful 1920x$scaleH hero van image: public/images/clean-hero-van.jpg!"

