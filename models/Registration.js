<<<<<<< HEAD
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Registration extends Model {}

Registration.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Event',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        registered: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'registration',
    }
);

module.exports = Registration;
=======

>>>>>>> f1d5652e61011a51ffb91044824b13c5410d9c22
