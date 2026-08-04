import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  // Auth Routes
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/LoginView.vue'),
        meta: { guestOnly: true }
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/auth/RegisterView.vue'),
        meta: { guestOnly: true }
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/auth/ForgotPasswordView.vue'),
        meta: { guestOnly: true }
      }
    ]
  },
  // Main Protected App Routes
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
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

      // User Profile & Account Settings
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/user/ProfileView.vue')
      },
      {
        path: 'account',
        name: 'AccountSettings',
        component: () => import('../views/user/AccountSettingsView.vue')
      },

      // Communication
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('../views/communication/ChatView.vue')
      },
      {
        path: 'email',
        name: 'Email',
        component: () => import('../views/communication/EmailView.vue')
      },

      // CRM Submodule
      {
        path: 'contacts',
        name: 'Contacts',
        component: () => import('../views/crm/ContactsView.vue')
      },
      {
        path: 'deals',
        name: 'Deals',
        component: () => import('../views/crm/DealsView.vue')
      },
      {
        path: 'pipeline',
        name: 'Pipeline',
        component: () => import('../views/crm/PipelineView.vue')
      },
      {
        path: 'companies',
        name: 'Companies',
        component: () => import('../views/crm/CompaniesView.vue')
      },
      {
        path: 'leads',
        name: 'Leads',
        component: () => import('../views/crm/LeadsView.vue')
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('../views/crm/ActivityView.vue')
      },

      // Employee Self-Service (ESS)
      {
        path: 'my-profile',
        name: 'MyProfile',
        component: () => import('../views/user/ProfileView.vue')
      },
      {
        path: 'my-attendance',
        name: 'MyAttendance',
        component: () => import('../views/ess/MyAttendanceView.vue')
      },
      {
        path: 'my-leaves',
        name: 'MyLeaves',
        component: () => import('../views/ess/MyLeavesView.vue')
      },
      {
        path: 'my-payslips',
        name: 'MyPayslips',
        component: () => import('../views/ess/MyPayslipsView.vue')
      },
      {
        path: 'my-tasks',
        name: 'MyTasks',
        component: () => import('../views/ess/MyTasksView.vue')
      },

      // Core HR (Employees, Departments, Designations, Onboarding, Offboarding)
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
      {
        path: 'onboarding',
        name: 'Onboarding',
        component: () => import('../views/hrm/OnboardingView.vue')
      },
      {
        path: 'offboarding',
        name: 'Offboarding',
        component: () => import('../views/hrm/OffboardingView.vue')
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
        path: 'roles-permissions',
        name: 'RolesPermissions',
        component: () => import('../views/settings/RolesPermissionsView.vue')
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
