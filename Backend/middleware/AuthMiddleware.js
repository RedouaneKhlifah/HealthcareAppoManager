import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/index.js";
import modelSelcetor from "../utils/modelSelcetor.js";

// authentification middleware
export const auth = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error("Not autorized, no   token");
    }
    try {
        const decode = jwt.verify(token, process.env.jwt_secret);
        const model = modelSelcetor(decode.role);
        let user = await model.findByPk(decode.actor_id, {
            include: UserModel
        });
        req.userData = user;
        next();
    } catch (err) {
        res.status(401);
        throw new Error("Not autorized, invalide token");
    }
});
