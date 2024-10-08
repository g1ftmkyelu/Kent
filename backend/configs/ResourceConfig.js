const {user_management_system} = require("./modules/user_management_system/system")
const {system_settings} = require("./modules/system_settings/settings")
const {construction_progress_system} = require("./modules/project_management_system/project_management_system")
exports.Resources = [
  ...user_management_system,
  ...construction_progress_system,
  ...system_settings

];
