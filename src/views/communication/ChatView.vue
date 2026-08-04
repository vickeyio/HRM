<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="Messenger"
      :breadcrumbs="['Apps', 'Chat']"
      :show-export="false"
    />

    <div class="card border-0 shadow-sm rounded-3 overflow-hidden" style="min-height: 600px;">
      <div class="row g-0">
        <!-- Sidebar Contacts & Channels -->
        <div class="col-xl-3 col-lg-4 border-end">
          <div class="p-3 border-bottom">
            <div class="input-group input-group-flat">
              <input type="text" v-model="searchQuery" class="form-control" placeholder="Search chats..." />
              <span class="input-group-text"><i class="ti ti-search text-muted"></i></span>
            </div>
          </div>
          <div class="list-group list-group-flush overflow-auto" style="max-height: 520px;">
            <a
              v-for="contact in filteredContacts"
              :key="contact.id"
              href="javascript:void(0);"
              :class="['list-group-item list-group-item-action p-3 border-bottom', { active: activeContact.id === contact.id }]"
              @click="activeContact = contact"
            >
              <div class="d-flex align-items-center">
                <span class="avatar avatar-md rounded-circle me-3 position-relative">
                  <img :src="contact.avatar" class="rounded-circle" alt="avatar" />
                  <span :class="['position-absolute bottom-0 end-0 p-1 border border-2 border-white rounded-circle', contact.status === 'online' ? 'bg-success' : 'bg-secondary']"></span>
                </span>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="mb-0 fw-semibold text-truncate">{{ contact.name }}</h6>
                    <small class="text-muted fs-11">{{ contact.time }}</small>
                  </div>
                  <p class="mb-0 text-muted small text-truncate">{{ contact.lastMsg }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Chat Main Window -->
        <div class="col-xl-9 col-lg-8 d-flex flex-column" style="height: 600px;">
          <!-- Header Bar -->
          <div class="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
            <div class="d-flex align-items-center">
              <img :src="activeContact.avatar" class="rounded-circle me-3" width="40" height="40" alt="avatar" />
              <div>
                <h6 class="mb-0 fw-bold">{{ activeContact.name }}</h6>
                <small class="text-success fw-medium"><i class="ti ti-point-filled"></i> {{ activeContact.status }}</small>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-secondary"><i class="ti ti-phone"></i></button>
              <button class="btn btn-sm btn-outline-secondary"><i class="ti ti-video"></i></button>
            </div>
          </div>

          <!-- Message History -->
          <div class="flex-grow-1 p-3 overflow-auto bg-white">
            <div v-for="(msg, idx) in messages" :key="idx" :class="['d-flex mb-3', msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start']">
              <div :class="['p-3 rounded-3 max-w-75', msg.sender === 'me' ? 'bg-primary text-white' : 'bg-light text-dark']" style="max-width: 70%;">
                <p class="mb-1 fs-14">{{ msg.text }}</p>
                <small :class="['d-block text-end fs-11', msg.sender === 'me' ? 'text-white-50' : 'text-muted']">{{ msg.time }}</small>
              </div>
            </div>
          </div>

          <!-- Input Footer -->
          <div class="p-3 border-top bg-light">
            <form @submit.prevent="sendMessage" class="d-flex gap-2">
              <input type="text" v-model="newMessage" class="form-control" placeholder="Type a message..." required />
              <button type="submit" class="btn btn-primary"><i class="ti ti-send"></i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';

const searchQuery = ref('');
const newMessage = ref('');

const contacts = ref([
  { id: 1, name: 'Sarah Connor', avatar: '/assets/img/profiles/avatar-02.jpg', status: 'online', lastMsg: 'Have you reviewed the Q3 payroll draft?', time: '10:30 AM' },
  { id: 2, name: 'Anthony Lewis', avatar: '/assets/img/profiles/avatar-05.jpg', status: 'online', lastMsg: 'Thank you for approving my leave request!', time: 'Yesterday' },
  { id: 3, name: 'Richard Miles', avatar: '/assets/img/profiles/avatar-09.jpg', status: 'offline', lastMsg: 'Meeting scheduled for tomorrow at 2 PM.', time: '2 days ago' }
]);

const activeContact = ref(contacts.value[0]);

const messages = ref([
  { sender: 'them', text: 'Hi Adrian, have you reviewed the Q3 payroll draft?', time: '10:28 AM' },
  { sender: 'me', text: 'Yes Sarah, everything looks good. I will finalize it shortly.', time: '10:30 AM' }
]);

const filteredContacts = computed(() => {
  if (!searchQuery.value.trim()) return contacts.value;
  return contacts.value.filter(c => c.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

function sendMessage() {
  if (!newMessage.value.trim()) return;
  messages.value.push({
    sender: 'me',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  newMessage.value = '';
}
</script>
