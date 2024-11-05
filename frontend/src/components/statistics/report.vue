
<template>
  <div class="progress-tracker card text-text p-6">
    <div class="filters bg-cardDark p-4 rounded-lg mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="filter-group">
          <label class="text-text mb-2 block" for="project">Project:</label>
          <select 
            class="w-full bg-cardDark border-textLighter border rounded-md p-2 text-text" 
            v-model="selectedProject"
            id="project"
          >
            <option value="all">All Projects</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.projectName }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label class="text-text mb-2 block" for="startDate">From:</label>
          <input 
            class="w-full bg-cardDark border-textLighter border rounded-md p-2 text-text" 
            type="date" 
            id="startDate" 
            v-model="startDate" 
          />
        </div>

        <div class="filter-group">
          <label class="text-text mb-2 block" for="endDate">To:</label>
          <input 
            class="w-full bg-cardDark border-textLighter border rounded-md p-2 text-text" 
            type="date" 
            id="endDate" 
            v-model="endDate" 
          />
        </div>

        <div class="filter-group flex items-end">
          <button 
            class="w-full bg-primary hover:bg-primary/80 text-white rounded-md p-2 transition-colors"
            @click="generateReport" 
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <a-spin class="mr-2" />
              Generating...
            </span>
            <span v-else>Generate Report</span>
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <a-spin size="large" />
    </div>

    <div class="report-container" v-else-if="showReport">
      <!-- Financial Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="stat-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-2">Total Revenue</h3>
          <p class="text-2xl font-bold text-primary">{{ formatCurrency(filteredTotalRevenue) }}</p>
        </div>
        <div class="stat-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-2">Total Expenses</h3>
          <p class="text-2xl font-bold text-red-500">{{ formatCurrency(filteredTotalExpenses) }}</p>
        </div>
        <div class="stat-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-2">Net Profit/Loss</h3>
          <p class="text-2xl font-bold" :class="filteredNetProfit >= 0 ? 'text-green-500' : 'text-red-500'">
            {{ formatCurrency(filteredNetProfit) }}
          </p>
        </div>
        <div class="stat-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-2">Profit Margin</h3>
          <p class="text-2xl font-bold" :class="filteredProfitMargin >= 0 ? 'text-green-500' : 'text-red-500'">
            {{ filteredProfitMargin }}%
          </p>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Revenue vs Expenses Timeline -->
        <div class="chart-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Revenue vs Expenses Timeline</h3>
          <apexchart
            type="area"
            height="350"
            :options="timelineChartOptions"
            :series="filteredTimelineSeries"
          ></apexchart>
        </div>

        <!-- Monthly Profit Trend -->
        <div class="chart-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Monthly Profit Trend</h3>
          <apexchart
            type="bar"
            height="350"
            :options="trendChartOptions"
            :series="filteredTrendSeries"
          ></apexchart>
        </div>

        <!-- Expense Distribution -->
        <div class="chart-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Expense Distribution</h3>
          <apexchart
            type="pie"
            height="350"
            :options="expenseChartOptions"
            :series="filteredExpenseSeries"
          ></apexchart>
        </div>

        <!-- Income Distribution -->
        <div class="chart-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Income Distribution</h3>
          <apexchart
            type="pie"
            height="350"
            :options="incomeChartOptions"
            :series="filteredIncomeSeries"
          ></apexchart>
        </div>
      </div>

      <!-- Detailed Tables -->
      <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="table-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Income Details</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left">Date</th>
                  <th class="px-4 py-3 text-left">Project</th>
                  <th class="px-4 py-3 text-left">Type</th>
                  <th class="px-4 py-3 text-left">Description</th>
                  <th class="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="income in filteredIncomes" :key="income.id">
                  <td class="px-4 py-3">{{ formatDate(income.date) }}</td>
                  <td class="px-4 py-3">{{ getProjectName(income.project) }}</td>
                  <td class="px-4 py-3">{{ formatType(income.type) }}</td>
                  <td class="px-4 py-3" v-html="income.description"></td>
                  <td class="px-4 py-3 text-right">{{ formatCurrency(income.amount) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="table-card bg-cardDark p-4 rounded-lg">
          <h3 class="text-lg mb-4">Expense Details</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left">Date</th>
                  <th class="px-4 py-3 text-left">Project</th>
                  <th class="px-4 py-3 text-left">Type</th>
                  <th class="px-4 py-3 text-left">Description</th>
                  <th class="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="expense in filteredExpenses" :key="expense.id">
                  <td class="px-4 py-3">{{ formatDate(expense.date) }}</td>
                  <td class="px-4 py-3">{{ getProjectName(expense.project) }}</td>
                  <td class="px-4 py-3">{{ formatType(expense.type) }}</td>
                  <td class="px-4 py-3" v-html="expense.description"></td>
                  <td class="px-4 py-3 text-right">{{ formatCurrency(expense.amount) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button 
          class="bg-primary hover:bg-primary/80 text-white rounded-md px-6 py-3 transition-colors"
          @click="downloadReport"
        >
          Download Detailed Report
        </button>
      </div>
    </div>

    <div v-else class="flex flex-col justify-center items-center p-12 border-dashed border-2 border-textLighter rounded-lg">
      <a-empty />
      <p class="mt-4 text-textLight">Generate a report to see the financial information.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import VueApexCharts from 'vue3-apexcharts';
import axios from 'axios';
import autoTable from 'jspdf-autotable';

export default {
  components: {
    apexchart: VueApexCharts,
  },

  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const selectedProject = ref('all');
    const showReport = ref(false);
    const loading = ref(false);
    const incomes = ref([]);
    const expenses = ref([]);
    const projects = ref([]);

    // Filtered data computeds
    const filteredIncomes = computed(() => {
      return incomes.value.filter(income => {
        const dateMatch = (!startDate.value || income.date >= startDate.value) &&
                         (!endDate.value || income.date <= endDate.value);
        const projectMatch = selectedProject.value === 'all' || income.project === selectedProject.value;
        return dateMatch && projectMatch;
      });
    });

    const filteredExpenses = computed(() => {
      return expenses.value.filter(expense => {
        const dateMatch = (!startDate.value || expense.date >= startDate.value) &&
                         (!endDate.value || expense.date <= endDate.value);
        const projectMatch = selectedProject.value === 'all' || expense.project === selectedProject.value;
        return dateMatch && projectMatch;
      });
    });

    // Computed metrics based on filtered data
    const filteredTotalRevenue = computed(() => {
      return filteredIncomes.value.reduce((sum, income) => sum + income.amount, 0);
    });

    const filteredTotalExpenses = computed(() => {
      return filteredExpenses.value.reduce((sum, expense) => sum + expense.amount, 0);
    });

    const filteredNetProfit = computed(() => {
      return filteredTotalRevenue.value - filteredTotalExpenses.value;
    });

    const filteredProfitMargin = computed(() => {
      if (filteredTotalRevenue.value === 0) return 0;
      return ((filteredNetProfit.value / filteredTotalRevenue.value) * 100).toFixed(2);
    });

    // Chart configurations
    const timelineChartOptions = {
      chart: {
        height: 350,
        type: 'area',
        stacked: false,
        toolbar: { show: true },
        zoom: { enabled: true }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: {
        type: 'datetime',
        labels: { format: 'dd MMM yyyy' }
      },
      yaxis: {
        title: { text: 'Amount (MWK)' },
        labels: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        },
        y: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      },
      colors: ['#00b894', '#ff7675'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 100]
        }
      }
    };

    // Filtered timeline series
    const filteredTimelineSeries = computed(() => {
      const sortedDates = [...new Set([
        ...filteredIncomes.value.map(i => i.date.split('T')[0]),
        ...filteredExpenses.value.map(e => e.date.split('T')[0])
      ])].sort();

      const revenueData = sortedDates.map(date => {
        const dayTotal = filteredIncomes.value
          .filter(i => i.date.startsWith(date))
          .reduce((sum, i) => sum + i.amount, 0);
        return [new Date(date).getTime(), dayTotal];
      });

      const expenseData = sortedDates.map(date => {
        const dayTotal = filteredExpenses.value
          .filter(e => e.date.startsWith(date))
          .reduce((sum, e) => sum + e.amount, 0);
        return [new Date(date).getTime(), dayTotal];
      });

      return [
        { name: 'Revenue', data: revenueData },
        { name: 'Expenses', data: expenseData }
      ];
    });

    const expenseChartOptions = {
      chart: { type: 'pie' },
      labels: ['Material', 'Labor', 'Equipment', 'Transport', 'Maintenance', 'Permit', 'Other'],
      colors: ['#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#fd79a8', '#fdcb6e', '#636e72'],
      tooltip: {
        y: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      }
    };

    const filteredExpenseSeries = computed(() => {
      const types = ['material', 'labour', 'equipment', 'transport', 'maintenance', 'permit', 'other'];
      return types.map(type => 
        filteredExpenses.value
          .filter(e => e.type === type)
          .reduce((sum, e) => sum + e.amount, 0)
      );
    });

    const incomeChartOptions = {
      chart: { type: 'pie' },
      labels: ['Down Payment', 'Initial Payment', 'Milestone Payment', 'Final Payment', 'Other'],
      colors: ['#00b894', '#00cec9', '#0984e3', '#6c5ce7', '#636e72'],
      tooltip: {
        y: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      }
    };

    const filteredIncomeSeries = computed(() => {
      const types = ['down_payment', 'initial_payment', 'milestone_payment', 'final_payment', 'other'];
      return types.map(type => 
        filteredIncomes.value
          .filter(i => i.type === type)
          .reduce((sum, i) => sum + i.amount, 0)
      );
    });

    const trendChartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: true }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      xaxis: {
        type: 'category'
      },
      yaxis: {
        title: { text: 'Amount (MWK)' },
        labels: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      },
      colors: ['#00b894'],
      tooltip: {
        y: {
          formatter: (value) => `MK ${value.toLocaleString()}`
        }
      }
    };

    const filteredTrendSeries = computed(() => {
      const monthlyData = {};
      
      filteredIncomes.value.forEach(income => {
        const monthYear = new Date(income.date).toLocaleString('en-US', { month: 'short', year: 'numeric' });
        monthlyData[monthYear] = monthlyData[monthYear] || { profit: 0 };
        monthlyData[monthYear].profit += income.amount;
      });

      filteredExpenses.value.forEach(expense => {
        const monthYear = new Date(expense.date).toLocaleString('en-US', { month: 'short', year: 'numeric' });
        monthlyData[monthYear] = monthlyData[monthYear] || { profit: 0 };
        monthlyData[monthYear].profit -= expense.amount;
      });

      const sortedData = Object.entries(monthlyData)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
        .map(([month, data]) => ({
          x: month,
          y: data.profit
        }));

      return [{
        name: 'Monthly Profit',
        data: sortedData
      }];
    });

    // Fetch projects on mount
    onMounted(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/v1/projects`);
        projects.value = response.data.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    });

    // Generate report
    const generateReport = async () => {
      try {
        loading.value = true;
        const params = {
          startDate: startDate.value,
          endDate: endDate.value,
          ...(selectedProject.value !== 'all' && { project: selectedProject.value })
        };

        const [incomesRes, expensesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_API_URL}/api/v1/project-incomes`, { params }),
          axios.get(`${import.meta.env.VITE_APP_API_URL}/api/v1/project-expenses`, { params })
        ]);

        incomes.value = incomesRes.data.data;
        expenses.value = expensesRes.data.data;
        showReport.value = true;
      } catch (error) {
        console.error('Error generating report:', error);
      } finally {
        loading.value = false;
      }
    };

    // Download PDF report
    const downloadReport = () => {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;

      // Title and Date Range
      doc.setFontSize(20);
      doc.text('Financial Report', pageWidth / 2, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.text(`Period: ${formatDate(startDate.value)} to ${formatDate(endDate.value)}`, pageWidth / 2, 25, { align: 'center' });

      // Project Info
      const projectName = selectedProject.value === 'all' 
        ? 'All Projects' 
        : projects.value.find(p => p.id === selectedProject.value)?.projectName || 'Unknown Project';
      doc.text(`Project: ${projectName}`, pageWidth / 2, 35, { align: 'center' });

      // Financial Summary
      doc.setFontSize(16);
      doc.text('Financial Summary', 14, 50);
      autoTable(doc, {
        startY: 55,
        head: [['Item', 'Amount (MWK)']],
        body: [
          ['Total Revenue', formatCurrency(filteredTotalRevenue.value)],
          ['Total Expenses', formatCurrency(filteredTotalExpenses.value)],
          ['Net Profit/Loss', formatCurrency(filteredNetProfit.value)],
          ['Profit Margin', `${filteredProfitMargin.value}%`]
        ],
      });

      // Income Details
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Income Details', 14, 15);
      autoTable(doc, {
        startY: 20,
        head: [['Date', 'Project', 'Type', 'Description', 'Amount']],
        body: filteredIncomes.value.map(income => [
          formatDate(income.date),
          getProjectName(income.project),
          formatType(income.type),
          income.description.replace(/<[^>]*>/g, ''),
          formatCurrency(income.amount)
        ]),
      });

      // Expense Details
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Expense Details', 14, 15);
      autoTable(doc, {
        startY: 20,
        head: [['Date', 'Project', 'Type', 'Description', 'Amount']],
        body: filteredExpenses.value.map(expense => [
          formatDate(expense.date),
          getProjectName(expense.project),
          formatType(expense.type),
          expense.description.replace(/<[^>]*>/g, ''),
          formatCurrency(expense.amount)
        ]),
      });

      // Save the PDF
      doc.save(`financial-report-${startDate.value}-to-${endDate.value}.pdf`);
    };

    // Utility functions
    const formatCurrency = (amount) => {
      return `MK ${amount.toLocaleString()}`;
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    const formatType = (type) => {
      return type.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

    const getProjectName = (projectId) => {
      return projects.value.find(p => p.id === projectId)?.projectName || 'Unknown Project';
    };

    return {
      startDate,
      endDate,
      selectedProject,
      showReport,
      loading,
      projects,
      filteredTotalRevenue,
      filteredTotalExpenses,
      filteredNetProfit,
      filteredProfitMargin,
      timelineChartOptions,
      filteredTimelineSeries,
      expenseChartOptions,
      filteredExpenseSeries,
      incomeChartOptions,
      filteredIncomeSeries,
      trendChartOptions,
      filteredTrendSeries,
      filteredIncomes,
      filteredExpenses,
      generateReport,
      downloadReport,
      formatCurrency,
      formatDate,
      formatType,
      getProjectName,
    };
  },
};
</script>