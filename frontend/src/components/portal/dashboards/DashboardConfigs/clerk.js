import { translationKeys } from '@/Localization/International/english';
import * as Yup from 'yup';
import { Resources } from '../../../../data/resources';

const initialProgressData = [
  {
    taskName: "Foundation Work",
    completionPercentage: 100,
    status: "COMPLETED",
    dueDate: "2024-05-15",
    assignedTeam: "Team A",
    notes: "Completed ahead of schedule"
  },
  {
    taskName: "Steel Framework",
    completionPercentage: 75,
    status: "IN_PROGRESS",
    dueDate: "2024-06-01",
    assignedTeam: "Team B",
    notes: "Minor delay due to material delivery"
  },
  {
    taskName: "Concrete Pouring - Level 1",
    completionPercentage: 45,
    status: "IN_PROGRESS",
    dueDate: "2024-06-10",
    assignedTeam: "Team C",
    notes: "On schedule"
  },
  {
    taskName: "Electrical Wiring",
    completionPercentage: 0,
    status: "NOT_STARTED",
    dueDate: "2024-07-01",
    assignedTeam: "Team D",
    notes: "Pending framework completion"
  }
];

const initialSafetyData = [
  {
    incidentType: "NEAR_MISS",
    location: "Block A - Floor 2",
    reportedBy: "John Smith",
    date: "2024-04-27",
    description: "Unsecured tool nearly fell from scaffolding",
    actionTaken: "Additional safety briefing conducted",
    status: "RESOLVED"
  },
  {
    incidentType: "MINOR_INJURY",
    location: "Material Storage Area",
    reportedBy: "Maria Garcia",
    date: "2024-04-26",
    description: "Minor cut while handling materials",
    actionTaken: "First aid administered, PPE requirements reviewed",
    status: "CLOSED"
  }
];

const initialMaterialData = [
  {
    materialName: "Cement",
    quantityUsed: 250,
    unit: "bags",
    status: "SUFFICIENT",
    lastUpdated: "2024-04-27",
    stockLevel: 800,
    reorderPoint: 200
  },
  {
    materialName: "Bricks",
    quantityUsed: 5000,
    unit: "pieces",
    status: "SUFFICIENT",
    lastUpdated: "2024-04-27",
    stockLevel: 15000,
    reorderPoint: 3000
  },
  {
    materialName: "Sand",
    quantityUsed: 15,
    unit: "cubic meters",
    status: "LOW_STOCK",
    lastUpdated: "2024-04-27",
    stockLevel: 5,
    reorderPoint: 10
  }
];

const progressChartData = {
  weekly: [
    {
      name: 'Planned Progress',
      data: [
        { x: 'Week 1', y: 20 },
        { x: 'Week 2', y: 35 },
        { x: 'Week 3', y: 50 },
        { x: 'Week 4', y: 65 }
      ]
    },
    {
      name: 'Actual Progress',
      data: [
        { x: 'Week 1', y: 18 },
        { x: 'Week 2', y: 31 },
        { x: 'Week 3', y: 48 },
        { x: 'Week 4', y: 62 }
      ]
    }
  ],
  daily: [
    {
      name: 'Labor Hours',
      data: [
        { x: 'Mon', y: 45 },
        { x: 'Tue', y: 52 },
        { x: 'Wed', y: 48 },
        { x: 'Thu', y: 50 },
        { x: 'Fri', y: 46 }
      ]
    }
  ]
};


// Quick Actions Resource
const quickActionsResource = {
  name: "quickActions",
  path: "quickActions",
  icon: "pi pi-flash",
  label: translationKeys.QuickActions || "Quick Actions",
  menuGroup: translationKeys.Actions || "Actions",
  menuGroupIcon: "pi pi-bolt",
  schema: [
    {
      name: "action",
      title: translationKeys.Action || "Action",
      type: "text",
      validation: Yup.string().required("Action is required"),
    },
    {
      name: "icon",
      title: translationKeys.Icon || "Icon",
      type: "icon",
      validation: Yup.string().required("Icon is required"),
    }
  ],
  layout: {
    rows: 1,
    columns: 3,
    fields: {
      icon: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 1 }, // Moved icon field to the first column
      action: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 2 } // Moved action field to the second column
    }
  }
};

// Site Progress Resource Configuration
const siteProgressResource = Resources.find(resource => resource.name === "tasks");

// Material Usage Resource
const materialUsageResource = {
  name: "Material Usage",
  path: "materials",
  icon: "pi pi-box",
  label: translationKeys.MaterialUsage || "Material Usage",
  menuGroup: translationKeys.Resources || "Resources",
  menuGroupIcon: "pi pi-truck",
  schema: [
    {
      name: "materialName",
      title: translationKeys.MaterialName || "Material",
      type: "text",
      validation: Yup.string().required("Material name is required"),
    },
    {
      name: "quantityUsed",
      title: translationKeys.QuantityUsed || "Used",
      type: "number",
      validation: Yup.number().min(0).required("Quantity is required"),
    },
    {
      name: "unit",
      title: translationKeys.Unit || "Unit",
      type: "text",
      validation: Yup.string().required("Unit is required"),
    },
    {
      name: "status",
      title: translationKeys.Status || "Status",
      type: "status",
      options: [
        { label: "Sufficient", value: "SUFFICIENT", color: "#28a745" },
        { label: "Low Stock", value: "LOW_STOCK", color: "#ffc107" },
        { label: "Out of Stock", value: "OUT_OF_STOCK", color: "#dc3545" }
      ],
      validation: Yup.string().required("Status is required"),
    }
  ],
  layout: {
    rows: 2,
    columns: 2,
    fields: {
      materialName: { rowStart: 1, colStart: 1, rowSpan: 1, colSpan: 2 },
      quantityUsed: { rowStart: 2, colStart: 1, rowSpan: 1, colSpan: 1 },
      unit: { rowStart: 2, colStart: 2, rowSpan: 1, colSpan: 1 },
      status: { rowStart: 1, colStart: 2, rowSpan: 1, colSpan: 1 }
    }
  }
};




export const blockConfigs = [

    {
      id: 'quick-actions-block',
      name: 'Quick Actions',
      title:'Quick Actions',
      config: {
        type: 'action-list',
        props: {
          items: [

            {
              actionName:"request materials",
              icon: 'fa-info-circle',
              description: 'make a material inquiry ',
              redirectUrl: '/my-material_inquiries/item/add'
            },
            {
              actionName:"Add Today's Report",
              icon: 'fa-info-circle',
              description: 'create and submit today\'s work summary report',
              redirectUrl: '/my-reports/item/add'
            },      
            {
              actionName:"manage equipment",
              icon: 'fa-shield-alt',
              description: ' manage all your equipment',
              redirectUrl: '/equipment'
            }
          
          ],
          layout:"grid"
        }
      }
    },
    {
      id: 'materials-block',
      name: 'Material Usage',
      title:'Material Usage',
      config: {
        type: 'data-group',
        props: {
          resource: materialUsageResource,
          showHeader: false,
          layout:materialUsageResource.layout,
          displayMode: 'grid',
          useApi: false,
          initialData: initialMaterialData
        }
      }
    },
    {
      id: 'progress-block',
      name: 'Site Progress',
      title:'Task Timeline',
      config: {
        type: 'timeline',
        props: {
          resource: siteProgressResource,
          showHeader: false,
          displayMode: 'list',
          layout:siteProgressResource.layout,
          useApi: false,
          initialData: initialProgressData
        }
      }
    },
    {
      id: 'progress-chart',
      name: 'Progress Chart',
      title:'Progress Chart',
      config: {
        type: 'chart',
        props: {
          chartType: 'line',
          series: progressChartData.weekly,
          chartTitle: 'Construction Progress Tracking',
          xAxisTitle: 'Timeline',
          yAxisTitle: 'Completion (%)',
          dataLabels: true,
          colors: ['#0088FE', '#00C49F'],
          height: 350,
          initialData: progressChartData
        }
      }
    }
  ];
  
  export const layout = [
    { name: 'Material Usage', rowStart: 2, colStart: 1, rowSpan: 3, colSpan: 12 },
    { name: 'Quick Actions', rowStart: 5, colStart: 1, rowSpan: 1, colSpan: 12 },
    { name: 'Site Progress', rowStart: 6, colStart: 1, rowSpan: 4, colSpan: 6 },
    { name: 'Progress Chart', rowStart: 6, colStart: 7, rowSpan: 4, colSpan: 6 }
  ];
  
  export const dashboardConfig = {
    title: "Construction Site Dashboard",
    refreshInterval: 300000, // 5 minutes
    allowExport: true,
    exportFormats: ['pdf', 'excel'],
    notifications: {
      enabled: true,
      position: 'top-right',
      defaultDuration: 5000,
      types: {
        safety: {
          icon: 'pi pi-exclamation-triangle',
          severity: 'danger'
        },
        progress: {
          icon: 'pi pi-check-circle',
          severity: 'success'
        },
        material: {
          icon: 'pi pi-info-circle',
          severity: 'info'
        }
      }
    },
    filters: {
      enabled: true,
      defaultFilters: ['date', 'status'],
      customFilters: [
        {
          name: 'team',
          type: 'select',
          options: ['Team A', 'Team B', 'Team C', 'Team D']
        },
        {
          name: 'priority',
          type: 'select',
          options: ['High', 'Medium', 'Low']
        }
      ]
    },
    theme: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8'
    }
  };
  
  export default {
    blockConfigs,
    layout,
    dashboardConfig
  };
