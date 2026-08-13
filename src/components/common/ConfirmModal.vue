<template>
  <div class="text-center py-2">
    <div class="avatar avatar-xl rounded-circle bg-danger-light text-danger mb-3 mx-auto d-flex align-items-center justify-content-center">
      <i class="ti ti-trash fs-24"></i>
    </div>
    <h6 class="fw-semibold text-dark mb-2">{{ heading }}</h6>
    <p class="text-muted fs-13 mb-0">{{ message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  heading: { type: String, default: 'Are you sure?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmLabel: { type: String, default: 'Delete' },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['confirm']);
</script>
