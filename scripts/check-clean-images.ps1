Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile("public/images/clean-airport.jpg")
Write-Host "clean-airport.jpg size: $($img1.Width) x $($img1.Height)"
$img1.Dispose()

$img2 = [System.Drawing.Image]::FromFile("public/images/clean-rental.jpg")
Write-Host "clean-rental.jpg size: $($img2.Width) x $($img2.Height)"
$img2.Dispose()

