Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile("D:\Travel-agency\scripts\current-desktop.png")
$rect = New-Object System.Drawing.Rectangle(0, 350, 1280, 800)
$bmp = New-Object System.Drawing.Bitmap(1280, 800)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("D:\Travel-agency\scripts\cropped-current-services.png", [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Host "Cropped successfully"
