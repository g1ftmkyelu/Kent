import { Resources } from "../resources";
const projectResource = Resources.find(resource => resource.path === "projects");

export const blockConfigs = [
    {
        id: "task-kanban-block",
        name: "Projects",
        config: {
          type: "kanban",
          props: {
            resource: projectResource,
            showAddButton: false,
          },
        },
      },

];

export const layout = [
    {name: 'Projects', rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12},
 
  ];

export default {
  blockConfigs,
  layout,
};