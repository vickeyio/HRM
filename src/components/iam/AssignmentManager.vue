<template>
  <div class="assignment-manager">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted small">Loading assignments...</p>
    </div>

    <div v-else class="row g-3 align-items-stretch">
      <!-- Available Items Column -->
      <div class="col-md-5">
        <div class="card h-100 border shadow-none bg-light-subtle">
          <div class="card-header bg-white py-2 px-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-semibold fs-14 text-dark">{{ availableLabel }}</h6>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary btn-xs"
                @click="selectAll('available')"
                :disabled="!filteredAvailable.length"
              >
                Select All
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-xs"
                @click="deselectAll('available')"
                :disabled="!selectedAvailable.length"
              >
                Clear
              </button>
            </div>
          </div>

          <div class="card-body p-2 d-flex flex-column">
            <!-- Search Input -->
            <div class="input-group input-group-sm mb-2">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="availableSearch"
                type="text"
                class="form-control border-start-0"
                placeholder="Search..."
              />
            </div>

            <!-- List Container -->
            <div class="list-group assignment-list flex-grow-1">
              <div
                v-for="item in filteredAvailable"
                :key="`avail-${item.id}`"
                class="list-group-item list-group-item-action d-flex align-items-center py-2 px-3"
                :class="{ active: isSelected(item.id, 'available') }"
                @click="toggleSelection(item.id, 'available')"
                style="cursor: pointer;"
              >
                <input
                  type="checkbox"
                  class="form-check-input me-2 mt-0"
                  :checked="isSelected(item.id, 'available')"
                  @click.stop="toggleSelection(item.id, 'available')"
                />
                <div class="flex-grow-1 overflow-hidden">
                  <div
                    class="fw-semibold text-truncate fs-13"
                    :class="{ 'text-white': isSelected(item.id, 'available'), 'text-dark': !isSelected(item.id, 'available') }"
                  >
                    {{ item.label }}
                  </div>
                  <small
                    v-if="item.type || item.id !== item.label"
                    class="text-truncate d-block fs-11"
                    :class="isSelected(item.id, 'available') ? 'text-white-50' : 'text-muted'"
                  >
                    {{ item.id }} <span v-if="item.type">({{ item.type }})</span>
                  </small>
                </div>
              </div>

              <div v-if="!filteredAvailable.length" class="text-center text-muted py-4 small">
                No available items
              </div>
            </div>

            <div class="mt-2 text-muted small px-1">
              {{ selectedAvailable.length }} of {{ availableItems.length }} selected
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons Column -->
      <div class="col-md-2 d-flex flex-column justify-content-center align-items-center gap-2 py-3">
        <button
          type="button"
          class="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-1 shadow-sm"
          :disabled="isSubmitting || !selectedAvailable.length"
          @click="handleAssign"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
          <i v-else class="ti ti-arrow-right fs-16"></i>
          <span class="fw-semibold fs-13">Assign</span>
        </button>

        <button
          type="button"
          class="btn btn-outline-danger w-100 py-2 d-flex align-items-center justify-content-center gap-1 shadow-sm"
          :disabled="isSubmitting || !selectedAssigned.length"
          @click="handleRemove"
        >
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status"></span>
          <i v-else class="ti ti-arrow-left fs-16"></i>
          <span class="fw-semibold fs-13">Remove</span>
        </button>
      </div>

      <!-- Assigned Items Column -->
      <div class="col-md-5">
        <div class="card h-100 border shadow-none bg-light-subtle">
          <div class="card-header bg-white py-2 px-3 d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-semibold fs-14 text-dark">{{ assignedLabel }}</h6>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-primary btn-xs"
                @click="selectAll('assigned')"
                :disabled="!filteredAssigned.length"
              >
                Select All
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-xs"
                @click="deselectAll('assigned')"
                :disabled="!selectedAssigned.length"
              >
                Clear
              </button>
            </div>
          </div>

          <div class="card-body p-2 d-flex flex-column">
            <!-- Search Input -->
            <div class="input-group input-group-sm mb-2">
              <span class="input-group-text bg-white border-end-0">
                <i class="ti ti-search text-muted"></i>
              </span>
              <input
                v-model="assignedSearch"
                type="text"
                class="form-control border-start-0"
                placeholder="Search..."
              />
            </div>

            <!-- List Container -->
            <div class="list-group assignment-list flex-grow-1">
              <div
                v-for="item in filteredAssigned"
                :key="`assigned-${item.id}`"
                class="list-group-item list-group-item-action d-flex align-items-center py-2 px-3"
                :class="{ active: isSelected(item.id, 'assigned') }"
                @click="toggleSelection(item.id, 'assigned')"
                style="cursor: pointer;"
              >
                <input
                  type="checkbox"
                  class="form-check-input me-2 mt-0"
                  :checked="isSelected(item.id, 'assigned')"
                  @click.stop="toggleSelection(item.id, 'assigned')"
                />
                <div class="flex-grow-1 overflow-hidden">
                  <div
                    class="fw-semibold text-truncate fs-13"
                    :class="{ 'text-white': isSelected(item.id, 'assigned'), 'text-dark': !isSelected(item.id, 'assigned') }"
                  >
                    {{ item.label }}
                  </div>
                  <small
                    v-if="item.type || item.id !== item.label"
                    class="text-truncate d-block fs-11"
                    :class="isSelected(item.id, 'assigned') ? 'text-white-50' : 'text-muted'"
                  >
                    {{ item.id }} <span v-if="item.type">({{ item.type }})</span>
                  </small>
                </div>
              </div>

              <div v-if="!filteredAssigned.length" class="text-center text-muted py-4 small">
                No assigned items
              </div>
            </div>

            <div class="mt-2 text-muted small px-1">
              {{ selectedAssigned.length }} of {{ assignedItems.length }} selected
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  availableItems: {
    type: Array,
    default: () => []
  },
  assignedItems: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isSubmitting: {
    type: Boolean,
    default: false
  },
  availableLabel: {
    type: String,
    default: 'Available'
  },
  assignedLabel: {
    type: String,
    default: 'Assigned'
  },
  onAssign: Function,
  onRemove: Function
});

const selectedAvailable = ref([]);
const selectedAssigned = ref([]);
const availableSearch = ref('');
const assignedSearch = ref('');

const filteredAvailable = computed(() => {
  const term = availableSearch.value.trim().toLowerCase();
  if (!term) return props.availableItems;
  return props.availableItems.filter(
    (item) =>
      (item.label && item.label.toLowerCase().includes(term)) ||
      (item.id && item.id.toLowerCase().includes(term))
  );
});

const filteredAssigned = computed(() => {
  const term = assignedSearch.value.trim().toLowerCase();
  if (!term) return props.assignedItems;
  return props.assignedItems.filter(
    (item) =>
      (item.label && item.label.toLowerCase().includes(term)) ||
      (item.id && item.id.toLowerCase().includes(term))
  );
});

function isSelected(id, bucket) {
  return bucket === 'available'
    ? selectedAvailable.value.includes(id)
    : selectedAssigned.value.includes(id);
}

function toggleSelection(id, bucket) {
  const target = bucket === 'available' ? selectedAvailable : selectedAssigned;
  const index = target.value.indexOf(id);
  if (index === -1) {
    target.value.push(id);
  } else {
    target.value.splice(index, 1);
  }
}

function selectAll(bucket) {
  if (bucket === 'available') {
    selectedAvailable.value = filteredAvailable.value.map((item) => item.id);
  } else {
    selectedAssigned.value = filteredAssigned.value.map((item) => item.id);
  }
}

function deselectAll(bucket) {
  if (bucket === 'available') {
    selectedAvailable.value = [];
  } else {
    selectedAssigned.value = [];
  }
}

async function handleAssign() {
  const ids = [...selectedAvailable.value];
  if (!ids.length || !props.onAssign) return;
  selectedAvailable.value = [];
  await props.onAssign(ids);
}

async function handleRemove() {
  const ids = [...selectedAssigned.value];
  if (!ids.length || !props.onRemove) return;
  selectedAssigned.value = [];
  await props.onRemove(ids);
}
</script>

<style scoped>
.assignment-list {
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  max-height: 380px;
  min-height: 280px;
  overflow-y: auto;
  background-color: #ffffff;
}

.btn-xs {
  padding: 0.15rem 0.45rem;
  font-size: 0.75rem;
}

.list-group-item.active {
  background-color: #f26522;
  border-color: #f26522;
  z-index: 0;
}
</style>
