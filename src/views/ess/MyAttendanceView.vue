<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="My Attendance Log"
      :breadcrumbs="['ESS', 'My Attendance']"
      :show-export="false"
    />

    <!-- Clock In/Out Quick Action Widget -->
    <div class="card border-0 shadow-sm rounded-3 mb-4 bg-primary text-white">
      <div class="card-body p-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div>
          <h4 class="fw-bold mb-1">Today's Shift: 09:00 AM - 06:00 PM</h4>
          <p class="mb-0 text-white-50">Current Status: <span class="badge bg-success text-white">Checked In at 08:52 AM</span></p>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-light text-primary fw-bold" @click="togglePunch">
            <i :class="['ti me-1', isPunchedIn ? 'ti-logout text-danger' : 'ti-login text-success']"></i>
            {{ isPunchedIn ? 'Punch Out' : 'Punch In' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Monthly Punch History -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom">
        <h5 class="fw-bold mb-0">My Monthly Punch Logs</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Date</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Production Hours</th>
                <th>Overtime</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in punchLogs" :key="log.date">
                <td class="fw-semibold text-dark">{{ log.date }}</td>
                <td>{{ log.punchIn }}</td>
                <td>{{ log.punchOut }}</td>
                <td><span class="badge bg-light text-dark border">{{ log.hours }} hrs</span></td>
                <td>{{ log.overtime }}</td>
                <td>
                  <span :class="['badge', log.status === 'Present' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning']">
                    {{ log.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';

const isPunchedIn = ref(true);

const punchLogs = ref([
  { date: '04 Aug 2026', punchIn: '08:52 AM', punchOut: '06:05 PM', hours: '9.2', overtime: '0.2 hrs', status: 'Present' },
  { date: '03 Aug 2026', punchIn: '09:00 AM', punchOut: '06:00 PM', hours: '9.0', overtime: '0.0 hrs', status: 'Present' },
  { date: '02 Aug 2026', punchIn: '08:55 AM', punchOut: '06:15 PM', hours: '9.3', overtime: '0.3 hrs', status: 'Present' },
  { date: '01 Aug 2026', punchIn: '-', punchOut: '-', hours: '0.0', overtime: '0.0 hrs', status: 'Weekend' }
]);

function togglePunch() {
  isPunchedIn.value = !isPunchedIn.value;
  alert(isPunchedIn.value ? 'Successfully Punched In!' : 'Successfully Punched Out!');
}
</script>
