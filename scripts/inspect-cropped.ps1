Add-Type -AssemblyName System.Drawing

function Inspect-Card($path, $label) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Host "=== Inspecting $label ($($bmp.Width) x $($bmp.Height)) ==="
    
    # Check bottom bar (y from height - 40 to height)
    # Find text baseline and icon position
    # Look for brightest pixels in bottom half
    $brightest = @()
    for ($y = [int]($bmp.Height * 0.6); $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -gt 220 -and $c.G -gt 220 -and $c.B -gt 220) {
                $brightest += [PSCustomObject]@{ X = $x; Y = $y }
            }
        }
    }
    
    if ($brightest.Count -gt 0) {
        $minX = ($brightest | Measure-Object -Property X -Minimum).Minimum
        $maxX = ($brightest | Measure-Object -Property X -Maximum).Maximum
        $minY = ($brightest | Measure-Object -Property Y -Minimum).Minimum
        $maxY = ($brightest | Measure-Object -Property Y -Maximum).Maximum
        Write-Host "Text/Icon bounds in bottom region: X: $minX to $maxX, Y: $minY to $maxY (height = $($maxY - $minY))"
    }
    
    # Check border corner pixels
    $borderSample = $bmp.GetPixel(10, 0)
    Write-Host "Top border color sample: $($borderSample.R),$($borderSample.G),$($borderSample.B)"
    $bmp.Dispose()
}

Inspect-Card "scripts/ref-card1-airport.png" "Card 1 (Airport)"
Inspect-Card "scripts/ref-card2-excursions.png" "Card 2 (Excursions)"
Inspect-Card "scripts/ref-card3-bikes.png" "Card 3 (Bikes)"
Inspect-Card "scripts/ref-card4-taxi.png" "Card 4 (Taxi)"
Inspect-Card "scripts/ref-card5-rental.png" "Card 5 (Rental)"
Inspect-Card "scripts/ref-title.png" "Title Area"

