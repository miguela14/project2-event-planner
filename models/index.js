const User = require('./User');
const Event = require('./Event');
const Registration = require('./Registration');

User.hasMany(Event, { through: event_user });

Event.hasMany(User, { through: event_user });