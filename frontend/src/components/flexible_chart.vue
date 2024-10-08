<template>
    <div>
        <DataFetcher :resource="resource" :requestType="requestType" :params="params">
            <template v-slot="{ data, error }">
                <div v-if="error">Error: {{ error.message }}</div>
                <apexchart v-else :type="chartType" :options="chartOptions" :series="transformData(data)"></apexchart>
            </template>
        </DataFetcher>
    </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import data_fetcher from './data_fetcher.vue';

export default defineComponent({
    name: 'FlexibleChart',
    components: {
        apexchart: VueApexCharts,
        DataFetcher: data_fetcher,
    },
    props: {
        resource: {
            type: String,
            required: true,
        },
        requestType: {
            type: String,
            required: true,
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        chartType: {
            type: String,
            default: 'line',
            validator: (value) => ['line', 'bar', 'pie', 'donut', 'scatter', 'area', 'radar', 'heatmap'].includes(value),
        },
        chartTitle: {
            type: String,
            default: '',
        },
        xAxisTitle: {
            type: String,
            default: '',
        },
        yAxisTitle: {
            type: String,
            default: '',
        },
        dataLabels: {
            type: Boolean,
            default: false,
        },
        colors: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const chartOptions = computed(() => ({
            chart: {
                type: props.chartType,
            },
            title: {
                text: props.chartTitle,
                align: 'center',
            },
            xaxis: {
                title: {
                    text: props.xAxisTitle,
                },
            },
            yaxis: {
                title: {
                    text: props.yAxisTitle,
                },
            },
            dataLabels: {
                enabled: props.dataLabels,
            },
            colors: props.colors.length > 0 ? props.colors : undefined,
        }));

        const transformData = (data) => {
            if (!data) return [];

            switch (props.requestType) {
                case 'fieldOccurrences':
                    return [{
                        name: 'Occurrences',
                        data: Object.entries(data).map(([key, value]) => ({ x: key, y: value })),
                    }];
                case 'timeSeriesAnalysis':
                    return [{
                        name: props.yAxisTitle || 'Value',
                        data: data.map(item => ({ x: new Date(item.date), y: item.value })),
                    }];
                case 'calculate':
                    // For single value results like sum, average, etc.
                    return [{
                        name: props.chartTitle || 'Value',
                        data: [{ x: props.chartTitle || 'Value', y: data }],
                    }];
                default:
                    // For general data, assuming it's an array of objects
                    if (Array.isArray(data)) {
                        const keys = Object.keys(data[0] || {}).filter(key => typeof data[0][key] === 'number');
                        return keys.map(key => ({
                            name: key,
                            data: data.map((item, index) => ({ x: index, y: item[key] })),
                        }));
                    }
                    return [];
            }
        };

        return {
            chartOptions,
            transformData,
        };
    },
});
</script>