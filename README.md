# Taqreeb — Waitlist Page

Quran memorisation retention tool for Huffaz and students.
Built with Node.js, Express, EJS, Bootstrap 5.

**Live:** https://taqreeb-waitlist.vercel.app

## Features
- Waitlist signup form with name and email
- Emails stored in Google Sheets in real time
- Confirmation email sent via Resend with features preview
- Fully responsive, SEO-optimised, Bootstrap 5

## Local setup

```bash
npm install
cp .env.example .env
# Fill in your credentials in .env
npm run dev
```

Visit `http://localhost:3000`

## Environment variables

Create a `.env` file with these values:

```env
PORT=3000
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
```

## Google Sheets setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project and enable **Google Sheets API**
3. Create a **Service Account** and download the JSON key
4. Copy `client_email` and `private_key` into your `.env`
5. Create a Google Sheet with headers: `Name | Email | Date`
6. Share the sheet with your service account email (Editor access)

## Resend setup

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → create one → add to `.env`
3. Use `onboarding@resend.dev` as sender until you have a custom domain

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in **Vercel → Settings → Environment Variables**.

Vercel auto-redeploys on every `git push origin master`.

## Project structure