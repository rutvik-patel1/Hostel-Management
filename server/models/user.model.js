const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

const  User = sequelize.define('User',{
    email:{
       type: DataTypes.STRING,
       unique: true,
       validate:{
           isEmail:true,
       }
    },
    password:{
        type: DataTypes.STRING,
        notNull: true,
    },
    role:{
        type: DataTypes.STRING,
        defaultValue:'student',
        notNull: true,
    },
    token:{
        type: DataTypes.STRING,
        defaultValue:null
    }
})

User.sync({
    alter: {
      drop: false,
    },
  });

module.exports = User