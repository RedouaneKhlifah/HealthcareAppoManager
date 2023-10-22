import express from "express";
import Succurcal from "./SuccurcalRoutes.js";
import Service from "./ServiceRoutes.js";
import ExigenceService from "./ExigenceServiceRoutes.js";
import Client from "./ClientRoutes.js";
import Admin from "./AdminRoutes.js";
import Technicien from "./TechnicienRoutes.js";
import Chef from "./ChefRoutes.js";
import Login from "./LoginRoutes.js";
import ROLE_LIST from "../config/Role_list.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { auth } from "../middleware/AuthMiddleware.js";
import Company from "./ClientEntrepriseRoutes.js";

const router = express.Router();

router.use("/login", Login);
router.use("/succurcal", Succurcal);
router.use("/client", Client);
router.use("/service", Service);
router.use("/ExigenceService", ExigenceService);
router.use("/admin", auth, verifyRole(ROLE_LIST.admin), Admin);
router.use("/chef", Chef);
router.use("/admin", Admin);
router.use("/technicien", Technicien);
router.use("/company", Company);

export default router;
