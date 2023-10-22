import { AdminModel } from "../models/AdminModel.js";
import { ClientModel } from "../models/ClientModel.js";
import { TechnicienModel } from "../models/TechnicienModel.js";
import { ChefModel } from "../models/ChefModel.js";
import { ClientEntrModel } from "../models/ClientEntrepriseModel.js";
import { SuperAdminModel } from "../models/superAdminModel.js";

const modelSelcetor = (user_role) => {
    switch (user_role) {
        case "client":
            return ClientModel;
        case "technicien":
            return TechnicienModel;
        case "chef":
            return ChefModel;
        case "admin":
            return AdminModel;
        case "entreprise":
            return ClientEntrModel;
        case "superadmin":
            return SuperAdminModel;
    }
};

export default modelSelcetor;
