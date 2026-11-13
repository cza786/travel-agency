Add-Type -AssemblyName System.Drawing

$src = "C:/Users/SHAMA/.gemini/antigravity/brain/b97863d6-fd18-4f31-a364-612503846a3a/.user_uploaded/media_1794545523069_6e2408bb.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"
$pixelTopLeft = $bmp.GetPixel(0, 0)
Write-Host "Top-left pixel: R=$($pixelTopLeft.R), G=$($pixelTopLeft.G), B=$($pixelTopLeft.B), A=$($pixelTopLeft.A)"

# Copy directly to public/images/logo-original.png
$bmp.Save("public/images/logo-original.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Let's create a transparent PNG version by setting black/dark background to transparent
$transparentBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $color = $bmp.GetPixel($x, $y)
        # Calculate luminance
        $lum = [int](0.299 * $color.R + 0.587 * $color.G + 0.114 * $color.B)
        if ($lum -lt 25) {
            # Pure dark background
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Keep white/light pixels, smooth anti-aliased edge
            $alpha = [math]::Min(255, [int]($lum * 255 / 180))
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        }
    }
}

$transparentBmp.Save("public/images/logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$transparentBmp.Dispose()
$bmp.Dispose()
Write-Host "Saved logo-original.png and transparent logo.png!"

