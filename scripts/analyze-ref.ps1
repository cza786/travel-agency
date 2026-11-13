Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg")
$bmp = New-Object System.Drawing.Bitmap($img)

Write-Host "Uploaded screenshot width: $($bmp.Width), height: $($bmp.Height)"

# Let's find the card coordinates exactly:
# Top row: Card 1 (Airport), Card 2 (Excursions)
# Middle row: Card 3 (Bikes), Card 4 (Taxi)
# Bottom row: Card 5 (Rental)

# Let's sample along horizontal lines to find card boundaries
# Top border of Row 1:
# Let's check at x=350 (middle of Card 1)
for ($y = 20; $y -lt 70; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -gt 30 -or $c.G -gt 30 -or $c.B -gt 30) {
        Write-Host "Row 1 top at y = $y"
        break
    }
}

# Bottom border of Row 1:
for ($y = 140; $y -lt 180; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -lt 15 -and $c.G -lt 15 -and $c.B -lt 15) {
        Write-Host "Row 1 bottom at y = $($y - 1)"
        break
    }
}

# Top of Row 2:
for ($y = 160; $y -lt 200; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -gt 25 -or $c.G -gt 25 -or $c.B -gt 25) {
        Write-Host "Row 2 top at y = $y"
        break
    }
}

# Bottom of Row 2:
for ($y = 280; $y -lt 320; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -lt 15 -and $c.G -lt 15 -and $c.B -lt 15) {
        Write-Host "Row 2 bottom at y = $($y - 1)"
        break
    }
}

# Top of Row 3:
for ($y = 300; $y -lt 330; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -gt 20 -or $c.G -gt 20 -or $c.B -gt 20) {
        Write-Host "Row 3 top at y = $y"
        break
    }
}

# Bottom of Row 3:
for ($y = 380; $y -lt 412; $y++) {
    $c = $bmp.GetPixel(350, $y)
    if ($c.R -lt 15 -and $c.G -lt 15 -and $c.B -lt 15) {
        Write-Host "Row 3 bottom at y = $($y - 1)"
        break
    }
}

$bmp.Dispose()
$img.Dispose()

