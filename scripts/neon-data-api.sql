DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN;
  END IF;
END $$;

CREATE OR REPLACE VIEW public.user_search AS
SELECT id, email, full_name, avatar_url
FROM public.profiles
WHERE email IS NOT NULL;

CREATE OR REPLACE VIEW public.stripe_user_subscriptions AS
SELECT
  c.user_id,
  s.customer_id,
  s.subscription_id,
  s.status AS subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM public.stripe_customers c
LEFT JOIN public.stripe_subscriptions s
  ON c.customer_id = s.customer_id
WHERE c.deleted_at IS NULL
  AND s.deleted_at IS NULL;

CREATE OR REPLACE VIEW public.stripe_user_orders AS
SELECT
  c.user_id,
  o.id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.customer_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status,
  o.created_at
FROM public.stripe_customers c
JOIN public.stripe_orders o
  ON c.customer_id = o.customer_id
WHERE c.deleted_at IS NULL
  AND o.deleted_at IS NULL;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON public.user_search TO authenticated;
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;
GRANT SELECT ON public.stripe_user_orders TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT USAGE, SELECT ON SEQUENCES TO authenticated;
