const { Model, DataTypes } = require('sequelize');
const bcrypt = require ('bcrypt');
const sequelize = require ('../config/connections');

class User extends Model {
    checkPassword(loginPassword){
        return bcrypt.compareSync(loginPassword, this.password);
    }
}; 

User.init(
    {
        id: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true, 
            autoIncrement: true, 
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        password: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                len: [5, 15], 
            }
        }, 
        email: {
            type: DataTypes.STRING, 
            unique: true, 
            validate: {
                isEmail: true, 
            },
        }        
    }, 
    {
        hooks: {
            beforeCreate(newUserData){
                const salt = bcrypt.genSaltSync(); 
                newUserData.password = bcrypt.hashSync(newUserData.password, 10);
            }
        },
        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        modelName: 'users'
    }
);

module.exports = User; 