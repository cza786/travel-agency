Add-Type -AssemblyName System.Drawing

$src = "public/images/source/media_1794505589145_8fb8bb06.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$w = $img.Width
$h = $img.Height

function Create-Clean-Card-HiRes($xRatio, $yRatio, $wRatio, $hRatio, $destPath, $isRental = $false) {
    $x = [int]($w * $xRatio)
    $y = [int]($h * $yRatio)
    $cw = [int]($w * $wRatio)
    $ch = [int]($h * $hRatio)

    $bmp = New-Object System.Drawing.Bitmap($cw, $ch)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $cw, $ch)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    if (-not $isRental) {
        # The clean photographic scene (airport tower, mountain lake, bikes, taxi sign)
        # is in the upper 54% of the card.
        # Below y = 0.54, the screenshot had the German text.
        # We blend smoothly into dark obsidian gradient so there is ZERO text.
        $cutoffY = [int]($ch * 0.54)
        
        for ($py = $cutoffY; $py -lt $ch; $py++) {
            $t = ($py - $cutoffY) / ($ch - $cutoffY) # 0.0 to 1.0
            $blend = [math]::Pow($t, 1.2) # Smooth non-linear curve
            
            for ($px = 0; $px -lt $cw; $px++) {
                $sampleY = [math]::Max(0, [int]($cutoffY - 3))
                $samplePix = $bmp.GetPixel($px, $sampleY)
                
                # Dark obsidian base (#080A0C = 8, 10, 12)
                $r = [int]($samplePix.R * (1 - $blend) + 8 * $blend)
                $gCol = [int]($samplePix.G * (1 - $blend) + 10 * $blend)
                $b = [int]($samplePix.B * (1 - $blend) + 12 * $blend)
                
                $bmp.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
            }
        }
    } else {
        # Card 5 (Rental): Mercedes key is on the LEFT. Right side had the text.
        # Clean the right side into dark perforated luxury leather obsidian gradient.
        $cutoffX = [int]($cw * 0.42)
        for ($py = 0; $py -lt $ch; $py++) {
            for ($px = $cutoffX; $px -lt $cw; $px++) {
                $t = ($px - $cutoffX) / ($cw - $cutoffX)
                $blend = [math]::Pow($t, 1.2)
                $sampleX = [int]($cutoffX - 4)
                $samplePix = $bmp.GetPixel($sampleX, $py)
                
                $r = [int]($samplePix.R * (1 - $blend) + 8 * $blend)
                $gCol = [int]($samplePix.G * (1 - $blend) + 10 * $blend)
                $b = [int]($samplePix.B * (1 - $blend) + 12 * $blend)
                
                $bmp.SetPixel($px, $py, [System.Drawing.Color]::FromArgb(255, $r, $gCol, $b))
            }
        }
    }
    
    # Upscale 3x to High Resolution with Bicubic Interpolation
    $scale = 3
    $hiResBmp = New-Object System.Drawing.Bitmap(($cw * $scale), ($ch * $scale), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gHi = [System.Drawing.Graphics]::FromImage($hiResBmp)
    $gHi.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gHi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gHi.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gHi.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, ($cw * $scale), ($ch * $scale))), 0, 0, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)
    
    $gHi.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    
    $hiResBmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $hiResBmp.Dispose()
    Write-Host "Created Hi-Res text-free image: $destPath"
}

Create-Clean-Card-HiRes 0.07 0.554 0.41 0.106 "public/images/clean-airport.jpg"
Create-Clean-Card-HiRes 0.51 0.554 0.41 0.106 "public/images/clean-excursions.jpg"
Create-Clean-Card-HiRes 0.07 0.672 0.41 0.106 "public/images/clean-bikes.jpg"
Create-Clean-Card-HiRes 0.51 0.672 0.41 0.106 "public/images/clean-taxi.jpg"
Create-Clean-Card-HiRes 0.07 0.787 0.85 0.08 "public/images/clean-rental.jpg" $true

$img.Dispose()
Write-Host "All Hi-Res clean text-free images created successfully!"
