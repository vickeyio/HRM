<template>
  <div :class="['main-wrapper', { 'slide-nav': sidebarStore.isMobileOpen, 'mini-sidebar': sidebarStore.isCollapsed }]">
    <!-- Header Component -->
    <Header />

    <!-- Sidebar Component -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="page-wrapper">
      <div class="content container-fluid">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/common/Header.vue';
import Sidebar from '../components/common/Sidebar.vue';
import { useSidebarStore } from '../stores/sidebar';

const sidebarStore = useSidebarStore();
</script>

<style>
/* Smooth transition for layout */
.main-wrapper {
  width: 100%;
  height: 100%;
}
</style>
