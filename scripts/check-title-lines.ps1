Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-title.png")

for ($x = 0; $x -lt $bmp.Width; $x += 5) {
    $c = $bmp.GetPixel($x, 8)
    if ($c.R -gt 20) {
        Write-Host "x=$x : $($c.R),$($c.G),$($c.B)"
    }
}
$bmp.Dispose()

