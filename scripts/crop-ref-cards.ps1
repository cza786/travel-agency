Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg")

function Crop-Card($x, $y, $w, $h, $name) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save("scripts/$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Saved scripts/$name.png ($w x $h)"
}

# Card 1: Airport (x=222, y=41, w=258, h=125)
Crop-Card 222 41 258 125 "ref-card1-airport"

# Card 2: Excursions (x=492, y=41, w=258, h=125)
Crop-Card 492 41 258 125 "ref-card2-excursions"

# Card 3: Bikes (x=222, y=178, w=258, h=125)
Crop-Card 222 178 258 125 "ref-card3-bikes"

# Card 4: Taxi (x=492, y=178, w=258, h=125)
Crop-Card 492 178 258 125 "ref-card4-taxi"

# Card 5: Rental (x=222, y=315, w=528, h=80)
Crop-Card 222 315 528 80 "ref-card5-rental"

# Title area
Crop-Card 400 5 224 35 "ref-title"

$img.Dispose()

