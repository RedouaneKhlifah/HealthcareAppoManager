import asynchandler from "express-async-handler";
import { Op } from "sequelize";
import sequelize from "../config/sequelize.js";
import { UserSchema, validator } from "../validators/JoiSchemas.js";
import { UserModel, AdminModel } from "../models/index.js";
import { generateJwt } from "../utils/generateToken.js";
import { adminResponse } from "../DTO/Dto.js";

/**
 * @desc Get all admins
 * @route GET /Admin
 * @access private
 */

const getAllAdmin = asynchandler(async (req, res) => {
    const admins = await AdminModel.findAll({ include: UserModel });
    const responce = admins.map(adminResponse);
    res.status(200).json(responce);
});

/**
 * @desc Get one admin
 * @route GET /Admin/:id
 * @access private
 */

const getOneAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const admin = await AdminModel.findByPk(id, { include: UserModel });
    if (!admin) {
        throw new Error("Admin not found");
    }
    const responce = adminResponse(admin);
    res.status(200).json(responce);
});

/**
 * @desc create admin
 * @route POST /Admin
 * @access private
 */

const CreateAdmin = asynchandler(async (req, res) => {
    const { first_name, last_name, email, profile_image, password } = req.body;

    const user = { first_name, last_name, email, profile_image, password };

    validator(UserSchema, user);

    const emailCheckQuery = { where: { email: user.email } };
    const userExistes = await UserModel.findOne(emailCheckQuery);

    if (userExistes) {
        throw new Error("user already existes");
    }

    const admin = await AdminModel.create(
        {
            admin: {},
            user: {
                first_name: first_name.customTrim(),
                last_name: last_name.customTrim(),
                email: email,
                password: password,
                profile_image: profile_image,
                role: "admin"
            }
        },
        {
            include: [AdminModel.user]
        }
    );
    const responce = adminResponse(admin);
    res.status(201).json(responce);
});

/**
 * @desc Update Admin
 * @route PUTCH /Admin/update/:id
 * @access private
 */

const UpdateAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, profile_image, password } = req.body;

    const user = { first_name, last_name, email, profile_image, password };

    validator(UserSchema, user);

    // check if Technicien exist
    const admin = await AdminModel.findByPk(id, { include: UserModel });
    if (!admin) {
        throw new Error("admin not found");
    }

    // check if email is unique
    const emailCheckQuery = {
        where: { email: user.email, actor_id: { [Op.ne]: id } }
    };
    const userExistes = await UserModel.findOne(emailCheckQuery);

    if (userExistes) {
        throw new Error("user email already exist");
    }
    // Update user
    admin.user.first_name = first_name;
    admin.user.last_name = last_name;
    admin.user.profile_image = profile_image;
    admin.user.email = email;
    admin.user.password = password;
    // save data
    await admin.user.save();

    const responce = adminResponse(admin);
    res.status(201).json(responce);
});

/**
 * @desc Delete admin
 * @route DELETE /Admin/delete/:id
 * @access private
 */

const DeleteAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const admin = await AdminModel.findByPk(id, {
        include: UserModel
    });
    if (!admin) {
        throw new Error("admin not deleted");
    }
    const transaction = await sequelize.transaction();
    try {
        await admin.destroy({ transaction });
        await admin.user.destroy(transaction);

        transaction.commit();

        return res.status(200).json("deleted succussfully");
    } catch (err) {
        transaction.rollback();

        throw new Error("delete failed" + err);
    }
});

export { getAllAdmin, getOneAdmin, CreateAdmin, UpdateAdmin, DeleteAdmin };
