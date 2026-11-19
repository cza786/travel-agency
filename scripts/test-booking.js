const { bookingFormSchema } = require("../lib/bookingSchema");

async function testValidation() {
  console.log("=== TESTING BOOKING VALIDATION & SCHEMA ===\n");

  // Valid payload
  const validData = {
    fullName: "Dr. Maximilian Huber",
    email: "m.huber@vip-travel.at",
    phone: "+43 664 9876543",
    pickup: "Flughafen Salzburg (SZG)",
    dropoff: "Grand Hotel Zell am See",
    date: "2026-12-24",
    time: "14:30",
    flightNumber: "OS 1234",
    passengers: 4,
    luggage: 4,
    vehicle: "Mercedes-Benz V-Klasse / Vito",
    notes: "2x Skiausrüstung, Kindersitz für 4-Jährigen",
    locale: "de",
  };

  const validResult = bookingFormSchema.safeParse(validData);
  console.log("Valid payload test:", validResult.success ? "PASS (Valid)" : "FAIL");

  // Invalid payload (missing email, invalid phone)
  const invalidData = {
    fullName: "A",
    email: "not-an-email",
    pickup: "",
    dropoff: "",
  };

  const invalidResult = bookingFormSchema.safeParse(invalidData);
  console.log("Invalid payload caught properly:", !invalidResult.success ? "PASS (Caught errors)" : "FAIL");
  if (!invalidResult.success) {
    console.log("Caught errors count:", invalidResult.error.issues.length);
  }

  console.log("\n=== BOOKING VALIDATION TEST COMPLETE ===");
}

testValidation().catch(console.error);

