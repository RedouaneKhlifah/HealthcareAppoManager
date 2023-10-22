import asynchandler from "express-async-handler";
import { AdminSchema, validator } from "../validators/JoiSchemas.js";
import { UserModel, AdminModel } from "../models/index.js";
import { generateJwt } from "../utils/generateToken.js";



/**
 * @desc Get all admins
 * @route GET /Admin
 * @access private
 */

const getAllAdmin = asynchandler(async (req, res) => {
    const Admins = await UserModel.findAll({ include: AdminModel });
    res.status(200).json(Admins);
})

/**
 * @desc Get one admin
 * @route GET /Admin/:id
 * @access private
 */

const getOneAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const Admin = await AdminModel.findByPk(id, { include: [UserModel] });
    if (!Admin) {
        res.status(401);
        throw new Error("Admin not found");
    }
    res.status(200).json(Admin);

})

/**
 * @desc create admin
 * @route POST /Admin
 * @access private
 */

const CreateAdmin = asynchandler(async (req, res) => {
    validator(AdminSchema, req.body);
    let { first_name, last_name, email, password, profile_image } = req.body;
    const newUser = await UserModel.create({
        admin: {},
        first_name: first_name.customTrim(),
        last_name: last_name.customTrim(),
        email: email,
        password: password,
        profile_image: profile_image,
        role: "admin"
    }, {
        include: [UserModel.admin]
    });
    newUser.token = generateJwt(res, newUser.id);
    res.status(201).json(newUser.token);
})

/**
 * @desc Update Admin
 * @route PUTCH /Admin/update/:id
 * @access private
 */

const UpdateAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const Admin = await AdminModel.findByPk(id, { include: [UserModel] });
    if (!Admin) {
        res.status(401);
        throw new Error("admin is not found")
    }
    req.body.password = Admin.user.password;
    validator(AdminSchema, req.body);
    const { first_name, last_name, email, password, profile_image } = req.body
    Admin.user.set({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        profile_image: profile_image,
    })
    const result = await Admin.user.save();
    if(!result){
        res.status(401);
        throw new Error("is not updated")
    }
    res.status(201).json(result)
})


/**
 * @desc Delete admin
 * @route DELETE /Admin/delete/:id
 * @access private
 */

const DeleteAdmin = asynchandler(async (req, res) => {
    const { id } = req.params;
    const existingAdmin = await AdminModel.findByPk(id,{include:[UserModel]});
    if (!existingAdmin) {
        res.status(401);
        throw new Error("is not deleted")
    }
    const result = await existingAdmin.destroy()
    .then(function(result) {
       return result.user.destroy();
    })
    res.status(201).json()
})

export { getAllAdmin, getOneAdmin, CreateAdmin, UpdateAdmin, DeleteAdmin }