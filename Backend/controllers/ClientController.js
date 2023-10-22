import asynchandler from "express-async-handler";
import {ClientModel, UserModel} from "../models/index.js";
import { validator, UserSchema } from "../validators/JoiSchemas.js";
import { generateJwt } from "../utils/generateToken.js";


/**
 * @desc Get all client
 * @route GET /client
 * @access public
 */

const allClient = asynchandler( async(req, res) => {
    const client = await UserModel.findAll({where: {role : 'client'}, include : [ClientModel]});
    if (!client) throw new Error("No client Found");
    res.status(200).json(client);
})

/**
 * @desc Get all client
 * @route GET /client
 * @access public
 */

const createClient = asynchandler(async (req, res) => {
    // check if inputes are valid
    validator(UserSchema, req.body);

    let { first_name, last_name, email, password, profile_image } = req.body;

    const newUser = await UserModel.create({
        first_name: first_name.customTrim(),
        last_name: last_name.customTrim(),
        email: email,
        password: password,
        profile_image: profile_image,
        client : {}
    }, {    
        include : [UserModel.client]
    });
    
    if (!newUser) throw new Error("Can't create user for some reason");
    newUser.token = generateJwt(res, newUser.id, newUser.role);
    res.status(201).json({token : newUser.token});
});

/**
 * @desc ....
 * @route ....
 * @access public
 */


export {allClient, createClient};