import { icon } from "leaflet";
import { translationKeys } from '@/executables/translation';
import * as Yup from "yup";

export const user_management_system = [
  {
    name: "users",
    path: "users",
    icon: "pi pi-users", // Replaced "fa fa-user"
    label: translationKeys.Users,
    isUser: true,
    menuGroup: translationKeys.Users,
    menuGroupIcon: "pi pi-cog", // Replaced "fa fa-user-cog"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "undefined",
        title: translationKeys.ProfilePicture,
        type: "image",
      },
      {
        name: "fullname",
        title: translationKeys.FullName,
        type: "text",
        validation: Yup.string().required("Full Name is required."),
      },
      {
        name: "email",
        title: translationKeys.Email,
        type: "email",
        validation: Yup.string()
          .email("Invalid email format.")
          .required("Email is required."),
      },
      {
        name: "password",
        title: translationKeys.Password,
        type: "password",
        defaultValue: "password123",
        validation: Yup.string().required("Password is required."),
      },
      {
        name: "phoneNumber",
        title: translationKeys.PhoneNumber,
        type: "phone",
        validation: Yup.string().required("Phone Number is required."),
      },
      {
        name: "dateOfBirth",
        title: translationKeys.DateOfBirth,
        type: "date",
        validation: Yup.date().required("Date of Birth is required."),
      },
      {
        name: "recruitmentDate",
        title: translationKeys.RecruitmentDate,
        type: "date",
        validation: Yup.date().required("Recruitment Date is required."),
      },
      {
        name: "role",
        title: translationKeys.UserRole,
        type: "ref",
        resource: "roles",
        field: "roleName",
        validation: Yup.string().required("Role is required."),
      },
      {
        name: "status",
        title: translationKeys.Status,
        type: "ref",
        resource: "staff-statuses",
        isStatus: true,
        field: "status",
        validation: Yup.string().required("Status is required."),
      },
      {
        name: "gender",
        title: translationKeys.Gender,
        type: "ref",
        resource: "genders",
        field: "gender",
        validation: Yup.string().required("Gender is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
      {
        name:"isAccountActive",
        title: translationKeys.IsActive||"Is Account Active",
        type: "check",
      }
    ],
    renderMode: "crud",
    actions: [
      {
        name: "goToView",
        icon: "pi pi-eye",
        label: translationKeys.View || "View",
      },
      {
        name: "goToEdit",
        icon: "pi pi-pencil",
        label: translationKeys.Edit || "Edit",
      },
      {
        name: "deleteResource",
        icon: "pi pi-trash",
        label: translationKeys.Delete || "Delete",
      },
    ],
  },
  {
    name: "staff-statuses",
    path: "staff-statuses",
    icon: "pi pi-check", // Replaced "fa fa-check"
    label: translationKeys.StaffStatuses,
    menuGroup: translationKeys.Users,
    menuGroupIcon: "pi pi-cog", // Replaced "fa fa-user-cog"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "status",
        title: translationKeys.Status,
        type: "text",
        validation: Yup.string().required("Status is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "genders",
    icon: "pi pi-venus-mars", // Replaced "fa fa-venus-mars"
    path: "genders",
    label: translationKeys.Genders,
    menuGroup: translationKeys.Users,
    menuGroupIcon: "pi pi-cog", // Replaced "fa fa-user-cog"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "gender",
        title: translationKeys.Gender,
        type: "text",
        validation: Yup.string().required("Gender is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
      {
        name: "icon",
        title: translationKeys.Icon,
        type: "image",
      },
    ],
    renderMode: "crud",
    crudType: "list",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "roles",
    path: "roles",
    icon: "pi pi-bookmark", // Replaced "fa fa-bookmark"
    label: translationKeys.Roles,
    menuGroup: translationKeys.AccessControl,
    menuGroupIcon: "pi pi-shield", // Replaced "fa fa-user-shield"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "roleName",
        title: translationKeys.RoleName,
        type: "text",
        validation: Yup.string().required("Role Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
    ],
    renderMode: "crud",
    crudType: "table",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "modules",
    path: "modules",
    icon: "pi pi-sitemap", // Replaced "fa fa-cubes"
    label: translationKeys.Modules,
    menuGroup: translationKeys.AccessControl,
    menuGroupIcon: "pi pi-shield", // Replaced "fa fa-user-shield"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "moduleName",
        title: translationKeys.ModuleName,
        type: "text",
        validation: Yup.string().required("Module Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
    ],
    renderMode: "crud",
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "extra-actions",
    path: "extra-actions",
    icon: "fa fa-hammer", // Replaced "fa fa-hammer"
    label: translationKeys.ExtraActions || "Extra Actions",
    menuGroup: translationKeys.AccessControl,
    menuGroupIcon: "pi pi-shield", // Replaced "fa fa-user-shield"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "icon",
        title: translationKeys.Icon || "Icon",
        type: "icon",
        validation: Yup.string().required("Icon is required."),
      },
      {
        name: "label",
        title: translationKeys.Action || "Action Name",
        type: "text",
        validation: Yup.string().required("Action Name is required."),
      },
      {
        name: "name",
        title: translationKeys.Name || "functionName",
        type: "text",
        validation: Yup.string().required("Name is required."),
      },
      {
        name: "description",
        title: translationKeys.Description,
        type: "richtext",
      },
    ],
    renderMode: "crud",
    
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },
  {
    name: "permissions",
    path: "permissions",
    icon: "pi pi-shield", // Replaced "fa fa-user-shield"
    label: translationKeys.Permissions,
    menuGroup: translationKeys.AccessControl,
    menuGroupIcon: "pi pi-shield", // Replaced "fa fa-user-shield"
    resourceGroup: translationKeys.UserManagementSystem || "User Management",
    schema: [
      {
        name: "role",
        title: translationKeys.RoleName,
        type: "ref",
        resource: "roles",
        field: "roleName",
        validation: Yup.string().required("Role is required."),
      },
      {
        name: "module",
        title: translationKeys.ModuleName,
        type: "ref",
        resource: "modules",
        field: "moduleName",
        validation: Yup.string().required("Module is required."),
      },
      {
        name: "create",
        title: translationKeys.Create,
        type: "check",
      },
      {
        name: "read",
        title: translationKeys.Read,
        type: "check",
      },
      {
        name: "update",
        title: translationKeys.Update,
        type: "check",
      },
      {
        name: "delete",
        title: translationKeys.Delete,
        type: "check",
      },
      {
        name: "extraActions",
        title: translationKeys.ExtraActions || "Extra Actions",
        type: "tags",
        tagInputType: "refs",
        resource: "extra-actions",
        field: "label",
      },
    ],
    renderMode: "crud",

    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
  },

];
