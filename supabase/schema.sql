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
    vehicle TEXT DEFAULT 'Mercedes-Benz V-Klasse VIP',
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
('inn-zas', 'fixed_route', 'Innsbruck Flughafen → Zell am See / Kaprun', '320 €', 320, 'Active', 'plane'),
('air-r1', 'airport_route', 'Salzburg → München', '220 €', 220, 'Active', 'plane'),
('air-r2', 'airport_route', 'Salzburg → Wien', '240 €', 240, 'Active', 'plane'),
('air-r3', 'airport_route', 'Salzburg → Innsbruck', '280 €', 280, 'Active', 'plane'),
('air-r4', 'airport_route', 'München → Salzburg', '220 €', 220, 'Active', 'plane'),
('km-short', 'km_rate', 'Kurzstrecken (< 50 km)', '3.10 € / km', 3.10, 'Active', 'car'),
('km-long', 'km_rate', 'Langstrecken (> 50 km)', '2.80 € / km', 2.80, 'Active', 'car')
ON CONFLICT (id) DO NOTHING;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

-- Allow public form submission (INSERT)
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update bookings" ON public.bookings FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to rentals" ON public.rentals FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read rentals" ON public.rentals FOR SELECT USING (true);
CREATE POLICY "Allow public update rentals" ON public.rentals FOR UPDATE USING (true);

CREATE POLICY "Allow public insert to contact_messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read contact_messages" ON public.contact_messages FOR SELECT USING (true);

-- Allow public read & management for prices
CREATE POLICY "Allow public read prices" ON public.prices FOR SELECT USING (true);
CREATE POLICY "Allow public all prices" ON public.prices FOR ALL USING (true);
