import { Resources } from "../resources";
const material_inquiryResource = Resources.find(resource => resource.path === "material_inquiries");
const injuriesResource = Resources.find(resource => resource.path === "injuries");
const dailyReportResource = Resources.find(resource => resource.path === "reports");

export const blockConfigs = [
  {
    id: "kanban-tabs-block",
    name: "Project Reports",
    config: {
      type: "block-accordion",
      props: {
        sections: [
          {
            key: "material-inquiries",
            title: "Material Inquiries",
            blockConfigs: [
              {
                id: "inquries-kanban-block",
                name: "Material Inquiries",
                config: {
                  type: "kanban",
                  props: {
                    resource: material_inquiryResource,
                    showAddButton: false,
                  },
                },
              }
            ],
            layout: [
              {name: "Material Inquiries", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
          {
            key: "injuries",
            title: "Injuries",
            blockConfigs: [
              {
                id: "injuries-kanban-block",
                name: "Injuries",
                config: {
                  type: "data-group",
                  props: {
                    resource: injuriesResource,
                    showAddButton: false,
                    showHeader: false,
                  },
                },
              }
            ],
            layout: [
              {name: "Injuries", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
          {
            key: "daily-reports",
            title: "Daily Reports",
            blockConfigs: [
              {
                id: "daily-reports-kanban-block",
                name: "Daily Reports",
                config: {
                  type: "data-group",
                  props: {
                    resource: dailyReportResource,
                    showAddButton: false,
                    showHeader: false,
                  },
                },
              }
            ],
            layout: [
              {name: "Daily Reports", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
        ]
      }
    }
  }
];

export const layout = [
  {name: 'Project Reports', rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12},
];

export default {
  blockConfigs,
  layout,
};