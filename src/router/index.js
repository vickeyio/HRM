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
        component: () => import('../views/dashboard/EmployeeDashboard.vue')
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
        component: () => import('../views/hrm/DepartmentsView.vue')
      },
      {
        path: 'designations',
        name: 'Designations',
        component: () => import('../views/hrm/DesignationsView.vue')
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
        component: () => import('../views/hrm/HolidaysView.vue')
      },

      // Payroll
      {
        path: 'payroll',
        name: 'Payroll',
        component: () => import('../views/payroll/PayrollView.vue')
      },
      {
        path: 'payslips',
        name: 'Payslips',
        component: () => import('../views/payroll/PayslipsView.vue')
      },

      // Recruitment
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('../views/recruitment/JobsView.vue')
      },
      {
        path: 'candidates',
        name: 'Candidates',
        component: () => import('../views/recruitment/CandidatesView.vue')
      },

      // Settings & SaaS Admin
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/settings/SettingsView.vue')
      },
      {
        path: 'billing',
        name: 'Billing',
        component: () => import('../views/billing/BillingView.vue')
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
