// console.log('KEY:', process.env.GOOGLE_PRIVATE_KEY);
// console.log('BREVO KEY:', process.env.BREVO_API_KEY);
const express = require('express');
const { google } = require('googleapis');
const router = express.Router();


const axios = require('axios');

async function sendConfirmationEmail(name, email) {
  const displayName = name || 'there';

  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: { name: 'Taqreeb', email: 'taqreebapp01@gmail.com' },
      to: [{ email, name: displayName }],
      subject: "You're on the Taqreeb waitlist",
      htmlContent: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Taqreeb</title>
</head>
<body style="margin:0;padding:0;background:#0B0F0E;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F0E;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111816;border-radius:16px;overflow:hidden;border:1px solid rgba(29,158,117,0.2);">

          <!-- Header -->
          <tr>
            <td style="background:#0F2E24;padding:32px 40px;text-align:center;border-bottom:1px solid rgba(29,158,117,0.15);">
              <p style="margin:0;font-size:26px;font-weight:800;color:#fff;letter-spacing:-0.02em;">
                Taqreeb<span style="color:#1D9E75;">.</span>
              </p>
              <p style="margin:8px 0 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#3DBA8A;">
                Early Access Waitlist
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">
                Jazākumullāhu Khayran, ${displayName}! 
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#A8BDB6;">
                Thank you for joining the Taqreeb waitlist. You're among the first to believe in what we're building — a tool that truly helps Huffaz stay consistent with their murāja'ah. We won't forget that.
              </p>
              <p style="margin:0 0 8px;font-size:15px;line-height:1.7;color:#A8BDB6;">
                We'll notify you the moment we're ready to welcome early users.
              </p>

              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;background:#0B0F0E;border-radius:12px;border:1px solid rgba(29,158,117,0.15);overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid rgba(29,158,117,0.1);">
                    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1D9E75;">What's coming for you</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid rgba(29,158,117,0.08);">
                    <p style="margin:0;font-size:14px;color:#fff;">↺ &nbsp;<strong>Personalised murāja'ah schedule</strong></p>
                    <p style="margin:4px 0 0 22px;font-size:13px;color:#6B7B74;">A revision plan built around what you've memorised and when you're likely to forget it.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid rgba(29,158,117,0.08);">
                    <p style="margin:0;font-size:14px;color:#fff;">◎ &nbsp;<strong>Daily hifdh planner</strong></p>
                    <p style="margin:4px 0 0 22px;font-size:13px;color:#6B7B74;">Know exactly what to revise each day — no guesswork, no missed sections.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid rgba(29,158,117,0.08);">
                    <p style="margin:0;font-size:14px;color:#fff;">🔊 &nbsp;<strong>Audio repetition system</strong></p>
                    <p style="margin:4px 0 0 22px;font-size:13px;color:#6B7B74;">Listen, repeat, and lock in ayahs with slow recitation from trusted reciters.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;">
                    <p style="margin:0;font-size:14px;color:#fff;">≈ &nbsp;<strong>Mutashabihat comparison</strong></p>
                    <p style="margin:4px 0 0 22px;font-size:13px;color:#6B7B74;">Never mix up similar ayahs again — side-by-side comparison of verses that trip people up.</p>
                  </td>
                </tr>
              </table>

              <!-- Share -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2E24;border-radius:12px;border:1px solid rgba(29,158,117,0.2);margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#3DBA8A;">Know someone memorising the Quran?</p>
                    <p style="margin:0 0 14px;font-size:13px;color:#6B7B74;">Help them stay consistent — share Taqreeb with a friend or study partner.</p>
                    <a href="https://taqreeb-waitlist.vercel.app" style="display:inline-block;background:#1D9E75;color:#fff;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none;">
                      Share Taqreeb →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Recommendation -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0F0E;border-radius:12px;border:1px solid rgba(255,255,255,0.07);margin-bottom:8px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#fff;">Have a suggestion?</p>
                    <p style="margin:0 0 14px;font-size:13px;color:#6B7B74;">We're building this for you — your ideas shape what we build next.</p>
                    <a href="mailto:taqreebapp01@gmail.com?subject=Taqreeb Suggestion" style="display:inline-block;background:transparent;color:#3DBA8A;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none;border:1px solid rgba(29,158,117,0.4);">
                      Send a recommendation →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
              <p style="margin:0;font-size:12px;color:#3D4F48;">
                Taqreeb · Drawing you closer to the Quran<br/>
                You're receiving this because you joined our waitlist.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      
      `
    },
    {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
}


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


async function getWaitlistCount() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!B:B',
  });

  const rows = response.data.values || [];
  // Subtract 1 to exclude the header row
  return Math.max(0, rows.length - 1);
}


router.get('/', async (req, res) => {
  try {
    const count = await getWaitlistCount();
    res.render('index', { success: null, error: null, count });
  } catch (err) {
    res.render('index', { success: null, error: null, count: 0 });
  }
});

router.post('/join', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !email.includes('@')) {
    const count = await getWaitlistCount();
    return res.render('index', {
      success: null,
      error: 'Please enter a valid email address.',
      count,
    });
  }

  try {
    await appendToSheet(name, email);
    await sendConfirmationEmail(name, email);
    const count = await getWaitlistCount();

    return res.render('index', {
      success: "You're on the list! Check your email — we just sent you a confirmation.",
      error: null,
      count,
    });
  } catch (err) {
    console.error('Error:', err.message);
    return res.render('index', {
      success: null,
      error: 'Something went wrong. Please try again shortly.',
      count: 0,
    });
  }
});

module.exports = router;