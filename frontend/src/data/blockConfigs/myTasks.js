import { Resources } from "../resources";
const taskResource = Resources.find(resource => resource.path === "tasks");

export const blockConfigs = [
    {
        id: "task-metrics-block",
        name: "Task Metrics",
        config: {
          type: "metric",
          props: {
            resource: taskResource,
            fieldName: "status",
          },
        },
      },
  {
    id: 'task-pie-chart',
    name: 'Task Distribution',
    title: 'Task Distribution',
    config: {
      type: 'distribution-chart',
      props: {
        resource: taskResource,
        fieldName: "status",
        chartType: "bar",
        showHeader: false,
      }
    }
  },
  {
    id: 'my-tasks-block',
    name: 'My Tasks',
    title: 'Tasks Management',
    config: {
      type: 'block-tabs',
      props: {
        tabs: [
          {
            key: "all-tasks",
            title: "All Tasks",
            blockConfigs: [
              {
                id: 'all-tasks-list',
                name: 'All Tasks List',
                config: {
                  type: 'dynamic-crud',
                  props: {
                    resource: taskResource,
                    layout: taskResource.layout,
                    useApi: true,
                    showMoreLink: false,
                    showHeader: false,
                    defaultPageSize: 10
                  }
                }
              }
            ],
            layout: [
              {name: "All Tasks List", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
          {
            key: "Pending",
            title: "pending",
            blockConfigs: [
              {
                id: 'pending-tasks',
                name: 'Pending Tasks',
                config: {
                  type: 'data-group',
                  props: {
                    resource: taskResource,
                    layout: taskResource.layout,
                    useApi: true,
                    showMoreLink: false,
                    showHeader: false,
                    maxDisplayItems: 10,
                    presetFilters: {
                      status: 'pending'
                    }
                  }
                }
              }
            ],
            layout: [
              {name: "Pending Tasks", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
          {
            key: "in-progress",
            title: "In Progress",
            blockConfigs: [
              {
                id: 'in-progress-tasks',
                name: 'In Progress Tasks',
                config: {
                  type: 'data-group',
                  props: {
                    resource: taskResource,
                    layout: taskResource.layout,
                    useApi: true,
                    showMoreLink: false,
                    showHeader: false,
                    maxDisplayItems: 10,
                    presetFilters: {
                      status: 'inProgress'
                    }
                  }
                }
              }
            ],
            layout: [
              {name: "In Progress Tasks", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          },
          {
            key: "completed",
            title: "Completed",
            blockConfigs: [
              {
                id: 'completed-tasks',
                name: 'Completed Tasks',
                config: {
                  type: 'data-group',
                  props: {
                    resource: taskResource,
                    layout: taskResource.layout,
                    useApi: true,
                    showMoreLink: false,
                    showHeader: false,
                    maxDisplayItems: 10,
                    presetFilters: {
                      status: 'completed'
                    }
                  }
                }
              }
            ],
            layout: [
              {name: "Completed Tasks", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12}
            ]
          }
        ]
      }
    }
  },
  {
    id: 'task-timeline-block',
    name: 'Task Timeline',
    title: 'Task Activity Timeline',
    config: {
      type: 'timeline',
      props: {
        resource: taskResource,
        showHeader: false,
        layout: taskResource.layout,
        maxDisplayItems: 4,
        useApi: true,
        showMoreLink: true,
      },
    },
  }
];

export const layout = [
    {name: 'My Tasks', rowStart: 1, colStart: 1, rowSpan: 2, colSpan: 8},
    {name: 'Task Distribution', rowStart: 1, colStart: 9, rowSpan: 1, colSpan: 4},
    {name: 'Task Timeline', rowStart: 2, colStart: 9, rowSpan: 1, colSpan: 4},
  ];

export default {
  blockConfigs,
  layout,
};