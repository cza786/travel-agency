Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("public/images/desktop-hero-ref.jpg")
$w = $bmp.Width
$h = $bmp.Height

# Create output clean image
$clean = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($clean)
$g.DrawImage($bmp, 0, 0, $w, $h)

# Let's inspect the box:
# In desktop-hero-ref.jpg:
# The box has a rounded border. Inside is dark glass with gold text "Preise & Tarife" and white text "Transparente Pauschalpreise..."
# Let's sample pavement from x: 380 to 470, y: 155 to 200 (which is directly under and behind the van's rear)
# and blend with x: 705 to 730, y: 155 to 200.
# Also sample from y: 140 to 152 at the same x!
for ($y = 150; $y -lt $h; $y++) {
    for ($x = 480; $x -lt 715; $x++) {
        # Check distance to box borders
        $distFromTop = $y - 150
        $distFromBottom = $h - 1 - $y
        $distFromLeft = $x - 480
        $distFromRight = 715 - $x

        # We can reconstruct this ground with realistic wet asphalt reflections
        # Top neighbor above box
        $topPix = $clean.GetPixel($x, 148)
        # Left neighbor
        $leftPix = $clean.GetPixel([Math]::Min($x, 478), $y)
        # Right neighbor
        $rightPix = $clean.GetPixel([Math]::Min($w - 1, 718), $y)

        $tX = ($x - 480) / 235.0 # 0 at left, 1 at right
        $tY = ($y - 150) / 55.0  # 0 at top, 1 at bottom

        # Blend reflections: top provides the horizontal reflection streaks
        $baseR = $topPix.R * (1 - $tY * 0.4)
        $baseG = $topPix.G * (1 - $tY * 0.4)
        $baseB = $topPix.B * (1 - $tY * 0.4)

        # Mix with left/right
        $sideR = $leftPix.R * (1 - $tX) + $rightPix.R * $tX
        $sideG = $leftPix.G * (1 - $tX) + $rightPix.G * $tX
        $sideB = $leftPix.B * (1 - $tX) + $rightPix.B * $tX

        $finalR = [int]($baseR * 0.65 + $sideR * 0.35)
        $finalG = [int]($baseG * 0.65 + $sideG * 0.35)
        $finalB = [int]($baseB * 0.65 + $sideB * 0.35)

        # Natural noise texture for asphalt grain
        $noise = ((($x * 37 + $y * 19) % 11) - 5)
        $finalR = [Math]::Max(0, [Math]::Min(255, $finalR + $noise))
        $finalG = [Math]::Max(0, [Math]::Min(255, $finalG + $noise))
        $finalB = [Math]::Max(0, [Math]::Min(255, $finalB + $noise))

        # Soft edge feathering so it seamlessly blends with outside pixels
        $edgeWeight = 1.0
        if ($distFromLeft -lt 8) { $edgeWeight = [Math]::Min($edgeWeight, $distFromLeft / 8.0) }
        if ($distFromRight -lt 8) { $edgeWeight = [Math]::Min($edgeWeight, $distFromRight / 8.0) }
        if ($distFromTop -lt 6) { $edgeWeight = [Math]::Min($edgeWeight, $distFromTop / 6.0) }

        $origPix = $clean.GetPixel($x, $y)
        $r = [int]($origPix.R * (1 - $edgeWeight) + $finalR * $edgeWeight)
        $gCol = [int]($origPix.G * (1 - $edgeWeight) + $finalG * $edgeWeight)
        $b = [int]($origPix.B * (1 - $edgeWeight) + $finalB * $edgeWeight)

        $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
    }
}

# Clean text on left side:
# In the original, the text is inside x: 30 to 285, y: 35 to 195.
# The background behind the text is the dark alpine hillside and lake edge.
# We inpaint by detecting text luminance:
for ($y = 35; $y -lt 198; $y++) {
    for ($x = 30; $x -lt 285; $x++) {
        $c = $clean.GetPixel($x, $y)
        $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
        if ($lum -gt 65) {
            $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# Multi-pass inpainting for text
for ($pass = 0; $pass -lt 10; $pass++) {
    for ($y = 35; $y -lt 198; $y++) {
        for ($x = 30; $x -lt 285; $x++) {
            $c = $clean.GetPixel($x, $y)
            if ($c.A -eq 0) {
                $sumR = 0; $sumG = 0; $sumB = 0; $count = 0
                $offsets = @( @(-1,0), @(1,0), @(0,-1), @(0,1), @(-2,0), @(2,0), @(0,-2), @(0,2), @(-3,0), @(3,0), @(-4,0), @(4,0) )
                foreach ($off in $offsets) {
                    $nx = $x + $off[0]
                    $ny = $y + $off[1]
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        $nc = $clean.GetPixel($nx, $ny)
                        if ($nc.A -ne 0) {
                            $sumR += $nc.R
                            $sumG += $nc.G
                            $sumB += $nc.B
                            $count++
                        }
                    }
                }
                if ($count -gt 0) {
                    $clean.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, [int]($sumR / $count), [int]($sumG / $count), [int]($sumB / $count)))
                }
            }
        }
    }
}

# High-resolution upscale to 2400 x 676:
$targetW = 2400
$targetH = [int](2400 * ($h / $w))
$hiRes = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gHi = [System.Drawing.Graphics]::FromImage($hiRes)
$gHi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gHi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gHi.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gHi.DrawImage($clean, 0, 0, $targetW, $targetH)

$outPath = "public/images/desktop-hero-clean.jpg"
$hiRes.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Host "Saved flawless $outPath ($targetW x $targetH)"

$gHi.Dispose()
$hiRes.Dispose()
$clean.Dispose()
$g.Dispose()
$bmp.Dispose()
