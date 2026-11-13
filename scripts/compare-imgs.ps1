Add-Type -AssemblyName System.Drawing

# Let's inspect ref-card1-airport.png vs clean-airport.jpg
$ref = [System.Drawing.Bitmap]::FromFile("scripts/ref-card1-airport.png")
$clean = [System.Drawing.Bitmap]::FromFile("public/images/clean-airport.jpg")

Write-Host "ref-card1-airport: $($ref.Width) x $($ref.Height)"
Write-Host "clean-airport: $($clean.Width) x $($clean.Height)"

$ref.Dispose()
$clean.Dispose()

