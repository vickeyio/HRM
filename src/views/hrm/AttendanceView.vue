<template>
  <div>
    <!-- Breadcrumb & Header Controls -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1 fw-bold">Attendance Admin</h2>
        <nav>
          <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Attendance</li>
            <li class="breadcrumb-item active" aria-current="page">Attendance Admin</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
        <div class="me-2 mb-2">
          <div class="d-flex align-items-center border bg-white rounded p-1 icon-list">
            <a href="javascript:void(0);" class="btn btn-icon btn-sm me-1"><i class="ti ti-brand-days-counter"></i></a>
            <a href="javascript:void(0);" class="btn btn-icon btn-sm active bg-primary text-white"><i class="ti ti-calendar-event"></i></a>
          </div>
        </div>
        <div class="mb-2">
          <button class="btn btn-primary d-flex align-items-center">
            <i class="ti ti-file-analytics me-2"></i>Generate Report
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Attendance Details Summary Card -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center mb-4">
          <div class="col-md-5">
            <div class="mb-3 mb-md-0">
              <h4 class="mb-1 fw-bold">Attendance Details Today</h4>
              <p class="text-muted mb-0">Real-time statistics across 800+ active employees</p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="d-flex align-items-center justify-content-md-end">
              <h6 class="mb-0 fw-semibold me-3">Total Absentees Today</h6>
              <div class="avatar-list-stacked avatar-group-sm d-flex align-items-center">
                <span class="avatar avatar-rounded border border-2 border-white me-n2">
                  <img src="/assets/img/profiles/avatar-02.jpg" alt="img" class="rounded-circle" width="32" height="32">
                </span>
                <span class="avatar avatar-rounded border border-2 border-white me-n2">
                  <img src="/assets/img/profiles/avatar-03.jpg" alt="img" class="rounded-circle" width="32" height="32">
                </span>
                <span class="avatar avatar-rounded border border-2 border-white me-n2">
                  <img src="/assets/img/profiles/avatar-05.jpg" alt="img" class="rounded-circle" width="32" height="32">
                </span>
                <span class="avatar avatar-rounded border border-2 border-white me-n2">
                  <img src="/assets/img/profiles/avatar-06.jpg" alt="img" class="rounded-circle" width="32" height="32">
                </span>
                <span class="avatar bg-primary avatar-rounded text-white fs-12 ms-1 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                  +1
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5-Metric Breakdown Bar -->
        <div class="border rounded-3 overflow-hidden">
          <div class="row gx-0 text-center text-md-start">
            <div class="col-md col-sm-4 border-end p-3">
              <span class="fw-medium mb-1 d-block text-muted">Present</span>
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bold mb-0">{{ attendanceStore.stats.present }}</h5>
                <span class="badge bg-success-subtle text-success d-inline-flex align-items-center">
                  <i class="ti ti-arrow-wave-right-down me-1"></i> {{ attendanceStore.stats.presentTrend }}
                </span>
              </div>
            </div>

            <div class="col-md col-sm-4 border-end p-3">
              <span class="fw-medium mb-1 d-block text-muted">Late Login</span>
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bold mb-0">{{ attendanceStore.stats.lateLogin }}</h5>
                <span class="badge bg-danger-subtle text-danger d-inline-flex align-items-center">
                  <i class="ti ti-arrow-wave-right-down me-1"></i> {{ attendanceStore.stats.lateTrend }}
                </span>
              </div>
            </div>

            <div class="col-md col-sm-4 border-end p-3">
              <span class="fw-medium mb-1 d-block text-muted">Uninformed</span>
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bold mb-0">{{ attendanceStore.stats.uninformed }}</h5>
                <span class="badge bg-danger-subtle text-danger d-inline-flex align-items-center">
                  <i class="ti ti-arrow-wave-right-down me-1"></i> {{ attendanceStore.stats.uninformedTrend }}
                </span>
              </div>
            </div>

            <div class="col-md col-sm-4 border-end p-3">
              <span class="fw-medium mb-1 d-block text-muted">Permission</span>
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bold mb-0">{{ attendanceStore.stats.permission }}</h5>
                <span class="badge bg-success-subtle text-success d-inline-flex align-items-center">
                  <i class="ti ti-arrow-wave-right-down me-1"></i> {{ attendanceStore.stats.permissionTrend }}
                </span>
              </div>
            </div>

            <div class="col-md col-sm-4 p-3">
              <span class="fw-medium mb-1 d-block text-muted">Absent</span>
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="fw-bold mb-0">{{ attendanceStore.stats.absent }}</h5>
                <span class="badge bg-danger-subtle text-danger d-inline-flex align-items-center">
                  <i class="ti ti-arrow-wave-right-down me-1"></i> {{ attendanceStore.stats.absentTrend }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Attendance Table & Filters -->
    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
        <h5 class="fw-bold mb-0">Admin Attendance Logs</h5>

        <div class="d-flex align-items-center gap-2 flex-wrap">
          <!-- Search Input -->
          <div class="input-group input-group-sm" style="width: 220px;">
            <input type="text" v-model="attendanceStore.searchQuery" class="form-control" placeholder="Search employee..." />
            <span class="input-group-text bg-white"><i class="ti ti-search text-muted"></i></span>
          </div>

          <!-- Department Filter -->
          <select v-model="attendanceStore.departmentFilter" class="form-select form-select-sm" style="width: 150px;">
            <option value="All">All Departments</option>
            <option value="UI/UX Team">UI/UX Team</option>
            <option value="Development">Development</option>
            <option value="HR">HR</option>
            <option value="Management">Management</option>
          </select>

          <!-- Status Filter -->
          <select v-model="attendanceStore.statusFilter" class="form-select form-select-sm" style="width: 130px;">
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Employee</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Break Time</th>
                <th>Late</th>
                <th>Production Hours</th>
                <th class="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="attendanceStore.filteredLogs.length === 0">
                <td colspan="8" class="text-center py-5 text-muted">
                  <i class="ti ti-calendar-off fs-1 d-block mb-2 text-secondary"></i>
                  No attendance records found matching filters.
                </td>
              </tr>
              <tr v-for="log in attendanceStore.filteredLogs" :key="log.id">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="log.avatar" class="rounded-circle me-2" width="38" height="38" alt="img" />
                    <div>
                      <h6 class="mb-0 fw-semibold text-dark">{{ log.employeeName }}</h6>
                      <small class="text-muted">{{ log.department }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    :class="[
                      'badge rounded-pill d-inline-flex align-items-center',
                      log.status === 'Present' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'
                    ]"
                  >
                    <i class="ti ti-point-filled me-1"></i> {{ log.status }}
                  </span>
                </td>
                <td class="text-muted fw-medium">{{ log.checkIn }}</td>
                <td class="text-muted fw-medium">{{ log.checkOut }}</td>
                <td class="text-muted">{{ log.breakTime }}</td>
                <td class="text-muted">{{ log.lateTime }}</td>
                <td>
                  <span
                    :class="[
                      'badge d-inline-flex align-items-center',
                      log.status === 'Present' ? 'bg-success text-white' : 'bg-secondary text-white'
                    ]"
                  >
                    <i class="ti ti-clock-hour-11 me-1"></i> {{ log.productionHours }}
                  </span>
                </td>
                <td class="text-end">
                  <button class="btn btn-sm btn-light text-primary me-1" title="Quick Edit" @click="toggleStatus(log)">
                    <i class="ti ti-edit"></i>
                  </button>
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
import { useAttendanceStore } from '../../stores/attendance';

const attendanceStore = useAttendanceStore();

function toggleStatus(log) {
  const newStatus = log.status === 'Present' ? 'Absent' : 'Present';
  attendanceStore.updateLog(log.id, {
    status: newStatus,
    checkIn: newStatus === 'Present' ? '09:00 AM' : '-',
    checkOut: newStatus === 'Present' ? '06:00 PM' : '-',
    productionHours: newStatus === 'Present' ? '8.00 Hrs' : '0.00 Hrs'
  });
}
</script>
