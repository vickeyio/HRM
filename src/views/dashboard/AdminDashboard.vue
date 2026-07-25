<template>
  <div>
    <!-- Page Header / Welcome Banner -->
    <div class="row align-items-center mb-4">
      <div class="col">
        <h3 class="page-title text-capitalize fw-bold">Admin Dashboard</h3>
        <ul class="breadcrumb border-0 p-0 m-0 bg-transparent">
          <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
          <li class="breadcrumb-item active">Admin Dashboard</li>
        </ul>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary d-flex align-items-center">
          <i class="ti ti-plus me-1"></i> Add New Employee
        </button>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="row g-3 mb-4">
      <div class="col-xl-3 col-sm-6 col-12" v-for="stat in stats" :key="stat.title">
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <span class="text-muted d-block mb-1">{{ stat.title }}</span>
                <h3 class="mb-0 fw-bold">{{ stat.value }}</h3>
              </div>
              <div :class="['avatar avatar-lg rounded-circle d-flex align-items-center justify-content-center', stat.bg]">
                <i :class="[stat.icon, 'fs-3 text-white']"></i>
              </div>
            </div>
            <div class="mt-3">
              <span :class="stat.isPositive ? 'text-success' : 'text-danger'" class="fw-medium me-1">
                <i :class="stat.isPositive ? 'ti ti-trending-up' : 'ti ti-trending-down'"></i> {{ stat.change }}
              </span>
              <span class="text-muted fs-7">vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="row g-3">
      <!-- Employee Status Overview -->
      <div class="col-xl-8 col-lg-7">
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-transparent border-0 d-flex align-items-center justify-content-between pt-3">
            <h5 class="card-title fw-bold mb-0">Employee Overview</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                This Month
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">This Week</a></li>
                <li><a class="dropdown-item" href="#">This Month</a></li>
                <li><a class="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="p-4 text-center bg-light rounded-3 mb-3">
              <h4 class="fw-semibold text-primary">Active Workforce & Attendance Metrics</h4>
              <p class="text-muted mb-0">Vue 3 Composition API reactive metric stream initialized successfully.</p>
            </div>
            <!-- Dynamic Attendance Table -->
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="emp in recentEmployees" :key="emp.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img :src="emp.avatar" class="rounded-circle me-2" width="32" height="32" />
                        <div>
                          <h6 class="mb-0 fw-medium">{{ emp.name }}</h6>
                          <small class="text-muted">{{ emp.role }}</small>
                        </div>
                      </div>
                    </td>
                    <td>{{ emp.dept }}</td>
                    <td>
                      <span :class="['badge rounded-pill', emp.statusClass]">{{ emp.status }}</span>
                    </td>
                    <td>{{ emp.checkIn }}</td>
                    <td>
                      <button class="btn btn-sm btn-light"><i class="ti ti-eye"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities Widget -->
      <div class="col-xl-4 col-lg-5">
        <div class="card border-0 shadow-sm rounded-3">
          <div class="card-header bg-transparent border-0 pt-3">
            <h5 class="card-title fw-bold mb-0">Recent Activities</h5>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mb-0">
              <li class="d-flex mb-3 pb-3 border-bottom" v-for="act in activities" :key="act.id">
                <div class="avatar avatar-md rounded-circle me-3 bg-light d-flex align-items-center justify-content-center">
                  <i :class="[act.icon, 'text-primary']"></i>
                </div>
                <div>
                  <h6 class="mb-1 fs-6">{{ act.title }}</h6>
                  <p class="text-muted mb-0 fs-7">{{ act.time }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  { title: 'Total Employees', value: '1,248', change: '+12%', isPositive: true, bg: 'bg-primary', icon: 'ti ti-users' },
  { title: 'Total Attendance', value: '1,120', change: '+4%', isPositive: true, bg: 'bg-success', icon: 'ti ti-user-check' },
  { title: 'Pending Leave Requests', value: '18', change: '-2.5%', isPositive: false, bg: 'bg-warning', icon: 'ti ti-calendar-off' },
  { title: 'New Applicants', value: '64', change: '+18%', isPositive: true, bg: 'bg-info', icon: 'ti ti-briefcase' }
]);

const recentEmployees = ref([
  { id: 1, name: 'Anthony Lewis', role: 'UI/UX Designer', dept: 'Designing', status: 'On Time', statusClass: 'bg-success-subtle text-success', checkIn: '09:00 AM', avatar: '/assets/img/profiles/avatar-02.jpg' },
  { id: 2, name: 'Brian Villalobos', role: 'PHP Developer', dept: 'Development', status: 'Late', statusClass: 'bg-warning-subtle text-warning', checkIn: '09:32 AM', avatar: '/assets/img/profiles/avatar-03.jpg' },
  { id: 3, name: 'Stephaney Harvey', role: 'HR Manager', dept: 'Human Resources', status: 'On Time', statusClass: 'bg-success-subtle text-success', checkIn: '08:55 AM', avatar: '/assets/img/profiles/avatar-04.jpg' },
  { id: 4, name: 'Doglas Meier', role: 'DevOps Engineer', dept: 'IT Systems', status: 'On Leave', statusClass: 'bg-danger-subtle text-danger', checkIn: '—', avatar: '/assets/img/profiles/avatar-05.jpg' }
]);

const activities = ref([
  { id: 1, title: 'Anthony Lewis requested 2 days Sick Leave', time: '10 minutes ago', icon: 'ti ti-calendar-event' },
  { id: 2, title: 'Brian Villalobos uploaded July Timesheet', time: '45 minutes ago', icon: 'ti ti-file-text' },
  { id: 3, title: 'New employee onboarding scheduled for Monday', time: '2 hours ago', icon: 'ti ti-user-plus' }
]);
</script>
