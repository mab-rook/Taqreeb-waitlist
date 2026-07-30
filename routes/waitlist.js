// console.log('KEY:', process.env.GOOGLE_PRIVATE_KEY);

const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

async function appendToSheet(name, email) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const now = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:C',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name || 'N/A', email, now]],
    },
  });
}

router.get('/', (req, res) => {
  res.render('index', { success: null, error: null });
});

router.post('/join', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !email.includes('@')) {
    return res.render('index', {
      success: null,
      error: 'Please enter a valid email address.',
    });
  }

  try {
    await appendToSheet(name, email);
    return res.render('index', {
      success: "You're on the list! We'll reach out when Taqreeb is ready.",
      error: null,
    });
  } catch (err) {
    console.error('Google Sheets error:', err.message);
    return res.render('index', {
      success: null,
      error: 'Something went wrong. Please try again shortly.',
    });
  }
});

module.exports = router;