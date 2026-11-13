Add-Type -AssemblyName System.Drawing

$src = "public/images/logo-original.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)

Write-Host "Inspecting non-black pixels..."
$sampleCount = 0
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
    for ($x = 0; $x -lt $bmp.Width; $x += 10) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 50 -and $sampleCount -lt 15) {
            Write-Host "Sample at ($x, $y): R=$($c.R), G=$($c.G), B=$($c.B)"
            $sampleCount++
        }
    }
}

$bmp.Dispose()

