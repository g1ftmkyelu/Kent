import { system_settings } from "../modules/system_settings/system_settings";
import { user_management_system } from "../modules/user_management_system/system";
import { chat_system } from "../modules/chat_system/chat_system";
import { construction_progress_system } from "../modules/project_management_system/project_management_system";
export const Resources = [
...user_management_system,
...construction_progress_system,
...system_settings,
...chat_system,
];
