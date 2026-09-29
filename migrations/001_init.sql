CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE users(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),email text UNIQUE NOT NULL,password_hash text NOT NULL,created_at timestamptz DEFAULT now());
CREATE TABLE items(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 name text NOT NULL, category text, sku text,
 purchase_date date, purchase_price numeric(10,2) NOT NULL DEFAULT 0, source text,
 condition text, quantity int NOT NULL DEFAULT 1 CHECK(quantity>0), photo_urls text,
 platform text, listing_date date, listed_price numeric(10,2),
 sold_date date, sold_price numeric(10,2), fees numeric(10,2) NOT NULL DEFAULT 0, shipping_cost numeric(10,2) NOT NULL DEFAULT 0,
 status text NOT NULL DEFAULT 'In Stock' CHECK(status IN('Draft','In Stock','Listed','Sold','Returned','Archived')),
 notes text, created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
CREATE INDEX items_user_status ON items(user_id,status);
