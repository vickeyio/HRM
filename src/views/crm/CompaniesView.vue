<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Client Companies"
      :breadcrumbs="['CRM', 'Companies']"
      add-label="Add Company"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Companies Directory"
        v-model:search="searchQuery"
        search-placeholder="Search company..."
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Company Name</th>
                <th>Industry</th>
                <th>Primary Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in displayedItems" :key="c.id">
                <td class="fw-semibold text-dark">{{ c.name }}</td>
                <td>{{ c.industry }}</td>
                <td>{{ c.email }}</td>
                <td>{{ c.phone }}</td>
                <td>{{ c.location }}</td>
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

const companies = ref([
  { id: 1, name: 'Acme Corporation', industry: 'Technology', email: 'contact@acme.com', phone: '+1 555 1234', location: 'San Francisco, CA' },
  { id: 2, name: 'NovaTech LLC', industry: 'Software', email: 'info@novatech.com', phone: '+1 555 5678', location: 'Austin, TX' },
  { id: 3, name: 'Global Solutions', industry: 'Consulting', email: 'support@globalsol.com', phone: '+1 555 9012', location: 'New York, NY' }
]);

const { searchQuery, displayedItems } = useCrudTable(companies, { searchFields: ['name', 'industry', 'location'] });
</script>
