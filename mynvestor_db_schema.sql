-- Create the database
CREATE DATABASE mynvestor_db;

-- Connect to the database
\c mynvestor_db

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for user roles
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Insert predefined roles
INSERT INTO roles (role_name, description) VALUES
    ('ADMIN', 'System administrator with full access'),
    ('BROKER', 'Broker facilitating trades and providing support'),
    ('INVESTOR', 'User trading on the Malawi Stock Exchange');

-- Table for users (shared for Admin, Brokers, Investors)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(30) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(role_id),
    first_name VARCHAR(100), -- Null for brokers
    last_name VARCHAR(100), -- Null for brokers
    date_of_birth DATE, -- Null for brokers
    phone_number VARCHAR(20), -- Firm phone number for brokers
    address TEXT, -- Headquarters address for brokers
    profile_picture_path TEXT, -- From broker.html (edit profile)
    receive_email_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    kyc_completed BOOLEAN DEFAULT FALSE
);

-- Table for investor KYC (Know Your Customer) details
CREATE TABLE investor_kyc (
    kyc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    full_legal_name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100),
    id_document_type VARCHAR(50) NOT NULL, -- e.g., ID Card, Passport
    id_number VARCHAR(50) NOT NULL,
    issuing_country VARCHAR(100),
    id_expiration_date DATE,
    id_document_path TEXT,
    utility_bill_path TEXT,
    bank_statement_path TEXT,
    annual_income DECIMAL(15, 2),
    source_of_funds VARCHAR(50),
    trading_experience_years INTEGER,
    investment_knowledge VARCHAR(20),
    employment_status VARCHAR(50),
    occupation VARCHAR(100),
    employer_name VARCHAR(255),
    industry VARCHAR(100),
    investment_goals VARCHAR(50),
    risk_tolerance VARCHAR(20),
    tax_identification_number VARCHAR(50),
    is_pep BOOLEAN DEFAULT FALSE,
    is_subject_to_sanctions BOOLEAN DEFAULT FALSE,
    referral_source TEXT,
    terms_accepted BOOLEAN DEFAULT FALSE,
    csd_number VARCHAR(50), -- Central Securities Depository number
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(user_id), -- Broker who verified KYC
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for broker KYC (Know Your Customer) details
CREATE TABLE broker_kyc (
    kyc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    legal_firm_name VARCHAR(255) NOT NULL,
    business_registration_number VARCHAR(50) NOT NULL,
    date_of_establishment DATE NOT NULL,
    headquarters_address TEXT NOT NULL,
    firm_email VARCHAR(255) NOT NULL,
    firm_phone_number VARCHAR(20) NOT NULL,
    license_type VARCHAR(50) NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    regulatory_authority VARCHAR(255) NOT NULL,
    compliance_officer_name VARCHAR(255) NOT NULL,
    license_document_path TEXT,
    annual_revenue DECIMAL(15, 2),
    source_of_funds VARCHAR(50),
    financial_statement_path TEXT,
    beneficial_owners TEXT,
    directors TEXT,
    ownership_structure_document_path TEXT,
    tax_identification_number VARCHAR(50),
    aml_policy_document_path TEXT,
    is_subject_to_sanctions BOOLEAN DEFAULT FALSE,
    certificate_of_incorporation_path TEXT,
    referral_source TEXT,
    terms_accepted BOOLEAN DEFAULT FALSE,
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT firm_age CHECK (date_of_establishment <= CURRENT_DATE - INTERVAL '1 year')
);

-- Table for clients (broker-client relationships)
CREATE TABLE clients (
    client_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investor_id UUID NOT NULL REFERENCES users(user_id),
    broker_id UUID NOT NULL REFERENCES users(user_id),
    client_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL,
    last_active TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for client activity log
CREATE TABLE client_activity_log (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(client_id),
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for password reset tokens
CREATE TABLE password_reset_tokens (
    token_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for market indices
CREATE TABLE market_indices (
    index_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    index_name VARCHAR(50) NOT NULL UNIQUE,
    current_value DECIMAL(15, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for stocks listed on the Malawi Stock Exchange
CREATE TABLE stocks (
    stock_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symbol VARCHAR(10) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    current_price DECIMAL(15, 2) NOT NULL,
    daily_change_value DECIMAL(15, 2) NOT NULL,
    daily_change_percent DECIMAL(5, 2) NOT NULL,
    open_price DECIMAL(15, 2),
    high_price DECIMAL(15, 2),
    low_price DECIMAL(15, 2),
    volume INTEGER,
    market_cap DECIMAL(20, 2),
    pe_ratio DECIMAL(10, 2),
    dividend_yield DECIMAL(5, 2),
    eps DECIMAL(10, 2),
    pb_ratio DECIMAL(10, 2),
    trading_status VARCHAR(20) DEFAULT 'OPEN',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for stock metrics (technical indicators, fundamentals, news)
CREATE TABLE stock_metrics (
    metric_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stock_id UUID NOT NULL REFERENCES stocks(stock_id),
    day_range_low DECIMAL(15, 2),
    day_range_high DECIMAL(15, 2),
    week_52_range_low DECIMAL(15, 2),
    week_52_range_high DECIMAL(15, 2),
    rsi_14 DECIMAL(5, 2),
    macd DECIMAL(10, 2),
    ma_50_day DECIMAL(15, 2),
    ma_200_day DECIMAL(15, 2),
    technical_summary VARCHAR(50),
    roe DECIMAL(5, 2),
    debt_to_equity DECIMAL(10, 2),
    peg_ratio DECIMAL(10, 2),
    current_ratio DECIMAL(10, 2),
    roic DECIMAL(5, 2),
    ebitda_margin DECIMAL(5, 2),
    fundamental_summary VARCHAR(50),
    ownership_structure TEXT,
    recent_news TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for investor accounts
CREATE TABLE accounts (
    account_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    account_number VARCHAR(50) NOT NULL UNIQUE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for funding methods
CREATE TABLE funding_methods (
    funding_method_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    method_type VARCHAR(50) NOT NULL,
    provider VARCHAR(50),
    account_details TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for investor portfolios
CREATE TABLE portfolios (
    portfolio_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    stock_id UUID NOT NULL REFERENCES stocks(stock_id),
    shares_owned INTEGER NOT NULL CHECK (shares_owned >= 0),
    average_buy_price DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for trade orders
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    stock_id UUID NOT NULL REFERENCES stocks(stock_id),
    order_type VARCHAR(20) NOT NULL,
    action VARCHAR(10) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_per_share DECIMAL(15, 2) NOT NULL,
    commission DECIMAL(15, 2) DEFAULT 0.00,
    transaction_fee DECIMAL(15, 2) DEFAULT 550.00,
    total_cost DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    priority_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    settlement_status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    executed_at TIMESTAMP,
    broker_id UUID REFERENCES users(user_id)
);

-- Table for transactions (trades, deposits, withdrawals)
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    account_id UUID NOT NULL REFERENCES accounts(account_id),
    transaction_type VARCHAR(50) NOT NULL,
    method VARCHAR(50),
    provider VARCHAR(50),
    amount DECIMAL(15, 2) NOT NULL,
    stock_id UUID REFERENCES stocks(stock_id),
    order_id UUID REFERENCES orders(order_id),
    status VARCHAR(20) DEFAULT 'NEW',
    verified_by UUID REFERENCES users(user_id),
    verified_at TIMESTAMP,
    transaction_delay INTEGER DEFAULT 3,
    callback_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

-- Table for broker-client messages
CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES users(user_id),
    receiver_id UUID NOT NULL REFERENCES users(user_id),
    message_type VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for broker settings
CREATE TABLE broker_settings (
    settings_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    notify_client_activity BOOLEAN DEFAULT TRUE,
    notify_transaction_requests BOOLEAN DEFAULT TRUE,
    notify_market_updates BOOLEAN DEFAULT TRUE,
    notify_system_alerts BOOLEAN DEFAULT TRUE,
    two_factor_auth VARCHAR(20),
    auto_logout_enabled BOOLEAN DEFAULT FALSE,
    default_landing_section VARCHAR(20) DEFAULT 'Dashboard',
    theme VARCHAR(20) DEFAULT 'Dark',
    default_currency VARCHAR(10) DEFAULT 'MWK',
    auto_flag_incomplete_kyc BOOLEAN DEFAULT TRUE,
    auto_pep_screening BOOLEAN DEFAULT FALSE,
    transaction_monitoring BOOLEAN DEFAULT TRUE,
    kyc_review_frequency VARCHAR(20) DEFAULT 'Every 90 Days',
    csd_integration_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for support tickets
CREATE TABLE support_tickets (
    ticket_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_broker_id UUID REFERENCES users(user_id)
);

-- Table for feedback (from Help & FAQs)
CREATE TABLE feedback (
    feedback_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    feedback_type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for educational resources
CREATE TABLE educational_resources (
    resource_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    content_url TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for user-resource interactions
CREATE TABLE user_resource_views (
    view_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    resource_id UUID NOT NULL REFERENCES educational_resources(resource_id),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_stock_id ON orders(stock_id);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_order_id ON transactions(order_id);
CREATE INDEX idx_stock_metrics_stock_id ON stock_metrics(stock_id);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_broker_kyc_user_id ON broker_kyc(user_id);
CREATE INDEX idx_investor_kyc_user_id ON investor_kyc(user_id);
CREATE INDEX idx_clients_investor_id ON clients(investor_id);
CREATE INDEX idx_clients_broker_id ON clients(broker_id);
CREATE INDEX idx_client_activity_log_client_id ON client_activity_log(client_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_broker_settings_user_id ON broker_settings(user_id);