const yup = require("yup");
const {user_management_system} = require("./modules/user_management_system/system")
const {system_settings} = require("./modules/system_settings/settings")
const {e_commerce_management_system} = require("./modules/e-commerce_management_system/system")
const {insurance_claims_management_system} = require("./modules/insurance_claims_management_system/system")
const {construction_tracking_system} = require("./modules/ProjectManagemetSystem/projectManagementSystem")
exports.Resources = [

  ...user_management_system,
  ...construction_tracking_system,
  ...system_settings

];
