import asynchandler from "express-async-handler";
import { ClientModel, UserModel } from "../models/index.js";
import { validator, UserSchema } from "../validators/JoiSchemas.js";
import { generateJwt } from "../utils/generateToken.js";

/**
 * @desc Get all client
 * @route GET /client
 * @access private
 */

const getAllClients = asynchandler(async (req, res) => {
    const clients = await ClientModel.findAll({
        include: UserModel
    });
    res.status(200).json(clients);
});

/**
 * @desc Get one client
 * @route GET /client
 * @access private
 */

const getOneClient = asynchandler(async (req, res) => {
    const { id } = req.params;
    const client = await ClientModel.findByPk(id, {
        include: UserModel
    });

    if (!client) {
        throw new Error("client not found");
    }
    res.status(200).json(client);
});

/**
 * @desc register new client
 * @route GET /client
 * @access public
 */

const register = asynchandler(async (req, res) => {
    const { first_name, last_name, email, profile_image, password } = req.body;

    const user = { first_name, last_name, email, profile_image, password };
    validator(UserSchema, user);

    const client = await ClientModel.create(
        {
            client: {},
            user: {
                first_name: first_name.customTrim(),
                last_name: last_name.customTrim(),
                email: email,
                password: password,
                profile_image: profile_image
            }
        },
        {
            include: [ClientModel.user]
        }
    );

    generateJwt(res, client.id, client.user.role);

    res.status(201).json(client);
});

export { getAllClients, getOneClient, register };
