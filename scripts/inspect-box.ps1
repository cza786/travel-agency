Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("public/images/desktop-hero-ref.jpg")
Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

for ($y = 150; $y -lt $bmp.Height; $y += 10) {
    $row = ""
    for ($x = 480; $x -lt $bmp.Width; $x += 30) {
        $c = $bmp.GetPixel($x, $y)
        $row += "($x, $y : $($c.R),$($c.G),$($c.B)) "
    }
    Write-Host $row
}

$bmp.Dispose()
