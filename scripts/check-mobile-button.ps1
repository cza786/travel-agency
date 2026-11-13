Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("D:\Travel-agency\public\images\source\media_1794505589145_8fb8bb06.jpg")

Write-Host "Mobile screenshot size: $($bmp.Width) x $($bmp.Height)"
# In clean-source-cards.ps1:
# Card 5 was at y = 0.787 to 0.867 (y = 805 to 887)
# Let's inspect below y = 887
for ($y = 890; $y -lt $bmp.Height; $y += 10) {
    $c = $bmp.GetPixel(256, $y)
    Write-Host "y=$y RGB: $($c.R),$($c.G),$($c.B)"
}
$bmp.Dispose()

