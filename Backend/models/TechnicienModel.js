import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const TechnicienModel = sequelize.define("Technicien", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dispo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    grade: DataTypes.STRING
});
