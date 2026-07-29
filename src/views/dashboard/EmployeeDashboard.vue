<template>
  <div>
    <!-- Page Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Employee Dashboard</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              Dashboard
            </li>
            <li class="breadcrumb-item active" aria-current="page">Employee Dashboard</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="me-2 mb-2">
          <div class="dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
              <i class="ti ti-file-export me-1"></i>Export
            </a>
            <ul class="dropdown-menu dropdown-menu-end p-3">
              <li>
                <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="exportReport('pdf')">
                  <i class="ti ti-file-type-pdf me-1"></i>Export as PDF
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="exportReport('excel')">
                  <i class="ti ti-file-type-xls me-1"></i>Export as Excel
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="input-icon w-120 position-relative mb-2">
          <span class="input-icon-addon">
            <i class="ti ti-calendar text-gray-9"></i>
          </span>
          <input type="text" class="form-control datetimepicker" value="15-04-2025">
        </div>
        <div class="ms-2 mb-2 head-icons">
          <a href="javascript:void(0);" id="collapse-header" title="Collapse">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Top Alert -->
    <div v-if="showAlert" class="alert bg-secondary-transparent alert-dismissible fade show mb-4 d-flex align-items-center justify-content-between gap-2">
      <span>Your Leave Request on <strong>24th April 2024</strong> has been Approved!</span>
      <button type="button" class="btn-close fs-14" @click="showAlert = false" aria-label="Close"><i class="ti ti-x"></i></button>
    </div>

    <!-- Main Grid Row 1 -->
    <div class="row">
      <!-- Profile Card -->
      <div class="col-xxl-4 d-flex">
        <div class="card position-relative flex-fill">
          <div class="card-header bg-dark">
            <div class="d-flex align-items-center flex-wrap gap-2">
              <span class="avatar avatar-lg avatar-rounded border border-white border-2 flex-shrink-0 me-2 position-relative">
                <img src="/assets/img/users/user-01.jpg" alt="Img" @error="handleImgError">
                <span class="position-absolute employee-verify-badge bg-white fs-14 d-inline-flex align-items-center justify-content-center rounded-circle">
                  <i class="ti ti-discount-check-filled text-success"></i>
                </span>
              </span>
              <div>
                <h5 class="text-white mb-1">Stephan Peralt</h5>
                <div class="d-flex align-items-center">
                  <p class="text-white fs-12 mb-0">Senior Product Designer</p>
                  <span class="mx-1"><i class="ti ti-point-filled text-primary"></i></span>
                  <p class="fs-12 text-white-50 mb-0">UI/UX Design</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body rounded-top">
            <div class="mb-3">
              <span class="d-block mb-1 fs-13 text-muted">Phone Number</span>
              <p class="text-gray-9 mb-0">+1 324 3453 545</p>
            </div>
            <div class="mb-3">
              <span class="d-block mb-1 fs-13 text-muted">Email Address</span>
              <p class="text-gray-9 mb-0">stephan@example.com</p>
            </div>
            <div class="mb-3">
              <span class="d-block mb-1 fs-13 text-muted">Report Officer</span>
              <p class="text-gray-9 mb-0">Doglas Martini</p>
            </div>
            <div>
              <span class="d-block mb-1 fs-13 text-muted">Joined on</span>
              <p class="text-gray-9 mb-0">15 Jan 2024</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance Statistics Card -->
      <div class="col-xxl-5 col-xl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
              <h5>Attendance Overview</h5>
              <div class="dropdown">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>{{ selectedYear }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li v-for="year in [2026, 2025, 2024]" :key="year">
                    <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedYear = year">{{ year }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="mb-3">
                  <div class="mb-3">
                    <p class="d-flex align-items-center mb-1">
                      <i class="ti ti-circle-filled fs-8 text-dark me-2"></i>
                      <span class="text-gray-9 fw-semibold me-1">1254</span> On Time
                    </p>
                  </div>
                  <div class="mb-3">
                    <p class="d-flex align-items-center mb-1">
                      <i class="ti ti-circle-filled fs-8 text-success me-2"></i>
                      <span class="text-gray-9 fw-semibold me-1">32</span> Late Attendance
                    </p>
                  </div>
                  <div class="mb-3">
                    <p class="d-flex align-items-center mb-1">
                      <i class="ti ti-circle-filled fs-8 text-primary me-2"></i>
                      <span class="text-gray-9 fw-semibold me-1">658</span> Work From Home
                    </p>
                  </div>
                  <div class="mb-3">
                    <p class="d-flex align-items-center mb-1">
                      <i class="ti ti-circle-filled fs-8 text-danger me-2"></i>
                      <span class="text-gray-9 fw-semibold me-1">14</span> Absent
                    </p>
                  </div>
                  <div>
                    <p class="d-flex align-items-center mb-0">
                      <i class="ti ti-circle-filled fs-8 text-warning me-2"></i>
                      <span class="text-gray-9 fw-semibold me-1">68</span> Sick Leave
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-md-6 text-center">
                <div class="d-flex justify-content-center align-items-center position-relative my-2">
                  <!-- SVG Donut Chart -->
                  <svg width="170" height="170" viewBox="0 0 42 42" class="donut">
                    <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                    <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e9edf4" stroke-width="5"></circle>

                    <!-- Segment 1: On Time (Dark - 60%) -->
                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#212529" stroke-width="5" stroke-dasharray="60 40" stroke-dashoffset="25"></circle>
                    <!-- Segment 2: Late Attendance (Success - 10%) -->
                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#198754" stroke-dasharray="10 90" stroke-dashoffset="65" stroke-width="5"></circle>
                    <!-- Segment 3: Work From Home (Primary - 15%) -->
                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0d6efd" stroke-dasharray="15 85" stroke-dashoffset="55" stroke-width="5"></circle>
                    <!-- Segment 4: Absent (Danger - 5%) -->
                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#dc3545" stroke-dasharray="5 95" stroke-dashoffset="40" stroke-width="5"></circle>
                    <!-- Segment 5: Sick Leave (Warning - 10%) -->
                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ffc107" stroke-dasharray="10 90" stroke-dashoffset="35" stroke-width="5"></circle>
                  </svg>
                  <div class="position-absolute text-center" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                    <h4 class="mb-0 fw-bold">94%</h4>
                    <span class="fs-11 text-muted">Attendance</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mt-3">
                <p class="d-flex align-items-center gap-2 mb-0">
                  <span class="badge bg-primary p-1 me-1"><i class="ti ti-check text-white fs-10 fw-bold"></i></span>
                  Better than <span class="text-dark fw-bold">85%</span> of Employees
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave Balance Details -->
      <div class="col-xxl-3 col-xl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
              <h5>Leave Summary</h5>
              <div class="dropdown">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>{{ selectedYear }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li v-for="year in [2026, 2025, 2024]" :key="year">
                    <a href="javascript:void(0);" class="dropdown-item rounded-1" @click="selectedYear = year">{{ year }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Total Leaves</span>
                <h4 class="fw-bold mb-0">16</h4>
              </div>
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Taken</span>
                <h4 class="fw-bold mb-0 text-primary">10</h4>
              </div>
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Absent</span>
                <h4 class="fw-bold mb-0 text-danger">2</h4>
              </div>
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Request</span>
                <h4 class="fw-bold mb-0 text-warning">0</h4>
              </div>
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Worked Days</span>
                <h4 class="fw-bold mb-0 text-success">240</h4>
              </div>
              <div class="col-6 mb-3">
                <span class="d-block mb-1 fs-12 text-muted">Loss of Pay</span>
                <h4 class="fw-bold mb-0 text-secondary">2</h4>
              </div>
              <div class="col-12 mt-2">
                <router-link to="/leaves" class="btn btn-dark w-100">
                  <i class="ti ti-circle-plus me-1"></i>Apply New Leave
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Grid Row 2: Punch & Hours -->
    <div class="row">
      <!-- Attendance Punch Clock -->
      <div class="col-xxl-4 d-flex">
        <div class="card flex-fill border-primary attendance-bg">
          <div class="card-body">
            <div class="mb-4 text-center">
              <h6 class="fw-medium text-muted mb-1">Current Attendance Status</h6>
              <h4 class="fw-bold mb-0">08:35 AM, 11 Mar 2025</h4>
            </div>
            <div class="text-center my-4">
              <div class="d-inline-flex flex-column align-items-center justify-content-center bg-white rounded-circle p-4 border border-3 border-success shadow-sm" style="width: 150px; height: 150px;">
                <span class="fs-12 d-block text-muted mb-1">Total Hours</span>
                <h3 class="fw-bold mb-0 text-dark">{{ punchedIn ? punchHours : '0:00:00' }}</h3>
              </div>
            </div>
            <div class="text-center">
              <div class="badge bg-dark badge-md mb-3 fs-13 p-2">Production : 3.45 hrs</div>
              <h6 class="fw-medium d-flex align-items-center justify-content-center mb-4 text-dark">
                <i class="ti ti-fingerprint text-primary me-1 fs-18"></i>
                {{ punchedIn ? 'Punched In at 10.00 AM' : 'Not Punched In' }}
              </h6>
              <button @click="togglePunch" :class="['btn w-100 py-2 fw-semibold', punchedIn ? 'btn-danger' : 'btn-primary']">
                {{ punchedIn ? 'Punch Out' : 'Punch In' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Hour Stat Cards & Timeline -->
      <div class="col-xxl-8 d-flex">
        <div class="row flex-fill">
          <div class="col-xl-3 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom mb-3 pb-2">
                  <span class="avatar avatar-sm bg-primary mb-2 rounded"><i class="ti ti-clock-stop text-white"></i></span>
                  <h2 class="mb-1 fw-bold">8.36 / <span class="fs-18 text-muted">9</span></h2>
                  <p class="fw-medium text-muted text-truncate mb-0">Total Hours Today</p>
                </div>
                <div>
                  <p class="d-flex align-items-center fs-13 mb-0 text-success fw-medium">
                    <span class="avatar avatar-xs rounded-circle bg-success-transparent flex-shrink-0 me-1">
                      <i class="ti ti-arrow-up fs-12"></i>
                    </span>
                    <span>5% This Week</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom mb-3 pb-2">
                  <span class="avatar avatar-sm bg-dark mb-2 rounded"><i class="ti ti-clock-up text-white"></i></span>
                  <h2 class="mb-1 fw-bold">10 / <span class="fs-18 text-muted">40</span></h2>
                  <p class="fw-medium text-muted text-truncate mb-0">Total Hours Week</p>
                </div>
                <div>
                  <p class="d-flex align-items-center fs-13 mb-0 text-success fw-medium">
                    <span class="avatar avatar-xs rounded-circle bg-success-transparent flex-shrink-0 me-1">
                      <i class="ti ti-arrow-up fs-12"></i>
                    </span>
                    <span>7% Last Week</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom mb-3 pb-2">
                  <span class="avatar avatar-sm bg-info mb-2 rounded"><i class="ti ti-calendar-up text-white"></i></span>
                  <h2 class="mb-1 fw-bold">75 / <span class="fs-18 text-muted">98</span></h2>
                  <p class="fw-medium text-muted text-truncate mb-0">Total Hours Month</p>
                </div>
                <div>
                  <p class="d-flex align-items-center fs-13 mb-0 text-danger fw-medium">
                    <span class="avatar avatar-xs rounded-circle bg-danger-transparent flex-shrink-0 me-1">
                      <i class="ti ti-arrow-down fs-12"></i>
                    </span>
                    <span>8% Last Month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <div class="border-bottom mb-3 pb-2">
                  <span class="avatar avatar-sm bg-warning mb-2 rounded"><i class="ti ti-calendar-star text-white"></i></span>
                  <h2 class="mb-1 fw-bold">16 / <span class="fs-18 text-muted">28</span></h2>
                  <p class="fw-medium text-muted text-truncate mb-0">Overtime this Month</p>
                </div>
                <div>
                  <p class="d-flex align-items-center fs-13 mb-0 text-danger fw-medium">
                    <span class="avatar avatar-xs rounded-circle bg-danger-transparent flex-shrink-0 me-1">
                      <i class="ti ti-arrow-down fs-12"></i>
                    </span>
                    <span>6% Last Month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Working Hours Progress Breakdown -->
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-xl-3 col-6">
                    <p class="d-flex align-items-center mb-1 text-muted fs-13"><i class="ti ti-point-filled text-dark me-1"></i>Total Working hours</p>
                    <h3 class="fw-bold mb-0">12h 36m</h3>
                  </div>
                  <div class="col-xl-3 col-6">
                    <p class="d-flex align-items-center mb-1 text-muted fs-13"><i class="ti ti-point-filled text-success me-1"></i>Productive Hours</p>
                    <h3 class="fw-bold mb-0 text-success">08h 36m</h3>
                  </div>
                  <div class="col-xl-3 col-6">
                    <p class="d-flex align-items-center mb-1 text-muted fs-13"><i class="ti ti-point-filled text-warning me-1"></i>Break hours</p>
                    <h3 class="fw-bold mb-0 text-warning">22m 15s</h3>
                  </div>
                  <div class="col-xl-3 col-6">
                    <p class="d-flex align-items-center mb-1 text-muted fs-13"><i class="ti ti-point-filled text-info me-1"></i>Overtime</p>
                    <h3 class="fw-bold mb-0 text-info">02h 15m</h3>
                  </div>
                </div>

                <div class="progress mb-2" style="height: 18px;">
                  <div class="progress-bar bg-success" role="progressbar" style="width: 45%;" title="Productive (8h 36m)"></div>
                  <div class="progress-bar bg-warning" role="progressbar" style="width: 15%;" title="Break (22m)"></div>
                  <div class="progress-bar bg-info" role="progressbar" style="width: 20%;" title="Overtime (2h 15m)"></div>
                  <div class="progress-bar bg-light text-dark" role="progressbar" style="width: 20%;" title="Remaining"></div>
                </div>
                <div class="d-flex align-items-center justify-content-between flex-wrap text-muted fs-11">
                  <span>08:00 AM</span>
                  <span>10:00 AM</span>
                  <span>12:00 PM</span>
                  <span>02:00 PM</span>
                  <span>04:00 PM</span>
                  <span>06:00 PM</span>
                  <span>08:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Grid Row 3: Projects & Tasks -->
    <div class="row">
      <!-- Projects Widget -->
      <div class="col-xxl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
            <h5 class="mb-0">My Ongoing Projects</h5>
            <span class="badge bg-soft-primary text-primary fs-12">2 Active</span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3 mb-md-0" v-for="proj in projects" :key="proj.id">
                <div class="card mb-0 border shadow-none">
                  <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                      <h6 class="fw-bold text-dark mb-0">{{ proj.title }}</h6>
                      <span class="badge badge-xs bg-light text-dark">{{ proj.category }}</span>
                    </div>
                    <div class="mb-3">
                      <div class="d-flex align-items-center mb-2">
                        <span class="avatar avatar-xs bg-primary-transparent rounded-circle me-2">
                          <i class="ti ti-user text-primary fs-12"></i>
                        </span>
                        <div>
                          <h6 class="fw-medium fs-13 mb-0">{{ proj.lead }}</h6>
                          <span class="fs-11 text-muted">Project Leader</span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center mb-2">
                        <span class="avatar avatar-xs bg-danger-transparent rounded-circle me-2">
                          <i class="ti ti-calendar text-danger fs-12"></i>
                        </span>
                        <div>
                          <h6 class="fw-medium fs-13 mb-0">{{ proj.deadline }}</h6>
                          <span class="fs-11 text-muted">Deadline</span>
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-between bg-light rounded p-2 mb-2">
                        <div class="d-flex align-items-center fs-12">
                          <i class="ti ti-checklist text-success me-1"></i>
                          <span>Tasks: <strong class="text-dark">{{ proj.completedTasks }}</strong>/{{ proj.totalTasks }}</span>
                        </div>
                        <span class="badge bg-primary text-white fs-11">{{ proj.progress }}%</span>
                      </div>
                      <div class="bg-soft-secondary p-2 rounded d-flex align-items-center justify-content-between">
                        <span class="text-muted fs-12">Time Spent</span>
                        <h6 class="text-dark mb-0 fs-13">{{ proj.timeSpent }} <span class="fs-11 text-muted">Hrs</span></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Tasks Widget -->
      <div class="col-xxl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-2">
            <h5 class="mb-0">Assigned Tasks</h5>
            <span class="badge bg-soft-success text-success fs-12">{{ completedTasksCount }}/{{ tasks.length }} Done</span>
          </div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <div v-for="task in tasks" :key="task.id" class="list-group-item border rounded p-2 mb-2">
                <div class="row align-items-center row-gap-2">
                  <div class="col-md-7 col-12">
                    <div class="d-flex align-items-center">
                      <i class="ti ti-grid-dots text-muted me-2"></i>
                      <div class="form-check me-2">
                        <input class="form-check-input" type="checkbox" v-model="task.completed">
                      </div>
                      <i class="ti ti-star me-2 text-warning cursor-pointer" :class="{ 'ti-star-filled': task.starred }"></i>
                      <span :class="['fs-14 fw-medium text-dark', { 'text-decoration-line-through text-muted': task.completed }]">
                        {{ task.title }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-5 col-12 text-md-end">
                    <span :class="['badge badge-xs me-2', getTaskBadgeClass(task.status)]">
                      <i class="ti ti-point-filled me-1"></i>{{ task.status }}
                    </span>
                    <span class="fs-12 text-muted"><i class="ti ti-clock me-1"></i>{{ task.dueDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showAlert = ref(true);
const selectedYear = ref(2026);
const punchedIn = ref(true);
const punchHours = ref('5:45:32');

const projects = ref([
  {
    id: 1,
    title: 'Office Management App',
    category: 'UI/UX Design',
    lead: 'Anthony Lewis',
    deadline: '14 Jan 2024',
    completedTasks: 6,
    totalTasks: 10,
    progress: 60,
    timeSpent: '65/120'
  },
  {
    id: 2,
    title: 'Hospitality CRM Portal',
    category: 'Web App',
    lead: 'Doglas Martini',
    deadline: '28 Feb 2024',
    completedTasks: 8,
    totalTasks: 12,
    progress: 75,
    timeSpent: '90/120'
  }
]);

const tasks = ref([
  { id: 1, title: 'Patient appointment booking UI', completed: false, starred: true, status: 'On Hold', dueDate: 'Today' },
  { id: 2, title: 'Appointment payment gateway integration', completed: false, starred: false, status: 'In Progress', dueDate: 'Tomorrow' },
  { id: 3, title: 'Patient and Doctor video conferencing', completed: true, starred: false, status: 'Completed', dueDate: 'Yesterday' },
  { id: 4, title: 'Private chat module security audit', completed: true, starred: false, status: 'Pending', dueDate: '20 Apr' },
  { id: 5, title: 'Go-Live and Post-Implementation Support', completed: false, starred: true, status: 'In Progress', dueDate: '25 Apr' }
]);

const completedTasksCount = computed(() => tasks.value.filter(t => t.completed).length);

function togglePunch() {
  punchedIn.value = !punchedIn.value;
}

function getTaskBadgeClass(status) {
  switch (status) {
    case 'Completed': return 'badge-success';
    case 'In Progress': return 'badge-primary';
    case 'On Hold': return 'badge-warning';
    default: return 'badge-secondary';
  }
}

function handleImgError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=Stephan+Peralt&background=0D8ABC&color=fff';
}

function exportReport(type) {
  alert(`Exporting Employee Dashboard report as ${type.toUpperCase()}...`);
}
</script>
