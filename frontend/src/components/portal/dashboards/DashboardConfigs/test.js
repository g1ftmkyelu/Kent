import { translationKeys } from '@/Localization/International/english';
import * as Yup from 'yup';
import resource from '../../../../stores/modules/resource';

const initialProjectsData = [
  {
    projectName: "Luxury Villa Complex",
    completionPercentage: 85,
    status: "IN_PROGRESS",
    startDate: "2023-12-15",
    endDate: "2024-08-30",
    contractor: "Elite Builders Co.",
    budget: 2500000,
    spent: 2100000
  },
  {
    projectName: "Commercial Plaza",
    completionPercentage: 35,
    status: "IN_PROGRESS",
    startDate: "2024-02-01",
    endDate: "2024-12-15",
    contractor: "Modern Construction Ltd.",
    budget: 4800000,
    spent: 1680000
  },
  {
    projectName: "Residential Complex",
    completionPercentage: 15,
    status: "DELAYED",
    startDate: "2024-03-15",
    endDate: "2025-01-30",
    contractor: "BuildWell Associates",
    budget: 3500000,
    spent: 525000
  },
  {
    projectName: "Office Building",
    completionPercentage: 0,
    status: "NOT_STARTED",
    startDate: "2024-06-01",
    endDate: "2025-04-30",
    contractor: "Skyline Developers",
    budget: 5200000,
    spent: 0
  }
];

const initialPaymentData = [
  {
    projectName: "Luxury Villa Complex",
    paymentType: "MILESTONE",
    amount: 500000,
    dueDate: "2024-05-15",
    status: "PENDING",
    milestone: "Interior Finishing",
    contractor: "Elite Builders Co."
  },
  {
    projectName: "Commercial Plaza",
    paymentType: "REGULAR",
    amount: 250000,
    dueDate: "2024-05-01",
    status: "PAID",
    milestone: "Monthly Payment",
    contractor: "Modern Construction Ltd."
  }
];

const initialIssuesData = [
  {
    projectName: "Luxury Villa Complex",
    issueType: "DELAY",
    priority: "HIGH",
    reportedDate: "2024-04-25",
    description: "Material shortage affecting interior work",
    status: "OPEN",
    contractor: "Elite Builders Co."
  },
  {
    projectName: "Commercial Plaza",
    issueType: "QUALITY",
    priority: "MEDIUM",
    reportedDate: "2024-04-26",
    description: "Finishing quality below specifications",
    status: "IN_REVIEW",
    contractor: "Modern Construction Ltd."
  }
];

const projectPerformanceData = {
  monthly: [
    {
      name: 'Planned Spending',
      data: [
        { x: 'Jan', y: 850000 },
        { x: 'Feb', y: 1200000 },
        { x: 'Mar', y: 1600000 },
        { x: 'Apr', y: 2100000 }
      ]
    },
    {
      name: 'Actual Spending',
      data: [
        { x: 'Jan', y: 800000 },
        { x: 'Feb', y: 1300000 },
        { x: 'Mar', y: 1550000 },
        { x: 'Apr', y: 2300000 }
      ]
    }
  ]
};

const projectsResource = {
  name: "projects",
  path: "projects",
  icon: "pi pi-building",
  label: translationKeys.Projects || "Projects",
  menuGroup: translationKeys.Portfolio || "Portfolio",
  menuGroupIcon: "pi pi-folder",
  schema: [
    {
      name: "projectName",
      title: translationKeys.ProjectName || "Project",
      type: "text",
      validation: Yup.string().required("Project name is required"),
    },
    {
      name: "contractor",
      title: translationKeys.Contractor || "Contractor",
      type: "text",
      validation: Yup.string().required("Contractor is required"),
    },
    {
      name: "completionPercentage",
      title: translationKeys.Progress || "Progress",
      type: "percentage",
      validation: Yup.number().min(0).max(100).required("Progress is required"),
    },
    {
      name: "budget",
      title: translationKeys.Budget || "Budget",
      type: "currency",
      validation: Yup.number().min(0).required("Budget is required"),
    }
  ]
};

export const blockConfigs = [
  {
    id: 'project-overview-block',
    name: 'Project Overview',
    title: 'My Projects',
    config: {
      type: 'data-grid',
      props: {
        resource: projectsResource,
        showHeader: true,
        initialData: initialProjectsData
      }
    }
  },
  {
    id: 'payment-schedule-block',
    name: 'Payment Schedule',
    title: 'Upcoming Payments',
    config: {
      type: 'timeline',
      props: {
        resource: projectsResource,
        showHeader: true,
        initialData: initialPaymentData
      }
    }
  },
  {
    id: 'issues-block',
    name: 'Project Issues',
    title: 'Active Issues',
    config: {
      type: 'data-table',
      props: {
        showHeader: true,
        initialData: initialIssuesData
      }
    }
  },
  {
    id: 'performance-chart',
    name: 'Financial Performance',
    title: 'Budget vs Actual Spending',
    config: {
      type: 'chart',
      props: {
        chartType: 'bar',
        series: projectPerformanceData.monthly,
        chartTitle: 'Project Portfolio Performance',
        xAxisTitle: 'Month',
        yAxisTitle: 'Amount ($)',
        dataLabels: true,
        colors: ['#2E5BFF', '#00C48C'],
        height: 350,
        initialData: projectPerformanceData
      }
    }
  }
];

export const layout = [
  { name: 'Project Overview', rowStart: 1, colStart: 1, rowSpan: 3, colSpan: 12 },
  { name: 'Payment Schedule', rowStart: 4, colStart: 1, rowSpan: 2, colSpan: 6 },
  { name: 'Project Issues', rowStart: 4, colStart: 7, rowSpan: 2, colSpan: 6 },
  { name: 'Financial Performance', rowStart: 6, colStart: 1, rowSpan: 3, colSpan: 12 }
];

export const dashboardConfig = {
  title: "My Projects Portfolio",
  refreshInterval: 600000, // 10 minutes
  allowExport: true,
  exportFormats: ['pdf', 'excel'],
  notifications: {
    enabled: true,
    position: 'top-right',
    defaultDuration: 5000,
    types: {
      payment: {
        icon: 'pi pi-dollar',
        severity: 'warning'
      },
      progress: {
        icon: 'pi pi-check-circle',
        severity: 'success'
      },
      issue: {
        icon: 'pi pi-exclamation-circle',
        severity: 'danger'
      }
    }
  },
  filters: {
    enabled: true,
    defaultFilters: ['date', 'status'],
    customFilters: [
      {
        name: 'contractor',
        type: 'select',
        options: ['Elite Builders Co.', 'Modern Construction Ltd.', 'BuildWell Associates', 'Skyline Developers']
      },
      {
        name: 'projectStatus',
        type: 'select',
        options: ['Not Started', 'In Progress', 'Delayed', 'Completed']
      }
    ]
  },
  theme: {
    primary: '#2E5BFF',
    secondary: '#6B7A99',
    success: '#00C48C',
    warning: '#FFB946',
    danger: '#F7685B',
    info: '#2D9CDB'
  }
};

export default {
  blockConfigs,
  layout,
  dashboardConfig
};