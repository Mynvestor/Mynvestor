const express = require('express');
const { Pool } = require('pg');
const { Mutex } = require('async-mutex');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public')); // Serve static files (HTML)

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres', // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'mynvestor_db',
  password: '#Mynvestor123', // Replace with your PostgreSQL password
  port: 5432
});

// Mutex for single transaction processing
const transactionMutex = new Mutex();

// Simulate payment processing
app.post('/api/payment', async (req, res) => {
  const release = await transactionMutex.acquire(); // Ensure one transaction at a time
  try {
    const { method, type, provider, phoneNumber, amount, cardNumber, expiryDate, cvv } = req.body;

    // Log incoming payload for debugging
    console.log('Received payload:', req.body);

    // Basic validation
    if (!method || !type || !provider || !amount) {
      return res.status(400).json({
        status: 'error',
        message: `Missing required fields: ${JSON.stringify({ method, type, provider, amount })}`,
        transactionId: null,
        transactionStatus: null
      });
    }

    // Relaxed phone number validation for Mobile Money
    if (method === 'Mobile Money' && (!phoneNumber || phoneNumber.trim() === '')) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number is required for Mobile Money',
        transactionId: null,
        transactionStatus: null
      });
    }

    // Validate amount
    if (amount < 1000 || (type === 'Withdrawal' && amount > 1000000000)) {
      return res.status(400).json({
        status: 'error',
        message: 'check amount: Minimum MK1000 for deposits, maximum MK1,000,000,000 for withdrawals',
        transactionId: null,
        transactionStatus: null
      });
    }

    // Simulate 3-second processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate transaction outcome (80% success, 15% pending, 5% failure)
    const rand = Math.random();
    let transactionStatus;
    if (rand < 0.8) transactionStatus = 'Completed';
    else if (rand < 0.95) transactionStatus = 'Pending';
    else transactionStatus = 'Failed';

    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const message = transactionStatus === 'Completed'
      ? `Payment of MK${amount} via ${method} (${provider}) ${type.toLowerCase()} processed successfully`
      : transactionStatus === 'Pending'
        ? `Payment of MK${amount} via ${method} (${provider}) ${type.toLowerCase()} is pending`
        : `Payment of MK${amount} via ${method} (${provider}) ${type.toLowerCase()} failed`;

    // Store transaction and update balance in a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert transaction
      const query = `
        INSERT INTO transactions (transaction_id, method, type, provider, phone_number, amount, status, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [transactionId, method, type, provider, phoneNumber || null, amount, transactionStatus, 1]; // user_id = 1
      const result = await client.query(query, values);
      const transaction = result.rows[0];

      // Update cash balance for Completed transactions
      if (transactionStatus === 'Completed') {
        const balanceUpdate = type === 'Deposit'
          ? 'UPDATE users SET cash_balance = cash_balance + $1 WHERE id = $2'
          : 'UPDATE users SET cash_balance = cash_balance - $1 WHERE id = $2';
        await client.query(balanceUpdate, [amount, 1]);
      }

      await client.query('COMMIT');
      console.log('Transaction saved to database:', transaction);

      // Log transaction for brokers
      console.log('Broker Notification:', {
        transactionId: transaction.transaction_id,
        method: transaction.method,
        type: transaction.type,
        provider: transaction.provider,
        amount: transaction.amount,
        status: transaction.status,
        timestamp: transaction.timestamp,
        user_id: transaction.user_id
      });

      res.json({
        status: 'success',
        transactionId,
        transactionStatus,
        message
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Database error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to save transaction',
        transactionId: null,
        transactionStatus: null
      });
    } finally {
      client.release();
    }
  } finally {
    release(); // Release mutex
  }
});

// Fetch transaction history
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY timestamp DESC', [1]);
    const transactions = result.rows.map(row => ({
      transactionId: row.transaction_id,
      date: row.timestamp.toISOString().split('T')[0],
      method: row.method,
      type: row.type,
      amount: `MK${parseFloat(row.amount).toLocaleString()}`,
      status: row.status
    }));
    res.json(transactions);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch transactions' });
  }
});

// Fetch user cash balance
app.get('/api/balance', async (req, res) => {
  try {
    const result = await pool.query('SELECT cash_balance FROM users WHERE id = $1', [1]);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json({ cash_balance: result.rows[0].cash_balance });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch balance' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});