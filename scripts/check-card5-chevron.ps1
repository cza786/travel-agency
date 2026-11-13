Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-card5-rental.png")
for ($x = 480; $x -lt 520; $x++) {
    for ($y = 25; $y -lt 55; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 90) {
            Write-Host "Card 5 Chevron pixel at ($x, $y) RGB: $($c.R),$($c.G),$($c.B)"
        }
    }
}
$bmp.Dispose()

