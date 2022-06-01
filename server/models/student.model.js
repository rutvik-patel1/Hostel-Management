const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

const Student = sequelize.define("Student", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  mobile: {
    type: DataTypes.INTEGER,
    isnull: false,
  },
  address: {
    type: DataTypes.STRING,
    isnull: false,
  },
  passingMonth: {
    type: DataTypes.INTEGER,
    isnull: false,
  },
  passingYear: {
    type: DataTypes.INTEGER,
    isnull: false,
  },
  roomNumber: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  addmission: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
Student.sync({
    alter: {
      drop: false,
    },
  });
module.exports = Student;
