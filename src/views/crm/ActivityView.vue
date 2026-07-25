<template>
  <div>
    <!-- Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between mb-4">
      <div>
        <h3 class="page-title fw-bold">Activities</h3>
        <ul class="breadcrumb border-0 p-0 m-0 bg-transparent">
          <li class="breadcrumb-item"><router-link to="/">CRM</router-link></li>
          <li class="breadcrumb-item active">Activities</li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-2 mt-3 mt-md-0">
        <div class="input-group">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search activities..." />
          <span class="input-group-text"><i class="ti ti-search"></i></span>
        </div>
        <button class="btn btn-primary d-flex align-items-center" @click="showAddModal = true">
          <i class="ti ti-square-plus me-1"></i> Add Activity
        </button>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body py-2">
        <ul class="nav nav-pills border-0">
          <li class="nav-item" v-for="tab in tabs" :key="tab.id">
            <button
              :class="['nav-link py-2 px-3 me-2', { active: currentTab === tab.id }]"
              @click="currentTab = tab.id"
            >
              <i :class="[tab.icon, 'me-1']"></i> {{ tab.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Activity Timeline list -->
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="timeline">
              <div v-for="item in filteredActivities" :key="item.id" class="timeline-item mb-4 pb-4 border-bottom position-relative">
                <div class="d-flex align-items-start">
                  <div class="avatar avatar-md rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center me-3 fs-4">
                    <i :class="item.icon"></i>
                  </div>
                  <div class="flex-grow-1">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <h6 class="mb-0 fw-semibold">{{ item.title }}</h6>
                      <span class="badge bg-light text-dark border">{{ item.date }}</span>
                    </div>
                    <p class="text-muted mb-2">{{ item.description }}</p>
                    <div class="d-flex align-items-center gap-3 fs-7 text-muted">
                      <span><i class="ti ti-user me-1"></i> {{ item.owner }}</span>
                      <span><i class="ti ti-clock me-1"></i> {{ item.time }}</span>
                      <span class="badge bg-info-subtle text-info">{{ item.type }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Activity Modal Simulation -->
    <div v-if="showAddModal" class="modal fade show d-block" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          <div class="modal-header">
            <h5 class="modal-title fw-bold">Add New Activity</h5>
            <button type="button" class="btn-close" @click="showAddModal = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Activity Title</label>
              <input type="text" v-model="newActivity.title" class="form-control" placeholder="e.g. Follow-up Client Meeting" />
            </div>
            <div class="mb-3">
              <label class="form-label">Type</label>
              <select v-model="newActivity.type" class="form-select">
                <option value="Meeting">Meeting</option>
                <option value="Call">Call</option>
                <option value="Email">Email</option>
                <option value="Task">Task</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea v-model="newActivity.description" class="form-control" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light" @click="showAddModal = false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="addActivity">Save Activity</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const currentTab = ref('all');
const showAddModal = ref(false);

const tabs = [
  { id: 'all', label: 'All Activities', icon: 'ti ti-list-check' },
  { id: 'Meeting', label: 'Meetings', icon: 'ti ti-calendar-event' },
  { id: 'Call', label: 'Calls', icon: 'ti ti-phone' },
  { id: 'Email', label: 'Emails', icon: 'ti ti-mail' }
];

const newActivity = ref({
  title: '',
  type: 'Meeting',
  description: ''
});

const activities = ref([
  {
    id: 1,
    title: 'Client Demo Presentation with Acme Corp',
    type: 'Meeting',
    date: '2026-07-25',
    time: '11:00 AM',
    owner: 'Adrian Montero',
    description: 'Walkthrough of SmartHR enterprise payroll & attendance features for Acme IT leadership team.',
    icon: 'ti ti-brand-zoom'
  },
  {
    id: 2,
    title: 'Follow-up Call regarding Q3 License Renewal',
    type: 'Call',
    date: '2026-07-24',
    time: '03:30 PM',
    owner: 'Sarah Jenkins',
    description: 'Discussed subscription upgrade to enterprise tier with 500+ seat licenses.',
    icon: 'ti ti-phone-call'
  },
  {
    id: 3,
    title: 'Sent Proposal & Quote for Custom Integration',
    type: 'Email',
    date: '2026-07-23',
    time: '09:15 AM',
    owner: 'Michael Scott',
    description: 'Emailed official proposal documentation including SLA & deployment timelines.',
    icon: 'ti ti-mail-forward'
  }
]);

const filteredActivities = computed(() => {
  return activities.value.filter(act => {
    const matchesTab = currentTab.value === 'all' || act.type === currentTab.value;
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          act.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesTab && matchesSearch;
  });
});

function addActivity() {
  if (!newActivity.value.title) return;
  activities.value.unshift({
    id: Date.now(),
    title: newActivity.value.title,
    type: newActivity.value.type,
    date: new Date().toISOString().split('T')[0],
    time: 'Just now',
    owner: 'Adrian Montero',
    description: newActivity.value.description || 'No description provided.',
    icon: newActivity.value.type === 'Meeting' ? 'ti ti-calendar-event' : 'ti ti-notes'
  });
  newActivity.value = { title: '', type: 'Meeting', description: '' };
  showAddModal.value = false;
}
</script>
