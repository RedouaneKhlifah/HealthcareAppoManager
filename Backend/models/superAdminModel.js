import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const SuperAdminModel = sequelize.define("superAdmin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
