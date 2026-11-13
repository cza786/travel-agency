Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554702870_6304bfa1.jpg")
$bmp = New-Object System.Drawing.Bitmap($img)

# Card 1 right edge and Card 2 left edge at y=60 (sky/mountains)
for ($x = 470; $x -lt 505; $x++) {
    $c = $bmp.GetPixel($x, 60)
    Write-Host "x=$x RGB: $($c.R),$($c.G),$($c.B)"
}

$bmp.Dispose()
$img.Dispose()

