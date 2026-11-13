Add-Type -AssemblyName System.Drawing

$cleanImg = [System.Drawing.Bitmap]::FromFile("public/images/clean-hero-van.jpg")
Write-Host "clean-hero-van.jpg size: $($cleanImg.Width) x $($cleanImg.Height)"
$cleanImg.Dispose()

$refImg = [System.Drawing.Bitmap]::FromFile("public/images/desktop-hero-ref.jpg")
Write-Host "desktop-hero-ref.jpg size: $($refImg.Width) x $($refImg.Height)"
$refImg.Dispose()

