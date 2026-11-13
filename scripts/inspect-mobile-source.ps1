Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("D:\Travel-agency\public\images\source\media_1794505589145_8fb8bb06.jpg")
Write-Host "Mobile Source: $($img.Width) x $($img.Height)"
$img.Dispose()

