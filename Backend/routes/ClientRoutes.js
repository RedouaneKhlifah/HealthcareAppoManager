import { Router } from "express";
import { allClient, createClient } from "../controllers/ClientController.js";

const router = Router();

/**
 * @GET
 * @desc // get all client
 * @access private
 */

router.get("/", allClient);

/**
 * @POST
 * @desc // Create a client
 * @access private
 */
router.post("/", createClient);

export default router;
