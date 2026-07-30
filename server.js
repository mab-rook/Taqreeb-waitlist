require('dotenv').config();
const express = require('express');
const path = require('path');
const waitlistRouter = require('./routes/waitlist');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', waitlistRouter);

app.listen(PORT, () => {
  console.log(`Taqreeb waitlist running on http://localhost:${PORT}`);
});
