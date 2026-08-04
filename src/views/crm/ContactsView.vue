<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="CRM Contacts"
      :breadcrumbs="['CRM', 'Contacts']"
      add-label="Add Contact"
      @add="openModal"
      @export="exportData"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <DataTableToolbar
        title="Contacts Directory"
        v-model:search="searchQuery"
        search-placeholder="Search contact..."
        v-model:status="statusFilter"
      />

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th><input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" /></th>
                <th>Contact Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in displayedItems" :key="c.id">
                <td><input type="checkbox" :value="c.id" v-model="selectedIds" /></td>
                <td>
                  <div class="d-flex align-items-center">
                    <span class="avatar avatar-sm rounded-circle bg-primary-subtle text-primary fw-bold me-2">{{ c.name.charAt(0) }}</span>
                    <span class="fw-semibold text-dark">{{ c.name }}</span>
                  </div>
                </td>
                <td>{{ c.company }}</td>
                <td>{{ c.email }}</td>
                <td>{{ c.phone }}</td>
                <td><span class="badge bg-success-subtle text-success">{{ c.status }}</span></td>
                <td>
                  <button class="btn btn-sm btn-icon text-secondary"><i class="ti ti-edit"></i></button>
                  <button class="btn btn-sm btn-icon text-danger"><i class="ti ti-trash"></i></button>
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
import DataTableToolbar from '../../components/common/DataTableToolbar.vue';
import { useCrudTable } from '../../composables/useCrudTable';

const contacts = ref([
  { id: 1, name: 'Darlee Robertson', company: 'NovaTech LLC', email: 'darlee@novatech.com', phone: '+1 987 654 3210', status: 'Active' },
  { id: 2, name: 'Sharon Roy', company: 'Global Solutions', email: 'sharon@globalsol.com', phone: '+1 876 543 2109', status: 'Active' },
  { id: 3, name: 'Vaughan Lewis', company: 'Apex Systems', email: 'vaughan@apex.com', phone: '+1 765 432 1098', status: 'Inactive' }
]);

const { searchQuery, statusFilter, selectedIds, displayedItems, isAllSelected, toggleSelectAll, exportData } =
  useCrudTable(contacts, { searchFields: ['name', 'company', 'email'] });

function openModal() {
  alert('Add Contact modal');
}
</script>
