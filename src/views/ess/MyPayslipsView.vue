<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="My Salary Payslips"
      :breadcrumbs="['ESS', 'My Payslips']"
      :show-export="false"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom">
        <h5 class="fw-bold mb-0">Issued Monthly Payslips</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Payslip Month</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slip in payslips" :key="slip.month">
                <td class="fw-semibold text-dark">{{ slip.month }}</td>
                <td>${{ slip.basic.toLocaleString() }}</td>
                <td>${{ slip.allowance.toLocaleString() }}</td>
                <td class="text-danger">-${{ slip.deductions.toLocaleString() }}</td>
                <td class="fw-bold text-success">${{ slip.net.toLocaleString() }}</td>
                <td><span class="badge bg-success-subtle text-success">Paid</span></td>
                <td class="text-end">
                  <button class="btn btn-sm btn-outline-primary" @click="downloadPDF(slip.month)">
                    <i class="ti ti-download me-1"></i>PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';

const payslips = ref([
  { month: 'July 2026', basic: 4500, allowance: 800, deductions: 300, net: 5000 },
  { month: 'June 2026', basic: 4500, allowance: 800, deductions: 300, net: 5000 },
  { month: 'May 2026', basic: 4500, allowance: 800, deductions: 300, net: 5000 }
]);

function downloadPDF(month) {
  alert(`Downloading Payslip PDF for ${month}...`);
}
</script>
