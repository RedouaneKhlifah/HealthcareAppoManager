import { Router } from "express";

import {
    getAllService,
    getOneService,
    CreateService,
    UpdateService,
    DeleteService
} from "../providers/ServiceProvider.js";

const router = Router();

/**
 * @GET
 * @desc // get all Services
 * @access public
 */
router.get("/", getAllService);

/**
 * @GET
 * @desc // get one Service
 * @access public
 */
router.get("/:id", getOneService);

/**
 * @POST
 * @desc // create a new Service
 * @access private
 */
router.post("/", CreateService);

/**
 * @PATCH
 * @desc // update a Service
 * @access private
 */
router.patch("/:id", UpdateService);

/**
 * @DELETE
 * @desc // Delete a Service
 * @access private
 */
router.delete("/:id", DeleteService);

export default router;
