<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Deals Management"
      :breadcrumbs="['CRM', 'Deals']"
      add-label="Add Deal"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Deals Pipeline List"
        v-model:search="searchQuery"
        search-placeholder="Search deal..."
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Deal Name</th>
                <th>Client Company</th>
                <th>Deal Value</th>
                <th>Stage</th>
                <th>Closing Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in displayedItems" :key="d.id">
                <td class="fw-semibold text-dark">{{ d.name }}</td>
                <td>{{ d.company }}</td>
                <td class="fw-bold text-success">${{ d.value.toLocaleString() }}</td>
                <td><span class="badge bg-info-subtle text-info">{{ d.stage }}</span></td>
                <td>{{ d.closeDate }}</td>
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
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import { useCrudTable } from '../../composables/useCrudTable';

const deals = ref([
  { id: 1, name: 'HRMS Enterprise License', company: 'Acme Corp', value: 45000, stage: 'Proposal Sent', closeDate: '2026-08-30' },
  { id: 2, name: 'Payroll Module Addon', company: 'NovaTech LLC', value: 12000, stage: 'Negotiation', closeDate: '2026-09-15' },
  { id: 3, name: 'Custom Integration Deal', company: 'Global Solutions', value: 28000, stage: 'Won', closeDate: '2026-08-01' }
]);

const { searchQuery, displayedItems } = useCrudTable(deals, { searchFields: ['name', 'company', 'stage'] });
</script>
