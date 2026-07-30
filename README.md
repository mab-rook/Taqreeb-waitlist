# Taqreeb — Waitlist Page

Quran memorisation retention tool. Built with Node.js, Express, EJS, Bootstrap 5.

## Local setup

```bash
npm install
cp .env.example .env
# Fill in your Mailchimp credentials in .env
npm run dev
```

Visit `http://localhost:3000`

## Mailchimp setup

1. Log in to [mailchimp.com](https://mailchimp.com)
2. Go to **Audience → All contacts** — note your **Audience/List ID**
3. Go to **Account → Extras → API keys** — create an API key
4. Your **data center (DC)** is the prefix in your API key, e.g. `us21-xxxx...` → DC is `us21`
5. Add these three values to your `.env` file

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add your env variables in the Vercel dashboard under **Settings → Environment Variables**.

## Deploy to Render

1. Push repo to GitHub
2. Create a new **Web Service** on Render
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add env variables in Render dashboard

## Project structure

```
taqreeb/
├── server.js           # Express entry point
├── routes/
│   └── waitlist.js     # GET / and POST /join with Mailchimp
├── views/
│   └── index.ejs       # Waitlist page template
├── public/
│   └── css/
│       └── style.css   # All custom styles
├── .env.example
├── vercel.json         # Vercel deploy config
└── package.json
```
