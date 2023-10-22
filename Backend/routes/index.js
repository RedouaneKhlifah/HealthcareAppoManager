import express from "express";
import Succurcal from "./SuccurcalRoutes.js";
import Service from "./ServiceRoutes.js";
import ExigenceService from "./ExigenceServiceRoutes.js";
import Client from "./ClientRoutes.js";
import Admin from "./AdminRoutes.js";
import Technicien from "./TechnicienRoutes.js";
import Chef from "./ChefRoutes.js";
import User from "./UserRoutes.js";
import ROLE_LIST from "../config/Role_list.js";
import { verifyRole } from "../middleware/verifyRole.js";
import { auth } from "../middleware/AuthMiddleware.js";
import Entreprise from "./ClientEntrepriseRoutes.js";

const router = express.Router();

router.use("/user", User);
router.use(
    "/succurcal",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    Succurcal
);
router.use("/client", Client);
router.use(
    "/service",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    Service
);
router.use(
    "/ExigenceService",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    ExigenceService
);

router.use(
    "/chef",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    Chef
);
router.use(
    "/admin",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    Admin
);
router.use(
    "/technicien",
    auth,
    verifyRole([ROLE_LIST.admin, ROLE_LIST.superadmin]),
    Technicien
);
router.use("/Entreprise", Entreprise);

export default router;
