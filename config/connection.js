const Sequelize = require('sequelize');
require('dotenv').config(); 

let sequelize;

if (process.env.CLEARDB_DATABSE_URL) {
  // Use ClearDB on Heroku
  sequelize = new Sequelize(process.env.CLEARDB_DATABSE_URL);
} else {
  // Use local MySQL
  sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
