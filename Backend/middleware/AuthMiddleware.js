
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/index.js";

// authentification middleware
export const auth = asyncHandler(async (req, res, next) => {
    // store the token coming from body or query or headers
    const token = req.headers.authorization || req.headers.Authorization || req.headers["x-access-token"];
    const newToken = token.split(" ")[1];

    if (token) {
        try {
            // verify the token coming with the signature jwt_secret and store it userId with other option on decoded object
            const decoded = jwt.verify(newToken, process.env.jwt_secret)
            // find the user by primary key using the userid from decoded object and store it on new property req.user
            req.user = decoded;
        } catch (err) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(403);
        throw new Error("Not authorized, no token found");
    }
    return next();
})