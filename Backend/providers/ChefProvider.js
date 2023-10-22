import asynchandler from "express-async-handler";
import { Op } from "sequelize";
import sequelize from "../config/sequelize.js";
import { UserSchema, ChefSchema, validator } from "../validators/JoiSchemas.js";
import { ChefModel } from "../models/ChefModel.js";
import { UserModel } from "../models/UserModel.js";
import { ChefResponse } from "../DTO/Dto.js";

/**
 * @desc Get all Chefs
 * @route GET /Chefs
 * @access private
 */
const getAllChefs = asynchandler(async (req, res) => {
    const Chefs = await ChefModel.findAll({ include: UserModel });
    let response = Chefs.map(ChefResponse);
    res.status(200).json(response);
});

/**
 * @desc Get a Chef by ID
 * @route GET /Chefs/:id
 * @access private
 */
const getOneChefById = asynchandler(async (req, res) => {
    const { id } = req.params;
    const Chef = await ChefModel.findByPk(id, {
        include: UserModel
    });

    if (!Chef) {
        return res.status(404).json({ message: "Chef not found" });
    }

    let response = ChefResponse(Chef);

    res.status(200).json(response);
});

/**
 * @desc Create a new Chef
 * @route POST /chef/create
 * @access private
 */
const createChef = asynchandler(async (req, res) => {
    const { first_name, last_name, email, profile_image, password, grade } =
        req.body;

    const user = {
        first_name,
        last_name,
        email,
        password,
        profile_image
    };

    const chef = {
        grade
    };

    validator(UserSchema, user);
    validator(ChefSchema, chef);

    // check if email is unique
    const emailCheckQuery = { where: { email: user.email } };
    const userExistes = await UserModel.findOne(emailCheckQuery);

    if (userExistes) {
        throw new Error("user email already existes");
    }

    const Chef = await ChefModel.create(
        {
            grade,
            user: {
                first_name: first_name.customTrim(),
                last_name: last_name.customTrim(),
                email: email,
                password: password,
                profile_image: profile_image,
                role: "chef"
            }
        },
        {
            include: [ChefModel.user]
        }
    );

    let response = ChefResponse(Chef);
    return res.status(201).json(response);
});

/**
 * @desc Update a Chef by ID
 * @route PATCH /chef/update/:id
 * @access private
 */

const updateChef = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, profile_image, password, grade } =
        req.body;

    const user = {
        first_name,
        last_name,
        email,
        password,
        profile_image
    };

    const chefObj = {
        grade
    };

    validator(UserSchema, user);
    validator(ChefSchema, chefObj);

    // check if chef exist
    const chef = await ChefModel.findByPk(id, {
        include: UserModel
    });

    if (!chef) {
        throw new Error("Technicien not found");
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
    chef.user.first_name = first_name;
    chef.user.last_name = last_name;
    chef.user.profile_image = profile_image;
    chef.user.email = email;
    chef.user.password = password;

    // Update chef
    chef.grade = grade;

    const transaction = await sequelize.transaction();
    try {
        // save data
        await chef.save({ transaction });
        await chef.user.save(transaction);

        // commit
        transaction.commit();

        // retuen costom responce
        let response = ChefResponse(chef);
        return res.status(200).json(response);
    } catch (error) {
        transaction.rollback();
        throw new Error("chef update faild" + err);
    }
});

/**
 * @desc Delete a Chef by ID
 * @route DELETE /Chef/:id
 * @access private
 */
const deleteChef = asynchandler(async (req, res) => {
    const { id } = req.params;
    const chef = await ChefModel.findByPk(id, {
        include: UserModel
    });

    if (!chef) {
        throw new Error("Technicien not found");
    }

    const transaction = await sequelize.transaction();

    try {
        await chef.destroy({ transaction });
        await chef.user.destroy(transaction);

        transaction.commit();

        return res.status(200).json("deleted succussfully");
    } catch (err) {
        transaction.rollback();

        throw new Error("delete failed" + err);
    }
});

export { createChef, getAllChefs, getOneChefById, updateChef, deleteChef };
