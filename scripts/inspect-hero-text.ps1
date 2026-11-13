Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public/images/hero-van.jpg")
Write-Host "hero-van dimensions: $($img.Width) x $($img.Height)"

# In hero-van.jpg (461 x 276):
# The text "Your Journey. Our Excellence." and "Premium Fahrservice..."
# is located in the upper-left quadrant:
# x: 10 to 240, y: 10 to 95.
# Behind the text was the snow-capped mountain ridge and dark mountain slope!
# To the right (x: 240 to 460, y: 0 to 120) is the pristine mountain ridge with snow and twilight sky!
# Below y: 100 is the lake, the illuminated shore town lights, and the black Mercedes V-Class!

Write-Host "Analyzing top-left pixels vs top-right pixels..."
$sampleTL = $img.GetPixel(30, 30)
$sampleTR = $img.GetPixel(350, 30)
Write-Host "Top-left (in text area): R=$($sampleTL.R), G=$($sampleTL.G), B=$($sampleTL.B)"
Write-Host "Top-right (clean mountain): R=$($sampleTR.R), G=$($sampleTR.G), B=$($sampleTR.B)"

$img.Dispose()

