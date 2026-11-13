Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("public/images/clean-rental.jpg")
Write-Host "clean-rental.jpg: $($bmp.Width) x $($bmp.Height)"
$brightCount = 0
for ($x = [int]($bmp.Width * 0.45); $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200) {
            $brightCount++
        }
    }
}
Write-Host "Bright pixels in right 55% of clean-rental: $brightCount"
$bmp.Dispose()

