<template>
  <div v-if="loading">
    <LoaderAlt />
  </div>
  <div v-else>
    <div class="container mx-auto p-2 lg:p-4">
      <div class="my-6">
        <div class="flex items-center justify-between">
          <h5>
            <i :class="resource.icon">&nbsp;</i>{{ resource.label }}
            | <span>&nbsp;{{ totalCount }} {{ translationKeys.Records }}</span>
          </h5>
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-2 card">
            <button @click="addItemToResource" class="btn-sm">
              <i class="fas fa-plus text-xs"></i> {{ translationKeys.Create }}
            </button>
            <label class="flex items-center">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
              <span class="ml-1 text-sm">{{ translationKeys.SelectAll }}</span>
            </label>
            <select v-model="sortOrder" id="sortOrder" class="select-sm">
              <option value="asc">{{ translationKeys.Ascending }}</option>
              <option value="desc">{{ translationKeys.Descending }}</option>
            </select>
            <button @click="fetchResource" class="btn-sm">
              <i class="fas fa-sync-alt text-xs"></i>
            </button>
            <select v-model="selectedAction" @change="performAction" class="select-sm">
              <option value="" disabled>{{ translationKeys.Actions }}</option>
              <option value="exportCSV">{{ translationKeys.ExportCSV }}</option>
            </select>
            <button v-if="selectedRows.length > 0" @click="showBulkDeleteConfirmation" class="btn-sm">
              <i class="fas fa-trash text-xs"></i>
            </button>
            <button v-if="selectedRows.length > 0 && checkRef()" @click="toggleBulkUpdateDrawer" class="btn-sm">
              <i class="fas fa-edit text-xs"></i>
            </button>

            <!--             <div v-if="checkRef()" class="w-full mt-2">
              <label class="flex items-center">
                <i class="fa fa-filter" aria-hidden="true"></i>
                <span class="ml-1">{{ translationKeys.Filter }}</span>
              </label>
              <div class="flex items-center mt-1">
                <DynamicFormEmbedable :resource="sanitizedResource" :initialData="{}" :returnDataOnly="true"
                  @form-data="applyFilters" class="flex-grow" />
                <button class="btn-sm ml-2" @click="clearFilters">
                  {{ translationKeys.Reset }}
                </button>
              </div>
            </div> -->

          </div>
        </div>
      </div>
      <div v-if="loading" class="flex justify-center items-center h-screen">
        <Loader />
      </div>
      <div v-else>
        <DynamicTable :resource="resource" :items="FilteredData" :objectFilters="objectFilters"
          :selectedRows="selectedRows" @update:selectedRows="updateSelectedRows" />
      </div>
      <download-csv :data="sanitizedData"
        :name="`${resource.name}_${new Date().toISOString().replace(/[:.-]/g, '')}.csv`" ref="csvDownloader">
        <span style="display: none;">{{ translationKeys.DownloadCSV }}</span>
      </download-csv>
      <Modal ref="confirmModal" @confirm="confirmBulkDelete" @cancel="cancelBulkDelete">
        <template #header>{{ translationKeys.ConfirmBulkDelete }}</template>
        <template #body>
          <p>{{ translationKeys.ConfirmBulkDeleteMessage }}</p>
        </template>
      </Modal>
      <transition name="slide-fade">
        <div v-if="showFilterDrawer" class="fixed inset-y-0 right-0 w-96 z-50 overflow-y-auto">
          <div>
            <div>
              <h2>Filter {{ resource.label }}</h2>
              <button @click="toggleFilterDrawer">
                <i class="fas fa-times fa-lg"></i>
              </button>
            </div>
            <DynamicForm :resource="sanitizedResource" :initialData="{}" :returnDataOnly="true"
              @form-data="applyFilters" />
          </div>
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="showBulkUpdateDrawer" class="fixed inset-y-0 right-0 w-96 z-50 overflow-y-auto">
          <div>
            <div>
              <h2>{{ `${translationKeys.BulkUpdate} ${resource.label}` }}</h2>
              <button @click="toggleBulkUpdateDrawer">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { translationKeys } from '@/executables/translation';
import Loader from "../../../u_i/sf_loader.vue";
import LoaderAlt from "../../../u_i/sf_loader_alt.vue";
import DynamicTable from "./crud_view_renderer.vue";
import DynamicForm from "./dynamic_form.vue";
import Swal from "sweetalert2";
import { ref } from 'vue';
import DynamicFormEmbedable from "./embedable_dynamic_form.vue";
import Filterdata from "../../../../executables/Filterdata";
import sanitizeData from "../../../../executables/sanitizeData";

export default {
  components: { Loader, DynamicTable, LoaderAlt, DynamicForm, DynamicFormEmbedable },
  setup() {
    const csvDownloader = ref(null);
    return { csvDownloader };
  },
  data() {
    return {
      loading: false,
      translationKeys,
      sanitizedData: [],
      FilteredData: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 0,
      totalCount: 0,
      sortOrder: "asc",
      selectedRows: [],
      selectAll: false,
      selectedAction: "",
      showFilterDrawer: false,
      filters: {},
      sanitizedResource: {},
      showBulkUpdateDrawer: false,
      CanAdd: false,
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
    resources: {
      type: Array,
      required: true,
    },
  },
  watch: {
    "resource.name": {
      async handler() {
        this.CanAdd = this.resource.actions.some(action => 'create' in action);
        this.sanitizedResource = this.sanitizeResourceSchema(this.resource);
        this.sanitizedData = await sanitizeData(this.FilteredData);
        this.FilteredData = await Filterdata(this.resources, this.resource, { ...this.filters, ...this.objectFilters });
        this.fetchResource();
        this.selectAll = this.selectedRows.length === this.resources.length;
      },
    },
  },
  computed: {
    portalName() {
      const segments = this.$route.path.split('/');
      return segments.length > 1 ? segments[1] : '';
    }    
  },
  async mounted() {
    this.CanAdd = this.resource.actions.some(action => 'create' in action);
    this.sanitizedResource = this.sanitizeResourceSchema(this.resource);
    this.fetchResource();
  },
  methods: {
    toggleFilterDrawer() {
      this.showFilterDrawer = !this.showFilterDrawer;
    },
    checkRef() {
      return this.resource.schema.some(field => field.type === 'ref');
    },
    toggleBulkUpdateDrawer() {
      this.showBulkUpdateDrawer = !this.showBulkUpdateDrawer;
    },
    async applyBulkUpdate(updateData) {
      const sanitizedUpdateData = this.sanitizeObject(updateData);
      if (Object.keys(sanitizedUpdateData).length === 0) {
        Swal.fire('Error', 'No fields selected for update', 'error');
        return;
      }
      const bulkUpdatePayload = this.selectedRows.map(id => ({
        _id: id,
        ...sanitizedUpdateData
      }));
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/v1/${this.resource.name}/bulkupdate`,
          bulkUpdatePayload
        );
        if (response.status === 200) {
          Swal.fire(translationKeys.Success, translationKeys.BulkUpdateSuccess, 'success');
          this.selectedRows = [];
          this.selectAll = false;
          this.fetchResource();
          this.toggleBulkUpdateDrawer();
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error("Error performing bulk update:", error);
        Swal.fire(translationKeys.Error, translationKeys.BulkUpdateError, 'error');
      }
    },
    sanitizeObject(obj) {
      const sanitizedObj = {};
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value !== null && value !== "" &&
          !(typeof value === 'object' && Object.keys(value).length === 0)) {
          sanitizedObj[key] = value;
        }
      });
      return sanitizedObj;
    },
    sanitizeResourceSchema(resourceObject) {
      if (!resourceObject || !resourceObject.schema) {
        return resourceObject;
      }
      const sanitizedSchema = resourceObject.schema.filter(field =>
        ['ref', 'select', 'check'].includes(field.type))
      return {
        ...resourceObject,
        schema: sanitizedSchema
      };
    },
    async applyFilters(filterData) {
      this.loading = true;
      try {
        const sanitizedJson = this.sanitizeObject(filterData)
        this.filters = sanitizedJson;
        this.currentPage = 1;
        this.FilteredData = await Filterdata(this.resources, this.resource, { ...sanitizedJson, ...this.objectFilters });
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchResource() {
      this.loading = true;
      try {
        this.FilteredData = await Filterdata(this.resources, this.resource, { ...this.filters, ...this.objectFilters });
        this.sanitizedData = await sanitizeData(this.FilteredData);
        this.totalCount = this.FilteredData.length;
        this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        this.loading = false;
      }
    },
    addItemToResource() {
      if (this.resource && this.resource.name) {
        const resourceName = this.resource.path;
        window.location.href = `/${this.portalName}/${resourceName}/item/add`;
      } else {
        console.warn("Resource is undefined or does not have a name property");
      }
    },
    clearFilters() {
      this.$router.go(0);
    },
    exportToCSV() {
      if (this.$refs.csvDownloader) {
        this.$refs.csvDownloader.$el.click();
      }
    },
    performAction() {
      switch (this.selectedAction) {
        case "exportCSV":
          this.exportToCSV();
          break;
        case "clearFilters":
          this.clearFilters();
          break;
        case "refresh":
          this.fetchResource();
          break;
        case "bulkDelete":
          this.showBulkDeleteConfirmation();
          break;
      }
      this.selectedAction = "";
    },
    toggleSelectAll() {
      if (this.selectAll) {
        this.selectedRows = this.resources.map(item => item.id);
      } else {
        this.selectedRows = [];
      }
    },
    updateSelectedRows(rows) {
      this.selectedRows = rows;
      this.selectAll = this.selectedRows.length === this.resources.length;
    },
    showBulkDeleteConfirmation() {
      Swal.fire({
        title: translationKeys.AreYouSure,
        text: translationKeys.DeleteWarning,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: translationKeys.YesDelete
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmBulkDelete();
        }
      });
    },
    async confirmBulkDelete() {
      try {
        await axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/v1/${this.resource.name}`, {
          data: this.selectedRows
        });
        this.fetchResource();
        this.selectedRows = [];
        this.selectAll = false;
        Swal.fire(
          translationKeys.Deleted,
          translationKeys.DeleteSuccess,
          'success'
        );
      } catch (error) {
        console.error("Error performing bulk delete:", error);
        Swal.fire(
          translationKeys.Error,
          translationKeys.DeleteError,
          'error'
        );
      }
    },
    cancelBulkDelete() {
      this.selectedAction = "";
    },
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}

.slide-fade-enter-active {
  animation: slideFadeEnter 0.5s ease both;
}

.slide-fade-leave-active {
  animation: slideFadeLeave 0.5s ease both;
}

@keyframes slideFadeEnter {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideFadeLeave {
  0% {
    opacity: 1;
    transform: translateX(0);
  }

  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

.btn-primary {
  @apply bg-secondary hover:bg-tertiary text-textLight font-medium py-2 px-3 rounded transition duration-150 ease-in-out;
}

.btn-secondary {
  @apply bg-cardDark hover:bg-gray-700 text-text font-medium py-2 px-3 rounded transition duration-150 ease-in-out;
}

.form-select {
  @apply bg-cardLight border border-gray-300 rounded py-1 px-2 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary;
}

.form-checkbox {
  @apply rounded border-gray-300 text-secondary focus:ring-secondary;
}
</style>
