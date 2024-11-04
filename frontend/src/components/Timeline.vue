<template>
  <div class=" w-full overflow-x-hidden min-h-screen bg-background">


    <!-- Timeline -->
    <div class="timeline-container">
      <div class="timeline relative">
        <div v-for="(group, date) in groupedItems" :key="date" class="timeline-group">
          <!-- Date header -->
          <div class="timeline-date">
            <div class="date-marker">
            <i class="pi pi-calendar"></i>  {{ formatDate(date) }}
            </div>
          </div>

          <!-- Items for this date -->
          <div 
            v-for="item in group" 
            :key="item.id"
            class="timeline-item-wrapper"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-item card">
              <ResourceRenderer 
                :resource="resource"
                :displayData="item"
                :layout="resource.layout"
                :showHeading="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading overlay -->
    <div 
      v-if="loading"
      class="fixed inset-0 bg-background/50 flex items-center justify-center z-50"
    >
      <div class="loader"></div>
    </div>
  </div>
</template>




  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { message, Timeline, Button, Spin } from 'ant-design-vue'
  import { format, parseISO, isValid } from 'date-fns'
  import { BarChartOutlined, PlusOutlined } from '@ant-design/icons-vue'
  import ResourceRenderer from './Object/objectrenderer.vue'
  import { effects } from '../executables/effects'
  
  const props = defineProps({
    resource: {
      type: Object,
      required: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    },
    maxDisplayItems: {
      type: Number,
      default: 7
    }
  })
  
  const router = useRouter()
  const items = ref([])
  const loading = ref(false)
  
  // Get date field from resource schema
  const dateField = computed(() => {
    return props.resource.schema.find(field => ['date', 'time', 'datetime'].includes(field.type))
  })
  
  // Group items by date
  const groupedItems = computed(() => {
    const groups = {}
    items.value.forEach(item => {
      const date = item[dateField.value.name]
      if (date && isValid(parseISO(date))) {
        const formattedDate = format(parseISO(date), 'yyyy-MM-dd')
        if (!groups[formattedDate]) {
          groups[formattedDate] = []
        }
        groups[formattedDate].push(item)
      }
    })
    
    return Object.fromEntries(
      Object.entries(groups)
        .sort(([dateA], [dateB]) => parseISO(dateB) - parseISO(dateA))
    )
  })
  
  const formatDate = (date) => {
    return format(parseISO(date), 'MMMM d, yyyy')
  }
  
  const fetchItems = async () => {
    loading.value = true
    try {
      const response = await axios.get(`http://localhost:4500/api/v1/${props.resource.name}?limit=${props.maxDisplayItems}`)
      items.value = response.data.data
    } catch (error) {
      message.error(`Failed to fetch ${props.resource.label}`)
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  
  const navigateToAdd = () => {
    router.push(`/dashboard/${props.resource.path}/item/add`)
  }
  
  watch(() => props.resource, (newResource) => {
    items.value = []
    fetchItems()
  }, { deep: true })
  
  onMounted(() => {
    fetchItems()
  })
  </script>
  
  <style scoped>
  .timeline-container {
    @apply  mx-auto px-6;
  }
  
  .timeline {
    @apply relative pl-8;
  }
  
  .timeline::before {
    content: '';
    @apply absolute left-0 top-0 h-full w-0.5 bg-primary;
  }
  
  .timeline-group {
    @apply mb-8;
  }
  
  .timeline-date {
    @apply relative mb-6;
  }
  
  .date-marker {
    @apply bg-primary text-white px-4 py-2 rounded-full text-sm font-medium inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .timeline-item-wrapper {
    @apply relative mb-6;
  }
  
  .timeline-dot {
    @apply absolute -left-[2.25rem] w-4 h-4 rounded-full bg-primary;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .timeline-dot::before {
    content: '';
    @apply absolute top-1/2 left-4 w-4 h-0.5 bg-primary;
  }
  
  .timeline-item {
    @apply  rounded-lg p-4 shadow-md ml-4 transition-all duration-300;
  }
  
  .timeline-item:hover {
    @apply transform translate-x-2 shadow-lg;
  }
  
  .loader {
    @apply w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin;
  }
  
  /* Custom animation for timeline items */
  .timeline-item-wrapper {
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  </style>