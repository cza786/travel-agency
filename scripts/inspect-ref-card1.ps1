Add-Type -AssemblyName System.Drawing
$ref = [System.Drawing.Bitmap]::FromFile("scripts/ref-card1-airport.png")
Write-Host "ref-card1-airport size: $($ref.Width) x $($ref.Height)"

for ($y = 0; $y -lt $ref.Height; $y += 10) {
    $c = $ref.GetPixel(129, $y)
    Write-Host "y=$y RGB: $($c.R),$($c.G),$($c.B)"
}
$ref.Dispose()

