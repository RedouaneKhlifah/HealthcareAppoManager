import asynchandler from "express-async-handler";
import {
    UserSchema,
    TechnicienSchema,
    UserUpdateSchema,
    validator
} from "../validators/JoiSchemas.js";
import { TechnicienModel } from "../models/TechnicienModel.js";
import { UserModel } from "../models/UserModel.js";
import sequelize from "../config/sequelize.js";
import { technicienResponse } from "../DTO/Dto.js";

/**
 */

/**
 * @desc Get all Techniciens
 * @route GET /techniciens
 * @access private
 */
const getAllTechniciens = asynchandler(async (req, res) => {
    const techniciens = await TechnicienModel.findAll({ include: UserModel });
    const response = techniciens.map(technicienResponse);
    res.status(200).json(response);
});

/**
 * @desc Get a Technicien by ID
 * @route GET /techniciens/:id
 * @access private
 */
const getOneTechnicienById = asynchandler(async (req, res) => {
    const technicien = await TechnicienModel.findByPk(req.params.id, {
        include: UserModel
    });

    if (!technicien) {
        throw new Error("Technicien not found");
    }
    const response = technicienResponse(technicien);
    res.status(200).json(response);
});

/**
 * @desc Create a new Technicien
 * @route POST /techniciens
 * @access private
 */
const createTechnicien = asynchandler(async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        profile_image,
        password,
        dispo,
        grade
    } = req.body;

    const user = { first_name, last_name, email, profile_image, password };

    const tech = { dispo, grade };

    validator(UserSchema, user);
    validator(TechnicienSchema, tech);

    const emailCheckQuery = { where: { email: user.email } };
    const userExistes = await UserModel.findOne(emailCheckQuery);

    if (userExistes) {
        throw new Error("user already existes");
    }

    const technicien = await TechnicienModel.create(
        {
            dispo,
            grade,
            user: {
                first_name: first_name.customTrim(),
                last_name: last_name.customTrim(),
                email: email,
                password: password,
                profile_image: profile_image,
                role: "technicien"
            }
        },
        {
            include: [TechnicienModel.user]
        }
    );

    const response = technicienResponse(technicien);
    return res.status(201).json(response);
});

/**
 * @desc Update a Technicien by ID
 * @route PUT /techniciens/:id
 * @access private
 */
const updateTechnicien = asynchandler(async (req, res) => {
    const { id } = req.params;
    const technicien = await technicien.findByPk(id, {
        include: UserModel
    });

    if (!technicien) {
        throw new Error("Technicien not found");
    }

    const { first_name, last_name, profile_image, dispo, grade } = req.body;

    const user = { first_name, last_name, profile_image };

    const tech = { dispo, grade };

    // validate
    validator(TechnicienSchema, tech);
    validator(UserUpdateSchema, user);

    // Update user
    technicien.user.first_name = first_name;
    technicien.user.last_name = last_name;
    technicien.user.profile_image = profile_image;

    // Update technicien
    technicien.grade = grade;
    technicien.dispo = dispo;

    const transaction = sequelize.transaction();
    try {
        await technicien.save({ transaction });
        await technicien.Technicien.save(transaction);

        transaction.commit();

        const response = technicienResponse(technicien);
        return res.status(200).json(response);
    } catch (err) {
        transaction.rollback();
        throw new Error("technicie update faild" + err);
    }
});

/**
 * @desc Delete a Technicien by ID
 * @route DELETE /techniciens/:id
 * @access private
 */
const deleteTechnicien = asynchandler(async (req, res) => {
    const { id } = req.params;
    const technicien = await TechnicienModel.findByPk(id);

    if (!technicien) {
        throw new Error("Technicien not found");
    }

    await technicien.destroy();

    return res.status(200).json("deleted succussfully");
});

export {
    createTechnicien,
    getAllTechniciens,
    getOneTechnicienById,
    updateTechnicien,
    deleteTechnicien
};
