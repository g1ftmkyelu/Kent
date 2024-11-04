<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
      <!-- Total Items Card -->
      <div class="card bg-cardLight rounded-lg p-4 shadow">
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <div class="flex items-center gap-2 mb-1">
              <i :class="[resource.icon, 'text-xl']"></i>
              <p class="text-sm text-text">Total {{ resource.label }}</p>
            </div>
            <p class="text-2xl font-bold text-text">{{ totalItems }}</p>
          </div>
          <span 
            :class="[
              'px-2 py-1 rounded-full text-xs',
              getTrendClass(totalTrend)
            ]"
          >
            {{ formatTrend(totalTrend) }}
          </span>
        </div>
        <p class="text-sm text-text mt-2">vs last 24 hours</p>
      </div>
  
      <!-- Dynamic Cards based on Field Options -->
      <div 
        v-for="option in fieldOptions" 
        :key="option.value"
        class="card bg-cardLight rounded-lg p-4 shadow"
      >
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <div class="flex items-center gap-2 mb-1">
              <i :class="[option.icon, 'text-xl']"></i>
              <p class="text-sm text-text">{{ option.label }}</p>
            </div>
            <p class="text-2xl font-bold text-text">{{ getCountForOption(option.value) }}</p>
          </div>
          <span 
            :class="[
              'px-2 py-1 rounded-full text-xs',
              getTrendClass(getTrendForOption(option.value))
            ]"
          >
            {{ formatTrend(getTrendForOption(option.value)) }}
          </span>
        </div>
        <div class="flex justify-between items-center mt-2">
          <p class="text-sm text-text">vs last 24 hours</p>
          <p class="text-sm text-text">
            {{ calculatePercentage(option.value) }}% of total
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { subHours, parseISO, isWithinInterval } from 'date-fns'
  import axios from 'axios'
  import { message } from 'ant-design-vue'
  
  const props = defineProps({
    resource: {
      type: Object,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    }
  })
  
  const items = ref([])
  const loading = ref(false)
  
  const field = computed(() => {
    return props.resource.schema.find(f => 
      f.name === props.fieldName && ['status', 'select'].includes(f.type)
    )
  })
  
  const fieldOptions = computed(() => field.value?.options || [])
  
  const totalItems = computed(() => items.value.length)
  
  const fetchItems = async () => {
    loading.value = true
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/${props.resource.name}?limit=100`
      )
      items.value = response.data.data
    } catch (error) {
      message.error(`Failed to fetch ${props.resource.label}`)
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  
  const getCountForOption = (optionValue) => {
    return items.value.filter(item => item[props.fieldName] === optionValue).length
  }
  
  const calculatePercentage = (optionValue) => {
    if (totalItems.value === 0) return 0
    return Math.round((getCountForOption(optionValue) / totalItems.value) * 100)
  }
  
  // Modified trend calculation for 24-hour comparison
  const calculateTrend = (items, optionValue = null) => {
    const now = new Date()
    const last24Hours = subHours(now, 24)
    const previous24Hours = subHours(last24Hours, 24)
  
    const filterByDateAndOption = (startDate, endDate) => {
      return items.filter(item => {
        const withinInterval = isWithinInterval(parseISO(item.createdAt), {
          start: startDate,
          end: endDate
        })
        return optionValue 
          ? withinInterval && item[props.fieldName] === optionValue
          : withinInterval
      }).length
    }
  
    const currentCount = filterByDateAndOption(last24Hours, now)
    const previousCount = filterByDateAndOption(previous24Hours, last24Hours)
  
    if (previousCount === 0) return currentCount > 0 ? 100 : 0
    return ((currentCount - previousCount) / previousCount) * 100
  }
  
  const totalTrend = computed(() => calculateTrend(items.value))
  
  const getTrendForOption = (optionValue) => {
    return calculateTrend(items.value, optionValue)
  }
  
  const formatTrend = (trend) => {
    const formattedTrend = trend.toFixed(1)
    return formattedTrend > 0 ? `+${formattedTrend}%` : `${formattedTrend}%`
  }
  
  const getTrendClass = (trend) => {
    return trend > 0 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }
  
  watch(() => props.resource, () => {
    items.value = []
    fetchItems()
  }, { deep: true })
  
  onMounted(() => {
    fetchItems()
  })
  </script>
  
  <style scoped>
  .card {
    transition: all 0.2s ease-in-out;
  }
  
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
  
  /* Added styles for icon alignment */
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
  }
  </style>