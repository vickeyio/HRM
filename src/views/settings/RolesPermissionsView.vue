<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Roles & Permissions"
      :breadcrumbs="['Settings', 'Roles & Permissions']"
      add-label="Add New Role"
      @add="isRoleModalOpen = true"
    />

    <!-- Roles Grid -->
    <div class="row mb-4">
      <div v-for="role in roles" :key="role.name" class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm rounded-3 h-100">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                {{ role.userCount }} Users
              </span>
              <div class="dropdown">
                <a href="javascript:void(0);" class="text-secondary" data-bs-toggle="dropdown">
                  <i class="ti ti-dots-vertical fs-18"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="javascript:void(0);" @click="editRole(role)"><i class="ti ti-edit me-1"></i>Edit Role</a></li>
                  <li><a class="dropdown-item text-danger" href="javascript:void(0);" @click="deleteRole(role.name)"><i class="ti ti-trash me-1"></i>Delete Role</a></li>
                </ul>
              </div>
            </div>
            <h5 class="fw-bold mb-1">{{ role.name }}</h5>
            <p class="text-muted small mb-0">{{ role.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Permissions Matrix Card -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between py-3">
        <h5 class="fw-bold mb-0">Module Permissions Matrix (Role: {{ selectedRoleName }})</h5>
        <div class="d-flex gap-2">
          <select v-model="selectedRoleName" class="form-select form-select-sm" style="width: 180px;">
            <option v-for="role in roles" :key="role.name" :value="role.name">{{ role.name }}</option>
          </select>
          <button class="btn btn-sm btn-primary" @click="savePermissions">
            <i class="ti ti-check me-1"></i>Save Matrix
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Module Name</th>
                <th class="text-center">Read Access</th>
                <th class="text-center">Create</th>
                <th class="text-center">Edit</th>
                <th class="text-center">Delete</th>
                <th class="text-center">Allow All</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mod in modules" :key="mod.key">
                <td>
                  <span class="fw-semibold text-dark">{{ mod.name }}</span>
                </td>
                <td class="text-center">
                  <input class="form-check-input" type="checkbox" v-model="permissions[selectedRoleName][mod.key].read" />
                </td>
                <td class="text-center">
                  <input class="form-check-input" type="checkbox" v-model="permissions[selectedRoleName][mod.key].create" />
                </td>
                <td class="text-center">
                  <input class="form-check-input" type="checkbox" v-model="permissions[selectedRoleName][mod.key].edit" />
                </td>
                <td class="text-center">
                  <input class="form-check-input" type="checkbox" v-model="permissions[selectedRoleName][mod.key].delete" />
                </td>
                <td class="text-center">
                  <button class="btn btn-xs btn-outline-secondary" @click="toggleAllModule(selectedRoleName, mod.key)">
                    Toggle All
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Role Modal -->
    <BaseModal
      v-model="isRoleModalOpen"
      title="Add Custom Role"
      save-label="Create Role"
      @save="handleCreateRole"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Role Name <span class="text-danger">*</span></label>
        <input type="text" v-model="newRoleName" class="form-control" placeholder="e.g. Project Manager" required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Description</label>
        <textarea v-model="newRoleDescription" class="form-control" rows="3" placeholder="Description of role privileges..."></textarea>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import BaseModal from '../../components/common/BaseModal.vue';

const selectedRoleName = ref('Super Admin');
const isRoleModalOpen = ref(false);
const newRoleName = ref('');
const newRoleDescription = ref('');

const roles = ref([
  { name: 'Super Admin', userCount: 3, description: 'Full unrestricted system-wide administrative access.' },
  { name: 'HR Manager', userCount: 8, description: 'Access to employees, payroll, recruitment & attendance logs.' },
  { name: 'Department Head', userCount: 15, description: 'Can approve team leaves, views department performance.' },
  { name: 'Employee', userCount: 120, description: 'Self-service portal view for personal info and attendance.' }
]);

const modules = [
  { key: 'employees', name: 'Employees Directory' },
  { key: 'departments', name: 'Departments & Designations' },
  { key: 'attendance', name: 'Attendance & Leaves' },
  { key: 'payroll', name: 'Payroll & Payslips' },
  { key: 'recruitment', name: 'Recruitment & Jobs' },
  { key: 'settings', name: 'System Settings' }
];

const permissions = reactive({
  'Super Admin': {
    employees: { read: true, create: true, edit: true, delete: true },
    departments: { read: true, create: true, edit: true, delete: true },
    attendance: { read: true, create: true, edit: true, delete: true },
    payroll: { read: true, create: true, edit: true, delete: true },
    recruitment: { read: true, create: true, edit: true, delete: true },
    settings: { read: true, create: true, edit: true, delete: true }
  },
  'HR Manager': {
    employees: { read: true, create: true, edit: true, delete: false },
    departments: { read: true, create: true, edit: true, delete: false },
    attendance: { read: true, create: true, edit: true, delete: true },
    payroll: { read: true, create: true, edit: true, delete: false },
    recruitment: { read: true, create: true, edit: true, delete: true },
    settings: { read: true, create: false, edit: false, delete: false }
  },
  'Department Head': {
    employees: { read: true, create: false, edit: false, delete: false },
    departments: { read: true, create: false, edit: false, delete: false },
    attendance: { read: true, create: true, edit: true, delete: false },
    payroll: { read: false, create: false, edit: false, delete: false },
    recruitment: { read: true, create: false, edit: false, delete: false },
    settings: { read: false, create: false, edit: false, delete: false }
  },
  'Employee': {
    employees: { read: true, create: false, edit: false, delete: false },
    departments: { read: true, create: false, edit: false, delete: false },
    attendance: { read: true, create: true, edit: false, delete: false },
    payroll: { read: false, create: false, edit: false, delete: false },
    recruitment: { read: false, create: false, edit: false, delete: false },
    settings: { read: false, create: false, edit: false, delete: false }
  }
});

function toggleAllModule(role, key) {
  const current = permissions[role][key];
  const allTrue = current.read && current.create && current.edit && current.delete;
  permissions[role][key] = {
    read: !allTrue,
    create: !allTrue,
    edit: !allTrue,
    delete: !allTrue
  };
}

function savePermissions() {
  alert(`Permissions matrix for "${selectedRoleName.value}" updated successfully!`);
}

function handleCreateRole() {
  if (!newRoleName.value) return;
  roles.value.push({
    name: newRoleName.value,
    userCount: 0,
    description: newRoleDescription.value || 'Custom user role'
  });
  permissions[newRoleName.value] = {};
  modules.forEach(m => {
    permissions[newRoleName.value][m.key] = { read: true, create: false, edit: false, delete: false };
  });
  newRoleName.value = '';
  newRoleDescription.value = '';
  isRoleModalOpen.value = false;
}

function deleteRole(name) {
  if (confirm(`Are you sure you want to delete role "${name}"?`)) {
    roles.value = roles.value.filter(r => r.name !== name);
  }
}

function editRole(role) {
  alert(`Editing settings for ${role.name}`);
}
</script>
