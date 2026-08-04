import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || null);
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'));

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || 'Guest');
  const userName = computed(() => user.value?.name || 'Guest User');
  const userEmail = computed(() => user.value?.email || '');
  const userAvatar = computed(() => user.value?.avatar || '/assets/img/profiles/avatar-12.jpg');

  function login({ email, password, role = 'Admin' }) {
    // Simulated authentication response
    const mockUser = {
      id: Date.now(),
      name: role === 'Admin' ? 'Adrian Montero' : role === 'HR Manager' ? 'Sarah Connor' : 'Anthony Lewis',
      email: email || (role === 'Admin' ? 'adrian@smarthr.co.in' : role === 'HR Manager' ? 'sarah@smarthr.co.in' : 'anthony@smarthr.co.in'),
      role: role,
      avatar: role === 'Admin' ? '/assets/img/profiles/avatar-12.jpg' : role === 'HR Manager' ? '/assets/img/profiles/avatar-02.jpg' : '/assets/img/profiles/avatar-05.jpg'
    };

    const mockToken = `jwt-token-${Date.now()}`;

    token.value = mockToken;
    user.value = mockUser;

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));

    return mockUser;
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  return {
    token,
    user,
    isAuthenticated,
    userRole,
    userName,
    userEmail,
    userAvatar,
    login,
    logout
  };
});
