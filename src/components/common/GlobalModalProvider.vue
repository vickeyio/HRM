<template>
  <Teleport to="body">
    <div v-for="modal in modalStore.modals" :key="modal.id">
      <component
        :is="modal.component"
        v-bind="cleanProps(modal.props)"
        @save="handleSave(modal, $event)"
        @confirm="handleConfirm(modal, $event)"
        @close="handleClose(modal)"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();

function cleanProps(props) {
  const { onSave, onConfirm, onClose, ...rest } = props;
  return rest;
}

function handleSave(modal, payload) {
  modal.props.onSave?.(payload);
  modalStore.close(modal.id);
}

function handleConfirm(modal, payload) {
  modal.props.onConfirm?.(payload);
  modalStore.close(modal.id);
}

function handleClose(modal) {
  modalStore.close(modal.id);
}
</script>
