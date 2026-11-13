Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg")
$bmp = New-Object System.Drawing.Bitmap($img)

Write-Host "Scanning horizontal line across entire image at y=18..."
$linePixels = @()
for ($x = 0; $x -lt $bmp.Width; $x++) {
    $c = $bmp.GetPixel($x, 18)
    if ($c.R -gt 25 -and $c.R -lt 50) {
        $linePixels += $x
    }
}
Write-Host "Line pixels: $($linePixels.Count) pixels found, from $(($linePixels | Select-Object -First 1)) to $(($linePixels | Select-Object -Last 1))"

$bmp.Dispose()
$img.Dispose()

