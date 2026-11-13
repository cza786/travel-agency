Add-Type -AssemblyName System.Drawing

$src = "C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg"
$img = [System.Drawing.Image]::FromFile($src)

function Clean-Card($x, $y, $cw, $ch, $destPath, $isRental = $false) {
    $bmp = New-Object System.Drawing.Bitmap($cw, $ch)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $srcRect = New-Object System.Drawing.Rectangle($x, $y, $cw, $ch)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    if (-not $isRental) {
        # Clean photographic scene in upper 65% of the card
        # Below y = 0.65 (around y = 82), blend smoothly into #080A0C
        $cutoffY = [int]($ch * 0.66)
        for ($py = $cutoffY; $py -lt $ch; $py++) {
            $t = ($py - $cutoffY) / ($ch - $cutoffY) # 0.0 to 1.0
            $blend = [math]::Pow($t, 1.2)
            
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
        # Card 5 (Rental): Mercedes key is on the LEFT (x < 220)
        # Smoothly blend to #080A0C to the right of x = 200
        $cutoffX = 200
        for ($py = 0; $py -lt $ch; $py++) {
            for ($px = $cutoffX; $px -lt $cw; $px++) {
                $t = [math]::Min(1.0, ($px - $cutoffX) / 60.0) # smooth 60px fade
                $blend = [math]::Pow($t, 1.2)
                $sampleX = [math]::Max(0, $cutoffX - 4)
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

Clean-Card 222 41 258 125 "public/images/clean-airport.jpg"
Clean-Card 492 41 258 125 "public/images/clean-excursions.jpg"
Clean-Card 222 178 258 125 "public/images/clean-bikes.jpg"
Clean-Card 492 178 258 125 "public/images/clean-taxi.jpg"
Clean-Card 222 315 528 80 "public/images/clean-rental.jpg" $true

$img.Dispose()
Write-Host "All Hi-Res desktop-sourced clean cards created successfully!"

