<template>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <!-- Sidebar Logo -->
    <div class="sidebar-logo">
      <router-link to="/" class="logo logo-normal">
        <img src="/assets/img/logo.svg" alt="Logo" />
      </router-link>
      <router-link to="/" class="logo-small">
        <img src="/assets/img/logo-small.svg" alt="Logo" />
      </router-link>
      <router-link to="/" class="dark-logo">
        <img src="/assets/img/logo-white.svg" alt="Logo" />
      </router-link>
    </div>

    <!-- Sidebar Menu -->
    <div class="sidebar-inner slimscroll">
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <!-- MAIN MENU -->
          <li class="menu-title"><span>MAIN MENU</span></li>
          <li>
            <ul>
              <li :class="{ submenu: true, active: activeMenu === 'dashboard' }">
                <a href="javascript:void(0);" @click="toggleMenu('dashboard')" :class="{ subdrop: openMenus.dashboard }">
                  <i class="ti ti-home"></i>
                  <span>Dashboards</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul v-show="openMenus.dashboard">
                  <li>
                    <router-link to="/" :class="{ active: currentRoute === '/' }">Admin Dashboard</router-link>
                  </li>
                  <li>
                    <router-link to="/employee-dashboard" :class="{ active: currentRoute === '/employee-dashboard' }">Employee ESS</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <!-- CORE HR MODULE -->
          <li class="menu-title"><span>CORE HR</span></li>
          <li>
            <ul>
              <li :class="{ submenu: true, active: activeMenu === 'employees' }">
                <a href="javascript:void(0);" @click="toggleMenu('employees')" :class="{ subdrop: openMenus.employees }">
                  <i class="ti ti-users"></i><span>Employees</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul v-show="openMenus.employees">
                  <li><router-link to="/employees" :class="{ active: currentRoute === '/employees' }">Directory</router-link></li>
                  <li><router-link to="/departments" :class="{ active: currentRoute === '/departments' }">Departments</router-link></li>
                  <li><router-link to="/designations" :class="{ active: currentRoute === '/designations' }">Designations</router-link></li>
                </ul>
              </li>
            </ul>
          </li>

          <!-- TIME & ATTENDANCE -->
          <li class="menu-title"><span>TIME & ATTENDANCE</span></li>
          <li>
            <ul>
              <li>
                <router-link to="/attendance" :class="{ active: currentRoute === '/attendance' }">
                  <i class="ti ti-file-time"></i><span>Attendance Logs</span>
                </router-link>
              </li>
              <li>
                <router-link to="/leaves" :class="{ active: currentRoute === '/leaves' }">
                  <i class="ti ti-calendar-off"></i><span>Leave Requests</span>
                </router-link>
              </li>
              <li>
                <router-link to="/holidays" :class="{ active: currentRoute === '/holidays' }">
                  <i class="ti ti-calendar-event"></i><span>Holidays</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- PAYROLL & COMPENSATION -->
          <li class="menu-title"><span>PAYROLL</span></li>
          <li>
            <ul>
              <li>
                <router-link to="/payroll" :class="{ active: currentRoute === '/payroll' }">
                  <i class="ti ti-currency-dollar"></i><span>Payroll Processing</span>
                </router-link>
              </li>
              <li>
                <router-link to="/payslips" :class="{ active: currentRoute === '/payslips' }">
                  <i class="ti ti-file-description"></i><span>Payslips</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- RECRUITMENT & TALENT -->
          <li class="menu-title"><span>RECRUITMENT</span></li>
          <li>
            <ul>
              <li>
                <router-link to="/jobs" :class="{ active: currentRoute === '/jobs' }">
                  <i class="ti ti-briefcase"></i><span>Job Openings</span>
                </router-link>
              </li>
              <li>
                <router-link to="/candidates" :class="{ active: currentRoute === '/candidates' }">
                  <i class="ti ti-user-plus"></i><span>Candidates</span>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- SAAS ADMIN & SETTINGS -->
          <li class="menu-title"><span>ADMINISTRATION</span></li>
          <li>
            <ul>
              <li>
                <router-link to="/settings" :class="{ active: currentRoute === '/settings' }">
                  <i class="ti ti-settings"></i><span>Company Settings</span>
                </router-link>
              </li>
              <li>
                <router-link to="/billing" :class="{ active: currentRoute === '/billing' }">
                  <i class="ti ti-credit-card"></i><span>Subscription & Billing</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.path);

const openMenus = ref({
  dashboard: true,
  employees: true
});

const activeMenu = computed(() => {
  if (['/', '/employee-dashboard'].includes(currentRoute.value)) return 'dashboard';
  if (['/employees', '/departments', '/designations'].includes(currentRoute.value)) return 'employees';
  return '';
});

function toggleMenu(menuKey) {
  openMenus.value[menuKey] = !openMenus.value[menuKey];
}
</script>
