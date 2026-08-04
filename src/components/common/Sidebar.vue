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
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('dashboard')" :class="{ active: activeMenu === 'dashboard', subdrop: openMenus.dashboard }">
              <i class="ti ti-smart-home"></i>
              <span>Dashboards</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.dashboard ? 'block' : 'none' }">
              <li>
                <router-link to="/" :class="{ active: currentRoute === '/' }">Admin Dashboard</router-link>
              </li>
              <li>
                <router-link to="/employee-dashboard" :class="{ active: currentRoute === '/employee-dashboard' }">Employee ESS</router-link>
              </li>
            </ul>
          </li>

          <!-- EMPLOYEE SELF-SERVICE -->
          <li class="menu-title"><span>MY SELF-SERVICE</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('ess')" :class="{ active: activeMenu === 'ess', subdrop: openMenus.ess }">
              <i class="ti ti-user-check"></i><span>My Portal</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.ess ? 'block' : 'none' }">
              <li><router-link to="/profile" :class="{ active: currentRoute === '/profile' }">My Profile</router-link></li>
              <li><router-link to="/my-attendance" :class="{ active: currentRoute === '/my-attendance' }">My Attendance</router-link></li>
              <li><router-link to="/my-leaves" :class="{ active: currentRoute === '/my-leaves' }">My Leaves</router-link></li>
              <li><router-link to="/my-payslips" :class="{ active: currentRoute === '/my-payslips' }">My Payslips</router-link></li>
              <li><router-link to="/my-tasks" :class="{ active: currentRoute === '/my-tasks' }">My Tasks</router-link></li>
            </ul>
          </li>

          <!-- CORE HR -->
          <li class="menu-title"><span>CORE HR</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('employees')" :class="{ active: activeMenu === 'employees', subdrop: openMenus.employees }">
              <i class="ti ti-users"></i><span>Employees</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.employees ? 'block' : 'none' }">
              <li><router-link to="/employees" :class="{ active: currentRoute === '/employees' }">Directory</router-link></li>
              <li><router-link to="/departments" :class="{ active: currentRoute === '/departments' }">Departments</router-link></li>
              <li><router-link to="/designations" :class="{ active: currentRoute === '/designations' }">Designations</router-link></li>
              <li><router-link to="/onboarding" :class="{ active: currentRoute === '/onboarding' }">Onboarding</router-link></li>
              <li><router-link to="/offboarding" :class="{ active: currentRoute === '/offboarding' }">Offboarding</router-link></li>
            </ul>
          </li>

          <!-- TIME & ATTENDANCE -->
          <li class="menu-title"><span>TIME & ATTENDANCE</span></li>
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

          <!-- PAYROLL -->
          <li class="menu-title"><span>PAYROLL</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('payroll')" :class="{ active: activeMenu === 'payroll', subdrop: openMenus.payroll }">
              <i class="ti ti-currency-dollar"></i><span>Payroll</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.payroll ? 'block' : 'none' }">
              <li><router-link to="/payroll" :class="{ active: currentRoute === '/payroll' }">Employee Salary</router-link></li>
              <li><router-link to="/payslips" :class="{ active: currentRoute === '/payslips' }">Payslips</router-link></li>
            </ul>
          </li>

          <!-- RECRUITMENT -->
          <li class="menu-title"><span>RECRUITMENT</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('recruitment')" :class="{ active: activeMenu === 'recruitment', subdrop: openMenus.recruitment }">
              <i class="ti ti-briefcase"></i><span>Recruitment</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.recruitment ? 'block' : 'none' }">
              <li><router-link to="/jobs" :class="{ active: currentRoute === '/jobs' }">Jobs List</router-link></li>
              <li><router-link to="/candidates" :class="{ active: currentRoute === '/candidates' }">Candidates</router-link></li>
            </ul>
          </li>

          <!-- CRM -->
          <li class="menu-title"><span>CRM PIPELINE</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('crm')" :class="{ active: activeMenu === 'crm', subdrop: openMenus.crm }">
              <i class="ti ti-layout-grid"></i><span>CRM</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.crm ? 'block' : 'none' }">
              <li><router-link to="/contacts" :class="{ active: currentRoute === '/contacts' }">Contacts</router-link></li>
              <li><router-link to="/deals" :class="{ active: currentRoute === '/deals' }">Deals</router-link></li>
              <li><router-link to="/pipeline" :class="{ active: currentRoute === '/pipeline' }">Pipeline</router-link></li>
              <li><router-link to="/companies" :class="{ active: currentRoute === '/companies' }">Companies</router-link></li>
              <li><router-link to="/leads" :class="{ active: currentRoute === '/leads' }">Leads</router-link></li>
              <li><router-link to="/activity" :class="{ active: currentRoute === '/activity' }">Activities</router-link></li>
            </ul>
          </li>

          <!-- ADMINISTRATION -->
          <li class="menu-title"><span>ADMINISTRATION</span></li>
          <li class="submenu">
            <a href="javascript:void(0);" @click.prevent.stop="toggleMenu('administration')" :class="{ active: activeMenu === 'administration', subdrop: openMenus.administration }">
              <i class="ti ti-settings"></i><span>Settings & SaaS</span>
              <span class="menu-arrow"></span>
            </a>
            <ul :style="{ display: openMenus.administration ? 'block' : 'none' }">
              <li><router-link to="/settings" :class="{ active: currentRoute === '/settings' }">Company Settings</router-link></li>
              <li><router-link to="/roles-permissions" :class="{ active: currentRoute === '/roles-permissions' }">Roles & Permissions</router-link></li>
              <li><router-link to="/billing" :class="{ active: currentRoute === '/billing' }">Subscription & Billing</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.path);

const activeMenu = computed(() => {
  if (['/', '/employee-dashboard'].includes(currentRoute.value)) return 'dashboard';
  if (['/profile', '/my-attendance', '/my-leaves', '/my-payslips', '/my-tasks'].includes(currentRoute.value)) return 'ess';
  if (['/employees', '/departments', '/designations', '/onboarding', '/offboarding'].includes(currentRoute.value)) return 'employees';
  if (['/payroll', '/payslips'].includes(currentRoute.value)) return 'payroll';
  if (['/jobs', '/candidates'].includes(currentRoute.value)) return 'recruitment';
  if (['/contacts', '/deals', '/pipeline', '/companies', '/leads', '/activity'].includes(currentRoute.value)) return 'crm';
  if (['/settings', '/roles-permissions', '/billing', '/account'].includes(currentRoute.value)) return 'administration';
  return '';
});

const openMenus = ref({
  dashboard: false,
  ess: false,
  employees: false,
  payroll: false,
  recruitment: false,
  crm: false,
  administration: false
});

// Update open menus on route change or initial load
watch(currentRoute, (newPath) => {
  if (['/', '/employee-dashboard'].includes(newPath)) openMenus.value.dashboard = true;
  if (['/profile', '/my-attendance', '/my-leaves', '/my-payslips', '/my-tasks'].includes(newPath)) openMenus.value.ess = true;
  if (['/employees', '/departments', '/designations', '/onboarding', '/offboarding'].includes(newPath)) openMenus.value.employees = true;
  if (['/payroll', '/payslips'].includes(newPath)) openMenus.value.payroll = true;
  if (['/jobs', '/candidates'].includes(newPath)) openMenus.value.recruitment = true;
  if (['/contacts', '/deals', '/pipeline', '/companies', '/leads', '/activity'].includes(newPath)) openMenus.value.crm = true;
  if (['/settings', '/roles-permissions', '/billing', '/account'].includes(newPath)) openMenus.value.administration = true;
}, { immediate: true });

function toggleMenu(menuKey) {
  openMenus.value[menuKey] = !openMenus.value[menuKey];
}
</script>

<style scoped>
.sidebar-inner {
  height: calc(100vh - 60px);
  overflow-y: auto !important;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.sidebar-inner::-webkit-scrollbar {
  width: 5px;
}

.sidebar-inner::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-inner::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.18);
  border-radius: 4px;
}

.sidebar-inner::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.35);
}
</style>
