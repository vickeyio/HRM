<template>
  <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-3 py-2 px-3 border-top bg-white">
    <!-- Left: Entries Count Info -->
    <div class="d-flex align-items-center gap-3">
      <div v-if="showPerPage" class="d-flex align-items-center me-2">
        <label class="me-2 mb-0 text-muted fs-13">Per page:</label>
        <select
          class="form-select form-select-sm"
          style="width: 75px"
          :value="pageSize"
          @change="$emit('change-per-page', Number($event.target.value))"
        >
          <option v-for="opt in perPageOptions" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>

      <span v-if="showEntriesInfo" class="text-muted fs-13">
        Showing {{ firstItem }} - {{ lastItem }} of {{ totalCount }} entries
      </span>
    </div>

    <!-- Right: Page Navigation -->
    <div v-if="totalPages >= 1" class="d-flex align-items-center">
      <nav aria-label="Page navigation">
        <ul class="pagination pagination-sm mb-0 align-items-center gap-1">
          <!-- Previous Page -->
          <li :class="['page-item', { disabled: currentPage <= 1 }]">
            <button
              class="page-link rounded-2 border-0 px-2 py-1"
              :disabled="currentPage <= 1"
              @click="$emit('change-page', currentPage - 1)"
              title="Previous"
            >
              <i class="ti ti-chevron-left fs-14"></i>
            </button>
          </li>

          <!-- Page Numbers -->
          <li
            v-for="page in pages"
            :key="page"
            :class="['page-item', { active: page === currentPage }]"
          >
            <button
              class="page-link rounded-2 border-0 px-2 py-1 fw-medium"
              @click="$emit('change-page', page)"
            >
              {{ page }}
            </button>
          </li>

          <!-- Next Page -->
          <li :class="['page-item', { disabled: currentPage >= totalPages }]">
            <button
              class="page-link rounded-2 border-0 px-2 py-1"
              :disabled="currentPage >= totalPages"
              @click="$emit('change-page', currentPage + 1)"
              title="Next"
            >
              <i class="ti ti-chevron-right fs-14"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  totalCount: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  perPageOptions: { type: Array, default: () => [10, 25, 50, 100] },
  showEntriesInfo: { type: Boolean, default: true },
  showPerPage: { type: Boolean, default: false }
});

defineEmits(['change-page', 'change-per-page']);

const firstItem = computed(() => {
  if (props.totalCount === 0) return 0;
  return (props.currentPage - 1) * props.pageSize + 1;
});

const lastItem = computed(() => {
  return Math.min(props.currentPage * props.pageSize, props.totalCount);
});

const pages = computed(() => {
  const range = [];
  const delta = 2;
  const left = props.currentPage - delta;
  const right = props.currentPage + delta + 1;

  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1 || i === props.totalPages || (i >= left && i < right)) {
      range.push(i);
    }
  }

  return range;
});
</script>

<style scoped>
.pagination .page-item.active .page-link {
  background-color: #F26522 !important;
  border-color: #F26522 !important;
  color: #ffffff !important;
}
.pagination .page-link {
  color: #6c757d;
  background-color: transparent;
}
.pagination .page-link:hover:not(:disabled) {
  background-color: #fff3ec !important;
  color: #F26522 !important;
}
.pagination .page-item.disabled .page-link {
  color: #cccccc;
  background-color: transparent;
}
</style>
