Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554919862_620d9a01.png")

# Find bounding box of the pill button
# Scan for pixels with border or background
Write-Host "Image 128 x 66"

# Check the flag pixels:
# The German flag has Black, Red, Gold bands.
# Let's find where red (R > 180, G < 50, B < 50) and yellow (R > 200, G > 180, B < 50) are:
$reds = @()
$yellows = @()
for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 170 -and $c.G -lt 50 -and $c.B -lt 50) {
            $reds += [PSCustomObject]@{ X = $x; Y = $y }
        }
        if ($c.R -gt 200 -and $c.G -gt 160 -and $c.B -lt 60) {
            $yellows += [PSCustomObject]@{ X = $x; Y = $y }
        }
    }
}

if ($reds.Count -gt 0) {
    $minX = ($reds | Measure-Object -Property X -Minimum).Minimum
    $maxX = ($reds | Measure-Object -Property X -Maximum).Maximum
    $minY = ($reds | Measure-Object -Property Y -Minimum).Minimum
    $maxY = ($reds | Measure-Object -Property Y -Maximum).Maximum
    Write-Host "Red band bounds: X: $minX to $maxX (w = $($maxX - $minX)), Y: $minY to $maxY (h = $($maxY - $minY))"
}

if ($yellows.Count -gt 0) {
    $minX = ($yellows | Measure-Object -Property X -Minimum).Minimum
    $maxX = ($yellows | Measure-Object -Property X -Maximum).Maximum
    $minY = ($yellows | Measure-Object -Property Y -Minimum).Minimum
    $maxY = ($yellows | Measure-Object -Property Y -Maximum).Maximum
    Write-Host "Yellow band bounds: X: $minX to $maxX (w = $($maxX - $minX)), Y: $minY to $maxY (h = $($maxY - $minY))"
}

# Check text "Deutsch" bounds (white/gray pixels with x > 35)
$whites = @()
for ($x = 35; $x -lt 100; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 180 -and $c.G -gt 180 -and $c.B -gt 180) {
            $whites += [PSCustomObject]@{ X = $x; Y = $y }
        }
    }
}
if ($whites.Count -gt 0) {
    $minX = ($whites | Measure-Object -Property X -Minimum).Minimum
    $maxX = ($whites | Measure-Object -Property X -Maximum).Maximum
    $minY = ($whites | Measure-Object -Property Y -Minimum).Minimum
    $maxY = ($whites | Measure-Object -Property Y -Maximum).Maximum
    Write-Host "Text bounds: X: $minX to $maxX, Y: $minY to $maxY"
}

# Check chevron bounds (x > 90)
$chevron = @()
for ($x = 90; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 160 -and $c.G -gt 160 -and $c.B -gt 160) {
            $chevron += [PSCustomObject]@{ X = $x; Y = $y }
        }
    }
}
if ($chevron.Count -gt 0) {
    $minX = ($chevron | Measure-Object -Property X -Minimum).Minimum
    $maxX = ($chevron | Measure-Object -Property X -Maximum).Maximum
    $minY = ($chevron | Measure-Object -Property Y -Minimum).Minimum
    $maxY = ($chevron | Measure-Object -Property Y -Maximum).Maximum
    Write-Host "Chevron bounds: X: $minX to $maxX, Y: $minY to $maxY"
}

$bmp.Dispose()

