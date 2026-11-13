Add-Type -AssemblyName System.Drawing

function Check-File($f) {
    $img = [System.Drawing.Image]::FromFile($f)
    Write-Host "$f : $($img.Width) x $($img.Height)"
    $img.Dispose()
}

Check-File "public/images/clean-airport.jpg"
Check-File "public/images/clean-excursions.jpg"
Check-File "public/images/clean-bikes.jpg"
Check-File "public/images/clean-taxi.jpg"
Check-File "public/images/clean-rental.jpg"

