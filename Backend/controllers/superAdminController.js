import asynchandler from "express-async-handler";
import { generateJwt } from "../utils/generateToken.js";
import { validator, LoginSchema } from "../validators/JoiSchemas.js";
import { UserModel } from "../models/index.js";
import { SuperAdminModel } from "../models/superAdminModel.js";

const superAdminLogin = asynchandler(async (req, res) => {
    validator(LoginSchema, req.body);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) throw new Error("super admin Not Found");
    if (password !== user.password) {
        throw new Error("Invalid email or password ");
    }
    let responce = await SuperAdminModel.findByPk(user.actor_id, {
        include: UserModel
    });
    generateJwt(res, responce.id, user.role);
    res.status(201).json(responce);
});

export { superAdminLogin };
