<template>
  <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
    <h5>{{ title }}</h5>
    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
      <!-- Search Input -->
      <div v-if="search !== undefined" class="me-3">
        <div class="input-icon position-relative">
          <span class="input-icon-addon">
            <i class="ti ti-search text-gray-9"></i>
          </span>
          <input
            type="text"
            :value="search"
            @input="$emit('update:search', $event.target.value)"
            class="form-control"
            :placeholder="searchPlaceholder"
          />
        </div>
      </div>

      <!-- Custom Extra Filters Slot (e.g. Department filter) -->
      <slot name="extra-filters"></slot>

      <!-- Status Dropdown -->
      <div v-if="status !== undefined" class="dropdown me-3">
        <a
          href="javascript:void(0);"
          class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
          data-bs-toggle="dropdown"
        >
          Status: {{ status }}
        </a>
        <ul class="dropdown-menu dropdown-menu-end p-3">
          <li v-for="option in statusOptions" :key="option">
            <a
              href="javascript:void(0);"
              class="dropdown-item rounded-1"
              @click="$emit('update:status', option)"
            >
              {{ option }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Sort Dropdown -->
      <div v-if="sort !== undefined" class="dropdown">
        <a
          href="javascript:void(0);"
          class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
          data-bs-toggle="dropdown"
        >
          Sort By : {{ sortByLabel }}
        </a>
        <ul class="dropdown-menu dropdown-menu-end p-3">
          <li>
            <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="$emit('update:sort', 'recent')">
              Recently Added
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="$emit('update:sort', 'asc')">
              Ascending
            </a>
          </li>
          <li>
            <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="$emit('update:sort', 'desc')">
              Descending
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'List'
  },
  search: {
    type: String,
    default: undefined
  },
  searchPlaceholder: {
    type: String,
    default: 'Search...'
  },
  status: {
    type: String,
    default: undefined
  },
  statusOptions: {
    type: Array,
    default: () => ['All', 'Active', 'Inactive']
  },
  sort: {
    type: String,
    default: undefined
  }
});

defineEmits(['update:search', 'update:status', 'update:sort']);

const sortByLabel = computed(() => {
  if (props.sort === 'asc') return 'Ascending';
  if (props.sort === 'desc') return 'Descending';
  return 'Recently Added';
});
</script>
