import Express from "express";
import { Router } from "express";

import {
    createChef,
    getAllChefs,
    getOneChefById,
    updateChef,
    deleteChef
} from "../providers/ChefProvider.js";

const router = Router();

/**
 * @POST
 * @desc // create new chef
 * @access private
 */
router.post("/", createChef);

/**
 * @GET
 * @desc // get chefs
 * @access private
 */
router.get("/", getAllChefs);

/**
 * @desc Get a Chef by ID
 * @route GET /Chefs/:id
 * @access private
 */
router.get("/:id", getOneChefById);

/**
 * @PUT
 * @desc // update chef by id
 * @access private
 */
router.patch("/:id", updateChef);

/**
 * @DELETE
 * @desc // delete chef by id
 * @access private
 */
router.delete("/:id", deleteChef);

// router.post('/chef/reclamation', createReclamation);
// router.get('/chef/client',readClient);

export default router;
