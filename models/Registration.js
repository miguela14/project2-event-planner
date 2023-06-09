const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Registration extends Model { }

Registration.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        modelName: 'Registration',
    }
);

module.exports = Registration;
