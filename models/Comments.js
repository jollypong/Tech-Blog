const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections');

class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        user_id: {
            type: DataTypes.STRING, 
            allowNull: false, 
            references: {
                model: 'user',
                key: 'id'
            }
        },
        comment:{
            type: DataTypes.TEXT, 
            allowNull: false, 
        },
        post_id:{
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'post',
                key: 'id'
            }
        }, 
        time_created: {
            type: DataTypes.TIME,
            allowNull: false, 
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        sequelize, 
        freezeTableName: true, 
        underscored: true, 
        modelName: 'comment'
    }
);

module.exports = Comment; 