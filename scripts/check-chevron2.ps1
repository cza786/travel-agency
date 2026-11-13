Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-card1-airport.png")
for ($x = 220; $x -lt 250; $x++) {
    for ($y = 95; $y -lt 115; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 80) {
            Write-Host "Pixel at ($x, $y) RGB: $($c.R),$($c.G),$($c.B)"
        }
    }
}
$bmp.Dispose()

