import { translationKeys } from "@/Localization/International/english";
import * as Yup from "yup";
import { Resources } from "../resources";
import { max } from "date-fns";

import {
  blockConfigs as adminBlockConfigs,
  layout as adminLayout,
} from "../../components/portal/dashboards/DashboardConfigs/admin";
import {
  blockConfigs as siteWorkerBlockConfigs,
  layout as siteWorkerLayout,
} from "../../components/portal/dashboards/DashboardConfigs/siteWorker";
import {
  blockConfigs as projectManagerBlockConfigs,
  layout as projectManagerLayout,
} from "../../components/portal/dashboards/DashboardConfigs/projectManager";

// Task Resource
const taskResource = Resources.find((resource) => resource.path === "tasks");

// Task Metrics Resource
const taskMetricsResource = {
  name: "Task Metrics",
  path: "task-metrics",
  icon: "pi pi-chart-line",
  label: translationKeys.TaskMetrics || "Task Metrics",
  menuGroup: translationKeys.Metrics || "Metrics",
  menuGroupIcon: "pi pi-chart-bar",
  schema: [
    {
      name: "metricName",
      title: translationKeys.MetricName || "Metric Name",
      type: "text",
      validation: Yup.string().required("Metric name is required"),
    },
    {
      name: "value",
      title: translationKeys.Value || "Value",
      type: "text",
      validation: Yup.string().required("Value is required"),
    },
    {
      name: "icon",
      title: translationKeys.Icon || "Icon",
      type: "icon",
      validation: Yup.string().required("Icon is required"),
    },
  ],
  layout: {
    rows: 1,
    columns: 12,
    fields: {
      metricName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 4 },
      value: { rowStart: 1, colStart: 5, rowSpan: 1, colSpan: 4 },
      icon: { rowStart: 1, colStart: 9, rowSpan: 1, colSpan: 4 },
    },
  },
};

// Block Configurations
export const blockConfigs = [
  {
    id: "task-metrics-block",
    name: "Task Metrics",
    config: {
      type: "data-group",
      props: {
        resource: taskResource,
        fieldName: "status",
        displayMode: "grid",
        maxDisplayItems: 3,
        showHeader: false,
        layout: taskMetricsResource.layout,
      },
    },
  },
  {
    id: "task-crud-block",
    name: "Task CRUD",
    title: "Task CRUD",
    config: {
      type: "dynamic-crud",
      props: {
        resource: taskResource,
        fieldName: "status",
        defaultPageSize: 6,
      },
    },
  },
  {
    id: "task-timeline-block",
    name: "Task Timeline",
    title: "Task Activity Timeline",
    config: {
      type: "timeline",
      props: {
        resource: taskResource,
        showHeader: false,
        layout: taskResource.layout,
        maxDisplayItems: 10,
        useApi: true,
        showMoreLink: true,
      },
    },
  },
  {
    id: "tabs",
    name: "Tabs",
    config: {
      type: "block-modal",
      props: {
        blocks: [
          {
            key: "tab1",
            title: "Dashboard 1",
            blockConfigs: adminBlockConfigs,
            layout: adminLayout,
            rows: 12,
            columns: 12,
            rowHeight: 60,
            gap: "10px",
          },
          {
            key: "tab2",
            title: "Dashboard 2",
            blockConfigs: siteWorkerBlockConfigs,
            layout: siteWorkerLayout,
            rows: 12,
            columns: 12,
            rowHeight: 60,
            gap: "10px",
          },
          {
            key: "tab3",
            title: "Dashboard 3",
            blockConfigs: projectManagerBlockConfigs,
            layout: projectManagerLayout,
            rows: 12,
            columns: 12,
            rowHeight: 60,
            gap: "10px",
          },
          {
            key: "tab4",
            title: "Dashboard 4",
            blockConfigs: [
              {
                id: "pie",
                name: "Task Pie",
                config: {
                  type: "distribution-chart",
                  props: {
                    resource: taskResource,
                    fieldName: "status",
                    chartType: "donut",
                    showHeader: false,
                  },
                },
  
              },
            ],
            layout: [
                {name: "Task Pie", rowStart: 1, colStart: 1, rowSpan: 12, colSpan: 12},
            ],
            rows: 12,
            columns: 12,
            rowHeight: 60,
            gap: "10px",
          }
        ],
      },
    },
  },
];

// Layout Configuration
//col=12
//row=12
export const layout = [
  {
    name: "Task Metrics",
    rowStart: 1,
    colStart: 1,
    rowSpan: 1,
    colSpan: 12,
  },
  {
    name: "Tabs",
    rowStart: 2,
    colStart: 1,
    rowSpan: 1,
    colSpan: 8,
  },
  {
    name: "Task Timeline",
    rowStart: 2,
    colStart: 9,
    rowSpan: 1,
    colSpan: 4,
  },
];

// Dashboard Configuration
export const dashboardConfig = {
  title: "Task Dashboard",
  refreshInterval: 300000, // 5 minutes
  allowExport: true,
  exportFormats: ["pdf", "excel"],
  notifications: {
    enabled: true,
    position: "top-right",
    defaultDuration: 5000,
    types: {
      task: {
        icon: "pi pi-check-square",
        severity: "info",
      },
    },
  },
  filters: {
    enabled: true,
    defaultFilters: ["date", "status"],
    customFilters: [
      {
        name: "priority",
        type: "select",
        options: ["High", "Medium", "Low"],
      },
      {
        name: "status",
        type: "select",
        options: ["New", "In Progress", "Completed"],
      },
    ],
  },
  theme: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745",
    warning: "#ffc107",
    danger: "#dc3545",
    info: "#17a2b8",
  },
};

export default {
  blockConfigs,
  layout,
  dashboardConfig,
};
