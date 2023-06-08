const { Model, DataTypes } = require('sequelize');
<<<<<<< HEAD
const sequelize = require('../config/connection');
=======
const sequelize = require('../config/config');
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
<<<<<<< HEAD
        },
        event_start: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        event_end: {
            type: DataTypes.DATE,
=======
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
<<<<<<< HEAD
        creator_id: {
=======
        user_id: {
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
<<<<<<< HEAD
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;
=======
        underscored: true,
        modelName: 'Event'
    }
);

module.exports = Event;
>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
