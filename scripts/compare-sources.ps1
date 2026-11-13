Add-Type -AssemblyName System.Drawing

$img1 = [System.Drawing.Image]::FromFile("public/images/source/media_1794505589145_8fb8bb06.jpg")
$img2 = [System.Drawing.Image]::FromFile("public/images/source/media_1794505597708_4642cdca.jpg")
$img3 = [System.Drawing.Image]::FromFile("public/images/source/media_1794505607408_b1468ee0.jpg")

Write-Host "Img1: $($img1.Width) x $($img1.Height)"
Write-Host "Img2: $($img2.Width) x $($img2.Height)"
Write-Host "Img3: $($img3.Width) x $($img3.Height)"

[void]$img1.Dispose()
[void]$img2.Dispose()
[void]$img3.Dispose()

