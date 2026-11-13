Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("scripts/ref-card4-taxi.png")
for ($y = 96; $y -le 113; $y++) {
    $row = ""
    for ($x = 12; $x -le 35; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 150) { $row += "#" }
        elseif ($c.R -gt 70) { $row += "." }
        else { $row += " " }
    }
    Write-Host "$($y.ToString('D2')) : $row"
}
$bmp.Dispose()

