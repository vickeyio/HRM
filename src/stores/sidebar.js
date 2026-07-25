import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
  const isCollapsed = ref(false);
  const isMobileOpen = ref(false);

  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value;
  }

  function toggleMobile() {
    isMobileOpen.value = !isMobileOpen.value;
  }

  function closeMobile() {
    isMobileOpen.value = false;
  }

  return {
    isCollapsed,
    isMobileOpen,
    toggleSidebar,
    toggleMobile,
    closeMobile
  };
});
