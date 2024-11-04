<template>
  <div class="progress-tracker">
    <div class="filters">
      <label>Date Range:</label>
      <a-range-picker v-model="selectedDateRange" @change="updateReportData" />
      <button class="generate-btn" @click="generateReport">Generate Report</button>
    </div>

    <div class="report-container" :class="{ 'with-border': showReport }">
      <div v-if="showReport" class="chart-and-table">
        <div class="chart-container">
          <apexchart
            type="area"
            height="350"
            :options="chartOptions"
            :series="chartSeries"
          ></apexchart>
        </div>
        <div class="table-container">
          <h2>Financial Report</h2>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount (MWK)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue</td>
                <td>{{ formatCurrency(revenue) }}</td>
              </tr>
              <tr>
                <td>Expenses</td>
                <td>{{ formatCurrency(expenses) }}</td>
              </tr>
              <tr>
                <td>Profit/Loss</td>
                <td
                  :class="{ 'text-success': profit >= 0, 'text-danger': profit < 0 }"
                >
                  {{ formatCurrency(profit) }}
                </td>
              </tr>
            </tbody>
          </table>
          <button class="download-btn" @click="downloadReport">Download Report</button>
        </div>
      </div>
      <div class="border-dashed border-2 h-72 border-textLighter flex justify-center place-items-center" v-else>
        <a-empty description="Generate a report to see the financial information." />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { DatePicker, Empty } from 'ant-design-vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    'a-range-picker': DatePicker.RangePicker,
    'a-empty': Empty,
    apexchart: VueApexCharts,
  },
  setup() {
    const selectedDateRange = ref([]);
    const showReport = ref(false);
    const revenue = ref(0);
    const expenses = ref(0);
    const profit = ref(0);

    const updateReportData = () => {
      // Check if both dates are selected
      if (selectedDateRange.value.length === 2) {
        const [start, end] = selectedDateRange.value;

        // Simulating data based on selected date range
        const daysBetween = Math.abs((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
        revenue.value = 10000 + daysBetween * 50; // Example dummy formula for revenue
        expenses.value = 8000 + daysBetween * 30; // Example dummy formula for expenses
        profit.value = revenue.value - expenses.value;
      }
    };

    const generateReport = () => {
      if (selectedDateRange.value.length === 2) {
        updateReportData();
        showReport.value = true; // Display the report
      } else {
        showReport.value = false; // Hide the report if date range is not complete
      }
    };

    const downloadReport = () => {
      const doc = new jsPDF();
      doc.text('Construction Progress Financial Report', 14, 20);
      doc.autoTable({
        startY: 30,
        head: [['Item', 'Amount (MWK)']],
        body: [
          ['Revenue', formatCurrency(revenue.value)],
          ['Expenses', formatCurrency(expenses.value)],
          ['Profit/Loss', formatCurrency(profit.value)],
        ],
      });
      doc.save(`construction-progress-report.pdf`);
    };

    const formatCurrency = (amount) => {
      return `MK ${amount.toLocaleString()}`;
    };

    const chartOptions = {
      chart: {
        id: 'financial-chart',
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2023-01-01',
          '2023-02-01',
          '2023-03-01',
          '2023-04-01',
          '2023-05-01',
          '2023-06-01',
          '2023-07-01',
          '2023-08-01',
          '2023-09-01',
          '2023-10-01',
          '2023-11-01',
          '2023-12-01',
        ],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      colors: ['#00b894'],
    };

    const chartSeries = [
      {
        name: 'Profit',
        data: [
          2000, 3000, 4000, 3500, 4500, 5000, 4800, 5200, 5000, 6000, 5800, 6500,
        ],
      },
    ];

    return {
      selectedDateRange,
      showReport,
      revenue,
      expenses,
      profit,
      chartOptions,
      chartSeries,
      generateReport,
      downloadReport,
      formatCurrency,
    };
  },
};
</script>

<style scoped>
.progress-tracker {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3436;
  max-width: 1200px;
  margin: auto;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.filters label {
  font-size: 14px;
  font-weight: 500;
}

.generate-btn,
.download-btn {
  background-color: #00b894;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 12px;
  transition: background-color 0.3s;
}

.generate-btn:hover,
.download-btn:hover {
  background-color: #019473;
}

.report-container {
  margin-top: 20px;
  padding: 20px;
}

.with-border {
  border: 2px dashed #dfe6e9;
  border-radius: 8px;
}

.chart-and-table {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.chart-container,
.table-container {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.styled-table th,
.styled-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.styled-table th {
  background-color: #00b894;
  color: white;
}

.text-success {
  color: green;
  font-weight: bold;
}

.text-danger {
  color: red;
  font-weight: bold;
}
</style>
