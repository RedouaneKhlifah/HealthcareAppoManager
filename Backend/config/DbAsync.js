import sequelize from "./sequelize.js";

// Define your models
import "../models/index.js";

// async database tables
async function recreateTables() {
    try {
        await sequelize.sync({ force: true }); // This will drop and recreate all tables
    } catch (error) {
        console.log("errror " + error);
        process.exit(1);
    }
}

recreateTables();
