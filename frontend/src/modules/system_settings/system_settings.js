import { translationKeys } from '@/executables/translation';

export const system_settings = [
  {
    name: "notifications",
    path: "notifications",
    icon: "fa fa-bell", 
    resourceGroup: translationKeys.SystemSettings || "System",
    label: translationKeys.Notifications||"Notifications",
    renderMode: "notifications",
  },
  {
    name: "company-config",
    path: "company-config",
    icon: "pi pi-building", // Replaced "fa fa-building"
    label: translationKeys.CompanyConfiguration,
    menuGroup: translationKeys.Settings,
    menuGroupIcon: "pi pi-cog", // Replaced "fa fa-cog"
    resourceGroup: translationKeys.SystemSettings || "System Settings",
    schema: [
      {
        name: "logo",
        title: translationKeys.CompanyLogo,
        type: "image",
      },
      {
        name: "companyName",
        title: translationKeys.CompanyName,
        type: "text",
      },
      {
        name: "companyGoogleMapLink",
        title: translationKeys.CompanyGoogleMapLink,
        type: "text",
      },
      {
        name: "companyEmails",
        title: translationKeys.CompanyEmails,
        type: "object array",
        schema: [
          {
            name: "name",
            title: translationKeys.Name,
            type: "text",
          },
          {
            name: "email",
            title: translationKeys.Email,
            type: "email",
          },
        ],
      },

      {
        name: "companyPhoneNumbers",
        title: translationKeys.CompanyPhoneNumbers,
        type: "object array",
        schema: [
          {
            name: "name",
            title: translationKeys.Name,
            type: "text",
          },
          {
            name: "phoneNumber",
            title: translationKeys.PhoneNumber,
            type: "text",
          },
        ],
      },
      {
        name: "companySocialMediaLinks",
        title: translationKeys.CompanySocialMediaLinks,
        type: "object array",
        schema: [
          {
            name: "icon",
            title: translationKeys.Icon,
            type: "icon",
          },
          {
            name: "name",
            title: translationKeys.Name,
            type: "text",
          },
          {
            name: "link",
            title: translationKeys.Link,
            type: "text",
          },
        ],
      },
      {
        name: "companyAddress",
        title: translationKeys.CompanyAddress,
        type: "richtext",
      },
      {
        name: "companyLocation",
        title: translationKeys.Location,
        type: "richtext",
      },
      {
        name: "companyMotto",
        title: translationKeys.Motto,
        type: "richtext",
      },
    ],
    renderMode: "singleton",
  },
  {
    name: "system-config",
    path: "system-config",
    icon: "pi pi-cog", // Replaced "fa fa-cog"
    label: translationKeys.SystemConfiguration,
    menuGroup: translationKeys.Settings,
    menuGroupIcon: "pi pi-wrench", // Replaced "fa fa-wrench"
    renderMode: "system-config",
    resourceGroup: translationKeys.SystemSettings || "System Settings",
  },

];
