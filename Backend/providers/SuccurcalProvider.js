import sequelize from "../config/sequelize.js";
import { SuccurcalModel } from "../models/SuccurcalModel.js";
import { ServiceModel } from "../models/ServiceModel.js";
import { ChefModel } from "../models/ChefModel.js";
import { UserModel } from "../models/UserModel.js";
import { TechnicienModel } from "../models/TechnicienModel.js";
import asynchandler from "express-async-handler";
import { SuccurcalSchema, validator } from "../validators/JoiSchemas.js";

/**
 * @desc Get all Succurcal
 * @route GET /Succurcal
 * @access public
 */

/**
 * Get all Succurcal
 * @route GET /Succurcal
 * @access public
 */
const getAllSuccurcal = asynchandler(async (req, res) => {
    const Succurcals = await SuccurcalModel.findAll({
        include: [
            ServiceModel,
            {
                model: ChefModel,
                include: [UserModel]
            }
        ]
    });
    res.status(200).json(Succurcals);
});

/**
 * @desc Get one Succurcal
 * @route GET /Succurcal
 * @access public
 */

const getOneSuccurcal = asynchandler(async (req, res) => {
    const { id } = req.params;
    const Succurcals = await SuccurcalModel.findByPk(id, {
        include: [ServiceModel, UserModel]
    });
    res.status(200).json(Succurcals);
});

/**
 * @desc create new Succurcal
 * @route POST /Succurcal
 * @access private
 */

const CreateSuccurcal = asynchandler(async (req, res) => {
    validator(SuccurcalSchema, req.body);

    const {
        title,
        description,
        services = [],
        chef = null,
        techniciens = []
    } = req.body;

    const titleCheckQuery = {
        where: {
            title: title
        }
    };
    const SuccurcalExistes = await SuccurcalModel.findOne(titleCheckQuery);

    if (SuccurcalExistes) {
        throw new Error("Succurcal already exist");
    }
    if (techniciens.length > 5) {
        throw new Error("Succurcal can have only up to 5 technicien");
    }

    const Succurcal = await SuccurcalModel.create({
        title: title.customTrim(),
        description: description.customTrim()
    });

    await Succurcal.setServices(services);
    await Succurcal.setChef(chef);
    await Succurcal.setTechniciens(techniciens);

    res.status(201).json({
        Succurcal,
        message: "Succurcal created succusfully"
    });
});

/**
 * @desc Update Succurcal
 * @route PATCH /Succurcal/:id
 * @access private
 */

const UpdateSuccurcal = asynchandler(async (req, res) => {
    validator(SuccurcalSchema, req.body);

    const { id } = req.params;
    const { title, description, services } = req.body;

    // Get the Succurcal
    const Succurcal = await SuccurcalModel.findByPk(id);

    if (!Succurcal) {
        throw new Error("Succurcal not found");
    }

    Succurcal.title = title.customTrim();
    Succurcal.description = description.customTrim();

    await Succurcal.setServices(services);

    res.status(200).json({
        Succurcal,
        message: "Succurcal updated succesfully."
    });
});

/**
 * @desc Delete one Succurcal
 * @route DELETE /Succurcal
 * @access private
 */

const DeleteSuccurcal = asynchandler(async (req, res) => {
    const { id } = req.params;

    // Check if the Succurcal exists
    const existingSuccurcal = await SuccurcalModel.findByPk(id);
    // check if Succurcals existes
    if (!existingSuccurcal) {
        throw new Error("Succurcal not found");
    }

    // If it exists, delete it
    await existingSuccurcal.destroy();

    res.status(200).json({ message: "Succurcal deleted successfully" });
});

/**
 * @desc assign services to Succurcal
 * @route post /Succurcal/:id
 * @access private
 */

export {
    getAllSuccurcal,
    getOneSuccurcal,
    CreateSuccurcal,
    UpdateSuccurcal,
    DeleteSuccurcal
};
