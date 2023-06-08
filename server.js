const path = require('path');
const express = require('express');
const session = require('express-session');
<<<<<<< HEAD
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
=======
const routes = require('./routes');

const sequelize = require('./config/config');
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22

const app = express();
const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'I am watching you...',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening @ http://localhost:${PORT}`));
});
=======
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
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
