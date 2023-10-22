import { Router } from "express";

import {
    getAllExigenceService,
    getOneExigenceService,
    CreateExigenceService
} from "../providers/ExigenceServiceProvider.js";

const router = Router();

/**
 * @GET
 * @desc // get all ExigenceServices
 * @access private
 */
router.get("/", getAllExigenceService);

/**
 * @GET
 * @desc // get one ExigenceServices
 * @access private
 */
router.get("/:id", getOneExigenceService);

/**
 * @POST
 * @desc // create a new ExigenceServices
 * @access private
 */
router.post("/", CreateExigenceService);

/**
 * @PATCH
 * @desc // update a ExigenceServices
 * @access private
 */
router.patch("/:id");

/**
 * @DELETE
 * @desc // Delete a ExigenceServices
 * @access private
 */
router.delete("/:id");

export default router;
