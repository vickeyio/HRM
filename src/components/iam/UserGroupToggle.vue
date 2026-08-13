<template>
  <div class="user-group-toggle">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading groups...</span>
      </div>
      <p class="mt-2 text-muted fs-13">Loading group memberships for @{{ username }}...</p>
    </div>

    <div v-else>
      <div class="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h6 class="mb-0 fs-14 fw-semibold text-dark">Assigned User Groups</h6>
          <small class="text-muted fs-12">Toggle switches to assign or revoke groups for @{{ username }}</small>
        </div>
        <div class="badge bg-primary-subtle text-primary">
          {{ assignedCount }} of {{ groups.length }} Assigned
        </div>
      </div>

      <!-- Search Input -->
      <div class="input-group input-group-sm mb-3">
        <span class="input-group-text bg-white border-end-0">
          <i class="ti ti-search text-muted"></i>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control border-start-0"
          placeholder="Filter groups..."
        />
      </div>

      <!-- Groups List -->
      <div class="groups-list border rounded-3 p-2 bg-light-subtle" style="max-height: 380px; overflow-y: auto;">
        <div v-if="!filteredGroups.length" class="text-center py-4 text-muted fs-13">
          <i class="ti ti-search-off fs-2 d-block mb-1 text-secondary"></i>
          No groups match your filter.
        </div>

        <div
          v-for="group in filteredGroups"
          :key="group.id"
          class="card mb-2 border shadow-none"
        >
          <div class="card-body p-3 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <div
                class="rounded-circle p-2 d-flex align-items-center justify-content-center"
                :class="group.assigned ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'"
              >
                <i class="ti ti-users-group fs-16"></i>
              </div>
              <div>
                <div class="fw-semibold text-dark fs-13">{{ group.label }}</div>
                <small class="text-muted fs-12">{{ group.description || 'System User Group' }}</small>
              </div>
            </div>

            <!-- Toggle Switch -->
            <div class="form-check form-switch m-0">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :checked="group.assigned"
                :disabled="processing[group.id]"
                @change="toggleGroup(group)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { rbacService } from '../../services/rbacService';
import { userService } from '../../services/userService';
import { useAlertStore } from '../../stores/alert';

const props = defineProps({
  username: {
    type: String,
    required: true
  }
});

const alertStore = useAlertStore();
const groups = ref([]);
const loading = ref(true);
const processing = ref({});
const searchQuery = ref('');

const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return groups.value;
  return groups.value.filter(
    (g) => g.label.toLowerCase().includes(q) || (g.description && g.description.toLowerCase().includes(q))
  );
});

const assignedCount = computed(() => groups.value.filter((g) => g.assigned).length);

async function loadGroups() {
  loading.value = true;
  try {
    const [allGroups, userDetails] = await Promise.all([
      rbacService.getGroups(),
      userService.getUser(props.username)
    ]);

    const userPayload = userDetails?.dataPayload?.data || userDetails?.data || userDetails || {};
    const assignedMap = userPayload?.items?.assigned || userPayload?.groups || {};

    const assignedSet = new Set();
    if (Array.isArray(assignedMap)) {
      assignedMap.forEach((g) => {
        if (typeof g === 'string') assignedSet.add(g);
        else {
          if (g?.id) assignedSet.add(String(g.id));
          if (g?.group_id) assignedSet.add(String(g.group_id));
          if (g?.group_name) assignedSet.add(String(g.group_name));
          if (g?.name) assignedSet.add(String(g.name));
        }
      });
    } else {
      Object.entries(assignedMap).forEach(([id, g]) => {
        assignedSet.add(String(id));
        if (g?.group_id) assignedSet.add(String(g.group_id));
        if (g?.group_name) assignedSet.add(String(g.group_name));
        if (g?.name) assignedSet.add(String(g.name));
      });
    }

    groups.value = (allGroups || []).map((raw) => {
      const id = String(raw.group_id || raw.id || raw.name || raw.group_name);
      const label = String(raw.group_name || raw.name || raw.display_name || id);
      const isAssigned = assignedSet.has(id) || assignedSet.has(label);
      return {
        id,
        label,
        description: raw.description || '',
        assigned: isAssigned
      };
    });
  } catch (err) {
    console.error('Failed to load user groups:', err);
    alertStore.error('Loading Error', 'Failed to load user groups.');
  } finally {
    loading.value = false;
  }
}

async function toggleGroup(group) {
  const willAssign = !group.assigned;
  processing.value[group.id] = true;

  try {
    if (willAssign) {
      await userService.assignGroupsToUser(props.username, [group.id]);
      group.assigned = true;
      alertStore.success('Group Assigned', `Group "${group.label}" assigned to @${props.username}.`);
    } else {
      await userService.removeGroupsFromUser(props.username, [group.id]);
      group.assigned = false;
      alertStore.success('Group Revoked', `Group "${group.label}" removed from @${props.username}.`);
    }
  } catch (err) {
    alertStore.error('Update Failed', `Failed to ${willAssign ? 'assign' : 'revoke'} group.`);
  } finally {
    processing.value[group.id] = false;
  }
}

onMounted(() => loadGroups());
</script>
