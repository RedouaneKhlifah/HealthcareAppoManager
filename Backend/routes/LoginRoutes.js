import Router from "express";
import {Auth} from "../controllers/auth/auth.js";

const router = Router();

/**
 * @POST
 * @desc // Login and save token
 * @access private
 */

router.post("/", Auth);

export default router;
