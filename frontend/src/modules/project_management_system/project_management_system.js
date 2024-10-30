import { v4 as uuidv4 } from "uuid";
import { translationKeys } from "@/executables/translation";
import * as Yup from "yup";

export const construction_tracking_system = [
  {
    name: "projects",
    path: "projects",
    icon: "pi pi-building",
    label: "Projects",

    schema: [
      {
        name: "projectName",
        title: "Project Name",
        type: "text",
        validation: Yup.string().required("Project Name is required."),
      },
      {
        name: "projectCode",
        title: "Project Code",
        type: "text",
        defaultValue: () => `PRJT-${uuidv4().split("-")[0]}`,
        validation: Yup.string().required("Order Number is required."),
      },
      {
        name: "startDate",
        title: "Start Date",
        type: "date",
        validation: Yup.date().required("Start Date is required"),
      },
      {
        name: "expectedEndDate",
        title: "Expected Completion Date",
        type: "date",
        validation: Yup.date().required("Start Date is required"),
      },
      {
        name: "location",
        title: "Location",
        type: "text",
        validation: Yup.string().required("Location is required"),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "status",
        options: [
          { label: "Pending", value: "pending", color: "#FFD700" },
          { label: "Approved", value: "approved", color: "#007ACC" },
          { label: "Declined", value: "declined", color: "#008000" },
        ],
        validation: Yup.string().required("Status is required"),
      },
      {
        name: "milestones",
        title: "Milestones",
        type: "tags",
        tagInputType: "refs",
        resource: "milestones",
        field: "milestoneName",
        validation: Yup.string().required("Status is required"),
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required"),
      },
      {
        name: "projectManager",
        title: "Project Manager",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("Project Manager is required"),
      },

    ],
    renderMode: "crud",
   layout: {
    rows: 3,
    columns: 5,
    fields: {
      projectName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
      projectCode: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
      startDate: { rowStart: 1, colStart: 4, rowSpan: 1, colSpan: 1 },
      expectedEndDate: { rowStart: 1, colStart: 5, rowSpan: 1, colSpan: 1 },
      location: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
      status: { rowStart: 2, colStart: 3, rowSpan: 1, colSpan: 1 },
      projectManager: { rowStart: 2, colStart: 4, rowSpan: 1, colSpan: 2 },
      description: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 7 },
    },
    actions: [
      {
        name: "user_actions",
        rowStart: 1,
        rowSpan: 1,
        colStart: 5,
        colSpan: 1,
        alignment: "top-right",
        actions: [
          { name: "goToView", icon: "pi pi-key", label: "View" },
          { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
          { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
        ],
        orientation: "dropdown",
        style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
      },
    ],
  },
  },

  {
    name: "milestones",
    path: "milestones",
    icon: "pi pi-flag",
    label: "Milestones",

    schema: [
      {
        name: "milestoneName",
        title: "Milestone Name",
        type: "text",
        validation: Yup.string().required("Milestone Name is required"),
      },
      {
        name: "dueDate",
        title: "Due Date",
        type: "date",
        validation: Yup.date().required("Due Date is required"),
      },
      {
        name: "completionPercentage",
        title: "Completion Percentage",
        type: "number",
        validation: Yup.number().required("Completion Percentage is required"),
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required"),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "status",
        options: [
          { label: "Pending", value: "pending", color: "#FFD700" },
          { label: "In Progress", value: "inProgress", color: "#007ACC" },
          { label: "Completed", value: "completed", color: "#008000" },
          { label: "Failed", value: "failed", color: "#FF6347" },
          { label: "On Hold", value: "onHold", color: "#008080" },
        ],
        validation: Yup.string().required("Status is required"),
      },
      {
        name: "tasks",
        title: "Tasks",
        type: "tags",
        tagInputType: "refs",
        resource: "tasks",
        field: "taskName",
        validation: Yup.string().required("Status is required"),
      },
    ],
    layout:{
      rows: 3,
      columns: 4,
      fields: {
        milestoneName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
        dueDate: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
        completionPercentage: { rowStart: 2, colStart: 3, rowSpan: 1, colSpan: 1 },
        description: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
        status: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 3 },
        tasks: { rowStart: 4, colStart: 1, rowSpan: 2, colSpan: 4 }
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 4,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" }
          ],
          orientation: "dropdown",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;"
        }
      ]
    },
    renderMode: "crud",
  },

  {
    name: "tasks",
    path: "tasks",
    icon: "pi pi-list",
    label: "Tasks",

    schema: [
      {
        name: "taskName",
        title: "Task Name",
        type: "text",
        validation: Yup.string().required("Task Name is required"),
      },
      {
        name: "team",
        title: "Assigned Team",
        type: "ref",
        resource: "teams",
        field: "teamName",
        validation: Yup.string().required("Assigned Team is required"),
      },
      {
        name: "startDate",
        title: "Start Date",
        type: "date",
        validation: Yup.date().required("Start Date is required"),
      },
      {
        name: "dueDate",
        title: "Due Date",
        type: "date",
        validation: Yup.date().required("Due Date is required"),
      },
      {
        name: "priority",
        title: "Priority",
        type: "status",
        options: [
          { label: "Low", value: "low", color: "#FFD700" },
          { label: "Medium", value: "medium", color: "#007ACC" },
          { label: "High", value: "high", color: "#008000" },
          { label: "Critical", value: "critical", color: "#FF6347" },
        ],
        validation: Yup.string().required("Priority is required"),
      },
      {
        name: "status",
        title: "Status",
        type: "status",
        options: [
          { label: "Pending", value: "pending", color: "#FFD700" },
          { label: "In Progress", value: "inProgress", color: "#007ACC" },
          { label: "Completed", value: "completed", color: "#008000" },
          { label: "Failed", value: "failed", color: "#FF6347" },
          { label: "On Hold", value: "onHold", color: "#008080" },
        ],
        validation: Yup.string().required("Status is required"),
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required"),
      },
    ],
    layout: {
      rows: 4,
      columns: 4,
      fields: {
        taskName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
        team: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 2 },
        startDate: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
        dueDate: { rowStart: 2, colStart: 3, rowSpan: 1, colSpan: 2 },
        priority: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 2 },
        status: { rowStart: 3, colStart: 3, rowSpan: 1, colSpan: 2 },
        description: { rowStart: 4, colStart: 1, rowSpan: 1, colSpan: 4 },
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 4,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "dropdown",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
    renderMode: "crud",
  },
  {
    name: "teams",
    path: "teams",
    icon: "pi pi-users",
    label: "Teams",

    schema: [
      {
        name: "teamName",
        title: "Team Name",
        type: "text",
        validation: Yup.string().required("Team Name is required"),
      },
      {
        name: "teamLead",
        title: "Team Lead",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("Team Lead is required"),
      },
      {
        name: "members",
        title: "Team Members",
        type: "tags",
        tagInputType: "refs",
        resource: "users",
        field: "fullname",
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required"),
      },
    ],
    layout: {
      rows: 2,
      columns: 2,
      fields: {
        teamName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        teamLead: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        members: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
        description: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 2 },
        teamMembers: { rowStart: 4, colStart: 1, rowSpan: 1, colSpan: 2 },
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 2,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "buttons",
        },
      ],
    },
    renderMode: "crud",
  },
  {
    name: "budget",
    path: "budget",
    icon: "fa fa-money-bill",
    label: "Budget",
    menuGroup: "Finance",
    menuGroupIcon: "fa fa-dollar-sign",
    schema: [
      {
        name: "project",
        title: "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
        validation: Yup.string().required("Project is required"),
      },
      {
        name: "totalBudget",
        title: "Total Budget",
        type: "number",
        validation: Yup.number().required("Total Budget is required"),
      },
      {
        name: "spentAmount",
        title: "Spent Amount",
        type: "number",
        validation: Yup.number().required("Spent Amount is required"),
      },
      {
        name: "remainingAmount",
        title: "Remaining Amount",
        type: "number",
        validation: Yup.number().required("Remaining Amount is required"),
      },
      {
        name: "currency",
        title: "Currency",
        type: "text",
        validation: Yup.string().required("Currency is required"),
      },
      {
        name: "lastUpdated",
        title: "Last Updated",
        type: "date",
        validation: Yup.date().required("Last Updated is required"),
      },
      {
        name: "notes",
        title: "Notes",
        type: "richtext",
        validation: Yup.string().required("Notes is required"),
      },
    ],
    layout: {
      rows: 8,
      columns: 2,
      fields: {
        projectName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        totalBudget: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        spentAmount: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 1 },
        remainingAmount: { rowStart: 4, colStart: 1, rowSpan: 1, colSpan: 1 },
        currency: { rowStart: 5, colStart: 1, rowSpan: 1, colSpan: 1 },
        lastUpdated: { rowStart: 6, colStart: 1, rowSpan: 1, colSpan: 1 },
        notes: { rowStart: 7, colStart: 1, rowSpan: 1, colSpan: 1 },
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 2,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "dropdown",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
    renderMode: "crud",
  },

  {
    name: "injuries",
    path: "injuries",
    icon: "pi pi-exclamation-triangle",
    label: translationKeys.Injuries || "Injuries",

    renderMode: "crud",
    schema: [
      {
        name: "incidentType",
        title: translationKeys.IncidentType || "Incident Type",
        type: "select",
        options: [
          { label: "Slip and Fall", value: "slip_fall" },
          { label: "Equipment Malfunction", value: "equipment_malfunction" },
          { label: "Fire Hazard", value: "fire_hazard" },
          { label: "Chemical Exposure", value: "chemical_exposure" },
          { label: "Electrical Shock", value: "electrical_shock" },
          { label: "Cuts and Lacerations", value: "cuts_lacerations" },
        ],
        validation: Yup.string().required("Incident type is required"),
      },
      {
        name: "location",
        title: translationKeys.Location || "Location",
        type: "text",
        validation: Yup.string().required("Location is required"),
      },
      {
        name: "severity",
        title: translationKeys.Severity || "Severity",
        type: "status",
        options: [
          { label: "low", value: "low", color: "#FFD700" },
          { label: "medium", value: "medium", color: "#007ACC" },
          { label: "high", value: "high", color: "#008000" },
          { label: "critical", value: "critical", color: "#FF6347" },
        ],
        validation: Yup.string().required("Severity is required"),
      },
      {
        name: "date",
        title: translationKeys.Date || "Date",
        type: "date",
        validation: Yup.date().required("Date is required"),
      },
    ],
    layout: {
      rows: 1,
      columns: 5,
      fields: {
        location: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
        severity: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
        date: { rowStart: 1, colStart: 4, rowSpan: 1, colSpan: 1 },
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 5,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "dropdown",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
  },

  {
    name: "material_inquiries",
    path: "material_inquiries",
    icon: "pi pi-box",
    label: translationKeys.MaterialInquiries || "Material Inquiries",

    renderMode: "crud",
    schema: [
      {
        name: "materialName",
        title: translationKeys.MaterialName || "Material Name",
        type: "text",
        validation: Yup.string().required("Material name is required"),
      },
      {
        name: "quantity",
        title: translationKeys.Quantity || "Quantity",
        type: "number",
        validation: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
      },
      {
        name: "inquiryDate",
        title: translationKeys.InquiryDate || "Inquiry Date",
        type: "date",
        validation: Yup.date().required("Inquiry date is required"),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "status",
        options: [
          { label: "Pending", value: "pending", color: "#FFD700" },
          { label: "Approved", value: "approved", color: "#007ACC" },
          { label: "Declined", value: "declined", color: "#008000" },
        ],
        validation: Yup.string().required("Status is required"),
      },
    ],
    layout: {
      rows: 3,
      columns: 3,
      fields: {
        materialName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
        supplier: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
        quantity: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        inquiryDate: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 2 },
        status: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 3 },
      },
      actions: [
        {
          name: "user_actions",
          rowStart: 1,
          rowSpan: 1,
          colStart: 3,
          colSpan: 1,
          alignment: "top-right",
          actions: [
            { name: "goToView", icon: "pi pi-key", label: "View" },
            { name: "goToEdit", icon: "pi pi-eye", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "dropdown",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
  },
  {
    name: "reports",
    path: "reports",
    icon: "pi pi-calendar",
    label: translationKeys.DailyReports || "Reports",

    renderMode: "crud",
    schema: [
      {
        name: "type",
        title: translationKeys.ReportType || "Report Type",
        type: "select",
        options: [
          { label: "Weekly Report", value: "weeklyReport" },
          { label: "Monthly Report", value: "monthlyReport" },
          { label: "Daily Report", value: "dailyReport" },
          { label: "Annual Report", value: "annualReport" },
        ],
      },
      {
        name: "supervisor",
        title: translationKeys.Supervisor || "Supervisor",
        type: "text",
        validation: Yup.string().required("Supervisor name is required"),
      },
      {
        name: "weatherConditions",
        title: translationKeys.WeatherConditions || "Weather Conditions",
        type: "select",
        options: [
          { label: "Sunny", value: "sunny" },
          { label: "Cloudy", value: "cloudy" },
          { label: "Rainy", value: "rainy" },
          { label: "Stormy", value: "stormy" },
        ],
        validation: Yup.string().required("Weather conditions are required"),
      },
      {
        name: "workCompleted",
        title: translationKeys.WorkCompleted || "Work Completed",
        type: "richtext",
        validation: Yup.string().required("Work completed is required"),
      },
      {
        name: "issues",
        title: translationKeys.Issues || "Issues",
        type: "richtext",
        validation: Yup.string(),
      },
      {
        name: "safetyIncidents",
        title: translationKeys.SafetyIncidents || "Safety Incidents",
        type: "select",
        options: [
          { label: "None", value: "none" },
          { label: "Minor", value: "minor" },
          { label: "Major", value: "major" },
        ],
        validation: Yup.string().required("Safety incidents are required"),
      },
    ],
layout:{
  rows: 2,
  columns: 3,
  fields: {
    // Top Row
    reportDate: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 1,
      colSpan: 1
    },
    supervisor: {
      rowStart: 1, 
      colStart: 1,
      rowSpan: 1,
      colSpan: 1
    },

 
    // Middle Row
    weatherConditions: {
      rowStart: 1,
      colStart: 1,
      rowSpan: 1,
      colSpan: 1
    },
    workCompleted: {
      rowStart: 2,
      colStart: 1,
      rowSpan: 1,
      colSpan: 2
    },
 

    safetyIncidents: {
      rowStart: 3,
      colStart: 3,
      rowSpan: 1,
      colSpan: 1
    }
  },
 
  actions: [
    {
      name: "user_actions",
      orientation: "dropdown",
        alignment: "top-right",
        
        rowStart: 1,
        colStart: 3,
        rowSpan: 1,
        colSpan: 1,
      items: [
        {
          name: "goToView",
          icon: "pi pi-eye",
          label: "View"
        },
        {
          name: "goToEdit", 
          icon: "pi pi-pencil",
          label: "Edit"
        },
        {
          name: "deleteResource",
          icon: "pi pi-trash",
          label: "Delete"
        }
      ]
    }
  ]
 }
  },
];
