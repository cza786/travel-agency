# Download clean, high-resolution photos without any text for all cards

$images = @(
    @{
        name = "service-airport.jpg"
        url = "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1000&q=85"
    },
    @{
        name = "service-excursions.jpg"
        url = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85"
    },
    @{
        name = "service-bikes.jpg"
        url = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=85"
    },
    @{
        name = "service-taxi.jpg"
        url = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85"
    },
    @{
        name = "service-rental.jpg"
        url = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=85"
    }
)

foreach ($item in $images) {
    $outPath = "public/images/" + $item.name
    Write-Host "Downloading $($item.name)..."
    & curl.exe -s -L -A "Mozilla/5.0" -o $outPath $item.url
    $size = (Get-Item $outPath).Length
    Write-Host "Downloaded $($item.name) - Size: $size bytes"
}

