<template>
  <div>
    <div class="d-md-flex d-block align-items-center justify-content-between mb-4">
      <div>
        <h3 class="page-title fw-bold">{{ title }}</h3>
        <ul class="breadcrumb border-0 p-0 m-0 bg-transparent">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active">{{ title }}</li>
        </ul>
      </div>
    </div>
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-body p-4 text-center">
        <div class="avatar avatar-xl rounded-circle bg-primary-subtle text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style="width:64px;height:64px;">
          <i :class="[icon || 'ti ti-briefcase', 'fs-2']"></i>
        </div>
        <h4 class="fw-bold">{{ title }} Module</h4>
        <p class="text-muted max-w-md mx-auto">This module is part of the HR SaaS Core MVP setup. Interface implementation in progress.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Module' },
  icon: { type: String, default: 'ti ti-briefcase' }
});
</script>
