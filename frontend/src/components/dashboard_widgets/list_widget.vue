<template>
  <div class="list-widget">
    <a-list :class="widgetProps.listClass">
      <a-list-item
        v-for="(item, index) in paginatedItems"
        :key="index"
        :class="widgetProps.itemClass"
      >
        <template v-if="typeof item === 'object'">
          <a-list-item-meta
            :title="item.title"
            :description="item.description"
          />
        </template>
        <template v-else>
          <span>{{ item }}</span>
        </template>
      </a-list-item>
    </a-list>
    <div v-if="widgetProps.pagination" class="pagination">
      <a-pagination
        :current="currentPage"
        :total="widgetProps.items.length"
        :page-size="itemsPerPage"
        @change="changePage"
        show-total
        :show-size-changer="false"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  name: 'ListWidget',
  props: {
    widgetProps: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const currentPage = ref(1)
    const itemsPerPage = props.widgetProps.itemsPerPage || 10

    const totalPages = computed(() =>
      Math.ceil(props.widgetProps.items.length / itemsPerPage)
    )

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return props.widgetProps.items.slice(start, end)
    })

    const changePage = (page) => {
      currentPage.value = page
    }

    return {
      currentPage,
      totalPages,
      paginatedItems,
      changePage
    }
  }
})
</script>

<style scoped>
.list-widget {
  padding: 16px;
  background-color: var(--cardLight);
}
.pagination {
  margin-top: 16px;
  text-align: center;
}
</style>
