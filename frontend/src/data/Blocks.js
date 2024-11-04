import {blockConfigs as taskmetricsBlockConfigs, layout as taskmetricsLayout} from './blockConfigs/taskmetrics.js';
import {blockConfigs as myProjectsBlockConfigs, layout as myProjectsLayout} from './blockConfigs/myProjects.js';
import {blockConfigs as myTasksBlockConfigs, layout as myTasksLayout} from './blockConfigs/myTasks.js';
import {blockConfigs as manageTasksBlockConfigs, layout as manageTasksLayout} from './blockConfigs/manageTasks.js';
import {blockConfigs as manageProjectsBlockConfigs, layout as manageProjectsLayout} from './blockConfigs/ManageProjectsBlock.js';
import { blockConfigs as manageMaterialInquiries, layout as manageMaterialInquiriesLayout } from './blockConfigs/manageMaterialInquiries.js';
export const blocks = [
    {
      id: "task-metrics-block",
      name: "Task Metrics",
      blockConfigs: taskmetricsBlockConfigs,
      layout: taskmetricsLayout
    },
    {
      id: "my-projects-block",
      name:"My Projects",
      blockConfigs: myProjectsBlockConfigs,
      layout: myProjectsLayout
    },
    {
      id: "my-tasks-block",
      name:"Task Management",
      blockConfigs: myTasksBlockConfigs,
      layout: myTasksLayout
    },
    {
      id:"tasks-kanban-block",
      name:"Assigned Tasks",
      blockConfigs: manageTasksBlockConfigs,
      layout: manageTasksLayout
    },
    {
      id:"manage-projects-block",
      name:"Manage Projects",
      blockConfigs: manageProjectsBlockConfigs,
      layout: manageProjectsLayout
    },
    {
      id:"inquiries-block",
      name:"Material Inquiries",
      blockConfigs: manageMaterialInquiries,
      layout: manageMaterialInquiriesLayout
    }
]