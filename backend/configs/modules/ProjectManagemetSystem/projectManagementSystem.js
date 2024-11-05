exports.construction_tracking_system = [
  {
    name: "projects",
    icon: "fa fa-building",
    label: "Projects",
    menuGroup: "Projects",
    menuGroupIcon: "fa fa-folder",
    schema: [
      {
        name: "projectName",
        title: "Project Name",
        type: "text",
      },

      {
        name: "startDate",
        title: "Start Date",
        type: "date",
      },
      {
        name: "expectedEndDate",
        title: "Expected Completion Date",
        type: "date",
      },
      {
        name: "location",
        title: "Location",
        type: "text",
      },

      {
        name: "client",
        type: "ref",
        resource: "users",
        field: "fullname",
      },

      {
        name: "milestones",
        type: "select",
        options: [
          { label: "Planning & Permits", value: "planning", color: "#007bff" },
          {
            label: "Site Preparation",
            value: "site_preparation",
            color: "#6c757d",
          },
          { label: "Foundation", value: "foundation", color: "#7952b3" },
          { label: "Framing", value: "framing", color: "#17a2b8" },
          { label: "Roofing", value: "roofing", color: "#ffc107" },
          {
            label: "Windows & Doors",
            value: "windows_doors",
            color: "#dc3545",
          },
          { label: "Rough-In", value: "rough_in", color: "#28a745" }, // Plumbing, Electrical, HVAC
          { label: "Insulation", value: "insulation", color: "#20c997" },
          { label: "Drywall", value: "drywall", color: "#fd7e14" },
          {
            label: "Interior Finishes",
            value: "interior_finishes",
            color: "#343a40",
          }, // Paint, Cabinets, Trim
          {
            label: "Exterior Finishes",
            value: "exterior_finishes",
            color: "#17c0eb",
          }, // Siding, Landscaping
          {
            label: "Final Inspection",
            value: "final_inspection",
            color: "#6610f2",
          },
          { label: "Handover", value: "handover", color: "#e83e8c" }, // Completion & Client Walkthrough
        ],
      },
      {
        name: "teams",
        title: "Teams",
        type: "tags",
        tagInputType: "refs",
        resource: "teams",
        field: "teamName",
      },

      {
        name: "description",
        title: "Description",
        type: "richtext",
      },

      {
        name: "documents",
        title: "Project Documents",
        type: "object array",
        schema: [
          {
            name: "title",
            title: "Title",
            type: "text",
          },
          {
            name: "type",
            title: "Type",
            type: "select",
            options: [
              { label: "Project Contract", value: "project_contract" },
              { label: "Site Plan", value: "site_plan" },
              { label: "Site Sketch", value: "site_sketch" },
              { label: "Site Map", value: "site_map" },
              { label: "Site Photo", value: "site_photo" },
              { label: "Other", value: "other" },
            ],
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
          {
            name: "file",
            title: "File",
            type: "document",
          },
        ],
      },

      // In the projects schema array, add this field:
    ],
    layout: {
      rows: 8,
      columns: 8,
      fields: {
        projectName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        startDate: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
        expectedEndDate: { rowStart: 1, colStart: 4, rowSpan: 1, colSpan: 1 },
        location: { rowStart: 1, colStart: 5, rowSpan: 1, colSpan: 1 },
        status: { rowStart: 1, colStart: 6, rowSpan: 1, colSpan: 1 },
        teams: { rowStart: 1, colStart: 7, rowSpan: 1, colSpan: 1 },
        milestones: { rowStart: 1, colStart: 8, rowSpan: 1, colSpan: 1 },
        projectManager: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        description: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 6 },
        attachments: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 8 },
      },
    },
    renderMode: "crud",
  },

  {
    name: "teams",
    icon: "fa fa-users",
    label: "Teams",
    menuGroup: "Projects",
    menuGroupIcon: "fa fa-folder",
    schema: [
      {
        name: "teamName",
        title: "Team Name",
        type: "text",
      },
      {
        name: "teamLead",
        title: "Team Lead",
        type: "ref",
        resource: "users",
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
      },
    ],
    layout: {
      rows: 5,
      columns: 2,
      fields: {
        teamName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        teamLead: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        members: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
        description: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 2 },
        teamMembers: { rowStart: 4, colStart: 1, rowSpan: 1, colSpan: 2 },
      },
    },
    renderMode: "crud",
  },
  {
    name: "budget",
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
      },
      {
        name: "totalBudget",
        title: "Total Budget",
        type: "number",
      },
      {
        name: "spentAmount",
        title: "Spent Amount",
        type: "number",
      },
      {
        name: "remainingAmount",
        title: "Remaining Amount",
        type: "number",
      },
      {
        name: "currency",
        title: "Currency",
        type: "text",
      },
      {
        name: "lastUpdated",
        title: "Last Updated",
        type: "date",
      },
      {
        name: "notes",
        title: "Notes",
        type: "richtext",
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
    },
    renderMode: "crud",
  },

  {
    name: "tasks",
    icon: "fa fa-tasks",
    label: "Tasks",
    menuGroup: "Projects",
    menuGroupIcon: "fa fa-folder",
    schema: [
      {
        name: "taskName",
        title: "Task Name",
        type: "text",
      },

      {
        name: "startDate",
        title: "Start Date",
        type: "date",
      },
      {
        name: "dueDate",
        title: "Due Date",
        type: "date",
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
      },
      {
        name: "Assignees",
        title: "Assignees",
        type: "tags",
        tagInputType: "refs",
        resource: "users",
        field: "fullname",
        idFilters: [
          {
            name: "role",
            value: "6720b539688d5f7fe0e8a7c5",
          },
        ],
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
      },

      {
        name: "attachments",
        title: "Attachments",
        type: "file",
      },
    ],
    layout: {
      rows: 8,
      columns: 6,
      fields: {
        taskName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        team: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        startDate: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        dueDate: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 1 },
        priority: { rowStart: 3, colStart: 1, rowSpan: 1, colSpan: 1 },
        status: { rowStart: 3, colStart: 2, rowSpan: 1, colSpan: 1 },
        description: { rowStart: 4, colStart: 1, rowSpan: 1, colSpan: 2 },
        attachments: { rowStart: 5, colStart: 1, rowSpan: 1, colSpan: 2 },
      },
    },
    renderMode: "crud",
  },
  {
    name: "injuries",
    path: "injuries",
    icon: "pi pi-exclamation-triangle",
    menuGroupIcon: "pi pi-shield",
    renderMode: "crud",
    schema: [
      {
        name: "incidentType",
        type: "select",
        options: [
          { label: "Slip and Fall", value: "slip_fall" },
          { label: "Equipment Malfunction", value: "equipment_malfunction" },
          { label: "Fire Hazard", value: "fire_hazard" },
          { label: "Chemical Exposure", value: "chemical_exposure" },
          { label: "Electrical Shock", value: "electrical_shock" },
          { label: "Cuts and Lacerations", value: "cuts_lacerations" },
        ],
      },
      {
        name: "project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "location",
        type: "text",
      },
      {
        name: "severity",
        type: "status",
        options: [
          { label: "Low", value: "low", color: "#FFD700" },
          { label: "Medium", value: "medium", color: "#007ACC" },
          { label: "High", value: "high", color: "#008000" },
          { label: "Critical", value: "critical", color: "#FF6347" },
        ],
      },
      {
        name: "date",
        type: "date",
      },
    ],
    layout: {
      rows: 2,
      columns: 3,
      fields: {
        incidentType: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        location: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        reportedBy: { rowStart: 1, colStart: 3, rowSpan: 1, colSpan: 1 },
        date: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
      },
    },
  },

  {
    name: "material_inquiries",
    path: "material_inquiries",
    icon: "pi pi-box",
    menuGroupIcon: "pi pi-archive",
    renderMode: "crud",
    schema: [
      {
        name: "materialName",
        type: "text",
      },
      {
        name: "quantity",
        type: "number",
      },
      {
        name: "inquiryDate",
        type: "date",
      },
      {
        name: "status",

        type: "status",
        options: [
          { label: "Pending", value: "pending", color: "#FFD700" },
          { label: "Approved", value: "approved", color: "#007ACC" },
          { label: "Declined", value: "declined", color: "#008000" },
        ],
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
    },
  },
  {
    name: "reports",
    path: "reports",
    icon: "pi pi-file",
    label: "Reports",

    schema: [
      {
        name: "project",
        title: "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "weather",
        title: "Weather Conditions",
        type: "object",
        schema: [
          {
            name: "conditions",
            title: "Conditions",
            type: "select",
            options: [
              { label: "Sunny", value: "sunny" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Rainy", value: "rainy" },
              { label: "Windy", value: "windy" },
            ],
          },
        ],
      },
      {
        name: "workHours",
        title: "Work Hours",
        type: "object",
        schema: [
          {
            name: "startTime",
            title: "Start Time",
            type: "time",
          },
          {
            name: "endTime",
            title: "End Time",
            type: "time",
          },
        ],
      },
      {
        name: "workforce",
        title: "Workforce on Site",
        type: "object array",
        schema: [
          {
            name: "type",
            title: "Worker Type",
            type: "select",
            options: [
              { label: "bricklayer", value: "bricklayer" },
              { label: "electrician", value: "electrician" },
              { label: "plumber", value: "plumber" },
              { label: "other", value: "other" },
            ],
          },
          {
            name: "count",
            title: "Number of Workers",
            type: "number",
          },
        ],
      },
      {
        name: "equipmentUsed",
        title: "Equipment Used",
        type: "object array",
        schema: [
          {
            name: "equipmentName",
            title: "Equipment",
            type: "ref",
            resource: "equipment",
            field: "equipmentName",
          },
          {
            name: "hours",
            title: "Hours Used",
            type: "number",
          },
        ],
      },
      {
        name: "completedWork",
        title: "Work Completed",
        type: "object array",
        schema: [
          {
            name: "task",
            title: "Task",
            type: "ref",
            resource: "tasks",
            field: "taskName",
          },
          {
            name: "progress",
            title: "Progress",
            type: "richtext",
          },
        ],
      },
      {
        name: "materials",
        title: "Materials Used",
        type: "object array",
        schema: [
          {
            name: "material",
            title: "Material",
            type: "ref",
            resource: "materials",
            field: "materialName",
          },
          {
            name: "quantity",
            title: "Quantity",
            type: "number",
          },
          {
            name: "unit",
            title: "Unit",
            type: "select",
            options: [
              { label: "Each", value: "each" },
              { label: "Kilogram", value: "kilogram" },
              { label: "Meter", value: "meter" },
              { label: "Liter", value: "liter" },
              { label: "Piece", value: "piece" },
              { label: "Unit", value: "unit" },
              { label: "Other", value: "other" },
            ],
          },
        ],
      },
      {
        name: "delays",
        title: "Delays/Issues",
        type: "object array",
        schema: [
          {
            name: "issue",
            title: "Issue Description",
            type: "text",
          },
          {
            name: "duration",
            title: "Duration (minutes)",
            type: "number",
          },
          {
            name: "impact",
            title: "Impact",
            type: "select",
            options: [
              { label: "Minor", value: "minor" },
              { label: "Moderate", value: "moderate" },
              { label: "Major", value: "major" },
            ],
          },
        ],
      },
      {
        name: "safetyObservations",
        title: "Safety Observations",
        type: "object array",
        schema: [
          {
            name: "observation",
            title: "Observation",
            type: "text",
          },
          {
            name: "type",
            title: "Type",
            type: "select",
            options: [
              { label: "Hazard", value: "hazard" },
              { label: "Compliance", value: "compliance" },
              { label: "Improvement", value: "improvement" },
            ],
          },
          {
            name: "action",
            title: "Action Taken",
            type: "text",
          },
        ],
      },
      {
        name: "nextDayPlanning",
        title: "Next Day Planning",
        type: "object array",
        schema: [
          {
            name: "plannedTask",
            title: "Planned Task",
            type: "text",
          },
          {
            name: "requiredResources",
            title: "Required Resources",
            type: "text",
          },
        ],
      },
      {
        name: "photos",
        title: "Site Photos",
        type: "object array",
        schema: [
          {
            name: "photo",
            title: "Photo",
            type: "image",
          },
          {
            name: "description",
            title: "Description",
            type: "text",
          },
        ],
      },
      {
        name: "submittedBy",
        title: "Submitted By",
        type: "me",
        initialValue: "current_user_id",
      },
    ],
    layout: {
      rows: 4,
      columns: 3,
      fields: {
        reportDate: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        project: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 2 },
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
            { name: "goToView", icon: "pi pi-eye", label: "View" },
            { name: "goToEdit", icon: "pi pi-pencil", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
            { name: "exportPDF", icon: "pi pi-file-pdf", label: "Export PDF" },
          ],
          orientation: "icons",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
    renderMode: "crud",
  },
  {
    name: "equipment",
    path: "equipment",
    icon: "pi pi-wrench",
    label: "Equipment",
    schema: [
      {
        name: "equipmentName",
        title: "Equipment Name",
        type: "text",
        initialValue: "equipmentName",
      },
      {
        name: "equipmentType",
        title: "Equipment Type",
        type: "select",
        options: [
          { label: "chainsaw", value: "chainsaw" },
          { label: "saw", value: "saw" },
          { label: "drill", value: "drill" },
          { label: "hacksaw", value: "hacksaw" },
          { label: "wrench", value: "wrench" },
          { label: "hammer", value: "hammer" },
          { label: "screwdriver", value: "screwdriver" },
          { label: "sander", value: "sander" },
          { label: "shovel", value: "shovel" },
          { label: "pliers", value: "pliers" },
          { label: "grinding machine", value: "grinding machine" },
          { label: "milling machine", value: "milling machine" },
          { label: "scaffolding", value: "scaffolding" },
          { label: "sawmill", value: "sawmill" },
          { label: "cement mixer", value: "cement mixer" },
          { label: "other", value: "other" },
        ],
      },
      {
        name: "image",
        title: "Image",
        type: "image",
      },
      {
        name: "status",
        title: "Status",
        type: "status",
        options: [
          { label: "Available", value: "available", color: "#008000" },
          { label: "Unavailable", value: "unavailable", color: "#FF0000" },
        ],
      },
    ],
    layout: {
      rows: 2,
      columns: 2,
      fields: {
        equipmentName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        equipmentType: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        unit: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        status: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 1 },
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
            { name: "goToView", icon: "pi pi-eye", label: "View" },
            { name: "goToEdit", icon: "pi pi-pencil", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "icons",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
    renderMode: "crud",
  },
  {
    name: "project-budgets",
    path: "project-budgets",
    icon: "pi pi-dollar",
    label: "Project Budgets",
    menuGroup: "Finance",
    menuGroupIcon: "fa fa-dollar-sign",
    schema: [
      {
        name: "project",
        title: "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "budgetPeriod",
        title: "Budget Period",
        type: "object",
        schema: [
          {
            name: "startDate",
            title: "Start Date",
            type: "date",
          },
          {
            name: "endDate",
            title: "End Date",
            type: "date",
          },
        ],
      },
      {
        name: "budgetCategories",
        title: "Budget Categories",
        type: "object array",
        schema: [
          {
            name: "category",
            title: "Category",
            type: "select",
            options: [
              { label: "Labor Costs", value: "labor" },
              { label: "Materials", value: "materials" },
              { label: "Equipment", value: "equipment" },
              { label: "Subcontractors", value: "subcontractors" },
              { label: "Permits and Licenses", value: "permits" },
              { label: "Overhead", value: "overhead" },
            ],
          },
          {
            name: "allocatedAmount",
            title: "Allocated Amount",
            type: "number",
          },
          {
            name: "notes",
            title: "Notes",
            type: "text",
          },
        ],
      },
      {
        name: "totalBudget",
        title: "Total Budget",
        type: "number",
      },
      {
        name: "status",
        title: "Status",
        type: "status",
        options: [
          { label: "Draft", value: "draft", color: "#FFD700" },
          { label: "Active", value: "active", color: "#008000" },
          { label: "Under Review", value: "review", color: "#007ACC" },
          { label: "Closed", value: "closed", color: "#808080" },
        ],
      },
    ],

    renderMode: "crud",
  },
  {
    name: "materials",
    path: "materials",
    icon: "pi pi-wrench",
    label: "Materials",
    renderMode: "crud",
    schema: [
      {
        name: "materialName",
        title: "Material Name",
        type: "text",
      },
      {
        name: "quantity",
        title: "Quantity",
        type: "number",
      },
      {
        name: "unit",
        title: "Unit",
        type: "select",
        options: [
          { label: "Each", value: "each" },
          { label: "Box", value: "box" },
          { label: "Meter", value: "meter" },
          { label: "Pound", value: "pound" },
          { label: "Kilogram", value: "kilogram" },
          { label: "Liter", value: "liter" },
          { label: "Gallon", value: "gallon" },
          { label: "Square Foot", value: "square foot" },
          { label: "Square Meter", value: "square meter" },
          { label: "Square Inch", value: "square inch" },
          { label: "Square Kilometer", value: "square kilometer" },
          { label: "Square Mile", value: "square mile" },
          { label: "Square Yard", value: "square yard" },
          { label: "Square Centimeter", value: "square centimeter" },
          { label: "Square Millimeter", value: "square millimeter" },
          { label: "Other", value: "other" },
        ],


      },
      {
        name: "status",
        title: "Status",
        type: "status",
        options: [
          { label: "Available", value: "available", color: "#008000" },
          { label: "Unavailable", value: "unavailable", color: "#FF0000" },
        ],
      },
    ],
    layout: {
      rows: 2,
      columns: 2,
      fields: {
        materialName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 },
        quantity: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 },
        unit: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
        status: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 1 },
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
            { name: "goToView", icon: "pi pi-eye", label: "View" },
            { name: "goToEdit", icon: "pi pi-pencil", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "icons",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
    renderMode: "crud",
  },
  {
    name: "project-incomes",
    path: "project-incomes",
    icon: "pi pi-money-bill",
    label: "Project Incomes",
    schema: [
      {
        name: "project",
        title: "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },

      {
        name: "amount",
        title: "Amount",
        type: "number",
      },

      {
        name: "type",
        title: "Type",
        type: "select",
        options: [
          { label: "down payment", value: "down_payment" },
          { label: "initial payment", value: "initial_payment" },
          { label: "milestone payment", value: "milestone_payment" },
          { label: "final payment", value: "final_payment" },
          { label: "other", value: "other" },
        ],
      },

      {
        name: "description",
        title: "Description",
        type: "richtext",
      },
      {
        name:"date",
        title:"Date",
        type:"date"
      }
    ],
    renderMode: "crud",
    layout: {
      rows: 3,
      columns: 2,
      fields: {
        project: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
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
            { name: "goToEdit", icon: "pi pi-pencil", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "icons",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
  },
  {
    name: "project-expenses",
    path: "project-expenses",
    icon: "pi pi-money-bill",
    label: "Project Expenses",
    schema: [
      {
        name: "project",
        title: "Project",
        type: "ref",
        resource: "projects",
        field: "projectName",
      },
      {
        name: "amount",
        title: "Amount",
        type: "number",
      },
      {
        name: "type",
        title: "Type",
        type: "select",
        options: [
          { label: "maintenance", value: "maintenance" },
          { label: "material", value: "material" },
          { label: "equipment", value: "equipment" },
          { label: "labour", value: "labour" },
          { label: "permit", value: "permit" },
          { label: "repairs", value: "repairs" },
          { label: "subcontractor", value: "subcontractor" },
          { label: "transport", value: "transport" },
          { label: "other", value: "other" },
        ],
      },
      {
        name: "description",
        title: "Description",
        type: "richtext",
      },
      {
        name:"date",
        title:"Date",
        type:"date"
      }
    ],
    renderMode: "crud",
    layout: {
      rows: 3,
      columns: 2,
      fields: {
        project: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 2 },
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
            { name: "goToEdit", icon: "pi pi-pencil", label: "Edit" },
            { name: "deleteResource", icon: "pi pi-trash", label: "Delete" },
          ],
          orientation: "icons",
          style: "position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;",
        },
      ],
    },
  },
];
