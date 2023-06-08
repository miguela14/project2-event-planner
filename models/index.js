const User = require('./user');
const Event = require('./event');
const Registration = require('./Registration');

User.hasMany(Event, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'creator_id'
});

User.belongsTo(Event, {
    through: Registration,
    foreignKey: 'user_id',
});

Event.belongsToMany(User, {
    through: Registration,
    foreignKey: 'event_id',
});

Registration.belongsTo(User, {
    foreignKey: 'user_id',
});

Registration.belongsTo(Event, {
    foreignKey: 'event_id',
});

User.hasMany(Registration, {
    foreignKey: 'event_id',
});

Event.hasMany(Registration, {
    foreignKey: 'event_id',
});

module.exports = { User, Event, Registration };