import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ChefModel = sequelize.define('Chef', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
