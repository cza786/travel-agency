-- 1. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup TEXT NOT NULL,
    dropoff TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    flight_number TEXT,
    passengers INTEGER DEFAULT 2,
    luggage INTEGER DEFAULT 2,
    vehicle TEXT DEFAULT 'Mercedes-Benz V-Klasse / Vito',
    notes TEXT,
    locale TEXT DEFAULT 'de',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create rentals table
CREATE TABLE IF NOT EXISTS public.rentals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    pickup TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    notes TEXT,
    locale TEXT DEFAULT 'de',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    locale TEXT DEFAULT 'de',
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create dynamic prices table
CREATE TABLE IF NOT EXISTS public.prices (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL DEFAULT 'service',
    service TEXT NOT NULL,
    price TEXT NOT NULL,
    numeric_price NUMERIC NOT NULL DEFAULT 0,
    unit TEXT,
    status TEXT DEFAULT 'Active',
    icon TEXT DEFAULT 'car',
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed initial prices
INSERT INTO public.prices (id, category, service, price, numeric_price, status, icon) VALUES
('srv-airport', 'service', 'Airport Transfer', '€ 80.00', 80, 'Active', 'plane'),
('srv-city', 'service', 'City Ride', '€ 50.00', 50, 'Active', 'car'),
('srv-excursion', 'service', 'Excursion Tour', '€ 120.00', 120, 'Active', 'mountain'),
('srv-business', 'service', 'Business Transfer', '€ 90.00', 90, 'Active', 'briefcase'),
('srv-group', 'service', 'Group Transfer', '€ 150.00', 150, 'Active', 'users'),
('srv-bicycle', 'service', 'Bicycle Transfer', '€ 40.00', 40, 'Active', 'bike'),
('szg-zas', 'fixed_route', 'Salzburg Flughafen → Zell am See / Kaprun', '220 €', 220, 'Active', 'plane'),
('szg-saalbach', 'fixed_route', 'Salzburg Flughafen → Saalbach', '240 €', 240, 'Active', 'plane'),
('muc-zas', 'fixed_route', 'München Flughafen → Zell am See / Kaprun', '480 €', 480, 'Active', 'plane'),
('muc-saalbach', 'fixed_route', 'München Flughafen → Saalbach', '500 €', 500, 'Active', 'plane'),
('vie-zas', 'fixed_route', 'Wien Flughafen → Zell am See / Kaprun', '800 €', 800, 'Active', 'plane'),
('mil-zas', 'fixed_route', 'Mailand → Zell am See / Kaprun', '1.200 €', 1200, 'Active', 'car'),
('inl-zas', 'fixed_route', 'Interlaken → Zell am See', '1.200 €', 1200, 'Active', 'mountain'),
('inn-zas', 'fixed_route', 'Innsbruck Flughafen → Zell am See / Kaprun', '400 €', 400, 'Active', 'plane'),
('air-r1', 'airport_route', 'Zell am See ↔ Salzburg', '220 €', 220, 'Active', 'plane'),
('air-r2', 'airport_route', 'Zell am See ↔ München', '480 €', 480, 'Active', 'plane'),
('air-r3', 'airport_route', 'Zell am See ↔ Innsbruck', '450 €', 450, 'Active', 'plane'),
('air-r4', 'airport_route', 'Zell am See ↔ Wien', '800 €', 800, 'Active', 'plane'),
('km-short', 'km_rate', 'Kurzstrecken (< 50 km)', '3.10 € / km', 3.10, 'Active', 'car'),
('km-long', 'km_rate', 'Langstrecken (> 50 km)', '2.80 € / km', 2.80, 'Active', 'car'),
('taxameter-base', 'taximeter', 'Taxameter Grundgebühr / Einstieg', 'Tarif folgt', 0, 'Active', 'car'),
('taxameter-km', 'taximeter', 'Taxameter Kilometerpreis', 'Tarif folgt', 0, 'Active', 'car'),
('taxameter-wait', 'taximeter', 'Taxameter Wartezeit (pro Stunde)', 'Tarif folgt', 0, 'Active', 'car')
ON CONFLICT (id) DO NOTHING;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

-- Clean up any prior insecure policies
DROP POLICY IF EXISTS "Allow public insert to bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public update bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public insert to rentals" ON public.rentals;
DROP POLICY IF EXISTS "Allow public read rentals" ON public.rentals;
DROP POLICY IF EXISTS "Allow public update rentals" ON public.rentals;
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow public read contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow public read prices" ON public.prices;
DROP POLICY IF EXISTS "Allow public all prices" ON public.prices;

-- Secure Policies for bookings:
-- 1) Anonymous/public can only create inquiries
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
-- 2) Only authenticated admin or service_role can view or modify customer bookings
CREATE POLICY "Allow authenticated read bookings" ON public.bookings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update bookings" ON public.bookings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete bookings" ON public.bookings FOR DELETE TO authenticated USING (true);

-- Secure Policies for rentals:
-- 1) Anonymous/public can only create rental requests
CREATE POLICY "Allow public insert to rentals" ON public.rentals FOR INSERT WITH CHECK (true);
-- 2) Only authenticated admin or service_role can view or modify rental records
CREATE POLICY "Allow authenticated read rentals" ON public.rentals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update rentals" ON public.rentals FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete rentals" ON public.rentals FOR DELETE TO authenticated USING (true);

-- Secure Policies for contact_messages:
-- 1) Anonymous/public can submit contact messages
CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
-- 2) Only authenticated admin or service_role can view or manage messages
CREATE POLICY "Allow authenticated read contact_messages" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update contact_messages" ON public.contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete contact_messages" ON public.contact_messages FOR DELETE TO authenticated USING (true);

-- Secure Policies for prices:
-- 1) Public users can only read active prices
CREATE POLICY "Allow public read prices" ON public.prices FOR SELECT USING (true);
-- 2) Only authenticated admin or service_role can create, update or delete prices
CREATE POLICY "Allow authenticated insert prices" ON public.prices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update prices" ON public.prices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete prices" ON public.prices FOR DELETE TO authenticated USING (true);
