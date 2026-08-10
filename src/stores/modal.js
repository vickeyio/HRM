import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const modals = ref([]);
  let nextId = 1;

  function open({ component, props = {} } = {}) {
    const id = nextId++;
    modals.value.push({ id, component, props });
    return id;
  }

  function close(id) {
    modals.value = modals.value.filter((m) => m.id !== id);
  }

  function closeAll() {
    modals.value = [];
  }

  return { modals, open, close, closeAll };
});
