Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-card5-rental.png")

# Check where the key ends and where text begins
Write-Host "Card 5 size: $($bmp.Width) x $($bmp.Height)"

# Sample horizontal slice at y=40 (middle of card)
for ($x = 0; $x -lt $bmp.Width; $x += 10) {
    $c = $bmp.GetPixel($x, 40)
    Write-Host "x=$x : $($c.R),$($c.G),$($c.B)"
}

$bmp.Dispose()

