<template>
  <div class="market-container mt-8 mx-3">
    <h1 class="heading">Market</h1>



    <div class="flex justify-between items-center mb-4">
      <h2 class="heading">New Arrivals</h2>
      <action_dispatcher :resource="marketActions" :item="{}" :orientation="'icons'" />
    </div>

    <data_fetcher resource="products" :params="fetchParams">
      <template v-slot="{ data, error, pagination }">
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-else-if="data" class="w-full carousel-container">
          <Carousel :autoplay="3000" :items-to-show="4" :items-to-scroll="1" :wrap-around="true" :breakpoints="carouselBreakpoints">
            <Slide v-for="product in data" :key="product.id">
              <div class="card mx-2">
                <ResourceRenderer :resource="productResource" :displayData="product" :layout="miniProductLayout"
                  :showHeading="false" :payload="product" />
              </div>
            </Slide>
          </Carousel>
          <div class="carousel-fade-left"></div>
          <div class="carousel-fade-right"></div>
        </div>
      </template>
    </data_fetcher>



   
    <div class="flex justify-between items-center mb-4">
      <h2 class="heading">All Products</h2>
      <action_dispatcher :resource="marketActions" :item="{}" :orientation="'icons'" />
    </div>
    <data_fetcher resource="products" :params="fetchParams">
      <template v-slot="{ data, error, pagination }">
        <div v-if="error">Error: {{ error.message }}</div>
        <div v-else-if="data" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-x-4 md:gap-y-10">
          <div class="card" v-for="product in data" :key="product.id">
            <ResourceRenderer :resource="productResource" :displayData="product" :layout="productLayout"
              :showHeading="false" :payload="product" />
          </div>
        </div>
        <div v-if="pagination" class="mt-4">
          <!-- Add pagination controls here if needed -->
        </div>
      </template>
    </data_fetcher>

  </div>
</template>

<script>
import ResourceRenderer from '../../components/Object/objectrenderer.vue';
import action_dispatcher from '../../components/action_dispatcher.vue';
import data_fetcher from '../../components/data_fetcher.vue';
import { e_commerce_management_system } from '../../modules/e_commerce_system/system';
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
export default {
  name: 'Market',
  components: {
    ResourceRenderer,
    action_dispatcher,
    data_fetcher,
    Carousel,
    Slide
  },
  data() {
    return {
      productResource: e_commerce_management_system.find(resource => resource.name === 'products'),
      fetchParams: {
        page: 1,
        limit: 10,
        sortBy: 'productName',
        order: 'asc'
      },
      miniProductLayout: {
        rows: 4,
        columns: 4,
        fields: {
          images: { rowStart: 1, rowSpan: 3, colStart: 1, colSpan: 4 },
          productName: { rowStart: 3, rowSpan: 1, colStart: 1, colSpan: 4 },
          price: { rowStart: 4, rowSpan: 1, colStart: 1, colSpan: 2 },
          category: { rowStart: 4, rowSpan: 1, colStart: 3, colSpan: 2 },
        },
        actions: [
          {
            name: 'mini_product_actions',
            rowStart: 1,
            rowSpan: 1,
            colStart: 4,
            colSpan: 1,
            actions: [
              { name: 'addToCart', icon: 'fa fa-shopping-cart', label: 'Add to Cart' },
              { name: 'goToView', icon: 'fa fa-eye', label: 'View Details' },
              { name: 'bookmark', icon: 'fa fa-bookmark', label: 'Bookmark' },
            ],
            orientation: 'dropdown',
            style: 'position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;'
          }
        ]
      },
      productLayout: {
        rows: 5,
        columns: 6,
        fields: {
          images: { rowStart: 1, rowSpan: 5, colStart: 1, colSpan: 3 },
          productName: { rowStart: 1, rowSpan: 1, colStart: 4, colSpan: 2 },
          price: { rowStart: 2, rowSpan: 1, colStart: 4, colSpan: 1 },
          category: { rowStart: 2, rowSpan: 1, colStart: 5, colSpan: 2 },
          description: { rowStart: 3, rowSpan: 2, colStart: 4, colSpan: 3 },
        },
        actions: [
          {
            name: 'product_secondary_actions',
            rowStart: 1,
            rowSpan: 1,
            colStart: 6,
            colSpan: 1,
            alignment: 'top-right',
            actions: [
              { name: 'bookmark', icon: 'fa fa-bookmark', label: 'Bookmark' },
              { name: 'dontRecommendProduct', icon: 'pi pi-times-circle', label: 'Don\'t Recommend' },
              { name: 'report', icon: 'fa fa-flag', label: 'Report' },
            ],
            orientation: 'dropdown',
            style: 'position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;'
          },
          {
            name: 'product_main_actions',
            rowStart: 5,
            rowSpan: 1,
            colStart: 4,
            colSpan: 3,
            alignment: 'bottom-left',
            actions: [
              { name: 'addToCart', icon: 'fa fa-shopping-cart', label: 'Add to Cart' },
              { name: 'goToView', icon: 'fa fa-eye', label: 'View Details' },
            ],
            orientation: 'buttons'
          }
        ]
      },
      marketActions: {
        actions: [
          {
            name: 'filter',
            icon: 'fa fa-filter',
            label: 'Filter Products',
          },
          {
            name: 'sort',
            icon: 'fa fa-sort',
            label: 'Sort Products',
          },
          {
            name: 'exportCatalog',
            icon: 'fa fa-download',
            label: 'Export Catalog',
          }
        ],
      },
      carouselBreakpoints: {
        700: {
          itemsToShow: 2.5,
          snapAlign: 'center',
        },
        1024: {
          itemsToShow: 3.5,
          snapAlign: 'start',
        },
      },
    };
  },
  methods: {
    // Add methods to handle pagination, filtering, sorting, etc.
  }
};
</script>

<style scoped>
.market-container {
  padding: 20px;
}

.card {
  border-radius: 8px;
}

.heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.carousel-container {

}

:deep(.carousel__slide) {
  padding: 5px;
}

:deep(.carousel__viewport) {
  padding-left: 0;
  padding-right: 0;
}

.carousel-fade-left,
.carousel-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 150px;
  pointer-events: none;
  z-index: 1;
}

.carousel-fade-left {
  left: 0;
  background: linear-gradient(to right, var(--background) 0%, transparent 100%);
}

.carousel-fade-right {
  right: 0;
  background: linear-gradient(to left, var(--background) 0%, transparent 100%);
}

@media (max-width: 640px) {
  .market-container {
    padding: 10px;
  }
}

/* Add these styles for the mini product layout */
.mini-product {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mini-product:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.mini-product .images {
  height: 150px;
  object-fit: cover;
}

.mini-product .productName {
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem;
}

.mini-product .price {
  font-weight: bold;
  color: #4a5568;
  padding: 0.5rem;
}

.mini-product .category {
  color: #718096;
  font-size: 0.875rem;
  padding: 0.5rem;
  text-align: right;
}

.mini-product .action_dispatcher {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.mini-product:hover .action_dispatcher {
  opacity: 1;
}
</style>