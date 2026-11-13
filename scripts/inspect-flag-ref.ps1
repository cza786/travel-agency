Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\SHAMA\.gemini\antigravity\brain\6c7d3c32-5960-4971-96d9-4552416d1948\.user_uploaded\media_1794554919862_620d9a01.png")
Write-Host "Width: $($img.Width) Height: $($img.Height)"
$img.Dispose()

