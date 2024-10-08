import { v4 as uuidv4 } from "uuid";
import { translationKeys } from "@/executables/translation";
import * as Yup from "yup";

export const construction_progress_system = [
  {
    name: "projects",
    path: "projects",
    icon: "pi pi-building",
    label: translationKeys.Projects || "Projects",
    resourceGroup: translationKeys.ConstructionSystem || "construction",
    schema: [
      {
        name: "image",
        title: translationKeys.Image || "Image",
        type: "image",
        validation: Yup.string().required("Image is required."),
      },
      {
        name: "projectName",
        title: translationKeys.ProjectName || "Project Name",
        type: "text",
        validation: Yup.string().required("Project Name is required."),
      },
      {
        name: "manager",
        title: translationKeys.Manager || "Manager",
        type: "me",
        defaultValue: 'current_user_id',
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
      },
      {
        name: "startDate",
        title: translationKeys.StartDate || "Start Date",
        type: "date",
        validation: Yup.date().required("Start Date is required."),
      },
      {
        name: "endDate",
        title: translationKeys.EndDate || "End Date",
        type: "date",
        validation: Yup.date().min(
          Yup.ref('startDate'),
          "End Date must be after Start Date"
        ),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Planning", value: "planning" },
          { label: "In Progress", value: "in_progress" },
          { label: "On Hold", value: "on_hold" },
          { label: "Completed", value: "completed" },
        ],
        defaultValue: "planning",
        validation: Yup.string().required("Status is required."),
      },
    ],
    isPortal: true,
    portalDefinition: {
      name: "projects",
      url: "/projects",
      type: "default",
      icon: "pi pi-building",
    },
    renderMode: "crud",
    pivot: {
      field: "manager",
      value: 'current_user_id'
    },
    actions: [
      { view: "goToView" },
      { edit: "goToEdit" },
      { delete: "deleteResource" },
    ],
    tabs: [
      {
        resource: "tasks",
        pivot: "project",
      },
      {
        resource: "teams",
        pivot: "project",
      },
      {
        resource: "milestones",
        pivot: "project",
      },
      {
        resource: "budgetEquipment",
        pivot: "project",
      },
    ],
  },
  {
    name: "tasks",
    path: "tasks",
    icon: "pi pi-check-square",
    label: translationKeys.Tasks || "Tasks",
    resourceGroup: translationKeys.ConstructionSystem || "construction",
    schema: [
      {
        name: "taskName",
        title: translationKeys.TaskName || "Task Name",
        type: "text",
        validation: Yup.string().required("Task Name is required."),
      },
      {
        name: "project",
        title: translationKeys.Project || "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
        validation: Yup.string().required("Project is required."),
      },
      {
        name: "assignedTo",
        title: translationKeys.AssignedTo || "Assigned To",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("Assigned To is required."),
      },
      {
        name: "startDate",
        title: translationKeys.StartDate || "Start Date",
        type: "date",
        validation: Yup.date().required("Start Date is required."),
      },
      {
        name: "endDate",
        title: translationKeys.EndDate || "End Date",
        type: "date",
        validation: Yup.date().min(
          Yup.ref('startDate'),
          "End Date must be after Start Date"
        ),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Not Started", value: "not_started" },
          { label: "In Progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Delayed", value: "delayed" },
        ],
        defaultValue: "not_started",
        validation: Yup.string().required("Status is required."),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
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
    name: "teams",
    path: "teams",
    icon: "pi pi-users",
    label: translationKeys.Teams || "Teams",
    resourceGroup: translationKeys.ConstructionSystem || "construction",
    schema: [
      {
        name: "teamName",
        title: translationKeys.TeamName || "Team Name",
        type: "text",
        validation: Yup.string().required("Team Name is required."),
      },
      {
        name: "project",
        title: translationKeys.Project || "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
        validation: Yup.string().required("Project is required."),
      },
      {
        name: "teamLead",
        title: translationKeys.TeamLead || "Team Lead",
        type: "ref",
        resource: "users",
        field: "fullname",
        validation: Yup.string().required("Team Lead is required."),
      },
      {
        name: "members",
        title: translationKeys.Members || "Members",
        type: "tags",
        tagInputType: "refs",
        resource: "users",
        field: "fullname",
        validation: Yup.array().of(
          Yup.string().required("Each member must be provided.")
        ),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
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
    name: "milestones",
    path: "milestones",
    icon: "pi pi-flag",
    label: translationKeys.Milestones || "Milestones",
    resourceGroup: translationKeys.ConstructionSystem || "construction",
    schema: [
      {
        name: "milestoneName",
        title: translationKeys.MilestoneName || "Milestone Name",
        type: "text",
        validation: Yup.string().required("Milestone Name is required."),
      },
      {
        name: "project",
        title: translationKeys.Project || "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
        validation: Yup.string().required("Project is required."),
      },
      {
        name: "dueDate",
        title: translationKeys.DueDate || "Due Date",
        type: "date",
        validation: Yup.date().required("Due Date is required."),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "In Progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Delayed", value: "delayed" },
        ],
        defaultValue: "pending",
        validation: Yup.string().required("Status is required."),
      },
      {
        name: "description",
        title: translationKeys.Description || "Description",
        type: "richtext",
        validation: Yup.string().required("Description is required."),
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
    name: "budgetEquipment",
    path: "budget-equipment",
    icon: "pi pi-dollar",
    label: translationKeys.BudgetEquipment || "Budget & Equipment",
    resourceGroup: translationKeys.ConstructionSystem || "construction",
    schema: [
      {
        name: "project",
        title: translationKeys.Project || "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
        validation: Yup.string().required("Project is required."),
      },
      {
        name: "itemName",
        title: translationKeys.ItemName || "Item Name",
        type: "text",
        validation: Yup.string().required("Item Name is required."),
      },
      {
        name: "type",
        title: translationKeys.Type || "Type",
        type: "select",
        options: [
          { label: "Budget", value: "budget" },
          { label: "Equipment", value: "equipment" },
        ],
        validation: Yup.string().required("Type is required."),
      },
      {
        name: "amount",
        title: translationKeys.Amount || "Amount",
        type: "number",
        validation: Yup.number()
          .required("Amount is required.")
          .positive("Amount must be positive."),
      },
      {
        name: "status",
        title: translationKeys.Status || "Status",
        type: "select",
        options: [
          { label: "Planned", value: "planned" },
          { label: "Approved", value: "approved" },
          { label: "In Use", value: "in_use" },
          { label: "Returned", value: "returned" },
        ],
        defaultValue: "planned",
        validation: Yup.string().required("Status is required."),
      },
      {
        name: "notes",
        title: translationKeys.Notes || "Notes",
        type: "richtext",
        validation: Yup.string(),
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