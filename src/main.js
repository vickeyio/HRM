import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Global Styles from SmartHR Template
import './assets/css/bootstrap.min.css';
// Tabler Icons — local v3.35 copy (clean font paths, no query-string issues).
// Components use ti ti-* classes throughout (Sidebar, Header, etc.)
import './assets/plugins/tabler-icons/tabler-icons.min.css';
// Feather Icons
import './assets/plugins/icons/feather/feather.css';
// FontAwesome Free
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/style.css';

// Initialize mock API adapter when enabled (no backend required)
import { setupMock } from './services/mock';
import { config } from './config/env';
if (config.useMock) {
  setupMock();
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
