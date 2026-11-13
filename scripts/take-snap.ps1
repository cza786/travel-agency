$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
& $chrome --headless --disable-gpu --window-size=1200,800 --screenshot="D:\Travel-agency\scripts\snap-navbar.png" http://localhost:3001/de
$exists = Test-Path "D:\Travel-agency\scripts\snap-navbar.png"
Write-Host "Snapshot created: $exists"

