<template>
  <div>
    <!-- Page Breadcrumb & Header -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Admin Dashboard</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">
              Dashboard
            </li>
            <li class="breadcrumb-item active" aria-current="page">Admin Dashboard</li>
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
        <div class="mb-2">
          <div class="input-icon w-100 position-relative">
            <span class="input-icon-addon">
              <i class="ti ti-calendar text-gray-9"></i>
            </span>
            <input type="text" class="form-control yearpicker" value="2025">
          </div>
        </div>
        <div class="ms-2 mb-2 head-icons">
          <a href="javascript:void(0);" id="collapse-header" title="Collapse">
            <i class="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Welcome Wrap -->
    <div class="card border-0 mb-4">
      <div class="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
        <div class="d-flex align-items-center mb-3">
          <span class="avatar avatar-xl flex-shrink-0 me-3">
            <img src="/assets/img/profiles/avatar-31.jpg" class="rounded-circle" alt="img" @error="handleImgError">
          </span>
          <div>
            <h3 class="mb-2">Welcome Back, Adrian <a href="javascript:void(0);" class="edit-icon"><i class="ti ti-edit fs-14"></i></a></h3>
            <p class="mb-0">You have <span class="text-primary text-decoration-underline fw-bold">21</span> Pending Approvals & <span class="text-primary text-decoration-underline fw-bold">14</span> Leave Requests</p>
          </div>
        </div>
        <div class="d-flex align-items-center flex-wrap mb-1">
          <a href="javascript:void(0);" class="btn btn-white me-2 mb-2" @click="addSchedule"><i class="ti ti-calendar-cog me-1"></i>Add Schedule</a>
          <router-link to="/leaves" class="btn btn-primary mb-2"><i class="ti ti-square-rounded-plus me-1"></i>Add Requests</router-link>
        </div>
      </div>
    </div>
    <!-- /Welcome Wrap -->

    <!-- ROW 1: Widget Info & Employees by Dept -->
    <div class="row">
      <!-- 8 Widget Info Cards -->
      <div class="col-xxl-8 d-flex">
        <div class="row flex-fill">
          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-primary mb-2">
                  <i class="ti ti-calendar-share fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
                <h3 class="mb-3 fw-bold">120/154</h3>
                <router-link to="/attendance" class="link-default fs-13">View Details</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-secondary mb-2">
                  <i class="ti ti-browser fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Total No of Project's</h6>
                <h3 class="mb-3 fw-bold">90/125</h3>
                <a href="javascript:void(0);" class="link-default fs-13">View All</a>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-info mb-2">
                  <i class="ti ti-users-group fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Total No of Clients</h6>
                <h3 class="mb-3 fw-bold">69/86</h3>
                <a href="javascript:void(0);" class="link-default fs-13">View All</a>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-pink mb-2">
                  <i class="ti ti-checklist fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Total No of Tasks</h6>
                <h3 class="mb-3 fw-bold">96/100</h3>
                <a href="javascript:void(0);" class="link-default fs-13">View All</a>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-purple mb-2">
                  <i class="ti ti-moneybag fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Earnings</h6>
                <h3 class="mb-3 fw-bold">$21,445</h3>
                <router-link to="/payroll" class="link-default fs-13">View All</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-danger mb-2">
                  <i class="ti ti-browser fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Profit This Week</h6>
                <h3 class="mb-3 fw-bold">$5,544</h3>
                <a href="javascript:void(0);" class="link-default fs-13">View All</a>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-success mb-2">
                  <i class="ti ti-users-group fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">Job Applicants</h6>
                <h3 class="mb-3 fw-bold">98</h3>
                <router-link to="/candidates" class="link-default fs-13">View All</router-link>
              </div>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 d-flex mb-3">
            <div class="card flex-fill">
              <div class="card-body">
                <span class="avatar rounded-circle bg-dark mb-2">
                  <i class="ti ti-user-star fs-16 text-white"></i>
                </span>
                <h6 class="fs-13 fw-medium text-default mb-1">New Hire</h6>
                <h3 class="mb-3 fw-bold">45/48</h3>
                <router-link to="/employees" class="link-default fs-13">View All</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employees By Department -->
      <div class="col-xxl-4 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Employees By Department</h5>
            <div class="dropdown mb-2">
              <a href="javascript:void(0);" class="btn btn-white border btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-calendar me-1"></i>This Week
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Last Week</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div id="emp-department" ref="empDepartmentChartRef"></div>
            <p class="fs-13 mb-0 mt-2"><i class="ti ti-circle-filled me-2 fs-8 text-primary"></i>No of Employees increased by <span class="text-success fw-bold">+20%</span> from last Week</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 2: Employee Status, Attendance Overview, Clock-In/Out -->
    <div class="row">
      <!-- Employee Status -->
      <div class="col-xxl-4 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Employee Status</h5>
            <div class="dropdown mb-2">
              <a href="javascript:void(0);" class="btn btn-white border btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-calendar me-1 fs-14"></i>This Week
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <p class="fs-13 mb-3 text-muted">Total Employee</p>
              <h3 class="mb-3 fw-bold">154</h3>
            </div>
            <div class="progress-stacked emp-stack mb-3" style="height: 10px;">
              <div class="progress" style="width: 40%"><div class="progress-bar bg-warning"></div></div>
              <div class="progress" style="width: 20%"><div class="progress-bar bg-secondary"></div></div>
              <div class="progress" style="width: 10%"><div class="progress-bar bg-danger"></div></div>
              <div class="progress" style="width: 30%"><div class="progress-bar bg-pink"></div></div>
            </div>
            <div class="border mb-3 rounded">
              <div class="row gx-0">
                <div class="col-6">
                  <div class="p-2 flex-fill border-end border-bottom">
                    <p class="fs-13 mb-1"><i class="ti ti-square-rounded-filled text-primary fs-12 me-1"></i>Fulltime <span class="text-muted">(48%)</span></p>
                    <h3 class="fw-bold mb-0">112</h3>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 flex-fill border-bottom text-end">
                    <p class="fs-13 mb-1"><i class="ti ti-square-rounded-filled text-secondary fs-12 me-1"></i>Contract <span class="text-muted">(20%)</span></p>
                    <h3 class="fw-bold mb-0">112</h3>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 flex-fill border-end">
                    <p class="fs-13 mb-1"><i class="ti ti-square-rounded-filled text-danger fs-12 me-1"></i>Probation <span class="text-muted">(22%)</span></p>
                    <h3 class="fw-bold mb-0">12</h3>
                  </div>
                </div>
                <div class="col-6">
                  <div class="p-2 flex-fill text-end">
                    <p class="fs-13 mb-1"><i class="ti ti-square-rounded-filled text-pink fs-12 me-1"></i>WFH <span class="text-muted">(20%)</span></p>
                    <h3 class="fw-bold mb-0">04</h3>
                  </div>
                </div>
              </div>
            </div>
            <h6 class="mb-2 fw-semibold">Top Performer</h6>
            <div class="p-2 d-flex align-items-center justify-content-between border border-primary bg-primary-100 rounded mb-3">
              <div class="d-flex align-items-center overflow-hidden">
                <span class="me-2"><i class="ti ti-award-filled text-primary fs-24"></i></span>
                <span class="avatar avatar-md me-2">
                  <img src="/assets/img/profiles/avatar-24.jpg" class="rounded-circle border border-white" alt="img" @error="handleImgError">
                </span>
                <div>
                  <h6 class="text-truncate mb-0 fs-14 fw-medium">Daniel Esbella</h6>
                  <p class="fs-12 text-muted mb-0">IOS Developer</p>
                </div>
              </div>
              <div class="text-end">
                <p class="fs-12 text-muted mb-0">Performance</p>
                <h5 class="text-primary fw-bold mb-0">99%</h5>
              </div>
            </div>
            <router-link to="/employees" class="btn btn-light btn-md w-100">View All Employees</router-link>
          </div>
        </div>
      </div>

      <!-- Attendance Overview -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Attendance Overview</h5>
            <div class="dropdown mb-2">
              <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-calendar me-1 fs-14"></i>Today
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="chartjs-wrapper-demo position-relative mb-4" style="height: 200px;">
              <canvas id="attendance" ref="attendanceCanvasRef"></canvas>
              <div class="position-absolute text-center" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
                <p class="fs-13 mb-1 text-muted">Total Attendance</p>
                <h3 class="fw-bold mb-0">120</h3>
              </div>
            </div>
            <h6 class="mb-3 fw-semibold">Status</h6>
            <div class="d-flex align-items-center justify-content-between mb-2 fs-13">
              <span><i class="ti ti-circle-filled text-success me-1"></i>Present</span>
              <span class="fw-bold text-dark">59%</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2 fs-13">
              <span><i class="ti ti-circle-filled text-secondary me-1"></i>Late</span>
              <span class="fw-bold text-dark">21%</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-2 fs-13">
              <span><i class="ti ti-circle-filled text-warning me-1"></i>Permission</span>
              <span class="fw-bold text-dark">2%</span>
            </div>
            <div class="d-flex align-items-center justify-content-between mb-3 fs-13">
              <span><i class="ti ti-circle-filled text-danger me-1"></i>Absent</span>
              <span class="fw-bold text-dark">15%</span>
            </div>
            <div class="bg-light rounded p-2 d-flex align-items-center justify-content-between flex-wrap">
              <div class="d-flex align-items-center">
                <p class="mb-0 me-2 fs-13">Total Absenties</p>
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded"><img class="border border-white" src="/assets/img/profiles/avatar-27.jpg" alt="img" @error="handleImgError"></span>
                  <span class="avatar avatar-rounded"><img class="border border-white" src="/assets/img/profiles/avatar-30.jpg" alt="img" @error="handleImgError"></span>
                  <span class="avatar avatar-rounded"><img class="border border-white" src="/assets/img/profiles/avatar-14.jpg" alt="img" @error="handleImgError"></span>
                  <span class="avatar avatar-rounded"><img class="border border-white" src="/assets/img/profiles/avatar-29.jpg" alt="img" @error="handleImgError"></span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-10" href="javascript:void(0);">+1</a>
                </div>
              </div>
              <router-link to="/leaves" class="fs-13 text-primary text-decoration-underline">View Details</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Clock-In/Out -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h5 class="mb-0">Clock-In/Out</h5>
            <div class="d-flex align-items-center">
              <div class="dropdown me-2">
                <a href="javascript:void(0);" class="btn btn-white btn-md d-inline-flex align-items-center border-0 fs-13 dropdown-toggle" data-bs-toggle="dropdown">All Departments</a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Finance</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Development</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Marketing</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>Today
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed rounded">
                <div class="d-flex align-items-center">
                  <span class="avatar flex-shrink-0 me-2"><img src="/assets/img/profiles/avatar-24.jpg" class="rounded-circle border border-2" alt="img" @error="handleImgError"></span>
                  <div>
                    <h6 class="fs-14 fw-medium text-dark mb-0">Daniel Esbella</h6>
                    <p class="fs-13 text-muted mb-0">UI/UX Designer</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="link-default me-2"><i class="ti ti-clock-share"></i></a>
                  <span class="badge bg-success d-inline-flex align-items-center fs-10"><i class="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-3 p-2 border rounded">
                <div class="d-flex align-items-center">
                  <span class="avatar flex-shrink-0 me-2"><img src="/assets/img/profiles/avatar-23.jpg" class="rounded-circle border border-2" alt="img" @error="handleImgError"></span>
                  <div>
                    <h6 class="fs-14 fw-medium text-dark mb-0">Doglas Martini</h6>
                    <p class="fs-13 text-muted mb-0">Project Manager</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <a href="javascript:void(0);" class="link-default me-2"><i class="ti ti-clock-share"></i></a>
                  <span class="badge bg-success d-inline-flex align-items-center fs-10"><i class="ti ti-circle-filled fs-5 me-1"></i>09:36</span>
                </div>
              </div>

              <div class="mb-3 p-2 border rounded">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="avatar flex-shrink-0 me-2"><img src="/assets/img/profiles/avatar-27.jpg" class="rounded-circle border border-2" alt="img" @error="handleImgError"></span>
                    <div>
                      <h6 class="fs-14 fw-medium text-dark mb-0">Brian Villalobos</h6>
                      <p class="fs-13 text-muted mb-0">PHP Developer</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <a href="javascript:void(0);" class="link-default me-2"><i class="ti ti-clock-share"></i></a>
                    <span class="badge bg-success d-inline-flex align-items-center fs-10"><i class="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between flex-wrap mt-2 border rounded p-2 pb-0">
                  <div>
                    <p class="mb-1 d-inline-flex align-items-center fs-12"><i class="ti ti-circle-filled text-success fs-5 me-1"></i>Clock In</p>
                    <h6 class="fs-13 fw-normal mb-2">10:30 AM</h6>
                  </div>
                  <div>
                    <p class="mb-1 d-inline-flex align-items-center fs-12"><i class="ti ti-circle-filled text-danger fs-5 me-1"></i>Clock Out</p>
                    <h6 class="fs-13 fw-normal mb-2">09:45 AM</h6>
                  </div>
                  <div>
                    <p class="mb-1 d-inline-flex align-items-center fs-12"><i class="ti ti-circle-filled text-warning fs-5 me-1"></i>Production</p>
                    <h6 class="fs-13 fw-normal mb-2">09:21 Hrs</h6>
                  </div>
                </div>
              </div>
            </div>

            <h6 class="mb-2 fw-semibold">Late</h6>
            <div class="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed rounded">
              <div class="d-flex align-items-center">
                <span class="avatar flex-shrink-0 me-2"><img src="/assets/img/profiles/avatar-29.jpg" class="rounded-circle border border-2" alt="img" @error="handleImgError"></span>
                <div>
                  <h6 class="fs-14 fw-medium text-dark mb-0">
                    Anthony Lewis <span class="badge bg-danger ms-1 fs-10"><i class="ti ti-clock-hour-11 me-1"></i>30 Min</span>
                  </h6>
                  <p class="fs-13 text-muted mb-0">Marketing Head</p>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <a href="javascript:void(0);" class="link-default me-2"><i class="ti ti-clock-share"></i></a>
                <span class="badge bg-success d-inline-flex align-items-center fs-10"><i class="ti ti-circle-filled fs-5 me-1"></i>08:35</span>
              </div>
            </div>

            <router-link to="/attendance" class="btn btn-light btn-md w-100">View All Attendance</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 3: Job Applicants, Employees Table, Todo List -->
    <div class="row">
      <!-- Jobs Applicants -->
      <div class="col-xxl-4 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Jobs Applicants</h5>
            <router-link to="/jobs" class="btn btn-light btn-md mb-2">View All</router-link>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs tab-style-1 nav-justified d-sm-flex d-block p-0 mb-4" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link fw-medium" :class="{ active: activeJobTab === 'openings' }" @click="activeJobTab = 'openings'" href="javascript:void(0);">Openings</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link fw-medium" :class="{ active: activeJobTab === 'applicants' }" @click="activeJobTab = 'applicants'" href="javascript:void(0);">Applicants</a>
              </li>
            </ul>
            <div class="tab-content">
              <div v-if="activeJobTab === 'openings'" class="tab-pane fade show active">
                <div class="d-flex align-items-center justify-content-between mb-4" v-for="job in jobOpenings" :key="job.title">
                  <div class="d-flex align-items-center">
                    <span class="avatar overflow-hidden flex-shrink-0 bg-gray-100 p-1 me-2 rounded-circle">
                      <img :src="job.icon" class="img-fluid rounded-circle" alt="img" @error="handleImgError">
                    </span>
                    <div class="overflow-hidden">
                      <p class="text-dark fw-medium text-truncate mb-0 fs-14">{{ job.title }}</p>
                      <span class="fs-12 text-muted">No of Openings : {{ job.count }}</span>
                    </div>
                  </div>
                  <a href="javascript:void(0);" class="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i class="ti ti-edit"></i></a>
                </div>
              </div>

              <div v-if="activeJobTab === 'applicants'" class="tab-pane fade show active">
                <div class="d-flex align-items-center justify-content-between mb-4" v-for="app in jobApplicants" :key="app.name">
                  <div class="d-flex align-items-center">
                    <span class="avatar overflow-hidden flex-shrink-0 me-2">
                      <img :src="app.avatar" class="img-fluid rounded-circle" alt="img" @error="handleImgError">
                    </span>
                    <div class="overflow-hidden">
                      <p class="text-dark fw-medium text-truncate mb-0 fs-14">{{ app.name }}</p>
                      <span class="fs-13 d-inline-flex align-items-center text-muted">
                        Exp : {{ app.exp }} <i class="ti ti-circle-filled fs-4 mx-2 text-primary"></i>{{ app.location }}
                      </span>
                    </div>
                  </div>
                  <span :class="['badge badge-xs', app.badgeClass]">{{ app.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employees List -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Employees</h5>
            <router-link to="/employees" class="btn btn-light btn-md mb-2">View All</router-link>
          </div>
          <div class="card-body p-0 employee-table">
            <div class="table-responsive">
              <table class="table table-nowrap mb-0">
                <tbody>
                  <tr v-for="emp in topEmployees" :key="emp.name">
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="avatar me-2">
                          <img :src="emp.avatar" class="img-fluid rounded-circle" alt="img" @error="handleImgError">
                        </span>
                        <div>
                          <h6 class="fw-medium fs-14 mb-0"><a href="javascript:void(0);" class="text-dark">{{ emp.name }}</a></h6>
                          <span class="fs-12 text-muted">{{ emp.role }}</span>
                        </div>
                      </div>
                    </td>
                    <td class="text-end">
                      <span :class="['badge badge-xs', emp.badgeClass]">{{ emp.dept }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Todo Widget -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Todo</h5>
            <div class="d-flex align-items-center">
              <div class="dropdown mb-2 me-2">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>Today
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
                </ul>
              </div>
              <button class="btn btn-primary btn-icon btn-xs rounded-circle d-flex align-items-center justify-content-center p-0 mb-2" @click="addTodo"><i class="ti ti-plus fs-16"></i></button>
            </div>
          </div>
          <div class="card-body d-flex flex-column justify-content-between">
            <div v-for="item in todoList" :key="item.id" :class="['d-flex align-items-center todo-item border p-2 rounded mb-2', item.bg]">
              <i class="ti ti-grid-dots me-2 text-muted"></i>
              <div class="form-check me-2">
                <input class="form-check-input" type="checkbox" v-model="item.completed" :id="'todo' + item.id">
                <label :class="['form-check-label fw-medium', { 'text-decoration-line-through text-muted': item.completed }]" :for="'todo' + item.id">
                  {{ item.text }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 4: Sales Overview & Invoices -->
    <div class="row">
      <!-- Sales Overview -->
      <div class="col-xl-7 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Sales Overview</h5>
            <div class="d-flex align-items-center">
              <div class="dropdown mb-2 me-2">
                <a href="javascript:void(0);" class="btn btn-white btn-sm border-0 dropdown-toggle fs-13" data-bs-toggle="dropdown">All Departments</a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">UI/UX Designer</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">HR Manager</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Junior Tester</a></li>
                </ul>
              </div>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>Today
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body pb-0">
            <div class="d-flex align-items-center justify-content-between flex-wrap mb-1">
              <div class="d-flex align-items-center mb-1 fs-13">
                <span class="me-3"><i class="ti ti-square-rounded-filled me-1 text-primary"></i>Income</span>
                <span><i class="ti ti-square-rounded-filled me-1 text-gray-2"></i>Expenses</span>
              </div>
              <span class="fs-12 text-muted mb-1">Last Updated at 11:30PM</span>
            </div>
            <div id="sales-income" ref="salesIncomeChartRef"></div>
          </div>
        </div>
      </div>

      <!-- Invoices Card -->
      <div class="col-xl-5 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Invoices</h5>
            <div class="d-flex align-items-center">
              <div class="dropdown mb-2 me-2">
                <a href="javascript:void(0);" class="btn btn-white btn-sm border-0 dropdown-toggle fs-13" data-bs-toggle="dropdown">Invoices</a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Invoices</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Paid</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Unpaid</a></li>
                </ul>
              </div>
              <div class="dropdown mb-2">
                <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                  <i class="ti ti-calendar me-1 fs-14"></i>This Week
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                  <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-body pt-2">
            <div class="table-responsive">
              <table class="table table-nowrap table-borderless mb-0">
                <tbody>
                  <tr v-for="inv in invoices" :key="inv.id">
                    <td class="px-0">
                      <div class="d-flex align-items-center">
                        <span class="avatar me-2">
                          <img :src="inv.avatar" class="img-fluid rounded-circle" alt="img" @error="handleImgError">
                        </span>
                        <div>
                          <h6 class="fw-medium fs-14 mb-0"><a href="javascript:void(0);" class="text-dark">{{ inv.title }}</a></h6>
                          <span class="fs-12 text-muted">{{ inv.code }} <i class="ti ti-circle-filled fs-4 mx-1 text-primary"></i>{{ inv.client }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p class="fs-12 mb-0 text-muted">Payment</p>
                      <h6 class="fw-medium mb-0">${{ inv.amount }}</h6>
                    </td>
                    <td class="px-0 text-end">
                      <span :class="['badge badge-xs d-inline-flex align-items-center', inv.status === 'Paid' ? 'badge-success-transparent' : 'badge-danger-transparent']">
                        <i class="ti ti-circle-filled fs-5 me-1"></i>{{ inv.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <router-link to="/billing" class="btn btn-light btn-md w-100 mt-3">View All Invoices</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 5: Projects & Tasks Statistics -->
    <div class="row">
      <!-- Projects Table -->
      <div class="col-xxl-8 col-xl-7 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Projects</h5>
            <div class="dropdown mb-2">
              <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-calendar me-1 fs-14"></i>September
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-nowrap mb-0">
                <thead class="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Team</th>
                    <th>Hours</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="proj in projectsList" :key="proj.id">
                    <td><a href="javascript:void(0);" class="link-default fw-medium">{{ proj.code }}</a></td>
                    <td><h6 class="fw-medium mb-0 fs-14"><a href="javascript:void(0);" class="text-dark">{{ proj.name }}</a></h6></td>
                    <td>
                      <div class="avatar-list-stacked avatar-group-sm">
                        <span class="avatar avatar-rounded" v-for="img in proj.team" :key="img">
                          <img class="border border-white" :src="img" alt="img" @error="handleImgError">
                        </span>
                        <a v-if="proj.extraTeam" class="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">
                          +{{ proj.extraTeam }}
                        </a>
                      </div>
                    </td>
                    <td>
                      <p class="mb-1 fs-12">{{ proj.hours }}</p>
                      <div class="progress progress-xs w-100" style="height: 6px;">
                        <div class="progress-bar bg-primary" :style="{ width: proj.progress + '%' }"></div>
                      </div>
                    </td>
                    <td>
                      <span :class="['badge d-inline-flex align-items-center badge-xs', getPriorityBadge(proj.priority)]">
                        <i class="ti ti-point-filled me-1"></i>{{ proj.priority }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks Statistics -->
      <div class="col-xxl-4 col-xl-5 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Tasks Statistics</h5>
            <div class="dropdown mb-2">
              <a href="javascript:void(0);" class="border btn btn-white btn-md d-inline-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown">
                <i class="ti ti-calendar me-1 fs-14"></i>This Week
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Month</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">This Week</a></li>
                <li><a href="javascript:void(0);" class="dropdown-item rounded-1">Today</a></li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="chartjs-wrapper-demo position-relative mb-4" style="height: 190px;">
              <canvas id="mySemiDonutChart" ref="tasksSemiDonutRef"></canvas>
              <div class="position-absolute text-center attendance-canvas" style="top: 55%; left: 50%; transform: translate(-50%, -50%);">
                <p class="fs-13 mb-1 text-muted">Total Tasks</p>
                <h3 class="fw-bold mb-0">124/165</h3>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-between flex-wrap mb-3">
              <div class="border-end text-center flex-fill pe-2">
                <p class="fs-12 d-inline-flex align-items-center mb-1"><i class="ti ti-circle-filled fs-8 me-1 text-warning"></i>Ongoing</p>
                <h5 class="fw-bold mb-0">24%</h5>
              </div>
              <div class="border-end text-center flex-fill pe-2">
                <p class="fs-12 d-inline-flex align-items-center mb-1"><i class="ti ti-circle-filled fs-8 me-1 text-info"></i>On Hold</p>
                <h5 class="fw-bold mb-0">10%</h5>
              </div>
              <div class="border-end text-center flex-fill pe-2">
                <p class="fs-12 d-inline-flex align-items-center mb-1"><i class="ti ti-circle-filled fs-8 me-1 text-danger"></i>Overdue</p>
                <h5 class="fw-bold mb-0">16%</h5>
              </div>
              <div class="text-center flex-fill">
                <p class="fs-12 d-inline-flex align-items-center mb-1"><i class="ti ti-circle-filled fs-8 me-1 text-success"></i>Done</p>
                <h5 class="fw-bold mb-0">40%</h5>
              </div>
            </div>
            <div class="bg-dark rounded p-3 text-white d-flex align-items-center justify-content-between">
              <div>
                <h4 class="text-success fw-bold mb-0">389/689 hrs</h4>
                <p class="fs-12 text-white-50 mb-0">Spent on Overall Tasks This Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 6: Schedules, Recent Activities & Birthdays -->
    <div class="row">
      <!-- Schedules -->
      <div class="col-xxl-4 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Schedules</h5>
            <router-link to="/candidates" class="btn btn-light btn-md mb-2">View All</router-link>
          </div>
          <div class="card-body">
            <div class="bg-light p-3 rounded mb-3" v-for="sched in schedulesList" :key="sched.title">
              <span :class="['badge badge-xs mb-1', sched.badgeClass]">{{ sched.role }}</span>
              <h6 class="mb-2 text-truncate fw-medium fs-14">{{ sched.title }}</h6>
              <div class="d-flex align-items-center flex-wrap fs-12 text-muted mb-2">
                <p class="mb-1 me-3"><i class="ti ti-calendar-event me-1"></i>{{ sched.date }}</p>
                <p class="mb-1"><i class="ti ti-clock-hour-11 me-1"></i>{{ sched.time }}</p>
              </div>
              <div class="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
                <div class="avatar-list-stacked avatar-group-sm">
                  <span class="avatar avatar-rounded" v-for="usr in sched.avatars" :key="usr">
                    <img class="border border-white" :src="usr" alt="img" @error="handleImgError">
                  </span>
                  <a class="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">+3</a>
                </div>
                <button class="btn btn-white btn-sm" @click="joinMeeting">Join Meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Recent Activities</h5>
            <a href="javascript:void(0);" class="btn btn-light btn-md mb-2">View All</a>
          </div>
          <div class="card-body">
            <div class="recent-item mb-3 pb-2 border-bottom" v-for="act in activityStream" :key="act.name + act.time">
              <div class="d-flex align-items-center w-100">
                <span class="avatar me-2 flex-shrink-0">
                  <img :src="act.avatar" class="rounded-circle" alt="img" @error="handleImgError">
                </span>
                <div class="flex-fill">
                  <div class="d-flex align-items-center justify-content-between">
                    <h6 class="fs-14 fw-medium text-dark mb-0">{{ act.name }}</h6>
                    <span class="fs-12 text-muted">{{ act.time }}</span>
                  </div>
                  <p class="fs-13 text-muted mb-0">{{ act.desc }} <span v-if="act.highlight" class="text-primary fw-medium">{{ act.highlight }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Birthdays -->
      <div class="col-xxl-4 col-xl-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
            <h5 class="mb-2">Birthdays</h5>
            <a href="javascript:void(0);" class="btn btn-light btn-md mb-2">View All</a>
          </div>
          <div class="card-body">
            <div class="mb-3" v-for="bdayGroup in birthdayGroups" :key="bdayGroup.period">
              <h6 class="mb-2 text-muted fs-12 fw-semibold">{{ bdayGroup.period }}</h6>
              <div class="p-2 border border-dashed rounded mb-2" v-for="person in bdayGroup.list" :key="person.name">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="avatar me-2">
                      <img :src="person.avatar" class="rounded-circle" alt="img" @error="handleImgError">
                    </span>
                    <div>
                      <h6 class="fs-14 fw-medium text-dark mb-0">{{ person.name }}</h6>
                      <p class="fs-12 text-muted mb-0">{{ person.role }}</p>
                    </div>
                  </div>
                  <button class="btn btn-sm btn-white border-0 text-primary" @click="sendWish(person.name)"><i class="ti ti-cake me-1"></i>Send</button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ApexCharts from 'apexcharts';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const empDepartmentChartRef = ref(null);
const salesIncomeChartRef = ref(null);
const attendanceCanvasRef = ref(null);
const tasksSemiDonutRef = ref(null);

let empDepartmentChart = null;
let salesIncomeChart = null;
let attendanceChartInstance = null;
let tasksSemiDonutInstance = null;

const activeJobTab = ref('openings');

const jobOpenings = ref([
  { title: 'Senior IOS Developer', count: 25, icon: '/assets/img/icons/apple.svg' },
  { title: 'Junior PHP Developer', count: 20, icon: '/assets/img/icons/php.svg' },
  { title: 'Junior React Developer', count: 30, icon: '/assets/img/icons/react.svg' },
  { title: 'Senior Laravel Developer', count: 40, icon: '/assets/img/icons/laravel-icon.svg' }
]);

const jobApplicants = ref([
  { name: 'Brian Villalobos', exp: '5+ Years', location: 'USA', role: 'UI/UX Designer', badgeClass: 'badge-secondary', avatar: '/assets/img/users/user-09.jpg' },
  { name: 'Anthony Lewis', exp: '4+ Years', location: 'USA', role: 'Python Developer', badgeClass: 'badge-info', avatar: '/assets/img/users/user-32.jpg' },
  { name: 'Stephan Peralt', exp: '6+ Years', location: 'USA', role: 'Android Developer', badgeClass: 'badge-pink', avatar: '/assets/img/users/user-32.jpg' },
  { name: 'Doglas Martini', exp: '2+ Years', location: 'USA', role: 'React Developer', badgeClass: 'badge-purple', avatar: '/assets/img/users/user-34.jpg' }
]);

const topEmployees = ref([
  { name: 'Anthony Lewis', role: 'Finance', dept: 'Finance', badgeClass: 'badge-secondary-transparent', avatar: '/assets/img/users/user-32.jpg' },
  { name: 'Brian Villalobos', role: 'PHP Developer', dept: 'Development', badgeClass: 'badge-danger-transparent', avatar: '/assets/img/users/user-09.jpg' },
  { name: 'Stephan Peralt', role: 'Executive', dept: 'Marketing', badgeClass: 'badge-info-transparent', avatar: '/assets/img/users/user-01.jpg' },
  { name: 'Doglas Martini', role: 'Project Manager', dept: 'Manager', badgeClass: 'badge-purple-transparent', avatar: '/assets/img/users/user-34.jpg' },
  { name: 'Anthony Lewis', role: 'UI/UX Designer', dept: 'UI/UX Design', badgeClass: 'badge-pink-transparent', avatar: '/assets/img/users/user-37.jpg' }
]);

const todoList = ref([
  { id: 1, text: 'Add Holidays', completed: false, bg: 'bg-white' },
  { id: 2, text: 'Add Meeting to Client', completed: true, bg: 'bg-primary-transparent' },
  { id: 3, text: 'Chat with Adrian', completed: false, bg: 'bg-danger-transparent' },
  { id: 4, text: 'Management Call', completed: false, bg: 'bg-purple-transparent' },
  { id: 5, text: 'Add Payroll', completed: false, bg: 'bg-info-transparent' },
  { id: 6, text: 'Add Policy for Increment', completed: false, bg: 'bg-warning-transparent' }
]);

const invoices = ref([
  { id: 1, title: 'Redesign Website', code: '#INVOO2', client: 'Logistics', amount: '3560', status: 'Unpaid', avatar: '/assets/img/users/user-39.jpg' },
  { id: 2, title: 'Module Completion', code: '#INVOO5', client: 'Yip Corp', amount: '4175', status: 'Unpaid', avatar: '/assets/img/users/user-40.jpg' },
  { id: 3, title: 'Change on Emp Module', code: '#INVOO3', client: 'Ignis LLP', amount: '6985', status: 'Unpaid', avatar: '/assets/img/users/user-55.jpg' },
  { id: 4, title: 'Changes on the Board', code: '#INVOO2', client: 'Ignis LLP', amount: '1457', status: 'Unpaid', avatar: '/assets/img/users/user-42.jpg' },
  { id: 5, title: 'Hospital Management', code: '#INVOO6', client: 'HCL Corp', amount: '6458', status: 'Paid', avatar: '/assets/img/users/user-44.jpg' }
]);

const projectsList = ref([
  { id: 1, code: 'PRO-001', name: 'Office Management App', team: ['/assets/img/profiles/avatar-02.jpg', '/assets/img/profiles/avatar-03.jpg', '/assets/img/profiles/avatar-05.jpg'], hours: '15/255 Hrs', progress: 40, priority: 'High' },
  { id: 2, code: 'PRO-002', name: 'Clinic Management', team: ['/assets/img/profiles/avatar-06.jpg', '/assets/img/profiles/avatar-07.jpg', '/assets/img/profiles/avatar-08.jpg'], extraTeam: 1, hours: '15/255 Hrs', progress: 40, priority: 'Low' },
  { id: 3, code: 'PRO-003', name: 'Educational Platform', team: ['/assets/img/profiles/avatar-06.jpg', '/assets/img/profiles/avatar-08.jpg', '/assets/img/profiles/avatar-09.jpg'], hours: '40/255 Hrs', progress: 50, priority: 'Medium' },
  { id: 4, code: 'PRO-004', name: 'Chat & Call Mobile App', team: ['/assets/img/profiles/avatar-11.jpg', '/assets/img/profiles/avatar-12.jpg', '/assets/img/profiles/avatar-13.jpg'], hours: '35/155 Hrs', progress: 50, priority: 'High' },
  { id: 5, code: 'PRO-005', name: 'Travel Planning Website', team: ['/assets/img/profiles/avatar-17.jpg', '/assets/img/profiles/avatar-18.jpg', '/assets/img/profiles/avatar-19.jpg'], hours: '50/235 Hrs', progress: 50, priority: 'Medium' },
  { id: 6, code: 'PRO-006', name: 'Service Booking Software', team: ['/assets/img/profiles/avatar-06.jpg', '/assets/img/profiles/avatar-08.jpg', '/assets/img/profiles/avatar-09.jpg'], hours: '40/255 Hrs', progress: 50, priority: 'Low' }
]);

const schedulesList = ref([
  { title: 'Interview Candidates - UI/UX Designer', role: 'UI/ UX Designer', badgeClass: 'badge-secondary', date: 'Thu, 15 Feb 2025', time: '01:00 PM - 02:20 PM', avatars: ['/assets/img/users/user-49.jpg', '/assets/img/users/user-13.jpg', '/assets/img/users/user-11.jpg'] },
  { title: 'Interview Candidates - IOS Developer', role: 'IOS Developer', badgeClass: 'badge-dark', date: 'Thu, 15 Feb 2025', time: '02:00 PM - 04:20 PM', avatars: ['/assets/img/users/user-49.jpg', '/assets/img/users/user-13.jpg', '/assets/img/users/user-11.jpg'] }
]);

const activityStream = ref([
  { name: 'Matt Morgan', time: '05:30 PM', desc: 'Added New Project', highlight: 'HRMS Dashboard', avatar: '/assets/img/users/user-38.jpg' },
  { name: 'Jay Ze', time: '05:00 PM', desc: 'Commented on Uploaded Document', highlight: '', avatar: '/assets/img/users/user-01.jpg' },
  { name: 'Mary Donald', time: '05:30 PM', desc: 'Approved Task Projects', highlight: '', avatar: '/assets/img/users/user-19.jpg' },
  { name: 'George David', time: '06:00 PM', desc: 'Requesting Access to Module Tickets', highlight: '', avatar: '/assets/img/users/user-11.jpg' },
  { name: 'Aaron Zeen', time: '06:30 PM', desc: 'Downloaded App Reports', highlight: '', avatar: '/assets/img/users/user-20.jpg' },
  { name: 'Hendry Daniel', time: '05:30 PM', desc: 'Completed New Project', highlight: 'HMS', avatar: '/assets/img/users/user-08.jpg' }
]);

const birthdayGroups = ref([
  {
    period: 'Today',
    list: [{ name: 'Andrew Jermia', role: 'IOS Developer', avatar: '/assets/img/users/user-38.jpg' }]
  },
  {
    period: 'Tomorrow',
    list: [
      { name: 'Mary Zeen', role: 'UI/UX Designer', avatar: '/assets/img/users/user-10.jpg' },
      { name: 'Antony Lewis', role: 'Android Developer', avatar: '/assets/img/users/user-09.jpg' }
    ]
  },
  {
    period: '25 Jan 2025',
    list: [{ name: 'Doglas Martini', role: '.Net Developer', avatar: '/assets/img/users/user-12.jpg' }]
  }
]);

onMounted(() => {
  // 1. Employees By Department Chart (ApexCharts Bar)
  if (empDepartmentChartRef.value) {
    const sBar = {
      chart: {
        height: 220,
        type: 'bar',
        toolbar: { show: false }
      },
      colors: ['#FF6F28'],
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 5,
        padding: { top: -20, left: 0, right: 0, bottom: 0 }
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          horizontal: true,
          barHeight: '35%'
        }
      },
      dataLabels: { enabled: false },
      series: [{
        data: [80, 110, 80, 20, 60, 100],
        name: 'Employee'
      }],
      xaxis: {
        categories: ['UI/UX', 'Development', 'Management', 'HR', 'Testing', 'Marketing'],
        labels: {
          style: { colors: '#111827', fontSize: '13px' }
        }
      }
    };
    empDepartmentChart = new ApexCharts(empDepartmentChartRef.value, sBar);
    empDepartmentChart.render();
  }

  // 2. Sales Income Chart (ApexCharts Stacked Bar)
  if (salesIncomeChartRef.value) {
    const sColStacked = {
      chart: {
        height: 290,
        type: 'bar',
        stacked: true,
        toolbar: { show: false }
      },
      colors: ['#FF6F28', '#F8F9FA'],
      plotOptions: {
        bar: {
          columnWidth: '60%',
          borderRadius: 5,
          horizontal: false
        }
      },
      series: [
        { name: 'Income', data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80] },
        { name: 'Expenses', data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20] }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: { style: { colors: '#6B7280', fontSize: '13px' } }
      },
      yaxis: {
        labels: { style: { colors: '#6B7280', fontSize: '13px' } }
      },
      grid: { borderColor: '#E5E7EB', strokeDashArray: 5 },
      legend: { show: false },
      dataLabels: { enabled: false }
    };
    salesIncomeChart = new ApexCharts(salesIncomeChartRef.value, sColStacked);
    salesIncomeChart.render();
  }

  // 3. Attendance Overview Chart (Chart.js Doughnut)
  if (attendanceCanvasRef.value) {
    const ctx = attendanceCanvasRef.value.getContext('2d');
    attendanceChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Late', 'Present', 'Permission', 'Absent'],
        datasets: [{
          label: 'Attendance',
          data: [40, 20, 30, 10],
          backgroundColor: ['#0C4B5E', '#03C95A', '#FFC107', '#E70D0D'],
          borderWidth: 5,
          borderRadius: 10,
          borderColor: '#fff',
          cutout: '60%'
        }]
      },
      options: {
        rotation: -100,
        circumference: 200,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }

  // 4. Tasks Semi Donut Chart (Chart.js Doughnut)
  if (tasksSemiDonutRef.value) {
    const ctx = tasksSemiDonutRef.value.getContext('2d');
    tasksSemiDonutInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Ongoing', 'Onhold', 'Completed', 'Overdue'],
        datasets: [{
          label: 'Tasks Statistics',
          data: [20, 40, 20, 10],
          backgroundColor: ['#FFC107', '#1B84FF', '#44c4fa', '#0D7858'],
          borderWidth: 0,
          borderColor: 'transparent',
          cutout: '75%'
        }]
      },
      options: {
        rotation: -90,
        circumference: 185,
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
});

onBeforeUnmount(() => {
  if (empDepartmentChart) empDepartmentChart.destroy();
  if (salesIncomeChart) salesIncomeChart.destroy();
  if (attendanceChartInstance) attendanceChartInstance.destroy();
  if (tasksSemiDonutInstance) tasksSemiDonutInstance.destroy();
});

function getPriorityBadge(priority) {
  switch (priority) {
    case 'High': return 'badge-danger';
    case 'Medium': return 'badge-pink';
    case 'Low': return 'badge-success';
    default: return 'badge-secondary';
  }
}

function handleImgError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';
}

function exportReport(type) {
  alert(`Exporting Admin Dashboard as ${type.toUpperCase()}...`);
}

function addSchedule() {
  alert('Opening Schedule creation dialog...');
}

function addTodo() {
  alert('Opening Todo addition dialog...');
}

function joinMeeting() {
  alert('Joining video meeting...');
}

function sendWish(name) {
  alert(`Birthday wish sent to ${name}!`);
}
</script>
