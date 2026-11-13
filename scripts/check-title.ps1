Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-title.png")

Write-Host "Title image size: $($bmp.Width) x $($bmp.Height)"
# Find white pixels
for ($y = 0; $y -lt $bmp.Height; $y++) {
    $row = ""
    for ($x = 0; $x -lt $bmp.Width; $x += 2) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 180) {
            $row += "#"
        } elseif ($c.R -gt 80) {
            $row += "-"
        } else {
            $row += " "
        }
    }
    if ($row.Trim().Length -gt 0) {
        Write-Host "$($y.ToString('D2')) : $row"
    }
}
$bmp.Dispose()

