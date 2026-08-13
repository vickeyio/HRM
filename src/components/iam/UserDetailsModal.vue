<template>
  <div class="user-details-modal">
    <!-- User Hero Card -->
    <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-4">
      <div class="d-flex align-items-center gap-3">
        <!-- Initials Avatar -->
        <div
          class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
          :style="{
            width: '54px',
            height: '54px',
            minWidth: '54px',
            backgroundColor: avatarColor,
            fontSize: '18px'
          }"
        >
          {{ avatarInitials }}
        </div>
        <div>
          <h5 class="mb-1 text-dark fw-semibold">{{ fullName }}</h5>
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="text-muted fs-12">@{{ user?.username || '—' }}</span>
            <span class="badge" :class="statusBadgeClass(user?.status)">
              <i class="ti ti-point-filled me-1"></i>{{ statusLabel(user?.status) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex align-items-center gap-2">
        <!-- Status Toggle -->
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1"
          :disabled="actionLoading === 'status'"
          @click="toggleStatus"
        >
          <span v-if="actionLoading === 'status'" class="spinner-border spinner-border-sm" role="status"></span>
          <i v-else class="ti" :class="isActive ? 'ti-toggle-right text-success' : 'ti-toggle-left text-muted'"></i>
          <span class="fs-12">{{ isActive ? 'Deactivate' : 'Activate' }}</span>
        </button>

        <!-- Ban User -->
        <button
          type="button"
          class="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
          :disabled="actionLoading === 'ban' || isBanned"
          @click="banUser"
        >
          <span v-if="actionLoading === 'ban'" class="spinner-border spinner-border-sm" role="status"></span>
          <i v-else class="ti ti-ban"></i>
          <span class="fs-12">{{ isBanned ? 'Banned' : 'Ban' }}</span>
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs nav-tabs-bottom mb-3" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link cursor-pointer"
          :class="{ active: currentTab === 'overview' }"
          @click="currentTab = 'overview'"
        >
          <i class="ti ti-id me-1"></i> Profile Overview
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link cursor-pointer"
          :class="{ active: currentTab === 'groups' }"
          @click="currentTab = 'groups'"
        >
          <i class="ti ti-users-group me-1"></i> Groups & Roles
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link cursor-pointer"
          :class="{ active: currentTab === 'activity' }"
          @click="currentTab = 'activity'"
        >
          <i class="ti ti-activity me-1"></i> Activity Log
        </a>
      </li>
    </ul>

    <!-- TAB 1: OVERVIEW -->
    <div v-if="currentTab === 'overview'" class="tab-content py-2">
      <div class="row g-3">
        <!-- Contact Information -->
        <div class="col-md-6">
          <div class="card border shadow-none h-100 mb-0">
            <div class="card-header bg-white py-2 px-3">
              <h6 class="mb-0 fs-13 fw-semibold text-dark">
                <i class="ti ti-address-book me-1 text-primary"></i> Contact Information
              </h6>
            </div>
            <div class="card-body p-3">
              <ul class="list-unstyled mb-0 d-flex flex-column gap-2 fs-13">
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Email Address:</span>
                  <span class="fw-medium text-dark">{{ profile.email_address || '—' }}</span>
                </li>
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Mobile Number:</span>
                  <span class="fw-medium text-dark">{{ profile.mobile_number || '—' }}</span>
                </li>
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">User ID:</span>
                  <code class="text-primary">{{ user?.id || user?.user_id || '—' }}</code>
                </li>
                <li class="d-flex justify-content-between">
                  <span class="text-muted">Username:</span>
                  <span class="fw-medium text-dark">{{ user?.username || '—' }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Account Metadata -->
        <div class="col-md-6">
          <div class="card border shadow-none h-100 mb-0">
            <div class="card-header bg-white py-2 px-3">
              <h6 class="mb-0 fs-13 fw-semibold text-dark">
                <i class="ti ti-shield-lock me-1 text-primary"></i> Security & Metadata
              </h6>
            </div>
            <div class="card-body p-3">
              <ul class="list-unstyled mb-0 d-flex flex-column gap-2 fs-13">
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Account Status:</span>
                  <span class="badge" :class="statusBadgeClass(user?.status)">
                    {{ statusLabel(user?.status) }}
                  </span>
                </li>
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Created At:</span>
                  <span class="text-dark">{{ formatDate(user?.created_at) }}</span>
                </li>
                <li class="d-flex justify-content-between border-bottom pb-2">
                  <span class="text-muted">Updated At:</span>
                  <span class="text-dark">{{ formatDate(user?.updated_at) }}</span>
                </li>
                <li class="d-flex justify-content-between">
                  <span class="text-muted">Last Login:</span>
                  <span class="text-dark">{{ formatDate(user?.last_login_at || user?.last_login) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: GROUPS & ROLES -->
    <div v-else-if="currentTab === 'groups'" class="tab-content py-2">
      <div class="card border shadow-none mb-0">
        <div class="card-header bg-white py-2 px-3 d-flex justify-content-between align-items-center">
          <h6 class="mb-0 fs-13 fw-semibold text-dark">
            <i class="ti ti-users-group me-1 text-primary"></i> Assigned User Groups & Roles
          </h6>
        </div>
        <div class="card-body p-3">
          <div v-if="assignedGroupsList.length === 0" class="text-center py-4 text-muted">
            <i class="ti ti-shield-off fs-2 d-block mb-1 text-secondary"></i>
            <span class="fs-13">No groups or roles assigned to this user.</span>
          </div>

          <div v-else class="row g-2">
            <div
              v-for="group in assignedGroupsList"
              :key="group.id"
              class="col-md-6"
            >
              <div class="p-2 border rounded-2 d-flex align-items-center justify-content-between bg-light-subtle">
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-primary-subtle text-primary rounded-circle p-2">
                    <i class="ti ti-users-group fs-14"></i>
                  </span>
                  <div>
                    <div class="fw-semibold text-dark fs-13">{{ group.label }}</div>
                    <small class="text-muted fs-11" v-if="group.description">{{ group.description }}</small>
                  </div>
                </div>
                <span class="badge bg-success-subtle text-success fs-11">Assigned</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: ACTIVITY LOG -->
    <div v-else-if="currentTab === 'activity'" class="tab-content py-2">
      <div class="card border shadow-none mb-0">
        <div class="card-header bg-white py-2 px-3">
          <h6 class="mb-0 fs-13 fw-semibold text-dark">
            <i class="ti ti-history me-1 text-primary"></i> User Audit Trail
          </h6>
        </div>
        <div class="card-body p-3">
          <div v-if="!activityLogs || activityLogs.length === 0" class="text-center py-4 text-muted">
            <i class="ti ti-clock-off fs-2 d-block mb-1 text-secondary"></i>
            <span class="fs-13">No activity logs recorded.</span>
          </div>
          <div v-else class="timeline-simple">
            <div
              v-for="(log, idx) in activityLogs"
              :key="idx"
              class="d-flex align-items-start gap-2 mb-3 pb-2 border-bottom"
            >
              <i class="ti ti-circle-filled text-primary fs-10 mt-1"></i>
              <div class="flex-grow-1">
                <div class="fs-13 fw-medium text-dark">{{ log.message || log.action || log.event }}</div>
                <small class="text-muted fs-11">{{ formatDate(log.created_at || log.timestamp) }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { userService } from '../../services/userService';
import { useAlertStore } from '../../stores/alert';
import { useAlert } from '../../composables/alerts';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  onRefresh: {
    type: Function,
    default: null
  }
});

const alertStore = useAlertStore();
const { confirmAction } = useAlert();

const currentTab = ref('overview');
const actionLoading = ref(null);

const profile = computed(() => props.user?.profile || {});
const status = computed(() => props.user?.status || {});

const fullName = computed(() => {
  const p = profile.value;
  const parts = [p.first_name, p.middle_name, p.last_name].filter(Boolean);
  if (parts.length) return parts.join(' ');
  return props.user?.username || '—';
});

const avatarInitials = computed(() => {
  const p = profile.value;
  if (p.first_name && p.last_name) {
    return `${p.first_name[0]}${p.last_name[0]}`.toUpperCase();
  }
  return (props.user?.username || 'U').substring(0, 2).toUpperCase();
});

const avatarColor = computed(() => {
  const palette = ['#F26522', '#2563EB', '#0D9488', '#16A34A', '#9333EA', '#DC2626'];
  const charSum = (avatarInitials.value.charCodeAt(0) || 0) + (avatarInitials.value.charCodeAt(1) || 0);
  return palette[charSum % palette.length];
});

const isActive = computed(() => {
  const label = (status.value?.label || status.value || '').toString().toLowerCase();
  return label === 'active';
});

const isBanned = computed(() => {
  const label = (status.value?.label || status.value || '').toString().toLowerCase();
  return label === 'banned' || label === 'suspended';
});

const assignedGroupsList = computed(() => {
  const groups = props.user?.groups || props.user?.items?.assigned || {};
  if (Array.isArray(groups)) {
    return groups.map((g) => ({
      id: typeof g === 'string' ? g : g.group_id || g.id || g.name,
      label: typeof g === 'string' ? g : g.group_name || g.name || g.display_name || g.id,
      description: g.description || ''
    }));
  }
  return Object.entries(groups).map(([id, g]) => ({
    id,
    label: typeof g === 'string' ? g : g?.group_name || g?.display_name || id,
    description: g?.description || ''
  }));
});

const activityLogs = computed(() => {
  const logs = props.user?.activity_log || props.user?.activityLog || props.user?.logs || [];
  return Array.isArray(logs) ? logs : [];
});

function statusBadgeClass(stat) {
  if (stat?.theme) return `badge-${stat.theme}`;
  const label = (stat?.label || stat || '').toString().toLowerCase();
  if (label === 'active') return 'badge-success';
  if (label === 'inactive') return 'badge-secondary';
  if (label === 'banned') return 'badge-danger';
  if (label === 'suspended') return 'badge-warning';
  return 'badge-info';
}

function statusLabel(stat) {
  return stat?.label || stat || 'Unknown';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateStr;
  }
}

async function toggleStatus() {
  const username = props.user?.username;
  if (!username) return;
  const newStatus = isActive.value ? 'inactive' : 'active';
  actionLoading.value = 'status';
  try {
    await userService.toggleUserStatus(username, newStatus);
    alertStore.success('Status Updated', `User status changed to "${newStatus}".`);
    if (props.onRefresh) await props.onRefresh();
  } catch (err) {
    alertStore.error('Update Failed', 'Unable to toggle user status.');
  } finally {
    actionLoading.value = null;
  }
}

async function banUser() {
  const username = props.user?.username;
  if (!username) return;
  const result = await confirmAction(`Ban User "@${username}"?`, 'This will immediately revoke system access for this user.');
  if (!result.isConfirmed) return;

  actionLoading.value = 'ban';
  try {
    await userService.banUser(username);
    alertStore.success('User Banned', `User @${username} has been banned.`);
    if (props.onRefresh) await props.onRefresh();
  } catch (err) {
    alertStore.error('Action Failed', 'Failed to ban user.');
  } finally {
    actionLoading.value = null;
  }
}
</script>
