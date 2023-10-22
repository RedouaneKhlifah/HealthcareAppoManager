import { Router } from "express";
import {
    getAllClients,
    getOneClient,
    register
} from "../controllers/ClientController.js";
import { auth } from "../middleware/AuthMiddleware.js";
import { verifyRole } from "../middleware/verifyRole.js";
import ROLE_LIST from "../config/Role_list.js";

const router = Router();

/**
 * @GET
 * @desc // get all client
 * @access private
 */

router.get(
    "/",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    getAllClients
);

/**
 * @GET
 * @desc // get one client
 * @access private
 */

router.get(
    "/:id",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    getOneClient
);

/**
 * @POST
 * @desc // Create a client
 * @access public
 */
router.post("/register", register);

export default router;
