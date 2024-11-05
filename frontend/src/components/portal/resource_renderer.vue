<template>
  <data_fetcher v-if="resource.renderMode === 'crud' || resource.renderMode === 'object'" 
    :resource="resource.name"
    requestType="getResources" 
    :params="{
      returnFields: '',
      page: 1,
      limit: 333,
      sortBy: '',
      order: 'desc',
      search: '',
      filter: computedFilters
    }">
    <template v-slot="{ data, loading, error }">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>
        <Crud :resource="resource"/>
      </div>
    </template>
  </data_fetcher>
  
  <Singleton v-else-if="resource.renderMode === 'singleton'" :resource="resource" />
  <Chat v-else-if="resource.renderMode === 'chat'" />
  <Table_view v-else-if="resource.renderMode === 'table'" />
  <dashboard_renderer v-else-if="resource.renderMode === 'dashboard'" :resource="resource" />
  <WebPage v-else-if="resource.renderMode === 'webpage'" :resource="resource" />
  <market v-else-if="resource.renderMode === 'market'" :resource="resource" />
  <notifications v-else-if="resource.renderMode === 'notifications'" :resource="resource" />
  <systemSettings v-else-if="resource.renderMode === 'system-config'" :resource="resource" />
  <BlockGrid v-else-if="resource.renderMode === 'blocks'" :blockConfigs="resource.blockConfigs" :layout="resource.layout" />
  <kanban_board v-else-if="resource.renderMode === 'kanban'" :show-add-button="resource.showAddButton" :resource="resource" />
  
  <div v-else-if="resource.renderMode === 'data-group'" class="mx-5">
    <DataGroup 
      :resource="resource" 
      :presetIdFilters="processedFilters"
    />
  </div>
  
  <div v-else-if="resource.renderMode === 'report'" class="mx-5">
    <report :resource="resource" />
  </div>
  
  <h1 v-else>unknown renderMode</h1>
</template>

<script>
import Crud from "./render_modes/crud/crud.vue";
import Singleton from "./render_modes/singleton/singleton.vue";
import Chat from "./render_modes/chat/chat.vue";
import Dashboard from "./dashboards/dashboard.vue";
import WebPage from "./render_modes/web_page/web_page.vue";
import systemSettings from "./render_modes/system-settings/system-settings.vue";
import market from "../widgets/market.vue";
import breadcrumbs from "../breadcrumbs.vue";
import data_fetcher from "../data_fetcher.vue";
import Table_view from "./render_modes/crud/table_view.vue";
import notifications from "./render_modes/notifications/notifications.vue";
import dashboard_renderer from "./dashboards/dashboard_renderer.vue";
import kanban_board from "./render_modes/kanban/kanban_board.vue";
import BlockGrid from "../BlockGrid.vue";
import DataGroup from "../Object/DataGroup.vue";
import report from "../statistics/report.vue";
import { computed } from "vue";

export default {
  components: {
    Crud,
    Singleton,
    Chat,
    Dashboard,
    WebPage,
    systemSettings,
    market,
    breadcrumbs,
    data_fetcher,
    Table_view,
    notifications,
    dashboard_renderer,
    kanban_board,
    BlockGrid,
    DataGroup,
    report
  },
  
  mounted() {
    window.scrollTo(0, 0);
    console.log('Computed Filters:', this.computedFilters);
    console.log('Processed Filters:', this.processedFilters);
  },
  
  watch: {
    $route(to, from) {
      window.scrollTo(0, 0);
    },
    resource: {
      handler() {
        // Resource change handler logic if needed
      },
      immediate: true,
    },
  },
  
  data() {
    return {
      userID: localStorage.getItem("userId"),
    };
  },
  
  props: {
    resource: {
      type: Object,
      required: true,
    },
    customFilters: {
      type: Object,
      required: true,
    },
    showbreadcrumbs: {
      type: Boolean,
      required: false,
    },
  },
  
  computed: {
    computedFilters() {
      if (this.customFilters) {
        return this.customFilters;
      }
      
      if (this.resource.pivot) {
        if (this.resource.pivot.value === 'current_user_id') {
          const myValue = this.userID;
          return { [this.resource.pivot.field]: myValue };
        } else if (this.resource.pivot.value === 'url_param') {
          return { 
            [this.resource.pivot.field]: this.$route.query.myParam || '66fca48130667e790bea9468' 
          };
        }
      }
      
      return {};
    },
    
    processedFilters() {
      const processed = {};
      
      if (this.computedFilters) {
        // Handle basic key-value pairs
        Object.entries(this.computedFilters).forEach(([key, value]) => {
          // If value is a simple ID
          if (typeof value === 'string' || typeof value === 'number') {
            processed[key] = value;
          }
          // If value is an object with an id property
          else if (value && typeof value === 'object' && 'id' in value) {
            processed[`${key}Id`] = value.id;
          }
          // If value is an array of IDs
          else if (Array.isArray(value)) {
            processed[key] = value;
          }
        });
      }
      
      return processed;
    }
  }
};
</script>

<style>
/* Add any necessary styles here */
</style>