const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./routes');

const sequelize = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

// Database synchronization and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});