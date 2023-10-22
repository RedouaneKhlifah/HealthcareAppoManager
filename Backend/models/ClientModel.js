import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ClientModel = sequelize.define("clients", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});
