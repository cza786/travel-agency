Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-card5-rental.png")

# Find car icon pixels (bright white pixels around x=200 to 300, y=20 to 60)
for ($x = 220; $x -lt 300; $x++) {
    for ($y = 20; $y -lt 60; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200) {
            Write-Host "Car icon pixel at ($x, $y)"
        }
    }
}
$bmp.Dispose()

