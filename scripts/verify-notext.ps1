Add-Type -AssemblyName System.Drawing

function Check-NoText($path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    # Check bottom 40% of image for any high-frequency white text
    $whiteCount = 0
    for ($y = [int]($bmp.Height * 0.6); $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 220) {
                $whiteCount++
            }
        }
    }
    Write-Host "${path}: $whiteCount bright pixels in bottom 40%."
    $bmp.Dispose()
}

Check-NoText "public/images/clean-airport.jpg"
Check-NoText "public/images/clean-excursions.jpg"
Check-NoText "public/images/clean-bikes.jpg"
Check-NoText "public/images/clean-taxi.jpg"
Check-NoText "public/images/clean-rental.jpg"
