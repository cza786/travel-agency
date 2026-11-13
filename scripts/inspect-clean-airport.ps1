Add-Type -AssemblyName System.Drawing
$clean = [System.Drawing.Bitmap]::FromFile("public/images/clean-airport.jpg")
Write-Host "clean-airport size: $($clean.Width) x $($clean.Height)"

# Sample down the middle (x=315) from y=0 to height
for ($y = 0; $y -lt $clean.Height; $y += 30) {
    $c = $clean.GetPixel(315, $y)
    Write-Host "y=$y RGB: $($c.R),$($c.G),$($c.B)"
}
$clean.Dispose()

