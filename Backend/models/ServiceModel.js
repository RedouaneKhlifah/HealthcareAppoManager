import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

export const ServiceModel = sequelize.define("Service", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

ServiceModel.beforeCreate(async (service, options) => {
    const titleCheckQuery = {
        where: {
            title: service.title
        }
    };
    const serviceExistes = await ServiceModel.findOne(titleCheckQuery);

    if (serviceExistes) {
        throw new Error("Service already exist");
    }
});