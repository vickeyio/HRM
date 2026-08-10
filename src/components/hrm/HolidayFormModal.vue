<template>
  <BaseModal
    :model-value="isOpen"
    @update:model-value="$emit('close')"
    :title="isEditMode ? 'Edit Holiday' : 'Add Holiday'"
    :save-label="isEditMode ? 'Save Changes' : 'Add Holiday'"
    @save="handleSubmit"
  >
    <form @submit.prevent="handleSubmit" id="holiday-form">
      <div class="row">
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Holiday Name <span class="text-danger">*</span></label>
            <input type="text" v-model="formData.holiday_name" class="form-control" placeholder="e.g. New Year" required />
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Date <span class="text-danger">*</span></label>
            <div class="input-icon-end position-relative">
              <input type="date" v-model="formData.holiday_date" class="form-control" required />
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea v-model="formData.description" class="form-control" rows="3" placeholder="Holiday description..."></textarea>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_recurring" id="is_recurring" />
            <label class="form-check-label" for="is_recurring">Recurring</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.is_paid" id="is_paid" />
            <label class="form-check-label" for="is_paid">Paid</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" v-model="formData.double_pay_if_worked" id="double_pay" />
            <label class="form-check-label" for="double_pay">Double Pay</label>
          </div>
        </div>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import BaseModal from '../common/BaseModal.vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  holidayData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => !!props.holidayData);

const defaultForm = () => ({
  holiday_name: '',
  holiday_date: new Date().toISOString().split('T')[0],
  description: '',
  is_recurring: false,
  is_paid: true,
  double_pay_if_worked: false,
});

const formData = ref(defaultForm());

watch(
  () => props.holidayData,
  (newVal) => {
    if (newVal) {
      formData.value = {
        holiday_name: newVal.holiday_name || newVal.title || '',
        holiday_date: newVal.holiday_date || newVal.date || new Date().toISOString().split('T')[0],
        description: newVal.description || '',
        is_recurring: newVal.is_recurring || false,
        is_paid: newVal.is_paid ?? true,
        double_pay_if_worked: newVal.double_pay_if_worked || false,
      };
    } else {
      formData.value = defaultForm();
    }
  },
  { immediate: true }
);

function closeModal() {
  emit('close');
}

function handleSubmit() {
  if (!formData.value.holiday_name) return;
  emit('save', { ...formData.value });
  closeModal();
}
</script>
