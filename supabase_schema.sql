-- ==========================================
-- SUPERBASE SCHEMA FOR LNB BAKERY
-- Run this in the SQL Editor of your Supabase project
-- ==========================================

-- 1. CUSTOMERS TABLE
create table public.customers (
  id uuid references auth.users not null primary key,
  email text unique not null,
  full_name text,
  phone text,
  loyalty_points integer default 0,
  loyalty_tier text default 'nuevo', -- nuevo, bronze, silver, gold
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. ORDERS TABLE
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id),
  guest_info jsonb, -- Stores name/email/phone for guest checkout
  status text default 'pending', -- pending, paid, preparing, ready, completed, cancelled
  payment_status text default 'pending', -- pending, approved, rejected
  payment_provider text default 'mercadopago',
  payment_id text, -- External payment ID (MP Preference or Payment ID)
  subtotal decimal(10,2) not null,
  total decimal(10,2) not null,
  discount_amount decimal(10,2) default 0,
  delivery_method text default 'pickup', -- pickup, delivery
  delivery_address text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDER ITEMS TABLE
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text not null,
  product_name text not null,
  quantity integer not null,
  price decimal(10,2) not null,
  options jsonb -- To store customization (cake studio, toppings)
);

-- 4. PROMOTIONS TABLE
create table public.promotions (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  type text not null, -- percentage, fixed
  value decimal(10,2) not null,
  min_purchase decimal(10,2) default 0,
  active boolean default true,
  max_uses integer,
  used_count integer default 0,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. LOYALTY TRANSACTIONS TABLE
create table public.loyalty_transactions (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references public.customers(id) not null,
  order_id uuid references public.orders(id),
  points integer not null, -- Positive for earning, negative for spending
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Customers can view/edit their own profile
create policy "Users can view own profile" on public.customers
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.customers
  for update using (auth.uid() = id);

-- Customers can view their own orders
create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = customer_id);

-- Admins (service_role) have full access implicitly
-- If you have an 'admin' role in auth.users, add specific policies here.

-- ==========================================
-- REALTIME SUBSCRIPTION
-- ==========================================

-- Enable realtime for orders (for Admin Panel live updates)
alter publication supabase_realtime add table public.orders;
