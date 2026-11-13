$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) {
    $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
    Write-Host "Port 3000 Process: $($proc.Id) $($proc.ProcessName)"
} else {
    Write-Host "Port 3000 not listening"
}

