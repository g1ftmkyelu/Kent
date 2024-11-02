<template>
    <div :class="[
      'gap-4',
      layout === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
        : 'flex flex-col'
    ]">
      <div
        v-for="(item, index) in items"
        :key="index"
        @click="handleClick(item.redirectUrl)"
        class="group card cursor-pointer rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md hover:transform hover:-translate-y-1"
      >
        <div :class="[
          'flex items-center',
          layout === 'grid' ? 'flex-col text-center' : 'justify-between'
        ]">
          <div :class="[
            'flex',
            layout === 'grid' ? 'flex-col items-center' : 'items-center gap-4'
          ]">
            <i :class="[
              'fa', 
              item.icon,
              'text-2xl text-primary-600 mb-2 group-hover:text-primary-700'
            ]"></i>
            <div class="flex flex-col">
              <span class="font-medium text-gray-900">{{ item.actionName }}</span>
              <span class="text-sm text-gray-500">{{ item.description }}</span>
            </div>
          </div>
          <i class="fas fa-arrow-right text-gray-400 transition-transform group-hover:translate-x-1"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ActionList',
    props: {
      items: {
        type: Array,
        required: true,
        validator: (items) => {
          return items.every(item =>
            'icon' in item &&
            'actionName' in item &&
            'redirectUrl' in item
          )
        }
      },
      layout: {
        type: String,
        default: 'grid',
        validator: (value) => ['grid', 'list'].includes(value)
      }
    },
    methods: {
      handleClick(url) {
        window.location.href = url
      }
    }
  }
  </script>