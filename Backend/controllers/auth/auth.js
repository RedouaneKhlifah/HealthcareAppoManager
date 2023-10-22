import asynchandler from "express-async-handler";
import { generateJwt } from "../../utils/generateToken.js";
import { validator, LoginSchema } from "../../validators/JoiSchemas.js";
import { UserModel } from "../../models/index.js";
import bcrypt from "bcrypt";

/**
 * @desc logout the user
 * @route post /user
 * @access public
 */

const Auth = asynchandler(async (req, res) => {
    validator(LoginSchema, req.body);
    const {email, password} = req.body;
    const user = await UserModel.findOne({where : {email : email}});
    if (!user) throw new Error("User Not Found");
    const comparePwd = await bcrypt.compare(password, user.password);
    if (user && comparePwd) {
        user.token = generateJwt(res, user.id, user.role);
        res.status(201).json({token : user.token});
    } else {
        res.status(401);
        throw new Error("Invalid email or password ");
    }
});


/**
 * @desc logout the user
 * @route post /user
 * @access public
 */

const logoutUser = asynchandler(async (req, res) => {
    res.status(200).json({message : "Logged out"});
});

export {Auth, logoutUser}