# Test fetching high-resolution luxury vehicle photos
$urls = @(
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=90",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90"
)

$i = 1
foreach ($u in $urls) {
    $out = "public/images/test-van-$i.jpg"
    & curl.exe -s -L -A "Mozilla/5.0" -o $out $u
    $len = (Get-Item $out).Length
    Write-Host "Downloaded test-van-$i.jpg ($len bytes)"
    $i++
}

