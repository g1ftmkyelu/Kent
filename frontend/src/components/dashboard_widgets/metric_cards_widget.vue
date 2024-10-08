<template>
  <div class="metric-cards-widget">
    <div class="metric-cards-container" :style="containerStyle">
      <div
        v-for="(metric, index) in widgetProps.metrics"
        :key="index"
        class="metric-card"
        :style="cardStyle"
      >
        <div class="metric-icon" v-if="metric.icon">
          <i :class="metric.icon"></i>
        </div>
        <div class="metric-content">
          <h4 class="metric-label">{{ metric.label }}</h4>
          <p class="metric-value" :style="{ color: metric.color }">{{ metric.value }}</p>
          <p v-if="metric.change" class="metric-change" :class="changeClass(metric.change)">
            {{ metric.change > 0 ? '↑' : '↓' }} {{ Math.abs(metric.change) }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MetricCardsWidget',
  props: {
    widgetProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    containerStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.widgetProps.columns || 3}, 1fr)`,
        gap: this.widgetProps.gap || '1.5rem'
      }
    },
    cardStyle() {
      return {
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        backgroundColor: this.widgetProps.cardBackground || '#ffffff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }
    }
  },
  methods: {
    changeClass(change) {
      return change > 0 ? 'positive-change' : 'negative-change'
    }
  }
})
</script>

<style scoped>
.metric-cards-widget {
  font-family: 'Arial', sans-serif;
}

.metric-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.metric-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.metric-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #4a5568;
  margin-bottom: 0.3rem;
}

.metric-value {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.metric-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.positive-change {
  color: #38a169;
}

.negative-change {
  color: #e53e3e;
}
</style>