import { translationKeys } from "@/Localization/International/english";
import * as Yup from "yup";
import { Resources } from "../../../../data/resources";

// Initial Data for Task Metrics
const initialTaskMetricsData = [
  {
    metricName: "Total Tasks",
    value: 100,
    icon: "pi pi-check-square",
  },
  {
    metricName: "Active Tasks",
    value: 45,
    icon: "pi pi-clock",
  },
  {
    metricName: "Completed Tasks",
    value: 55,
    icon: "pi pi-check-circle",
  },
];

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
      type: "metric",
      props: {
        resource: taskResource,
        fieldName: "status",
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
];

// Layout Configuration
export const layout = [
  { name: "Task Metrics", rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 12 },
  { name: "Task Timeline", rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 12 },
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
