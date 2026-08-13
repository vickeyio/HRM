<template>
  <div>
    <!-- Page Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Roles & Permissions</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Administration</li>
            <li class="breadcrumb-item active" aria-current="page">Roles & Permissions</li>
          </ol>
        </nav>
      </div>

      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
        <button
          v-if="activeTab === 'roles'"
          type="button"
          class="btn btn-primary d-flex align-items-center"
          @click="openCreateRoleModal"
        >
          <i class="ti ti-plus me-1"></i> Add New Role
        </button>
        <button
          v-else-if="activeTab === 'groups'"
          type="button"
          class="btn btn-primary d-flex align-items-center"
          @click="openCreateGroupModal"
        >
          <i class="ti ti-plus me-1"></i> Add New Group
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="card border-0 shadow-sm rounded-3 mb-4">
      <div class="card-body py-2 px-3">
        <ul class="nav nav-pills nav-pills-sm">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/users"
            >
              <i class="ti ti-users me-1"></i> Users Directory
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link cursor-pointer"
              :class="{ active: activeTab === 'roles' }"
              href="javascript:void(0);"
              @click="switchTab('roles')"
            >
              <i class="ti ti-user-shield me-1"></i> Roles Management
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link cursor-pointer"
              :class="{ active: activeTab === 'permissions' }"
              href="javascript:void(0);"
              @click="switchTab('permissions')"
            >
              <i class="ti ti-key me-1"></i> System Permissions
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link cursor-pointer"
              :class="{ active: activeTab === 'groups' }"
              href="javascript:void(0);"
              @click="switchTab('groups')"
            >
              <i class="ti ti-users-group me-1"></i> User Groups
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- TAB 1: ROLES MANAGEMENT -->
    <div v-if="activeTab === 'roles'">
      <BaseDataTable
        :columns="roleColumns"
        :items="filteredRoles"
        :is-loading="loadingRoles"
        :current-page="rolePage"
        :total-count="filteredRoles.length"
        :page-size="rolePerPage"
        empty-text="No roles found matching search criteria."
        @go-to-page="rolePage = $event"
      >
        <template #toolbar>
          <div class="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h5 class="card-title mb-0 fs-16 fw-semibold text-dark">Roles Directory</h5>
            <div class="input-group input-group-sm" style="max-width: 280px;">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="roleSearch"
                type="text"
                class="form-control border-start-0"
                placeholder="Search roles..."
              />
            </div>
          </div>
        </template>

        <template #cell(role_name)="{ item }">
          <span class="fw-semibold text-dark">{{ item.role_name || item.name || item.role_id }}</span>
        </template>

        <template #cell(ruleName)="{ item }">
          <span v-if="item.ruleName && item.ruleName !== '--no rule attached--'" class="badge bg-secondary-subtle text-secondary rounded-pill px-2 py-1 fs-11">
            {{ item.ruleName }}
          </span>
          <span v-else class="text-muted fs-12">--</span>
        </template>

        <template #cell(description)="{ item }">
          <span class="text-muted fs-13">{{ item.description || 'No description provided.' }}</span>
        </template>

        <template #actions="{ item }">
          <div class="d-flex align-items-center gap-1 justify-content-end">
            <!-- Manage Permissions -->
            <button
              type="button"
              class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 px-2 py-1"
              title="Manage Permissions"
              @click="handleManagePermissions(item)"
            >
              <i class="ti ti-key fs-14"></i>
              <span class="fs-12 d-none d-md-inline">Permissions</span>
            </button>

            <!-- View Role -->
            <button
              type="button"
              class="btn btn-sm btn-light p-1"
              title="View Role Details"
              @click="openViewRoleModal(item)"
            >
              <i class="ti ti-eye fs-15 text-muted"></i>
            </button>

            <!-- Edit Role -->
            <button
              type="button"
              class="btn btn-sm btn-light p-1"
              title="Edit Role"
              @click="openEditRoleModal(item)"
            >
              <i class="ti ti-edit fs-15 text-primary"></i>
            </button>

            <!-- Delete Role -->
            <button
              v-if="!item.protected"
              type="button"
              class="btn btn-sm btn-light p-1"
              title="Delete Role"
              @click="handleDeleteRole(item)"
            >
              <i class="ti ti-trash fs-15 text-danger"></i>
            </button>
          </div>
        </template>
      </BaseDataTable>
    </div>

    <!-- TAB 2: SYSTEM PERMISSIONS -->
    <div v-else-if="activeTab === 'permissions'">
      <BaseDataTable
        :columns="permissionColumns"
        :items="filteredPermissions"
        :is-loading="loadingPermissions"
        :current-page="permissionPage"
        :total-count="filteredPermissions.length"
        :page-size="permissionPerPage"
        empty-text="No permissions found matching search criteria."
        @go-to-page="permissionPage = $event"
      >
        <template #toolbar>
          <div class="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h5 class="card-title mb-0 fs-16 fw-semibold text-dark">System Permissions</h5>
            <div class="input-group input-group-sm" style="max-width: 280px;">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="permissionSearch"
                type="text"
                class="form-control border-start-0"
                placeholder="Search permissions..."
              />
            </div>
          </div>
        </template>

        <template #cell(name)="{ item }">
          <code class="fw-semibold text-primary fs-13">{{ item.name || item.permission_name || item.permission_id }}</code>
        </template>

        <template #cell(description)="{ item }">
          <span class="text-muted fs-13">{{ item.description || '--' }}</span>
        </template>

        <template #cell(ruleName)="{ item }">
          <span v-if="item.ruleName && item.ruleName !== '--no rule attached--'" class="badge bg-info-subtle text-info rounded-pill px-2 py-1 fs-11">
            {{ item.ruleName }}
          </span>
          <span v-else class="text-muted fs-12">--</span>
        </template>

        <template #actions="{ item }">
          <div class="d-flex align-items-center gap-1 justify-content-end">
            <button
              type="button"
              class="btn btn-sm btn-light p-1"
              title="View Permission"
              @click="openViewPermissionModal(item)"
            >
              <i class="ti ti-eye fs-15 text-muted"></i>
            </button>
            <button
              type="button"
              class="btn btn-sm btn-light p-1"
              title="Edit Permission"
              @click="openEditPermissionModal(item)"
            >
              <i class="ti ti-edit fs-15 text-primary"></i>
            </button>
          </div>
        </template>
      </BaseDataTable>
    </div>

    <!-- TAB 3: USER GROUPS -->
    <div v-else-if="activeTab === 'groups'">
      <BaseDataTable
        :columns="groupColumns"
        :items="filteredGroups"
        :is-loading="loadingGroups"
        :current-page="groupPage"
        :total-count="filteredGroups.length"
        :page-size="groupPerPage"
        empty-text="No groups found matching search criteria."
        @go-to-page="groupPage = $event"
      >
        <template #toolbar>
          <div class="p-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h5 class="card-title mb-0 fs-16 fw-semibold text-dark">User Groups</h5>
            <div class="input-group input-group-sm" style="max-width: 280px;">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="groupSearch"
                type="text"
                class="form-control border-start-0"
                placeholder="Search groups..."
              />
            </div>
          </div>
        </template>

        <template #cell(name)="{ item }">
          <span class="fw-semibold text-dark">{{ item.name || item.group_name || item.group_id }}</span>
        </template>

        <template #cell(description)="{ item }">
          <span class="text-muted fs-13">{{ item.description || '--' }}</span>
        </template>

        <template #actions="{ item }">
          <div class="d-flex align-items-center gap-1 justify-content-end">
            <!-- Manage Group Roles -->
            <button
              type="button"
              class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 px-2 py-1"
              title="Manage Assigned Roles"
              @click="handleManageGroupRoles(item)"
            >
              <i class="ti ti-user-shield fs-14"></i>
              <span class="fs-12 d-none d-md-inline">Roles</span>
            </button>

            <!-- Edit Group -->
            <button
              type="button"
              class="btn btn-sm btn-light p-1"
              title="Edit Group"
              @click="openEditGroupModal(item)"
            >
              <i class="ti ti-edit fs-15 text-primary"></i>
            </button>

            <!-- Delete Group -->
            <button
              v-if="!item.protected"
              type="button"
              class="btn btn-sm btn-light p-1"
              title="Delete Group"
              @click="handleDeleteGroup(item)"
            >
              <i class="ti ti-trash fs-15 text-danger"></i>
            </button>
          </div>
        </template>
      </BaseDataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseDataTable from '../../components/common/BaseDataTable.vue';
import RolesForm from '../../components/iam/RolesForm.vue';
import PermissionsForm from '../../components/iam/PermissionsForm.vue';
import GroupsForm from '../../components/iam/GroupsForm.vue';
import AssignmentManager from '../../components/iam/AssignmentManager.vue';
import { rbacService } from '../../services/rbacService';
import { useModalStore } from '../../stores/modal';
import { useAlertStore } from '../../stores/alert';
import { useAlert } from '../../composables/alerts';
import { parseBackendError } from '../../utils/apiResponseHelper';

const modalStore = useModalStore();
const alertStore = useAlertStore();
const { confirmAction } = useAlert();

const activeTab = ref('roles');

// Roles State
const roles = ref([]);
const loadingRoles = ref(false);
const roleSearch = ref('');
const rolePage = ref(1);
const rolePerPage = ref(10);
const rulesList = ref([]);

const roleColumns = [
  { key: 'role_name', label: 'Role Name', sortable: true },
  { key: 'ruleName', label: 'Rule Name', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false, class: 'text-end' }
];

// Permissions State
const permissions = ref([]);
const loadingPermissions = ref(false);
const permissionSearch = ref('');
const permissionPage = ref(1);
const permissionPerPage = ref(10);

const permissionColumns = [
  { key: 'name', label: 'Permission Identifier', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'ruleName', label: 'Rule Name', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false, class: 'text-end' }
];

// Groups State
const groups = ref([]);
const loadingGroups = ref(false);
const groupSearch = ref('');
const groupPage = ref(1);
const groupPerPage = ref(10);

const groupColumns = [
  { key: 'name', label: 'Group Name', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false, class: 'text-end' }
];

// Filtered Lists
const filteredRoles = computed(() => {
  const q = roleSearch.value.trim().toLowerCase();
  if (!q) return roles.value;
  return roles.value.filter((r) => {
    const name = (r.role_name || r.name || '').toLowerCase();
    const desc = (r.description || '').toLowerCase();
    const rule = (r.ruleName || '').toLowerCase();
    return name.includes(q) || desc.includes(q) || rule.includes(q);
  });
});

const filteredPermissions = computed(() => {
  const q = permissionSearch.value.trim().toLowerCase();
  if (!q) return permissions.value;
  return permissions.value.filter((p) => {
    const name = (p.name || p.permission_name || '').toLowerCase();
    const desc = (p.description || '').toLowerCase();
    return name.includes(q) || desc.includes(q);
  });
});

const filteredGroups = computed(() => {
  const q = groupSearch.value.trim().toLowerCase();
  if (!q) return groups.value;
  return groups.value.filter((g) => {
    const name = (g.name || g.group_name || '').toLowerCase();
    const desc = (g.description || '').toLowerCase();
    return name.includes(q) || desc.includes(q);
  });
});

function switchTab(tab) {
  activeTab.value = tab;
  if (tab === 'roles' && roles.value.length === 0) fetchRoles();
  if (tab === 'permissions' && permissions.value.length === 0) fetchPermissions();
  if (tab === 'groups' && groups.value.length === 0) fetchGroups();
}

// -------------------------------------------------------------
// ROLES OPERATIONS
// -------------------------------------------------------------

async function fetchRoles() {
  loadingRoles.value = true;
  try {
    const data = await rbacService.getRoles();
    roles.value = data;
  } catch (err) {
    console.warn('Failed to load roles:', err);
  } finally {
    loadingRoles.value = false;
  }
}

async function fetchRules() {
  try {
    rulesList.value = await rbacService.getRules();
  } catch (e) {}
}

function openCreateRoleModal() {
  modalStore.openModal({
    component: RolesForm,
    title: 'Create New Role',
    size: 'md',
    showFooter: true,
    confirmText: 'Create Role',
    props: {
      formData: {},
      rulesList: rulesList.value,
      hideSubmit: true
    },
    onConfirm: async (data) => {
      await rbacService.createRole(data);
      alertStore.success('Role Created', `Role "${data.role_name}" has been created.`);
      await fetchRoles();
    }
  });
}

function openViewRoleModal(role) {
  modalStore.openModal({
    component: RolesForm,
    title: `Role Details: ${role.role_name || role.name}`,
    size: 'md',
    showFooter: true,
    showConfirm: false,
    cancelText: 'Close',
    props: {
      formData: { ...role },
      rulesList: rulesList.value,
      readonly: true,
      hideSubmit: true
    }
  });
}

function openEditRoleModal(role) {
  const roleId = role.role_id || role.id || role.role_name || role.name;
  modalStore.openModal({
    component: RolesForm,
    title: `Edit Role: ${role.role_name || role.name || roleId}`,
    size: 'md',
    showFooter: true,
    confirmText: 'Save Changes',
    props: {
      formData: { ...role },
      rulesList: rulesList.value,
      hideSubmit: true
    },
    onConfirm: async (data) => {
      await rbacService.updateRole(roleId, data);
      alertStore.success('Role Updated', `Role "${data.role_name || roleId}" updated successfully.`);
      await fetchRoles();
    }
  });
}

async function handleDeleteRole(role) {
  const roleId = role.role_id || role.id || role.role_name || role.name;
  const result = await confirmAction(
    `Delete Role "${role.role_name || role.name || roleId}"?`,
    'This will permanently remove the role and all its permission bindings.'
  );
  if (!result.isConfirmed) return;

  try {
    await rbacService.deleteRole(roleId);
    alertStore.success('Role Deleted', `Role "${role.role_name || role.name || roleId}" removed successfully.`);
    await fetchRoles();
  } catch (err) {
    const parsed = parseBackendError(err);
    alertStore.error('Delete Error', parsed.message || 'Failed to delete role.');
  }
}

// -------------------------------------------------------------
// ROLE PERMISSIONS ASSIGNMENT (AssignmentManager)
// -------------------------------------------------------------

function normalizeAssignmentItems(items) {
  if (!items) return [];
  if (Array.isArray(items)) {
    return items.map((it) => {
      if (typeof it === 'string') {
        return { id: it, label: it, type: '' };
      }
      const id = it.id || it.name || it.permission_id || it.role_id || it.group_id;
      const label = it.display_name || it.label || it.name || it.permission_name || it.role_name || it.group_name || id;
      return {
        id: String(id),
        label: String(label),
        type: it.type || ''
      };
    });
  }
  if (typeof items === 'object') {
    return Object.entries(items).map(([id, item]) => {
      if (typeof item === 'string') {
        return { id, label: item, type: '' };
      }
      return {
        id: String(item?.id || item?.name || item?.permission_id || item?.role_id || item?.group_id || id),
        label: String(item?.display_name || item?.label || item?.name || item?.permission_name || item?.role_name || item?.group_name || id),
        type: item?.type || ''
      };
    });
  }
  return [];
}

async function reloadRoleAssignments(roleId) {
  modalStore.props.isLoading = true;
  modalStore.props.isSubmitting = false;
  try {
    const res = await rbacService.getRole(roleId);
    const roleData = res?.dataPayload?.data || res?.data || res || {};
    const items = roleData.items || {};
    modalStore.props.availableItems = normalizeAssignmentItems(items.available);
    modalStore.props.assignedItems = normalizeAssignmentItems(items.assigned);
  } catch (e) {
    console.warn('Failed to load role assignments:', e);
    modalStore.props.availableItems = [];
    modalStore.props.assignedItems = [];
  } finally {
    modalStore.props.isLoading = false;
  }
}

function handleManagePermissions(role) {
  const roleId = role.role_id || role.id || role.role_name || role.name;

  modalStore.openModal({
    component: AssignmentManager,
    title: `Manage Permissions: ${role.role_name || role.name || roleId}`,
    size: 'xl',
    showFooter: false,
    showConfirm: false,
    showCancel: false,
    props: {
      availableItems: [],
      assignedItems: [],
      isLoading: true,
      isSubmitting: false,
      availableLabel: 'Available Permissions',
      assignedLabel: 'Assigned Permissions',
      onAssign: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          await rbacService.assignPermissionsToRole(roleId, selectedIds);
          alertStore.success('Permissions Assigned', `${selectedIds.length} permission(s) assigned.`);
          await reloadRoleAssignments(roleId);
          await fetchRoles();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Assignment Error', parsed.message || 'Failed to assign permissions.');
        } finally {
          modalStore.props.isSubmitting = false;
        }
      },
      onRemove: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          await rbacService.removePermissionsFromRole(roleId, selectedIds);
          alertStore.success('Permissions Removed', `${selectedIds.length} permission(s) removed.`);
          await reloadRoleAssignments(roleId);
          await fetchRoles();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Removal Error', parsed.message || 'Failed to remove permissions.');
        } finally {
          modalStore.props.isSubmitting = false;
        }
      }
    }
  });

  reloadRoleAssignments(roleId);
}

// -------------------------------------------------------------
// PERMISSIONS OPERATIONS
// -------------------------------------------------------------

async function fetchPermissions() {
  loadingPermissions.value = true;
  try {
    permissions.value = await rbacService.getPermissions();
  } catch (err) {
    console.warn('Failed to load permissions:', err);
  } finally {
    loadingPermissions.value = false;
  }
}

function openViewPermissionModal(permission) {
  modalStore.openModal({
    component: PermissionsForm,
    title: `Permission Details: ${permission.name || permission.permission_name}`,
    size: 'md',
    showFooter: true,
    showConfirm: false,
    cancelText: 'Close',
    props: {
      formData: { ...permission },
      readonly: true,
      hideSubmit: true
    }
  });
}

function openEditPermissionModal(permission) {
  const permId = permission.permission_id || permission.name || permission.id || permission.permission_name;
  modalStore.openModal({
    component: PermissionsForm,
    title: `Edit Permission: ${permId}`,
    size: 'md',
    showFooter: true,
    confirmText: 'Save Changes',
    props: {
      formData: { ...permission },
      hideSubmit: true
    },
    onConfirm: async (data) => {
      await rbacService.updatePermission(permId, data);
      alertStore.success('Permission Updated', `Permission "${permId}" updated successfully.`);
      await fetchPermissions();
    }
  });
}

// -------------------------------------------------------------
// GROUPS OPERATIONS & ROLE ASSIGNMENT
// -------------------------------------------------------------

async function fetchGroups() {
  loadingGroups.value = true;
  try {
    groups.value = await rbacService.getGroups();
  } catch (err) {
    console.warn('Failed to load groups:', err);
  } finally {
    loadingGroups.value = false;
  }
}

function openCreateGroupModal() {
  modalStore.openModal({
    component: GroupsForm,
    title: 'Create User Group',
    size: 'md',
    showFooter: true,
    confirmText: 'Create Group',
    props: {
      formData: {},
      hideSubmit: true
    },
    onConfirm: async (data) => {
      await rbacService.createGroup(data);
      alertStore.success('Group Created', `Group "${data.group_name || data.name}" created successfully.`);
      await fetchGroups();
    }
  });
}

function openEditGroupModal(group) {
  const groupId = group.group_id || group.id || group.group_name || group.name;
  modalStore.openModal({
    component: GroupsForm,
    title: `Edit Group: ${group.group_name || group.name || groupId}`,
    size: 'md',
    showFooter: true,
    confirmText: 'Save Changes',
    props: {
      formData: { ...group },
      hideSubmit: true
    },
    onConfirm: async (data) => {
      await rbacService.updateGroup(groupId, data);
      alertStore.success('Group Updated', `Group "${data.group_name || groupId}" updated successfully.`);
      await fetchGroups();
    }
  });
}

async function handleDeleteGroup(group) {
  const groupId = group.group_id || group.id || group.group_name || group.name;
  const result = await confirmAction(
    `Delete Group "${group.group_name || group.name || groupId}"?`,
    'This will permanently delete this user group.'
  );
  if (!result.isConfirmed) return;

  try {
    await rbacService.deleteGroup(groupId);
    alertStore.success('Group Deleted', `Group "${group.group_name || group.name || groupId}" removed successfully.`);
    await fetchGroups();
  } catch (err) {
    const parsed = parseBackendError(err);
    alertStore.error('Delete Error', parsed.message || 'Failed to delete group.');
  }
}

async function reloadGroupRoles(groupId) {
  modalStore.props.isLoading = true;
  modalStore.props.isSubmitting = false;
  try {
    const res = await rbacService.getGroup(groupId);
    const groupData = res?.dataPayload?.data || res?.data || res || {};
    const items = groupData.items || {};
    modalStore.props.availableItems = normalizeAssignmentItems(items.available);
    modalStore.props.assignedItems = normalizeAssignmentItems(items.assigned);
  } catch (e) {
    console.warn('Failed to load group roles:', e);
    modalStore.props.availableItems = [];
    modalStore.props.assignedItems = [];
  } finally {
    modalStore.props.isLoading = false;
  }
}

function handleManageGroupRoles(group) {
  const groupId = group.group_id || group.id || group.group_name || group.name;

  modalStore.openModal({
    component: AssignmentManager,
    title: `Manage Group Roles: ${group.group_name || group.name || groupId}`,
    size: 'xl',
    showFooter: false,
    showConfirm: false,
    showCancel: false,
    props: {
      availableItems: [],
      assignedItems: [],
      isLoading: true,
      isSubmitting: false,
      availableLabel: 'Available Roles',
      assignedLabel: 'Assigned Roles',
      onAssign: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          await rbacService.assignRolesToGroup(groupId, selectedIds);
          alertStore.success('Roles Assigned', `${selectedIds.length} role(s) assigned to group.`);
          await reloadGroupRoles(groupId);
          await fetchGroups();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Assignment Error', parsed.message || 'Failed to assign roles.');
        } finally {
          modalStore.props.isSubmitting = false;
        }
      },
      onRemove: async (selectedIds) => {
        modalStore.props.isSubmitting = true;
        try {
          await rbacService.removeRolesFromGroup(groupId, selectedIds);
          alertStore.success('Roles Removed', `${selectedIds.length} role(s) removed.`);
          await reloadGroupRoles(groupId);
          await fetchGroups();
        } catch (err) {
          const parsed = parseBackendError(err);
          alertStore.error('Removal Error', parsed.message || 'Failed to remove roles.');
        } finally {
          modalStore.props.isSubmitting = false;
        }
      }
    }
  });

  reloadGroupRoles(groupId);
}

// -------------------------------------------------------------
// INITIAL MOUNT
// -------------------------------------------------------------
onMounted(() => {
  fetchRoles();
  fetchRules();
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.nav-pills .nav-link {
  color: #64748b;
  font-weight: 500;
  border-radius: 6px;
  padding: 8px 16px;
}
.nav-pills .nav-link.active {
  background-color: #f26522;
  color: #ffffff;
}
</style>
