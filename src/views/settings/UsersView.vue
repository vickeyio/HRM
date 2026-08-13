<template>
  <div class="users-view">
    <!-- Page Header -->
    <PageHeader
      title="Users Management"
      :breadcrumbs="['Administration', 'Users Management']"
      add-label="Add User"
      @add="openCreateUserModal"
      @export="exportData"
    />

    <!-- Navigation Tabs -->
    <div class="card border-0 shadow-sm rounded-3 mb-4">
      <div class="card-body py-2 px-3">
        <ul class="nav nav-pills nav-pills-sm">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              to="/users"
            >
              <i class="ti ti-users me-1"></i> Users Directory
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/roles-permissions"
            >
              <i class="ti ti-user-shield me-1"></i> Roles Management
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/roles-permissions"
            >
              <i class="ti ti-key me-1"></i> System Permissions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/roles-permissions"
            >
              <i class="ti ti-users-group me-1"></i> User Groups
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Users Data Table -->
    <BaseDataTable
      :columns="tableColumns"
      :items="displayedUsers"
      :is-loading="loading"
      selectable
      v-model:selected-ids="selectedIds"
      :is-all-selected="isAllSelected"
      id-key="username"
      empty-text="No users found matching search criteria."
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalCount"
      :page-size="pageSize"
      @toggle-select-all="toggleSelectAll"
      @go-to-page="handlePageChange"
    >
      <!-- Toolbar -->
      <template #toolbar>
        <div class="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div class="d-flex align-items-center gap-2">
            <h5 class="card-title mb-0 fs-16 fw-semibold text-dark">All System Users</h5>
            <span class="badge bg-primary-subtle text-primary rounded-pill px-2 py-1 fs-12">
              {{ totalCount }} Total
            </span>
          </div>

          <div class="d-flex align-items-center gap-2 flex-wrap">
            <!-- Status Filter -->
            <select v-model="statusFilter" class="form-select form-select-sm" style="width: 140px;">
              <option value="All">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>

            <!-- Search Input -->
            <div class="input-group input-group-sm" style="width: 250px;">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-start-0"
                placeholder="Search username, name, email..."
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Username Column with Avatar -->
      <template #cell(username)="{ item }">
        <div class="d-flex align-items-center gap-2">
          <div
            class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xs"
            :style="{
              width: '32px',
              height: '32px',
              minWidth: '32px',
              backgroundColor: getAvatarColor(item),
              fontSize: '12px'
            }"
          >
            {{ getInitials(item) }}
          </div>
          <div>
            <a
              href="javascript:void(0);"
              class="fw-semibold text-dark text-decoration-none hover-primary"
              @click="handleViewUser(item)"
            >
              {{ item.username }}
            </a>
          </div>
        </div>
      </template>

      <!-- Full Name Column -->
      <template #cell(full_name)="{ item }">
        <span class="fw-medium text-dark">{{ getFullName(item) }}</span>
      </template>

      <!-- Email Column -->
      <template #cell(email_address)="{ item }">
        <span v-if="getEmail(item)" class="text-muted fs-13">
          <i class="ti ti-mail me-1 text-secondary"></i>{{ getEmail(item) }}
        </span>
        <span v-else class="text-muted">—</span>
      </template>

      <!-- Mobile Column -->
      <template #cell(mobile_number)="{ item }">
        <span v-if="getMobile(item)" class="text-muted fs-13">
          <i class="ti ti-phone me-1 text-secondary"></i>{{ getMobile(item) }}
        </span>
        <span v-else class="text-muted">—</span>
      </template>

      <!-- Status Column (Interactive Toggle Button) -->
      <template #cell(status)="{ item }">
        <button
          type="button"
          class="badge border-0 fs-11 py-1 px-2 rounded-pill d-inline-flex align-items-center gap-1 cursor-pointer"
          :class="statusBadgeClass(item.status)"
          :disabled="togglingUser === item.username"
          @click="handleToggleStatus(item)"
        >
          <span
            v-if="togglingUser === item.username"
            class="spinner-border spinner-border-sm"
            style="width: 0.6rem; height: 0.6rem; border-width: 1.5px;"
          ></span>
          <i
            v-else
            class="ti"
            :class="isUserActive(item.status) ? 'ti-toggle-right' : 'ti-toggle-left'"
          ></i>
          {{ statusLabel(item.status) }}
        </button>
      </template>

      <!-- Row Action Buttons -->
      <template #actions="{ item }">
        <div class="d-flex align-items-center gap-1 justify-content-end">
          <!-- View Details -->
          <button
            type="button"
            class="btn btn-sm btn-light p-1"
            title="View User Profile"
            @click="handleViewUser(item)"
          >
            <i class="ti ti-eye fs-15 text-muted"></i>
          </button>

          <!-- Manage Groups -->
          <button
            type="button"
            class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 px-2 py-1"
            title="Manage User Groups"
            @click="handleManageGroups(item)"
          >
            <i class="ti ti-users-group fs-14"></i>
            <span class="fs-12 d-none d-lg-inline">Groups</span>
          </button>

          <!-- Edit User -->
          <button
            type="button"
            class="btn btn-sm btn-light p-1"
            title="Edit User"
            @click="openEditUserModal(item)"
          >
            <i class="ti ti-edit fs-15 text-primary"></i>
          </button>

          <!-- Ban User -->
          <button
            v-if="!isUserBanned(item.status)"
            type="button"
            class="btn btn-sm btn-light p-1"
            title="Ban User"
            @click="handleBanUser(item)"
          >
            <i class="ti ti-ban fs-15 text-warning"></i>
          </button>

          <!-- Delete User -->
          <button
            type="button"
            class="btn btn-sm btn-light p-1"
            title="Delete User"
            @click="handleDeleteUser(item)"
          >
            <i class="ti ti-trash fs-15 text-danger"></i>
          </button>
        </div>
      </template>
    </BaseDataTable>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import BaseDataTable from '../../components/common/BaseDataTable.vue';
import UsersForm from '../../components/iam/UsersForm.vue';
import UserDetailsModal from '../../components/iam/UserDetailsModal.vue';
import UserGroupToggle from '../../components/iam/UserGroupToggle.vue';
import { userService } from '../../services/userService';
import { useModalStore } from '../../stores/modal';
import { useAlertStore } from '../../stores/alert';
import { useAlert } from '../../composables/alerts';
import { parseBackendError } from '../../utils/apiResponseHelper';
import { exportToCSV } from '../../utils/export';

const modalStore = useModalStore();
const alertStore = useAlertStore();
const { confirmAction } = useAlert();

const users = ref([]);
const loading = ref(false);
const togglingUser = ref(null);
const searchQuery = ref('');
const statusFilter = ref('All');
const selectedIds = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);

const tableColumns = [
  { key: 'username', label: 'User', sortable: true },
  { key: 'full_name', label: 'Full Name', sortable: true },
  { key: 'email_address', label: 'Email', sortable: true },
  { key: 'mobile_number', label: 'Mobile', sortable: false },
  { key: 'status', label: 'Status', sortable: true, cellClass: 'text-center', headerClass: 'text-center' },
  { key: 'actions', label: 'Actions', sortable: false, headerClass: 'text-end', cellClass: 'text-end' }
];

// Data Loading
async function fetchUsers() {
  loading.value = true;
  try {
    const res = await userService.getUsers({
      page: currentPage.value,
      'per-page': 100
    });
    users.value = res.items || [];
  } catch (err) {
    console.error('Failed to fetch users:', err);
  } finally {
    loading.value = false;
  }
}

// Client-side Filtered Users
const filteredUsers = computed(() => {
  let list = [...users.value];

  // 1. Search Query
  if (searchQuery.value && searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter((u) => {
      const username = (u.username || '').toLowerCase();
      const name = getFullName(u).toLowerCase();
      const email = getEmail(u).toLowerCase();
      const mobile = getMobile(u).toLowerCase();
      return username.includes(q) || name.includes(q) || email.includes(q) || mobile.includes(q);
    });
  }

  // 2. Status Filter
  if (statusFilter.value !== 'All') {
    list = list.filter((u) => {
      const s = (u.status?.label || u.status || '').toString().toLowerCase();
      return s === statusFilter.value.toLowerCase();
    });
  }

  return list;
});

const totalCount = computed(() => filteredUsers.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / pageSize.value)));

const displayedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredUsers.value.slice(start, start + pageSize.value);
});

// Selection helpers
const isAllSelected = computed(() => {
  return (
    displayedUsers.value.length > 0 &&
    displayedUsers.value.every((u) => selectedIds.value.includes(u.username))
  );
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    const pageUsernames = displayedUsers.value.map((u) => u.username);
    selectedIds.value = selectedIds.value.filter((id) => !pageUsernames.includes(id));
  } else {
    const pageUsernames = displayedUsers.value.map((u) => u.username);
    selectedIds.value = Array.from(new Set([...selectedIds.value, ...pageUsernames]));
  }
}

function handlePageChange(page) {
  currentPage.value = page;
}

// User Property Extractors
function getFullName(user) {
  const p = user?.profile || user || {};
  const parts = [p.first_name, p.middle_name, p.last_name].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return user?.name || user?.username || '—';
}

function getEmail(user) {
  return user?.profile?.email_address || user?.email_address || user?.email || '';
}

function getMobile(user) {
  return user?.profile?.mobile_number || user?.mobile_number || user?.mobile || '';
}

function getInitials(user) {
  const p = user?.profile || user || {};
  if (p.first_name && p.last_name) {
    return `${p.first_name[0]}${p.last_name[0]}`.toUpperCase();
  }
  return (user?.username || 'U').substring(0, 2).toUpperCase();
}

function getAvatarColor(user) {
  const initials = getInitials(user);
  const palette = ['#F26522', '#2563EB', '#0D9488', '#16A34A', '#9333EA', '#DC2626'];
  const charSum = (initials.charCodeAt(0) || 0) + (initials.charCodeAt(1) || 0);
  return palette[charSum % palette.length];
}

function isUserActive(status) {
  const label = (status?.label || status || '').toString().toLowerCase();
  return label === 'active';
}

function isUserBanned(status) {
  const label = (status?.label || status || '').toString().toLowerCase();
  return label === 'banned' || label === 'suspended';
}

function statusBadgeClass(status) {
  if (status?.theme) return `badge-${status.theme}`;
  const label = (status?.label || status || '').toString().toLowerCase();
  if (label === 'active') return 'badge-success';
  if (label === 'inactive') return 'badge-secondary';
  if (label === 'banned') return 'badge-danger';
  if (label === 'suspended') return 'badge-warning';
  return 'badge-info';
}

function statusLabel(status) {
  return status?.label || status || 'Unknown';
}

// -------------------------------------------------------------
// USER ACTIONS
// -------------------------------------------------------------

function openCreateUserModal() {
  modalStore.openModal({
    component: UsersForm,
    title: 'Create New User',
    size: 'lg',
    showFooter: false,
    props: {
      formData: {
        username: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        email_address: '',
        mobile_number: '',
        password: '',
        confirm_password: ''
      },
      isCreateMode: true,
      onSubmit: async (data) => {
        try {
          await userService.createUser(data);
          alertStore.success('User Created', `User @${data.username} has been created.`);
          modalStore.closeModal();
          await fetchUsers();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Creation Failed', parsed.message || 'Failed to create user.');
          throw err;
        }
      }
    }
  });
}

function openEditUserModal(user) {
  modalStore.openModal({
    component: UsersForm,
    title: `Edit User: @${user.username}`,
    size: 'lg',
    showFooter: false,
    props: {
      formData: {
        username: user.username,
        first_name: user.profile?.first_name || user.first_name || '',
        middle_name: user.profile?.middle_name || user.middle_name || '',
        last_name: user.profile?.last_name || user.last_name || '',
        email_address: getEmail(user),
        mobile_number: getMobile(user)
      },
      isCreateMode: false,
      onSubmit: async (data) => {
        try {
          await userService.updateUser(user.username, data);
          alertStore.success('User Updated', `User @${user.username} updated successfully.`);
          modalStore.closeModal();
          await fetchUsers();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Update Failed', parsed.message || 'Failed to update user.');
          throw err;
        }
      }
    }
  });
}

async function handleViewUser(user) {
  modalStore.openModal({
    component: UserDetailsModal,
    title: `User Profile — @${user.username}`,
    size: 'lg',
    showFooter: false,
    props: {
      user: { ...user },
      onRefresh: fetchUsers
    }
  });

  // Fetch full user details asynchronously to enrich the modal
  try {
    const fullUser = await userService.getUser(user.username);
    if (fullUser) {
      modalStore.props.user = fullUser?.dataPayload?.data || fullUser?.data || fullUser;
    }
  } catch (e) {}
}

function handleManageGroups(user) {
  modalStore.openModal({
    component: UserGroupToggle,
    title: `Manage Groups — @${user.username}`,
    size: 'lg',
    showFooter: false,
    props: {
      username: user.username
    }
  });
}

async function handleToggleStatus(user) {
  const current = (user.status?.label || user.status || '').toString().toLowerCase();
  const nextStatus = current === 'active' ? 'inactive' : 'active';
  togglingUser.value = user.username;

  try {
    await userService.toggleUserStatus(user.username, nextStatus);
    alertStore.success('Status Updated', `User @${user.username} is now ${nextStatus}.`);
    await fetchUsers();
  } catch (err) {
    const parsed = parseBackendError(err);
    alertStore.error('Status Error', parsed.message || 'Failed to update user status.');
  } finally {
    togglingUser.value = null;
  }
}

async function handleBanUser(user) {
  const result = await confirmAction(
    `Ban User "@${user.username}"?`,
    'This will immediately revoke their access to the system.'
  );
  if (!result.isConfirmed) return;

  try {
    await userService.banUser(user.username);
    alertStore.success('User Banned', `User @${user.username} has been banned.`);
    await fetchUsers();
  } catch (err) {
    const parsed = parseBackendError(err);
    alertStore.error('Ban Error', parsed.message || 'Failed to ban user.');
  }
}

async function handleDeleteUser(user) {
  const result = await confirmAction(
    `Delete User "@${user.username}"?`,
    'This will permanently delete the user account and associated permissions.'
  );
  if (!result.isConfirmed) return;

  try {
    await userService.deleteUser(user.username);
    alertStore.success('User Deleted', `User @${user.username} has been removed.`);
    await fetchUsers();
  } catch (err) {
    const parsed = parseBackendError(err);
    alertStore.error('Delete Error', parsed.message || 'Failed to delete user.');
  }
}

function exportData() {
  exportToCSV('users_list', displayedUsers.value);
}

onMounted(() => fetchUsers());
</script>

<style scoped>
.hover-primary:hover {
  color: #f26522 !important;
}
</style>
