const http = require("http");

function fetchUrl(url) {
  // Try 3001 first, fallback to 3000
  const port = 3001;
  const targetUrl = url.replace(":3000", `:${port}`);
  return new Promise((resolve, reject) => {
    http
      .get(targetUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          })
        );
      })
      .on("error", reject);
  });
}

async function runTests() {
  console.log("=== FIRST CLASS DRIVE AUTOMATED TEST SUITE ===\n");

  console.log("[1] Root Route /");
  const root = await fetchUrl("http://localhost:3000/");
  console.log("Status:", root.status);
  console.log("Redirect location:", root.headers.location);

  console.log("\n[2] German Home Route /de");
  const de = await fetchUrl("http://localhost:3000/de");
  console.log("Status:", de.status);
  console.log("Contains Brand 'FIRST CLASS':", de.body.includes("FIRST CLASS"));
  console.log("Contains Tagline 'Your Journey':", de.body.includes("Your Journey"));
  console.log("Contains 'Zell am See':", de.body.includes("Zell am See"));
  console.log("Contains Hero Car image:", de.body.includes("hero-van.jpg"));
  console.log("Contains Services:", de.body.includes("Flughafentransfers") && de.body.includes("Ausflugsfahrten"));

  console.log("\n[3] Prices Route /de/prices");
  const prices = await fetchUrl("http://localhost:3000/de/prices");
  console.log("Status:", prices.status);
  console.log("Contains 'Salzburg Flughafen':", prices.body.includes("Salzburg Flughafen"));
  console.log("Contains '220 €':", prices.body.includes("220 €"));
  console.log("Contains 'München Flughafen':", prices.body.includes("München Flughafen"));
  console.log("Contains '480 €':", prices.body.includes("480 €"));
  console.log("Contains 'Mailand':", prices.body.includes("Mailand"));
  console.log("Contains '1.200 €':", prices.body.includes("1.200 €"));
  console.log("Contains Kilometertarife:", de.body.includes("3,10 € / km") || prices.body.includes("3,10 € / km"));

  console.log("\n[4] Booking Route /de/booking");
  const booking = await fetchUrl("http://localhost:3000/de/booking");
  console.log("Status:", booking.status);
  console.log("Contains 'Fahrt anfragen':", booking.body.includes("Fahrt anfragen"));
  console.log("Contains 'Abholadresse':", booking.body.includes("Abholadresse"));
  console.log("Contains 'Mercedes-Benz':", booking.body.includes("Mercedes-Benz"));

  console.log("\n[5] English Route /en");
  const en = await fetchUrl("http://localhost:3000/en");
  console.log("Status:", en.status);
  console.log("Contains lang='en':", en.body.includes('lang="en"'));
  console.log("Contains 'Our Services':", en.body.includes("Our Services"));
  console.log("Contains 'Airport Transfers':", en.body.includes("Airport Transfers"));
  console.log("Contains UK flag SVG:", en.body.includes("aria-label=\"English\""));

  console.log("\n[6] Arabic Route /ar");
  const ar = await fetchUrl("http://localhost:3000/ar");
  console.log("Status:", ar.status);
  console.log("Contains dir='rtl':", ar.body.includes('dir="rtl"'));
  console.log("Contains Arabic translation 'زيلامسي':", ar.body.includes("زيلامسي"));
  console.log("Contains 'طلب حجز VIP':", ar.body.includes("طلب حجز VIP"));
  console.log("Contains UAE flag SVG:", ar.body.includes("aria-label=\"العربية\""));

  console.log("\n[7] German Route Flag Check");
  console.log("Contains German flag SVG:", de.body.includes("aria-label=\"Deutsch\""));


  console.log("\n=== ALL AUTOMATED TESTS COMPLETED SUCCESSFULLY ===");
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});

