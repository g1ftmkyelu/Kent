<template>
    <div class="card bg-cardLight rounded-lg p-4 shadow mb-6">
      <div class="flex items-center gap-2 mb-4">
        <i :class="[resource.icon, 'text-xl']"></i>
        <h3 class="text-lg font-semibold text-text">
          {{ resource.label }} Distribution
        </h3>
      </div>
      
      <VueApexCharts
        v-if="!loading && hasData"
        :key="chartKey"
        :type="chartType"
        :options="chartConfig"
        :series="chartSeries"
        height="350"
      />
      
      <div 
        v-else-if="loading" 
        class="h-[350px] flex items-center justify-center"
      >
        <span class="loading loading-spinner"></span>
      </div>
      
      <div 
        v-else 
        class="h-[350px] flex items-center justify-center text-text"
      >
        No data available
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'
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
    },
    chartType: {
      type: String,
      default: 'pie',
      validator: (value) => ['pie', 'bar', 'donut'].includes(value)
    }
  })
  
  const items = ref([])
  const loading = ref(false)
  const chartKey = ref(0) // Used to force chart re-render
  
  const field = computed(() => {
    return props.resource.schema.find(f => 
      f.name === props.fieldName && ['status', 'select'].includes(f.type)
    )
  })
  
  const fieldOptions = computed(() => field.value?.options || [])
  
  const chartData = computed(() => {
    return fieldOptions.value.map(option => ({
      name: option.label,
      value: getCountForOption(option.value)
    }))
  })
  
  const hasData = computed(() => {
    return chartData.value.some(item => item.value > 0)
  })
  
  const chartSeries = computed(() => {
    if (props.chartType === 'bar') {
      return [{
        name: props.resource.label,
        data: chartData.value.map(item => item.value)
      }]
    }
    return chartData.value.map(item => item.value)
  })
  
  const chartConfig = computed(() => {
    if (props.chartType === 'bar') {
      return {
        chart: {
          type: 'bar',
          background: 'transparent',
          fontFamily: 'inherit',
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => val
        },
        xaxis: {
          categories: chartData.value.map(item => item.name),
        },
        yaxis: {
          title: {
            text: 'Count'
          }
        },
        colors: fieldOptions.value.map(option => option.color || undefined),
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      }
    }
  
    // Pie/Donut chart config
    return {
      chart: {
        type: props.chartType,
        background: 'transparent',
        fontFamily: 'inherit',
        toolbar: {
          show: false
        }
      },
      labels: chartData.value.map(item => item.name),
      colors: fieldOptions.value.map(option => option.color || undefined),
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${Math.round(val)}%`
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%'
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  })
  
  const getCountForOption = (optionValue) => {
    return items.value.filter(item => item[props.fieldName] === optionValue).length
  }
  
  const fetchItems = async () => {
    loading.value = true
    try {
      const response = await axios.get(
        `http://localhost:4500/api/v1/${props.resource.name}?limit=100`
      )
      items.value = response.data.data
      // Force chart re-render after data update
      chartKey.value += 1
    } catch (error) {
      message.error(`Failed to fetch ${props.resource.label}`)
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  
  watch(() => props.resource, () => {
    items.value = []
    fetchItems()
  }, { deep: true })
  
  watch(() => props.chartType, () => {
    // Force chart re-render when type changes
    chartKey.value += 1
  })
  
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
  
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
  }
  </style>