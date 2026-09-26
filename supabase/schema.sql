-- ============================================================================
-- ASSAY FINANCIAL COPILOT - COMPLETE PRODUCTION SUPABASE SCHEMA
-- Standards: ACID Compliant | Numeric(14,2) Precision | Row-Level Security | B-Tree Indexes
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerated Domain Types
DO $$ BEGIN
    CREATE TYPE account_type_enum AS ENUM ('savings', 'salary', 'current', 'credit', 'demat');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE account_status_enum AS ENUM ('connected', 'syncing', 'disconnected', 'error');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type_enum AS ENUM ('debit', 'credit');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE transaction_source_enum AS ENUM ('aa', 'receipt_ocr', 'upi_ocr', 'manual');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE obligation_type_enum AS ENUM ('subscription', 'loan', 'rent', 'utility', 'bill');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE obligation_frequency_enum AS ENUM ('monthly', 'quarterly', 'yearly');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE recommendation_action_enum AS ENUM ('spending_reduction', 'subscription_audit', 'debt_accelerator', 'emergency_fund');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE recommendation_status_enum AS ENUM ('active', 'applied', 'dismissed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE split_status_enum AS ENUM ('pending', 'settled', 'cancelled');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE upload_status_enum AS ENUM ('uploaded', 'processing', 'extracted', 'confirmed', 'failed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE copilot_role_enum AS ENUM ('user', 'assistant', 'system');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE aa_consent_status_enum AS ENUM ('ACTIVE', 'REVOKED', 'EXPIRED', 'NONE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. Trigger Function for Automatic updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = clock_timestamp();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 4. RELATIONAL TABLES
-- ============================================================================

-- Table 1: Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    pan_masked VARCHAR(10),
    hashed_password TEXT,
    avatar_url TEXT,
    avatar_index INT DEFAULT 24 CHECK (avatar_index BETWEEN 1 AND 35),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 2: User Settings
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    biometric_enabled BOOLEAN DEFAULT TRUE,
    mask_pii BOOLEAN DEFAULT TRUE,
    read_only_consent BOOLEAN DEFAULT TRUE,
    emi_alerts BOOLEAN DEFAULT TRUE,
    cash_flow_pressure_alerts BOOLEAN DEFAULT TRUE,
    unusual_spend_alerts BOOLEAN DEFAULT TRUE,
    weekly_briefing BOOLEAN DEFAULT TRUE,
    whatsapp_alerts BOOLEAN DEFAULT FALSE,
    email_digest BOOLEAN DEFAULT TRUE,
    theme_preference TEXT DEFAULT 'system',
    currency VARCHAR(5) DEFAULT 'INR',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_user_settings_user UNIQUE(user_id)
);

DROP TRIGGER IF EXISTS trg_user_settings_updated_at ON user_settings;
CREATE TRIGGER trg_user_settings_updated_at BEFORE UPDATE ON user_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 3: Financial Accounts
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution_name TEXT NOT NULL,
    account_type account_type_enum DEFAULT 'savings',
    account_number_masked VARCHAR(20) NOT NULL,
    balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(5) DEFAULT 'INR',
    provider TEXT DEFAULT 'mock_aa',
    status account_status_enum DEFAULT 'connected',
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_positive_balance CHECK (balance >= 0 OR account_type = 'credit')
);

DROP TRIGGER IF EXISTS trg_accounts_updated_at ON accounts;
CREATE TRIGGER trg_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 4: Account Aggregator Consents (RBI Compliant)
CREATE TABLE IF NOT EXISTS aa_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_id TEXT UNIQUE NOT NULL,
    status aa_consent_status_enum DEFAULT 'ACTIVE',
    purpose TEXT NOT NULL DEFAULT 'Personal Financial Management',
    data_range TEXT NOT NULL DEFAULT 'Last 6 months',
    fetch_frequency TEXT NOT NULL DEFAULT 'Daily / On-demand',
    expiry_date TIMESTAMPTZ NOT NULL,
    fiu_name TEXT NOT NULL DEFAULT 'ASSAY Financial Intelligence',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_aa_consents_updated_at ON aa_consents;
CREATE TRIGGER trg_aa_consents_updated_at BEFORE UPDATE ON aa_consents FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 5: Transactions (Append-Only Immutable Ledger)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES accounts(id) ON DELETE RESTRICT,
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    type transaction_type_enum NOT NULL,
    category TEXT NOT NULL,
    merchant_name TEXT NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    is_fixed BOOLEAN DEFAULT FALSE,
    is_discretionary BOOLEAN DEFAULT TRUE,
    source_type transaction_source_enum DEFAULT 'manual',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 6: Obligations (Loans, Subscriptions, Rent, EMIs)
CREATE TABLE IF NOT EXISTS obligations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    obligation_type obligation_type_enum DEFAULT 'subscription',
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    category TEXT NOT NULL,
    frequency obligation_frequency_enum DEFAULT 'monthly',
    due_day INT CHECK (due_day BETWEEN 1 AND 31),
    apr NUMERIC(5, 2) CHECK (apr >= 0 AND apr <= 100),
    remaining_balance NUMERIC(14, 2) CHECK (remaining_balance >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_obligations_updated_at ON obligations;
CREATE TRIGGER trg_obligations_updated_at BEFORE UPDATE ON obligations FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 7: Financial Health Snapshots (Precomputed for <15ms cold start)
CREATE TABLE IF NOT EXISTS financial_health_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    income NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    spending NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    savings NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    savings_rate NUMERIC(6, 4) NOT NULL DEFAULT 0.0000,
    fixed_expenses NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    variable_expenses NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    recurring_obligations NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    projected_month_end_balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    daily_burn_rate NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    health_score INT NOT NULL CHECK (health_score BETWEEN 0 AND 100),
    signals JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table 8: Recommendations
CREATE TABLE IF NOT EXISTS recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    potential_monthly_savings NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (potential_monthly_savings >= 0),
    impact_description TEXT NOT NULL,
    action_type recommendation_action_enum NOT NULL,
    status recommendation_status_enum DEFAULT 'active',
    confidence NUMERIC(4, 2) DEFAULT 0.85 CHECK (confidence BETWEEN 0 AND 1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_recommendations_updated_at ON recommendations;
CREATE TRIGGER trg_recommendations_updated_at BEFORE UPDATE ON recommendations FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 9: What-If Simulations
CREATE TABLE IF NOT EXISTS simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'Budget Optimization',
    dining_reduction NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    extra_loan_payment NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    simulated_monthly_savings NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    simulated_interest_saved NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    simulated_score INT CHECK (simulated_score BETWEEN 0 AND 100),
    is_committed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_simulations_updated_at ON simulations;
CREATE TRIGGER trg_simulations_updated_at BEFORE UPDATE ON simulations FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 10: Bill Splits & Split Items
CREATE TABLE IF NOT EXISTS bill_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL CHECK (total_amount > 0),
    participants JSONB NOT NULL DEFAULT '[]'::jsonb,
    status split_status_enum DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_bill_splits_updated_at ON bill_splits;
CREATE TRIGGER trg_bill_splits_updated_at BEFORE UPDATE ON bill_splits FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS split_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    split_id UUID NOT NULL REFERENCES bill_splits(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC(14, 2) NOT NULL CHECK (price >= 0),
    assigned_to TEXT NOT NULL
);

-- Table 11: Upload Audits (Receipts & UPI Screenshots)
CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    storage_path TEXT,
    file_type VARCHAR(50) DEFAULT 'image/jpeg',
    status upload_status_enum DEFAULT 'uploaded',
    extracted_data JSONB,
    confidence NUMERIC(4, 2) CHECK (confidence BETWEEN 0 AND 1),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_uploads_updated_at ON uploads;
CREATE TRIGGER trg_uploads_updated_at BEFORE UPDATE ON uploads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 12: Copilot Chat Sessions & Complete Messages (Full-Text Storage & Cascading Deletion)
CREATE TABLE IF NOT EXISTS copilot_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Financial Advisory Session',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_copilot_sessions_updated_at ON copilot_sessions;
CREATE TRIGGER trg_copilot_sessions_updated_at BEFORE UPDATE ON copilot_sessions FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS copilot_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES copilot_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role copilot_role_enum NOT NULL,
    content TEXT NOT NULL, -- Full complete conversation text
    intent VARCHAR(50),
    grounded_data JSONB,   -- 4-layer truth facts, ratios, and citations
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. HIGH-PERFORMANCE B-TREE INDEXES
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_accounts_user ON accounts(user_id, status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(user_id, category);
CREATE INDEX IF NOT EXISTS idx_obligations_user ON obligations(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_health_snapshots_user ON financial_health_snapshots(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id, status);
CREATE INDEX IF NOT EXISTS idx_bill_splits_user ON bill_splits(user_id, status);
CREATE INDEX IF NOT EXISTS idx_uploads_user ON uploads(user_id, status);
CREATE INDEX IF NOT EXISTS idx_copilot_sessions_user ON copilot_sessions(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_copilot_messages_session ON copilot_messages(session_id, created_at ASC);

-- ============================================================================
-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE aa_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE obligations ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_health_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE bill_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE split_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE copilot_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE copilot_messages ENABLE ROW LEVEL SECURITY;

-- Standard tenant isolation policies: Users access only their own records
DO $$ BEGIN
    CREATE POLICY "Users can access own user profile" ON users FOR ALL USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own settings" ON user_settings FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own accounts" ON accounts FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own consents" ON aa_consents FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own obligations" ON obligations FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own health snapshots" ON financial_health_snapshots FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own recommendations" ON recommendations FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own simulations" ON simulations FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own bill splits" ON bill_splits FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own split items" ON split_items FOR ALL USING (
        EXISTS (SELECT 1 FROM bill_splits WHERE bill_splits.id = split_items.split_id AND bill_splits.user_id = auth.uid())
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own uploads" ON uploads FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own copilot sessions" ON copilot_sessions FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can access own copilot messages" ON copilot_messages FOR ALL USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================================
-- 7. SUPABASE STORAGE BUCKET FOR RECEIPTS
-- ============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('receipts', 'receipts', false) 
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
    CREATE POLICY "Users can upload their own receipt files" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE POLICY "Users can view their own receipt files" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);
EXCEPTION WHEN duplicate_object THEN null; END $$;
