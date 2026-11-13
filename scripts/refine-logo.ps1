Add-Type -AssemblyName System.Drawing

$src = "public/images/logo-original.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)
$transparentBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color luminance threshold
$bgLum = 14.0
$fgLum = 210.0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $lum = 0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B
        
        if ($lum -le $bgLum) {
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $norm = ($lum - $bgLum) / ($fgLum - $bgLum)
            if ($norm -gt 1.0) { $norm = 1.0 }
            if ($norm -lt 0.0) { $norm = 0.0 }
            
            # Smooth gamma curve for clean antialiasing
            $alphaVal = [int]([math]::Pow($norm, 0.9) * 255.0)
            if ($alphaVal -gt 255) { $alphaVal = 255 }
            if ($alphaVal -lt 0) { $alphaVal = 0 }
            
            # Keep clean platinum white
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alphaVal, 245, 248, 252))
        }
    }
}

$transparentBmp.Save("public/images/logo-clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
# Also overwrite public/images/logo.png
$transparentBmp.Save("public/images/logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$transparentBmp.Dispose()
$bmp.Dispose()
Write-Host "Generated ultra-smooth transparent logo.png!"

