Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile("public/images/hero-van.jpg")
Write-Host "hero-van.jpg dimensions: $($img.Width) x $($img.Height)"
$img.Dispose()

