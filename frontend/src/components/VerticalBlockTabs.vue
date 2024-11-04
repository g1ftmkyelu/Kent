<!-- VerticalBlockTabs.vue -->
<template>
  <div class="vertical-block-tabs">
    <div class="layout-row">
      <!-- Left Side Navigation -->
      <div 
        class="sidebar" 
        :class="{ 'sidebar-collapsed': collapsed }"
        :style="{ width: `${sidebarWidth}%` }"
      >
        <nav class="tab-menu">
          <ul>
            <li 
              v-for="tab in tabs" 
              :key="tab.key"
              :class="{ active: isActive(tab.key) }"
              @click="() => handleTabClick(tab.key)"
            >
              <span class="tab-icon" v-if="tab.icon">
                <component :is="tab.icon" />
              </span>
              <span class="tab-title" :class="{ 'hidden': collapsed }">
                {{ tab.title }}
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right Side Content -->
      <div 
        class="content-area"
        :style="{ width: `${100 - sidebarWidth}%` }"
      >
        <div class="tab-content">
          <div class="content-body">
            <transition name="fade" mode="out-in">
              <BlockGrid
                v-if="currentTab"
                :key="currentTab.key"
                :blockConfigs="currentTab.blockConfigs"
                :layout="currentTab.layout"
                :rows="currentTab.rows || defaultConfig.rows"
                :columns="currentTab.columns || defaultConfig.columns"
                :rowHeight="currentTab.rowHeight || defaultConfig.rowHeight"
                :gap="currentTab.gap || defaultConfig.gap"
                @blockUpdate="(data) => handleBlockUpdate(currentTab.key, data)"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BlockGrid from './BlockGrid.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  tabs: {
    type: Array,
    required: true
  },
  defaultConfig: {
    type: Object,
    default: () => ({
      rows: 12,
      columns: 12,
      rowHeight: 60,
      gap: '10px'
    })
  },
  initialCollapsed: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['tabChange', 'blockUpdate', 'refresh']);

const collapsed = ref(props.initialCollapsed);
const activeKey = ref(props.tabs[0]?.key);
const sidebarWidth = computed(() => collapsed.value ? 8 : 16);

const currentTab = computed(() => 
  props.tabs.find(tab => tab.key === activeKey.value)
);

const isActive = (key) => activeKey.value === key;

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const handleTabClick = (key) => {
  activeKey.value = key;
  emit('tabChange', key);
};

const handleBlockUpdate = (tabKey, data) => {
  emit('blockUpdate', {
    tabKey,
    ...data
  });
};

const handleRefresh = () => {
  emit('refresh', currentTab.value?.key);
};
</script>

<style scoped>
.vertical-block-tabs {
  height: 100%;
}

.layout-row {
  display: flex;
  gap: 16px;
  height: 100%;
}

.sidebar {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.sidebar-collapsed {
  width: 80px;
}

.tab-menu {
  padding: 8px 0;
}

.tab-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-menu li {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.tab-menu li:hover {
  background-color: #f5f5f5;
}

.tab-menu li.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.tab-icon {
  margin-right: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-title.hidden {
  display: none;
}

.content-area {
  flex-grow: 1;
}

.tab-content {
  padding: 24px;
  height: 100%;
}

.content-body {
  padding: 4px;
  border-radius: 4px;
  min-height: 500px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>