<template>
  <div class="flex flex-col items-center justify-center h-full">

    <div class="w-[100%]  px-2 py-4 h-[100%] overflow-scroll rounded-lg  relative">

      <div v-if="loading" class="loader-container">
        <LoaderAlt />
      </div>

      <div v-else>

        <div class=" sm:w-full w-[18.7rem]" v-if="mode === 'add'">
          <h2 class="heading"> add {{ resource.label }}</h2>
          <DynamicForm :resource="resource" :initial-data="initialData" :is-adding="true" />
        </div>

        <div class=" sm:w-full w-[18.7rem]" v-else-if="mode === 'edit'">
          <h2 class="heading"> edit {{ resource.label }}</h2>
          <DynamicForm :resource="resource" :initial-data="inventoryItem" :is-adding="false" redirect-to="prev" />
        </div>

        <div v-else-if="mode === 'object'">
          <ObjectRenderer/>
        </div>

        <div  v-else class="item-details sm:w-full w-[18.7rem]">
          <div class="flex items-center justify-between">
            <h2 class="heading">view {{ resource.label }}</h2>
            <action_dispatcher :resource="resource" :item="inventoryItem" orientation="modal" />
          </div>
          <DataRenderer :resource="resource" :initial-data="inventoryItem" :currentID="id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loader from "../../../u_i/sf_loader.vue";
import LoaderAlt from "../../../u_i/sf_loader_alt.vue";
import DynamicForm from "./dynamic_form.vue";
import DataRenderer from "./data_renderer/data_renderer.vue";
import { Resources } from "../../../../data/resources";
import { getDefaultValuesFromSchema } from "../../../../executables/getDefaultValues";
import action_dispatcher from "../../../action_dispatcher.vue";


export default {
  components: {
    Loader,
    LoaderAlt,
    DynamicForm,
    DataRenderer,
    action_dispatcher
  },
  data() {
    return {
      actionLoading: false,
      inventoryItem: {},
      loading: false,
      id: this.$route.params.id,
      mode: "", 
      resourceName: "",
      resource: {},
      initialData: {},
    };
  },

  created() {


    const mode = this.$route.params.mode;
    const resourceName = this.$route.params.resourceName;
    this.resourceName = resourceName;
    this.resource = Resources.find((r) => r.path === resourceName);
    this.mode = mode;
    this.initialData = getDefaultValuesFromSchema(this.resource);
    console.log(this.initialData);

    if (mode === "add") {
      this.inventoryItem = {
        itemName: "",
        quantity: null,
        unitOfMeasure: "",
      };
    } else {
      this.fetchInventoryItem();
    }
  },
  methods: {

    goBack() {
      this.$router.go(-1);
    },
    fetchInventoryItem() {
      this.loading = true;
      const itemId = this.$route.params.id;
      const mode = this.$route.params.mode;
      this.mode = mode;

      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/v1/${this.resource.name}/${itemId}`)
        .then((response) => {
          this.inventoryItem = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching inventory item:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

  },
};
</script>
