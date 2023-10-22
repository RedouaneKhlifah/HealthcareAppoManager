import asynchandler from "express-async-handler";
import { ClientEntrModel, UserModel } from "../models/index.js";
import {
    validator,
    UserSchema,
    EntrepriseSchema
} from "../validators/JoiSchemas.js";
import { generateJwt } from "../utils/generateToken.js";

/**
 * @desc Get all entreprises
 * @route GET /entreprise
 * @access private
 */

const getAllEntreprises = asynchandler(async (req, res) => {
    const clientEntrprise = await clientEntrprise.findAll({
        include: UserModel
    });
    res.status(200).json(clientEntrprise);
});

/**
 * @desc Get one entreprise
 * @route GET /entreprise
 * @access private
 */

const getOneEntreprises = asynchandler(async (req, res) => {
    const { id } = req.params;
    const clientEntrprise = await clientEntrprise.findByPk(id, {
        include: UserModel
    });

    if (!clientEntrprise) {
        throw new Error("clientEntrprise not found");
    }
    res.status(200).json(clientEntrprise);
});

/**
 * @desc Get all entreprise
 * @route Post /entreprise
 * @access public
 */

const createClientEmployee = asynchandler(async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        password,
        profile_image,
        entreprise_id
    } = req.body;

    const entreprise = {
        entreprise_id
    };
    const user = {
        first_name,
        last_name,
        email,
        profile_image,
        password
    };

    validator(UserSchema, user);
    validator(EntrepriseSchema, entreprise);

    const Client = await ClientEntrModel.create(
        {
            entreprise_id,
            user: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                profile_image: profile_image
            }
        },
        {
            include: [ClientEntrModel.user]
        }
    );
    const newUser = await UserModel.findOne({
        where: { actor_id: Client.id },
        include: [ClientEntrModel]
    });

    if (!newUser) throw new Error("Can't create user for some reason");
    newUser.token = generateJwt(res, newUser.id, newUser.role);
    res.status(201).json({ token: newUser.token });
});

/**
 * @desc ....
 * @route ....
 * @access public
 */

export { getAllEntreprises, getOneEntreprises };
