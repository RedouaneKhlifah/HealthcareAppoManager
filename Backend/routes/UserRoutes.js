import Router from "express";
import {
    login,
    logout,
    getUserProfile,
    register
} from "../controllers/userController.js";
import { auth } from "../middleware/AuthMiddleware.js";
import { superAdminLogin } from "../controllers/superAdminController.js";

const router = Router();

/**
 * @get
 * @desc // get User Profile
 * @access private
 */

router.get("/userProfile", auth, getUserProfile);

/**
 * @POST
 * @desc // Login
 * @access public
 */
router.post("/register", register);

/**
 * @POST
 * @desc // Login
 * @access public
 */
router.post("/login", login);

/**
 * @POST
 * @desc // Login super admin
 * @access public
 */
router.post("/superAdmin/login", superAdminLogin);

/**
 * @POST
 * @desc // log out
 * @access private
 */
router.post("/logout", auth, logout);

export default router;
