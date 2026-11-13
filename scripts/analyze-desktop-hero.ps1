Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public/images/desktop-hero-ref.jpg")
$w = $img.Width
$h = $img.Height
Write-Host "Dimensions: $w x $h"

# In this 731 x 206 image:
# 1. Header is roughly y: 0 to 35
# Let's check where the header elements are
# Logo: x ~ 30 to 120, y ~ 10 to 30
# Startseite button: x ~ 200 to 250, y ~ 8 to 28
# Language dropdown: x ~ 530 to 580
# Buchungsanfrage button: x ~ 590 to 680

# 2. Hero content:
# Pin Zell am See: x ~ 30, y ~ 55
# Your Journey: x ~ 30, y ~ 75
# Our Excellence: x ~ 30, y ~ 100
# Premium Fahrservice...: x ~ 30, y ~ 125
# 3 Features: x ~ 30 to 280, y ~ 170 to 195

# 3. Mercedes Van:
# Van front grill/wheel: x ~ 320 to 550, y ~ 65 to 175
# Mountain with snow behind: x ~ 350 to 550, y ~ 30 to 80
# Lake & shore lights: x ~ 250 to 731, y ~ 70 to 150
# Town Zell am See lit up on right: x ~ 540 to 731, y ~ 50 to 140

# 4. "Preise & Tarife" floating box:
# Located at bottom-right: x ~ 480 to 700, y ~ 160 to 205
Write-Host "Analysis completed."
$img.Dispose()

