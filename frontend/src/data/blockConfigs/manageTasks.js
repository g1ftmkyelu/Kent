import { Resources } from "../resources";
const taskResource = Resources.find(resource => resource.path === "tasks");

export const blockConfigs = [
    {
        id: "task-kanban-block",
        name: "Tasks",
        config: {
          type: "kanban",
          props: {
            resource: taskResource,
            showAddButton: false,
          },
        },
      },

];

export const layout = [
    {name: 'Tasks', rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12},
 
  ];

export default {
  blockConfigs,
  layout,
};