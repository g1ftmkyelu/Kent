<template>
    <div class="p-6 w-full overflow-x-hidden min-h-screen bg-background">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-text">{{ resource.label }} Timeline</h1>
        
        <div class="flex gap-4">
          <button 
            @click="showStats = true"
            class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark flex items-center gap-2"
          >
            <i class="pi pi-chart-bar"></i>
            <span>Statistics</span>
          </button>
          <button
            v-if="showAddButton"
            @click="navigateToAdd"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-2"
          >
            <i class="pi pi-plus"></i>
            <span>Add {{ resource.label.slice(0, -1) }}</span>
          </button>
        </div>
      </div>
  
      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary"></div>
  
        <!-- Timeline items -->
        <div class="space-y-8">
          <template v-for="(group, date) in groupedItems" :key="date">
            <!-- Date header -->
            <div class="flex justify-center relative z-10 mb-4">
              <div class="bg-primary text-white px-4 py-2 rounded-full">
                {{ formatDate(date) }}
              </div>
            </div>
  
            <!-- Items for this date -->
            <TransitionGroup
              name="timeline"
              tag="div"
              class="space-y-4"
            >
              <div
                v-for="item in group"
                :key="item.id"
                class="relative"
                :class="[
                  itemPosition(item) === 'left' ? 'pr-1/2' : 'pl-1/2',
                  'flex', itemPosition(item) === 'left' ? 'justify-end' : 'justify-start'
                ]"
              >
                <!-- Connector line -->
                <div 
                  class="absolute top-1/2 w-10 h-0.5 bg-primary"
                  :class="[itemPosition(item) === 'left' ? 'right-0' : 'left-0']"
                ></div>
  
                <!-- Item card -->
                <div 
                  class="w-[calc(100%-2rem)] transition-all duration-300 hover:transform hover:scale-[1.02]"
                  :class="[itemPosition(item) === 'left' ? 'mr-10' : 'ml-10']"
                >
                  <div class="card">
                    <ResourceRenderer 
                      :resource="resource"
                      :displayData="item"
                      :layout="resource.layout"
                      :showHeading="false"
                    />
                  </div>
                </div>
  
                <!-- Timeline dot -->
                <div 
                  class="absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white"
                ></div>
              </div>
            </TransitionGroup>
          </template>
        </div>
      </div>
  
      <!-- Loading overlay -->
      <div 
        v-if="loading"
        class="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { message } from 'ant-design-vue'
  import { format, parseISO, isValid } from 'date-fns'
  import ResourceRenderer from '../../../Object/objectrenderer.vue'
  import { effects } from '../../../../executables/effects'
  
  const props = defineProps({
    resource: {
      type: Object,
      required: true
    },
    showAddButton: {
      type: Boolean,
      default: true
    }
  })
  
  const router = useRouter()
  const items = ref([])
  const loading = ref(false)
  
  // Get date field from resource schema
  const dateField = computed(() => {
    return props.resource.schema.find(field => field.type === 'date')
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
    
    // Sort dates in descending order
    return Object.fromEntries(
      Object.entries(groups)
        .sort(([dateA], [dateB]) => parseISO(dateB) - parseISO(dateA))
    )
  })
  
  // Format date for display
  const formatDate = (date) => {
    return format(parseISO(date), 'MMMM d, yyyy')
  }
  
  // Alternate items between left and right
  const itemPosition = (item) => {
    const allItems = Object.values(groupedItems.value).flat()
    const index = allItems.findIndex(i => i.id === item.id)
    return index % 2 === 0 ? 'left' : 'right'
  }
  
  // Fetch items from API
  const fetchItems = async () => {
    loading.value = true
    try {
      const response = await axios.get(`http://localhost:4500/api/v1/${props.resource.name}?limit=100`)
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
  
  // Watch for resource changes
  watch(() => props.resource, (newResource) => {
    items.value = []
    fetchItems()
  }, { deep: true })
  
  onMounted(() => {
    fetchItems()
  })
  </script>
  
  <style scoped>
  .timeline-enter-active,
  .timeline-leave-active {
    transition: all 0.5s ease;
  }
  
  .timeline-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .timeline-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
  
  .card {
    @apply bg-cardLight rounded-lg shadow p-4;
  }
  </style>