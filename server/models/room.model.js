const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

const Room = sequelize.define("Room", {
  roomNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    isUnique: true,
  },
  totalShring: {
    type: DataTypes.INTEGER,
  },
  avilableSpace: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
Room.sync({
  alter: {
    drop: false,
  },
});
module.exports = Room;
