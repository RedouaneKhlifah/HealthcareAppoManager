import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ClientEntrModel = sequelize.define("clientEntreprise", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entreprise_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});
