const User = require('./User');
const Event = require('./Event');
const Registration = require('./Registration')

User.hasMany(Event, {
    foreignKey: 'user_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Event,};
