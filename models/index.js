const User = require('./User');
const Event = require('./Event');
<<<<<<< HEAD
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
=======
const Registration = require('./Registration')

User.hasMany(Event, {
    foreignKey: 'user_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Event,};
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
