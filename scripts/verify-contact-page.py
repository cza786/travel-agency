import urllib.request

url = "http://localhost:3000/de/contact"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
        print("Live response length:", len(html))

        checks = [
            "Kontakt",
            "Wir sind für Sie da.",
            "Kontaktinformationen",
            "+43 6542 122456",
            "info@firstclassdrive.at",
            "Zell am See, Österreich",
            "Öffnungszeiten",
            "24/7 – Rund um die Uhr",
            "Fahrt anfragen",
            "Fahrtdaten",
            "Ihre Angaben",
            "Anfrage senden",
            "Abholadresse *",
            "Zieladresse *",
            "Schnellzugriff",
            "Datenschutz",
            "Impressum"
        ]

        all_ok = True
        for c in checks:
            found = c in html
            status = "MATCH OK" if found else "NOT FOUND"
            if not found:
                all_ok = False
            print(f"[{status}] {c}")

        print("\nOVERALL STATUS:", "100% VERIFIED!" if all_ok else "SOME ITEMS MISSING")
except Exception as e:
    print("Fetch error:", e)

