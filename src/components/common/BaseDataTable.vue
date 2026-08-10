<template>
  <div class="card shadow-sm border-0">
    <!-- Toolbar Slot -->
    <slot name="toolbar"></slot>

    <!-- Loading State -->
    <div v-if="isLoading" class="card-body p-0 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2 text-muted mb-0">Loading data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card-body p-0 text-center py-5">
      <i class="ti ti-alert-circle fs-1 mb-2 text-danger"></i>
      <p class="text-muted mb-0">{{ error }}</p>
    </div>

    <!-- Data Table -->
    <div v-else class="card-body p-0">
      <div class="table-responsive">
        <table class="table datatable align-middle mb-0">
          <thead class="thead-light">
            <slot name="head">
              <tr>
                <th v-if="selectable" class="no-sort" style="width: 40px;">
                  <div class="form-check form-check-md">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="isAllSelected"
                      @change="$emit('toggle-select-all')"
                    />
                  </div>
                </th>
                <th
                  v-for="col in columns"
                  :key="col.key"
                  :style="col.style"
                  :class="col.headerClass"
                >
                  {{ col.label }}
                </th>
                <th v-if="$slots.actions" class="text-end" style="min-width: 90px;">Action</th>
              </tr>
            </slot>
          </thead>
          <tbody>
            <tr v-if="!items || items.length === 0">
              <td :colspan="totalColspan" class="text-center py-5 text-muted">
                <slot name="empty">
                  <i class="ti ti-search-off fs-1 d-block mb-2 text-secondary"></i>
                  <span>{{ emptyText }}</span>
                </slot>
              </td>
            </tr>
            <tr v-for="(item, idx) in items" :key="getItemKey(item, idx)">
              <td v-if="selectable">
                <div class="form-check form-check-md">
                  <input
                    v-if="getItemKey(item) !== null"
                    class="form-check-input"
                    type="checkbox"
                    :value="getItemKey(item)"
                    :checked="selectedIds.includes(getItemKey(item))"
                    @change="handleSelectRow(getItemKey(item))"
                  />
                </div>
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                :class="col.cellClass"
              >
                <slot :name="`cell(${col.key})`" :item="item" :value="item[col.key]" :index="idx">
                  {{ item[col.key] !== undefined && item[col.key] !== null && item[col.key] !== '' ? item[col.key] : '—' }}
                </slot>
              </td>
              <td v-if="$slots.actions" class="text-end">
                <slot name="actions" :item="item" :index="idx"></slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div v-if="showPagination && (totalCount > 0 || items.length > 0)" class="p-0 border-top bg-white">
      <slot
        name="pagination"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-count="totalCount || items.length"
        :page-size="pageSize"
        :next-page="() => $emit('next-page')"
        :prev-page="() => $emit('prev-page')"
        :go-to-page="(p) => $emit('go-to-page', p)"
      >
        <DataTablePagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-count="totalCount || items.length"
          :page-size="pageSize"
          :show-per-page="showPerPage"
          :per-page-options="perPageOptions"
          @change-page="(p) => $emit('go-to-page', p)"
          @change-per-page="(size) => $emit('change-per-page', size)"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import DataTablePagination from './DataTablePagination.vue';

const props = defineProps({
  columns: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
  error: { type: [String, Object], default: null },
  selectable: { type: Boolean, default: false },
  selectedIds: { type: Array, default: () => [] },
  isAllSelected: { type: Boolean, default: false },
  idKey: { type: String, default: null },
  emptyText: { type: String, default: 'No records found.' },
  showPagination: { type: Boolean, default: true },
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 1 },
  totalCount: { type: Number, default: 0 },
  pageSize: { type: Number, default: 10 },
  showPerPage: { type: Boolean, default: false },
  perPageOptions: { type: Array, default: () => [10, 25, 50, 100] }
});

const emit = defineEmits([
  'toggle-select-all',
  'update:selectedIds',
  'next-page',
  'prev-page',
  'go-to-page',
  'change-per-page',
]);

const totalColspan = computed(() => {
  let count = props.columns.length;
  if (props.selectable) count++;
  return count + 1; // includes potential actions column
});

function getItemKey(item, fallbackIdx = null) {
  if (!item) return fallbackIdx;
  if (props.idKey && item[props.idKey] !== undefined && item[props.idKey] !== null) return item[props.idKey];
  const foundId = item.id ?? item.department_id ?? item.job_title_id ?? item.employee_id ?? item.holiday_id ?? item.leave_id;
  if (foundId !== undefined && foundId !== null) return foundId;
  return fallbackIdx;
}

function handleSelectRow(id) {
  if (id === null || id === undefined) return;
  const newSelected = [...props.selectedIds];
  const index = newSelected.indexOf(id);
  if (index > -1) {
    newSelected.splice(index, 1);
  } else {
    newSelected.push(id);
  }
  emit('update:selectedIds', newSelected);
}
</script>
