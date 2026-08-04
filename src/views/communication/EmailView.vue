<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Email Inbox"
      :breadcrumbs="['Apps', 'Email']"
      add-label="Compose Email"
      @add="isComposeOpen = true"
    />

    <div class="card border-0 shadow-sm rounded-3 overflow-hidden" style="min-height: 600px;">
      <div class="row g-0">
        <!-- Folders Sidebar -->
        <div class="col-xl-3 col-lg-4 border-end bg-light p-3">
          <div class="list-group list-group-flush mb-4">
            <a href="javascript:void(0);" class="list-group-item list-group-item-action bg-primary text-white rounded-3 mb-1 fw-medium">
              <i class="ti ti-inbox me-2"></i>Inbox <span class="badge bg-white text-primary float-end">4</span>
            </a>
            <a href="javascript:void(0);" class="list-group-item list-group-item-action border-0 rounded-3 mb-1">
              <i class="ti ti-star me-2"></i>Starred
            </a>
            <a href="javascript:void(0);" class="list-group-item list-group-item-action border-0 rounded-3 mb-1">
              <i class="ti ti-send me-2"></i>Sent
            </a>
            <a href="javascript:void(0);" class="list-group-item list-group-item-action border-0 rounded-3 mb-1">
              <i class="ti ti-file me-2"></i>Drafts
            </a>
            <a href="javascript:void(0);" class="list-group-item list-group-item-action border-0 rounded-3 text-danger">
              <i class="ti ti-trash me-2"></i>Trash
            </a>
          </div>
        </div>

        <!-- Emails List & Viewer -->
        <div class="col-xl-9 col-lg-8 p-0">
          <div class="p-3 border-bottom d-flex align-items-center justify-content-between">
            <h5 class="fw-bold mb-0">Inbox (4)</h5>
            <input type="text" class="form-control form-control-sm w-25" placeholder="Search mail..." />
          </div>
          <div class="list-group list-group-flush">
            <a
              v-for="mail in emails"
              :key="mail.id"
              href="javascript:void(0);"
              class="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between"
              @click="selectedMail = mail"
            >
              <div class="d-flex align-items-center gap-3">
                <i class="ti ti-star text-muted"></i>
                <span class="fw-bold text-dark" style="min-width: 140px;">{{ mail.sender }}</span>
                <span class="text-dark fw-medium text-truncate">{{ mail.subject }}</span>
                <span class="text-muted small text-truncate d-none d-md-inline">- {{ mail.snippet }}</span>
              </div>
              <small class="text-muted float-end">{{ mail.time }}</small>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Compose Modal -->
    <BaseModal
      v-model="isComposeOpen"
      title="Compose New Email"
      save-label="Send Email"
      @save="handleSendMail"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">To</label>
        <input type="email" v-model="composeTo" class="form-control" placeholder="recipient@company.com" required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Subject</label>
        <input type="text" v-model="composeSubject" class="form-control" placeholder="Subject..." required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Message</label>
        <textarea v-model="composeBody" class="form-control" rows="5" placeholder="Write your message here..."></textarea>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import BaseModal from '../../components/common/BaseModal.vue';

const isComposeOpen = ref(false);
const composeTo = ref('');
const composeSubject = ref('');
const composeBody = ref('');

const emails = ref([
  { id: 1, sender: 'HR Department', subject: 'Quarterly Performance Review Schedule', snippet: 'Please remind all department heads to submit performance reviews...', time: '11:15 AM' },
  { id: 2, sender: 'Finance Team', subject: 'July Payroll Authorization Approved', snippet: 'The July salary disbursement batch has been approved by management...', time: '09:40 AM' },
  { id: 3, sender: 'Recruitment Desk', subject: 'New Candidate Applications Received', snippet: '5 candidates have applied for the Senior Vue Developer position...', time: 'Yesterday' }
]);

const selectedMail = ref(emails.value[0]);

function handleSendMail() {
  alert(`Email sent to ${composeTo.value}!`);
  composeTo.value = '';
  composeSubject.value = '';
  composeBody.value = '';
  isComposeOpen.value = false;
}
</script>
