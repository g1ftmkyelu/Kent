<template>
  <div class="progress-tracker card text-text">
    <div class="filters">
      <label class="text-text" for="startDate">From</label>
      <input class="bg-cardDark border-textLighter border text-text" type="date" id="startDate" v-model="startDate" />
      <label class="text-text" for="endDate">To:</label>
      <input class="bg-cardDark border-textLighter border text-text" type="date" id="endDate" v-model="endDate" />
      <button  class="generate-btn" @click="generateReport">Generate Report</button>
    </div>

    <div class="report-container text-text" v-if="showReport">
      <div class="chart-container text-text">
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="chartSeries"
        ></apexchart>
      </div>
      <div class="table-container card">
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
    <div  v-else class="flex flex-col justify-center items-center p-12 border-dashed border-2 border-textLighter">
      <a-empty></a-empty>
      <p>Generate a report to see the financial information.</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const showReport = ref(false);
    const revenue = ref(10000);
    const expenses = ref(8000);
    const profit = ref(revenue.value - expenses.value);

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

    const generateReport = () => {
      profit.value = revenue.value - expenses.value;
      showReport.value = true;
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
      doc.save(`construction-progress-report-${startDate.value}-${endDate.value}.pdf`);
    };

    const formatCurrency = (amount) => {
      return `MK ${amount.toLocaleString()}`;
    };

    return {
      startDate,
      endDate,
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
}

.filters input,
.filters button {
  padding: 8px 12px;
  font-size: 14px;
}

.generate-btn,
.download-btn {
  background-color: #00b894;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.generate-btn:hover,
.download-btn:hover {
  background-color: var(--primary);
}

.report-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.chart-container,
.table-container {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
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
  background-color: var(--primary);
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

.empty-report {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border-radius: 8px;
  font-size: 16px;
}
</style>
