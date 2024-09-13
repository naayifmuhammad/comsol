const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

// Assuming you are using routes from another file like authRoutes
const authRoutes = require('./routes/auth');  // Make sure this is correctly exported
const complaintsRoutes = require('./routes/complaints');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sessions
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

// Route setup
app.use('/api/auth', authRoutes);  // Check that authRoutes is a router or middleware function
app.use('/api/complaints', complaintsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
