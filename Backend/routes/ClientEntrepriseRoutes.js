import express from "express";
import {
    getAllEntreprises,
    getOneEntreprises
} from "../controllers/ClientEntrepriseController.js";

const router = express.Router();

router.get("/", getAllEntreprises);

router.get("/", getOneEntreprises);

export default router;
