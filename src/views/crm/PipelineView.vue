<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Sales Pipeline Board"
      :breadcrumbs="['CRM', 'Pipeline']"
      add-label="Add Stage/Deal"
      :show-export="false"
    />

    <!-- Pipeline Columns Grid -->
    <div class="row flex-nowrap overflow-auto pb-4">
      <div v-for="col in stages" :key="col.title" class="col-xl-3 col-md-6" style="min-width: 300px;">
        <div class="card bg-light border-0 shadow-sm rounded-3">
          <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between">
            <h6 class="fw-bold mb-0 text-dark">{{ col.title }} ({{ col.deals.length }})</h6>
            <span class="badge bg-white text-dark border">${{ col.totalValue.toLocaleString() }}</span>
          </div>
          <div class="card-body p-2 d-flex flex-column gap-3">
            <div v-for="deal in col.deals" :key="deal.id" class="card border-0 shadow-xs rounded-3 p-3 bg-white">
              <h6 class="fw-semibold text-dark mb-1">{{ deal.name }}</h6>
              <p class="text-muted small mb-2">{{ deal.company }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-success">${{ deal.value.toLocaleString() }}</span>
                <small class="text-muted">{{ deal.date }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';

const stages = ref([
  {
    title: 'Lead Qualified',
    totalValue: 35000,
    deals: [
      { id: 1, name: 'Cloud Migration HR Suite', company: 'Initech', value: 20000, date: '12 Aug' },
      { id: 2, name: 'SaaS Payroll Upgrade', company: 'Umbrella Corp', value: 15000, date: '18 Aug' }
    ]
  },
  {
    title: 'Proposal Sent',
    totalValue: 45000,
    deals: [
      { id: 3, name: 'HRMS Enterprise License', company: 'Acme Corp', value: 45000, date: '30 Aug' }
    ]
  },
  {
    title: 'Negotiation',
    totalValue: 12000,
    deals: [
      { id: 4, name: 'Payroll Module Addon', company: 'NovaTech LLC', value: 12000, date: '15 Sep' }
    ]
  },
  {
    title: 'Closed Won',
    totalValue: 28000,
    deals: [
      { id: 5, name: 'Custom Integration Deal', company: 'Global Solutions', value: 28000, date: '01 Aug' }
    ]
  }
]);
</script>
