<template>
  <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
    <div class="my-auto mb-2">
      <h2 class="mb-1">{{ title }}</h2>
      <nav>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
          </li>
          <li
            v-for="(crumb, idx) in breadcrumbs"
            :key="idx"
            :class="['breadcrumb-item', { active: idx === breadcrumbs.length - 1 }]"
            :aria-current="idx === breadcrumbs.length - 1 ? 'page' : undefined"
          >
            {{ crumb }}
          </li>
        </ol>
      </nav>
    </div>

    <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
      <!-- Export Dropdown -->
      <div v-if="showExport" class="me-2 mb-2">
        <div class="dropdown">
          <a
            href="javascript:void(0);"
            class="dropdown-toggle btn btn-white d-inline-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <i class="ti ti-file-export me-1"></i>Export
          </a>
          <ul class="dropdown-menu dropdown-menu-end p-3">
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="$emit('export', 'pdf')">
                <i class="ti ti-file-type-pdf me-1"></i>Export as PDF
              </a>
            </li>
            <li>
              <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="$emit('export', 'excel')">
                <i class="ti ti-file-type-xls me-1"></i>Export as Excel
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Action Button -->
      <div v-if="addLabel" class="mb-2">
        <button @click="$emit('add')" class="btn btn-primary d-flex align-items-center">
          <i class="ti ti-circle-plus me-2"></i>{{ addLabel }}
        </button>
      </div>

      <!-- Extra Actions Slot -->
      <slot name="actions"></slot>

      <div class="head-icons ms-2">
        <a href="javascript:void(0);" id="collapse-header" title="Collapse">
          <i class="ti ti-chevrons-up"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  addLabel: {
    type: String,
    default: ''
  },
  showExport: {
    type: Boolean,
    default: true
  }
});

defineEmits(['add', 'export']);
</script>
