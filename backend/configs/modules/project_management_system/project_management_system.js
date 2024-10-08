module.exports.construction_progress_system = [
  {
    name: "projects",
    icon: "pi pi-building",
    schema: [
      {
        name: "image",
        type: "image",
      },
      {
        name: "projectName",
        type: "text",
      },
      {
        name: "manager",
        type: "me",
        defaultValue: 'current_user_id',
      },
      {
        name: "description",
        type: "richtext",
      },
      {
        name: "startDate",
        type: "date",
      },
      {
        name: "endDate",
        type: "date",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Planning", value: "planning" },
          { label: "In Progress", value: "in_progress" },
          { label: "On Hold", value: "on_hold" },
          { label: "Completed", value: "completed" },
        ],
        defaultValue: "planning",
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
    icon: "pi pi-check-square",
    schema: [
      {
        name: "taskName",
        type: "text",
      },
      {
        name: "project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "assignedTo",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "startDate",
        type: "date",
      },
      {
        name: "endDate",
        type: "date",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Not Started", value: "not_started" },
          { label: "In Progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Delayed", value: "delayed" },
        ],
        defaultValue: "not_started",
      },
      {
        name: "description",
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
    name: "teams",
    icon: "pi pi-users",
    schema: [
      {
        name: "teamName",
        type: "text",
      },
      {
        name: "project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "teamLead",
        type: "ref",
        resource: "users",
        field: "fullname",
      },
      {
        name: "members",
        type: "tags",
        tagInputType: "refs",
        resource: "users",
        field: "fullname",
      },
      {
        name: "description",
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
    name: "milestones",
    icon: "pi pi-flag",
    schema: [
      {
        name: "milestoneName",
        type: "text",
      },
      {
        name: "project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "dueDate",
        type: "date",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "In Progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Delayed", value: "delayed" },
        ],
        defaultValue: "pending",
      },
      {
        name: "description",
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
    name: "budgetEquipment",
    icon: "pi pi-dollar",
    schema: [
      {
        name: "project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "itemName",
        type: "text",
      },
      {
        name: "type",
        type: "select",
        options: [
          { label: "Budget", value: "budget" },
          { label: "Equipment", value: "equipment" },
        ],
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "status",
        type: "select",
        options: [
          { label: "Planned", value: "planned" },
          { label: "Approved", value: "approved" },
          { label: "In Use", value: "in_use" },
          { label: "Returned", value: "returned" },
        ],
        defaultValue: "planned",
      },
      {
        name: "notes",
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
];