<template>
  <div class="date-field">
    <a-typography-text>
      {{ formattedValue }}
    </a-typography-text>
  </div>
</template>

<script>
import { Typography } from 'ant-design-vue';
import { computed } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Enable relative time plugin
dayjs.extend(relativeTime);

export default {
  name: 'DateField',
  components: {
    ATypographyText: Typography.Text,
  },
  props: {
    field: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const formatPatterns = {
      date: {
        format: 'MMMM D, YYYY',
        example: 'January 1, 2024'
      },
      time: {
        format: 'hh:mm A',
        example: '02:30 PM'
      },
      datetime: {
        format: 'MMMM D, YYYY hh:mm A',
        example: 'January 1, 2024 02:30 PM'
      }
    };

    const getRelativeTime = (date) => {
      const now = dayjs();
      const diffInHours = now.diff(date, 'hour');
      const diffInMinutes = now.diff(date, 'minute');
      const diffInSeconds = now.diff(date, 'second');

      if (diffInHours >= 24) {
        return null; // Return null to use regular date format
      }

      if (diffInHours > 0) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
      }

      if (diffInMinutes > 0) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
      }

      if (diffInSeconds > 0) {
        return `${diffInSeconds} ${diffInSeconds === 1 ? 'second' : 'seconds'} ago`;
      }

      return 'just now';
    };

    const formattedValue = computed(() => {
      if (!props.value) return '-';
      
      const date = dayjs(props.value);
      if (!date.isValid()) return '-';

      const type = props.field.type || 'date';

      // Only apply relative time for datetime and time types
      if ((type === 'datetime' || type === 'time') && props.value) {
        const relativeTimeStr = getRelativeTime(date);
        if (relativeTimeStr) {
          return relativeTimeStr;
        }
      }

      return date.format(formatPatterns[type].format);
    });

    return {
      formattedValue,
    };
  },
};
</script>

<style scoped>
.date-field {
  width: 100%;
}
</style>