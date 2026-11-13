Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg")
$bmp = New-Object System.Drawing.Bitmap($img)

# Let's inspect x from 200 to 760 at y=100 (inside row 1)
# and at y=230 (inside row 2)
# and at y=350 (inside row 3)

Write-Host "--- Scanning Row 1 at y=90 ---"
$card1_x1 = -1; $card1_x2 = -1; $card2_x1 = -1; $card2_x2 = -1
for ($x = 210; $x -lt 760; $x++) {
    $c = $bmp.GetPixel($x, 90)
    $lum = 0.299*$c.R + 0.587*$c.G + 0.114*$c.B
    # background is dark (< 15)
    if ($lum -gt 20 -and $card1_x1 -eq -1) { $card1_x1 = $x }
    if ($lum -lt 20 -and $card1_x1 -ne -1 -and $card1_x2 -eq -1) { $card1_x2 = $x - 1 }
    if ($lum -gt 20 -and $card1_x2 -ne -1 -and $card2_x1 -eq -1) { $card2_x1 = $x }
    if ($lum -lt 20 -and $card2_x1 -ne -1 -and $card2_x2 -eq -1) { $card2_x2 = $x - 1 }
}
Write-Host "Card 1 X: $card1_x1 to $card1_x2 (width = $($card1_x2 - $card1_x1))"
Write-Host "Card 2 X: $card2_x1 to $card2_x2 (width = $($card2_x2 - $card2_x1))"
Write-Host "Horizontal Gap: $($card2_x1 - $card1_x2)"

# Let's scan border pixels at the bottom of Row 1 (x=300, y from 140 to 180)
for ($y = 150; $y -lt 180; $y++) {
    $c = $bmp.GetPixel(300, $y)
    Write-Host "y=$y RGB: $($c.R),$($c.G),$($c.B)"
}

$bmp.Dispose()
$img.Dispose()

