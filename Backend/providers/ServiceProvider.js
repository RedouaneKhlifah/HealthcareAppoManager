import {ServiceModel} from "../models/ServiceModel.js";
import {SuccurcalModel} from "../models/SuccurcalModel.js";
import asynchandler from "express-async-handler";
import { ServiceSchema, validator } from "../validators/JoiSchemas.js";
import {ExigenceServiceModel} from "../models/ExigenceServiceModel.js";

/**
 * @desc Get all Succurcal
 * @route GET /Succurcal
 * @access public
 */

const getAllService = asynchandler(async (req, res) => {
    const Services = await ServiceModel.findAll({
        include: [SuccurcalModel, ExigenceServiceModel]
    });
    res.status(200).json(Services);
});

/**
 * @desc Get one Service
 * @route GET /Service
 * @access private
 */

const getOneService = asynchandler(async (req, res) => {
    const { id } = req.params;
    const Services = await ServiceModel.findByPk(id, {
        include: [SuccurcalModel, ExigenceServiceModel]
    });
    res.status(200).json(Services);
});

/**
 * @desc create new Service
 * @route POST /Service
 * @access private
 */

const CreateService = asynchandler(async (req, res) => {
    validator(ServiceSchema, req.body);

    const { title, description } = req.body;

    // create a new ServiceModel
    const Services = await ServiceModel.create({
        title: title.customTrim(),
        description: description.customTrim()
    });
    res.status(201).json(Services);
});

/**
 * @desc Update Service
 * @route PATCH /Service/:id
 * @access private
 */

const UpdateService = asynchandler(async (req, res) => {
    validator(ServiceSchema, req.body);

    const { id } = req.params;
    const { title, description } = req.body;

    // get Services
    const Services = await ServiceModel.findByPk(id);

    if (!Services) {
        throw new Error("Service not found");
    }
    //update Services
    Services.title = title.customTrim();
    Services.description = description.customTrim();

    // save Services
    await Services.save();

    res.status(201).json(Services);
});

/**
 * @desc Delete one Service
 * @route DELETE /Service
 * @access private
 */

const DeleteService = asynchandler(async (req, res) => {
    const { id } = req.params;

    // Check if the Service exists
    const existingService = await ServiceModel.findByPk(id);
    // check if Services existes
    if (!existingService) {
        throw new Error("Service not found");
    }

    // If it exists, delete it
    await existingService.destroy();

    res.status(200).json({ message: "Service deleted successfully" });
});

export {
    getAllService,
    getOneService,
    CreateService,
    UpdateService,
    DeleteService
};
