import { system_settings } from "../modules/system_settings/system_settings";
import { user_management_system } from "../modules/user_management_system/system";
import { construction_tracking_system } from "../modules/project_management_system/project_management_system";
export const Resources = [
...user_management_system,
...construction_tracking_system,
...system_settings,
];
