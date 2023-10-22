import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const AdminModel = sequelize.define("admins", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
