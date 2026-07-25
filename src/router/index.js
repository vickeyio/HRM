import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      // Dashboards
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/dashboard/AdminDashboard.vue')
      },
      {
        path: 'employee-dashboard',
        name: 'EmployeeDashboard',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Employee Self-Service Dashboard', icon: 'ti ti-user-check' }
      },

      // Core HR (Employees, Departments, Designations)
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('../views/hrm/EmployeesView.vue')
      },
      {
        path: 'departments',
        name: 'Departments',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Departments', icon: 'ti ti-building' }
      },
      {
        path: 'designations',
        name: 'Designations',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Designations', icon: 'ti ti-badge' }
      },

      // Attendance & Time Off
      {
        path: 'attendance',
        name: 'Attendance',
        component: () => import('../views/hrm/AttendanceView.vue')
      },
      {
        path: 'leaves',
        name: 'Leaves',
        component: () => import('../views/hrm/LeavesView.vue')
      },
      {
        path: 'holidays',
        name: 'Holidays',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Holiday Calendar', icon: 'ti ti-calendar-event' }
      },

      // Payroll
      {
        path: 'payroll',
        name: 'Payroll',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Payroll Processing', icon: 'ti ti-currency-dollar' }
      },
      {
        path: 'payslips',
        name: 'Payslips',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Employee Payslips', icon: 'ti ti-file-description' }
      },

      // Performance & Recruitment (Phase 2)
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Job Openings', icon: 'ti ti-briefcase' }
      },
      {
        path: 'candidates',
        name: 'Candidates',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Candidates & Applications', icon: 'ti ti-users' }
      },

      // Settings & SaaS Admin
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'Company Settings', icon: 'ti ti-settings' }
      },
      {
        path: 'billing',
        name: 'Billing',
        component: () => import('../views/common/PlaceholderView.vue'),
        props: { title: 'SaaS Subscription & Billing', icon: 'ti ti-credit-card' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
