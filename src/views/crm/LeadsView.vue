<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Leads Acquisition"
      :breadcrumbs="['CRM', 'Leads']"
      add-label="Add Lead"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Sales Leads List"
        v-model:search="searchQuery"
        search-placeholder="Search lead..."
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Lead Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="l in displayedItems" :key="l.id">
                <td class="fw-semibold text-dark">{{ l.name }}</td>
                <td>{{ l.company }}</td>
                <td>{{ l.email }}</td>
                <td><span class="badge bg-secondary-subtle text-secondary">{{ l.source }}</span></td>
                <td><span class="badge bg-warning-subtle text-warning">{{ l.status }}</span></td>
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

const leads = ref([
  { id: 1, name: 'Michael Scott', company: 'Dunder Mifflin', email: 'mscott@dundermifflin.com', source: 'Website Form', status: 'Contacted' },
  { id: 2, name: 'Dwight Schrute', company: 'Schrute Farms', email: 'dwight@schrute.com', source: 'LinkedIn Referral', status: 'New' },
  { id: 3, name: 'Jim Halpert', company: 'Athlead', email: 'jim@athlead.com', source: 'Cold Outreach', status: 'Qualified' }
]);

const { searchQuery, displayedItems } = useCrudTable(leads, { searchFields: ['name', 'company', 'source'] });
</script>
