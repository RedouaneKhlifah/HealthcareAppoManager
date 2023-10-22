import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import bcrypt from "bcrypt";

export const UserModel = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_image: DataTypes.STRING,
    role: {
        type: DataTypes.ENUM(
            "client",
            "entreprise",
            "chef",
            "technicien",
            "admin",
            "superadmin"
        ),
        defaultValue: "client"
    },
    actor_id: {
        type: DataTypes.INTEGER
    }
});

// sequelize hooke
UserModel.beforeCreate(async (user, options) => {
    if (user.password) {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }
});
