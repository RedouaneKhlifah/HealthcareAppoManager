import {
    ServiceModel,
    ExigenceServiceModel,
    AdminModel,
    ClientModel,
    UserModel,
    TechnicienModel,
    ChefModel,
    SuccurcalModel,
    ClientEntrModel,
    SuperAdminModel
} from "./index.js";

/**
 * @models {ClientModel} , {UserModel}
 * @type one to one association
 * @desc store association on property user inside object clientModel
 * @access private
 */

ClientModel.user = ClientModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,
    scope: { role: "client" }
});
UserModel.client = UserModel.belongsTo(ClientModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {ClientModel} , {UserModel}
 * @type one to one association
 * @desc store association on property user inside object clientModel
 * @access private
 */
SuperAdminModel.user = SuperAdminModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,
    scope: { role: "superAdmin" }
});
UserModel.SuperAdminModel = UserModel.belongsTo(ClientModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {AdminModel} , {UserModel}
 * @type one to one association
 * @desc ....
 * @access private
 */

AdminModel.user = AdminModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,

    scope: { role: "admin" }
});
UserModel.admin = UserModel.belongsTo(AdminModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {ChefModel} , {UserModel}
 * @type one to one association
 * @desc store association on property user inside object ChefModel
 * @access private
 */

ChefModel.user = ChefModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,
    scope: { role: "chef" }
});

UserModel.Chef = UserModel.belongsTo(ChefModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {TechnicienModel} , {UserModel}
 * @type one to one association
 * @desc store association on property user inside object TechnicienModel
 * @access private
 */

TechnicienModel.user = TechnicienModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,
    scope: { role: "technicien" }
});
UserModel.technicien = UserModel.belongsTo(TechnicienModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {SuccurcalModel} , {ChefModel}
 * @type one to one association
 * @description Establishes a "belongsTo" association where a Succursal has many Chefs.
 * @access private
 */

SuccurcalModel.hasOne(ChefModel, {
    constraints: false
});
ChefModel.belongsTo(SuccurcalModel);

/**
 * @models {ClientEntrModel} , {UserModel}
 * @type one to one association
 * @desc store association on property user inside object ClientEntrepriseModel
 * @access public
 */
ClientEntrModel.user = ClientEntrModel.hasOne(UserModel, {
    foreignKey: "actor_id",
    constraints: false,
    scope: { role: "entreprise" }
});
UserModel.entreprise = UserModel.belongsTo(ClientEntrModel, {
    foreignKey: "actor_id",
    constraints: false
});

/**
 * @models {SuccurcalModel} , {ServiceModel}
 * @type many to many association
 * @desc store association on  table pivot
 * @access private
 */

SuccurcalModel.belongsToMany(ServiceModel, {
    through: "SuccurcalServicePivot"
});
ServiceModel.belongsToMany(SuccurcalModel, {
    through: "SuccurcalServicePivot"
});

/**
 * @models {ServiceModel} , {ExigenceServiceModel}
 * @type many to many association
 * @desc store association on  table pivot
 * @access private
 */

ServiceModel.hasMany(ExigenceServiceModel, {
    onDelete: "CASCADE"
});
ExigenceServiceModel.belongsTo(ServiceModel);

/**
 * @models {SuccurcalModel} , {TechnicienModel}
 * @type has many association
 * @desc store SuccurcalModel id in TechnicienModel
 * @access private
 */

SuccurcalModel.hasMany(TechnicienModel);
TechnicienModel.belongsTo(SuccurcalModel);
