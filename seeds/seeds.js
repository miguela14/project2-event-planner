const sequelize = require('../config/config');
const { User, Event } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');

const seedDatabase = async () => {
    try {
      // Disable foreign key checks
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
      // Drop tables
      await Event.drop();
      await User.drop();
      console.log('Tables dropped.');
  
      // Sync the database
      await sequelize.sync({ force: true });
      console.log('Tables re-synced.');
  
      const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
      });
  
      for (const event of eventData) {
        await Event.create({
          ...event,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      }
  
      console.log('Database seeding completed.');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      // Enable foreign key checks
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  
      // Close the database connection
      sequelize.close();
    }
  };
seedDatabase();