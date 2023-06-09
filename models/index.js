const User = require('./User');
const Event = require('./Event');
const Registration = require('./Registration');

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Event.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Registration, {
    foreignKey: 'user_id',
});

Registration.belongsTo(User, {
    foreignKey: 'user_id',
});

Event.hasMany(Registration, {
    foreignKey: 'event_id',
});

Registration.belongsTo(Event, {
    foreignKey: 'event_id',
});

module.exports = { User, Event, Registration };