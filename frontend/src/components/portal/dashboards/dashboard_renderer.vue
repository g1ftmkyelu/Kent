<template>
  <h1 class="ml-4 text-2xl text-red">
    <div 
  v-if="showGreetingAlert" 
  class="greeting-card "
  :class="{ 'slide-out': !showGreetingAlert }"
>
  <div class="greeting-header flex justify-between items-center">
    <p v-html="greetingMessage" class="greeting-content text-lg font-semibold">
    </p>
    <div class="greeting-footer mt-2 flex justify-end">
      <a href="/dashboard/profile" class="">View Profile</a>
    </div>
    <button class="close-button text-xl font-bold text-blue-700 hover:text-blue-900" @click="handleGreetingClose">×</button>
  </div>
</div>


    <div 
      v-if="showRoleAlert" 
      class="role-card"
      :class="{ 'slide-out': !showRoleAlert }"
    >
      <div class="role-content">
        {{ roleDescription }}
      </div>
      <button class="close-button" @click="handleRoleClose">×</button>
    </div>
  </h1>
  
  <Dashboard
    :blockConfigs="currentConfig.blockConfigs"
    :layout="currentConfig.layout"
    :inititalData="currentConfig.initialData"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Alert as AAlert } from 'ant-design-vue';
import Dashboard from './dashboard.vue';
import projectManagerConfig from './DashboardConfigs/projectManager';
import clientConfig from './DashboardConfigs/client';
import adminConfig from './DashboardConfigs/admin';
import clerkConfig from './DashboardConfigs/clerk';
import financeManagerConfig from './DashboardConfigs/Financemanager';
import siteWorkerConfig from './DashboardConfigs/siteWorker';

const fullName = ref(localStorage.getItem("userName"));
const role = ref(localStorage.getItem("role"));
const showGreetingAlert = ref(true);
const showRoleAlert = ref(true);

const roleIdMap = {
  '6704f5e58fe5f71d721b1937': 'Admin',
  '6704f5f78fe5f71d721b1941': 'Project Manager',
  '6704f6388fe5f71d721b195d': 'Finance manager',
  '67203c400dcbcbd385dbf825': 'clerk',
  '6720b526688d5f7fe0e8a7bd': 'Client',
  '6720b539688d5f7fe0e8a7c5': 'Site Worker'
};

const configMap = {
  'Admin': {
    config: adminConfig,
    emoji: '👑',
    description: '👑 You have full access to manage users, roles, projects, and system settings. Monitor overall system performance and user activities.',
    roleTitle: 'Administrator'
  },
  'Project Manager': {
    config: projectManagerConfig,
    emoji: '📊',
    description: '📊 You can manage projects, assign tasks, track progress, and generate project reports.',
    roleTitle: 'Project Manager'
  },
  'Finance manager': {
    config: financeManagerConfig,
    emoji: '💰',
    description: '💰 You can manage financial records and generate financial reports. Monitor expenses and revenue tracking.',
    roleTitle: 'Finance Manager'
  },
  'clerk': {
    config: clerkConfig,
    emoji: '📝',
    description: '📝 You can  maintain records, and process routine documentation. Assist with data entry and basic reporting.',
    roleTitle: 'Clerk'
  },
  'Client': {
    config: clientConfig,
    emoji: '👤',
    description: '👤 You can view project details, track progress, and provide feedback. Access client-specific information and reports.',
    roleTitle: 'Client'
  },
  'Site Worker': {
    config: siteWorkerConfig,
    emoji: '🔨',
    description: '🔨 You can access site-specific tasks, report progress, and submit updates. Collaborate with the project team to ensure timely completion of on-site work.',
    roleTitle: 'Site Worker'
  }
};

const currentConfig = computed(() => {
  const normalizedRole = roleIdMap[role.value];
  const roleConfig = configMap[normalizedRole];
  return roleConfig ? roleConfig.config : clientConfig;
});

const roleDescription = computed(() => {
  const normalizedRole = roleIdMap[role.value];
  const roleConfig = configMap[normalizedRole];
  return roleConfig ? roleConfig.description : 'Welcome to the dashboard!';
});

const getFirstName = (fullName) => {
  return fullName?.split(' ')[0] || '';
};

const getGreeting = () => {
  const hour = new Date().getHours();
  const normalizedRole = roleIdMap[role.value];
  const roleConfig = configMap[normalizedRole];
  const roleTitle = roleConfig ? roleConfig.roleTitle : '';

  let timeGreeting;
  if (hour >= 0 && hour < 5) {
    timeGreeting = 'Happy Early Morning';
  } else if (hour >= 5 && hour < 12) {
    timeGreeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good Afternoon';
  } else if (hour >= 17 && hour < 20) {
    timeGreeting = 'Good Evening';
  } else if (hour >= 20 && hour < 24) {
    timeGreeting = 'Good Night';
  } else {
    timeGreeting = 'Happy Late Night';
  }

  return `👋 ${timeGreeting}, <b>${getFirstName(fullName.value)}</b>! `;
};

const greetingMessage = ref(getGreeting());

const handleGreetingClose = () => {
  showGreetingAlert.value = false;
};

const handleRoleClose = () => {
  showRoleAlert.value = false;
};
</script>

<style>
.greeting-card, .role-card {
  margin-bottom: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  position: relative;
  animation: slide-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.greeting-card {
  background: linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
}

.role-card {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.greeting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.greeting-content {
  color: white;
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.025em;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.role-content {
  color: white;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.6;
  padding-right: 2rem;
  transition: all 0.3s ease;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1) rotate(90deg);
  opacity: 1;
}

@keyframes slide-in {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  60% {
    transform: translateY(10%);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-out {
  transform: translateY(-100%);
  opacity: 0;
  margin: 0;
  padding: 0;
  height: 0;
}

/* Card hover effects */
.greeting-card:hover, .role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
}

.greeting-card:hover .greeting-content,
.role-card:hover .role-content {
  transform: translateX(5px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .greeting-card, .role-card {
    margin: 0.5rem;
    padding: 1rem;
  }
  
  .greeting-content {
    font-size: 1.1rem;
  }
  
  .role-content {
    font-size: 0.9rem;
  }

  .close-button {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .greeting-card, .role-card {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
}
</style>