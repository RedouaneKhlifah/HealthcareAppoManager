import { Router } from "express";

import {
    getAllSuccurcal,
    getOneSuccurcal,
    CreateSuccurcal,
    UpdateSuccurcal,
    DeleteSuccurcal
} from "../providers/SuccurcalProvider.js";

const router = Router();

/**
 * @GET
 * @desc // get all Succurcals
 * @access public
 */
router.get("/", getAllSuccurcal);

/**
 * @GET
 * @desc // get one Succurcal
 * @access public
 */
router.get("/:id", getOneSuccurcal);

/**
 * @POST
 * @desc // create a new Succurcal
 * @access private
 */
router.post("/", CreateSuccurcal);

/**
 * @PATCH
 * @desc // update a Succurcal
 * @access private
 */
router.patch("/:id", UpdateSuccurcal);

/**
 * @DELETE
 * @desc // Delete a Succurcal
 * @access private
 */
router.delete("/:id", DeleteSuccurcal);


export default router;
