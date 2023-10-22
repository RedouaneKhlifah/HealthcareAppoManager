import asynchandler from "express-async-handler";
import { generateJwt } from "../utils/generateToken.js";
import {
    validator,
    LoginSchema,
    UserSchema
} from "../validators/JoiSchemas.js";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import modelSelcetor from "../utils/modelSelcetor.js";
import { ClientModel } from "../models/index.js";
import { ClientEntrModel } from "../models/index.js";

/**
 * @desc logout the user
 * @route post /user
 * @access private
 */

const getUserProfile = asynchandler(async (req, res) => {
    const userprofile = req.userData;
    res.status(200).json(userprofile);
});

/**
 * @desc logout the user
 * @route post /user
 * @access public
 */

const login = asynchandler(async (req, res) => {
    validator(LoginSchema, req.body);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email: email } });
    if (!user) throw new Error("User Not Found");
    const comparePwd = await bcrypt.compare(password, user.password);
    if (!comparePwd) {
        throw new Error("Invalid email or password ");
    }
    const model = modelSelcetor(user.role);
    let responce = await model.findByPk(user.actor_id, {
        include: UserModel
    });
    generateJwt(res, responce.id, user.role);
    res.status(201).json(responce);
});

/**
 * @desc logout the user
 * @route post /user
 * @access private
 */

const logout = asynchandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "Logged out" });
});

/**
 * @desc register new client
 * @route GET /client
 * @access public
 */

const register = asynchandler(async (req, res) => {
    const { role } = req.body;
    const { first_name, last_name, email, profile_image, password } = req.body;

    const user = { first_name, last_name, email, profile_image, password };
    validator(UserSchema, user);
    let client;

    if (!role) {
        client = await ClientModel.create(
            {
                client: {},
                user: {
                    first_name: first_name.customTrim(),
                    last_name: last_name.customTrim(),
                    email: email,
                    password: password,
                    profile_image: profile_image,
                    role: "client"
                }
            },
            {
                include: [ClientModel.user]
            }
        );
    } else {
        client = await ClientEntrModel.create(
            {
                clientEntreprise: {},
                user: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: password,
                    profile_image: profile_image,
                    role: "entreprise"
                }
            },
            {
                include: [ClientEntrModel.user]
            }
        );
    }
    console.log(client);
    generateJwt(res, client.id, client.user.role);

    res.status(201).json(client);
});

export { login, logout, getUserProfile, register };
