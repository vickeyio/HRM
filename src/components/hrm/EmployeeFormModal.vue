<template>
  <div v-if="isOpen" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.6); z-index: 1050;" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="d-flex align-items-center">
            <h4 class="modal-title me-2">{{ isEditMode ? 'Edit Employee Details' : 'Add New Employee' }}</h4>
            <span class="text-muted fs-13 ms-2">Employee ID : {{ formData.empId || 'EMP-0024' }}</span>
          </div>
          <button type="button" class="btn-close custom-btn-close" @click="closeModal" aria-label="Close">
            <i class="ti ti-x"></i>
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Contact Grids Nav Tabs -->
          <div class="contact-grids-tab border-bottom px-3 pt-2">
            <ul class="nav nav-underline" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  type="button"
                  :class="['nav-link', activeTab === 'basic' ? 'active' : '']"
                  @click="activeTab = 'basic'"
                >
                  Basic Information
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  type="button"
                  :class="['nav-link', activeTab === 'permissions' ? 'active' : '']"
                  @click="activeTab = 'permissions'"
                >
                  Permissions
                </button>
              </li>
            </ul>
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            <!-- Basic Information Tab Pane -->
            <div v-show="activeTab === 'basic'" class="tab-pane fade show active">
              <div class="modal-body pb-0">
                <div class="row">
                  <!-- Avatar Upload Dropzone -->
                  <div class="col-md-12">
                    <div class="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                      <div class="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                        <img v-if="formData.avatar" :src="formData.avatar" class="img-fluid rounded-circle" alt="avatar" />
                        <i v-else class="ti ti-photo text-gray-2 fs-16"></i>
                      </div>
                      <div class="profile-upload ms-2">
                        <div class="mb-2">
                          <h6 class="mb-1 fs-14 fw-semibold">Upload Profile Image</h6>
                          <p class="fs-12 text-muted mb-0">Image should be below 4 MB</p>
                        </div>
                        <div class="profile-uploader d-flex align-items-center mt-2">
                          <label class="drag-upload-btn btn btn-sm btn-primary me-2 mb-0" style="cursor: pointer;">
                            Upload
                            <input type="file" class="d-none" @change="handleAvatarUpload" accept="image/*" />
                          </label>
                          <button type="button" class="btn btn-light btn-sm" @click="formData.avatar = ''">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- First Name & Last Name -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">First Name <span class="text-danger">*</span></label>
                      <input type="text" v-model="formData.firstName" class="form-control" placeholder="John" required />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Name</label>
                      <input type="text" v-model="formData.lastName" class="form-control" placeholder="Doe" />
                    </div>
                  </div>

                  <!-- Employee ID & Joining Date -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Employee ID <span class="text-danger">*</span></label>
                      <input type="text" v-model="formData.empId" class="form-control" placeholder="EMP-001" required />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Joining Date <span class="text-danger">*</span></label>
                      <div class="input-icon-end position-relative">
                        <input type="date" v-model="formData.joiningDate" class="form-control" required />
                      </div>
                    </div>
                  </div>

                  <!-- Username & Email -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Username <span class="text-danger">*</span></label>
                      <input type="text" v-model="formData.username" class="form-control" placeholder="johndoe" required />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Email <span class="text-danger">*</span></label>
                      <input type="email" v-model="formData.email" class="form-control" placeholder="john@smarthr.co.in" required />
                    </div>
                  </div>

                  <!-- Phone Number & Company -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                      <input type="text" v-model="formData.phone" class="form-control" placeholder="(123) 4567 890" required />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Company <span class="text-danger">*</span></label>
                      <input type="text" v-model="formData.company" class="form-control" placeholder="SmartHR Technologies" />
                    </div>
                  </div>

                  <!-- Department & Designation -->
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Department</label>
                      <select v-model="formData.department" class="form-select">
                        <option value="Finance">Finance</option>
                        <option value="Development">Development</option>
                        <option value="Executive">Executive</option>
                        <option value="Designing">Designing</option>
                        <option value="Human Resources">Human Resources</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Designation / Role</label>
                      <input type="text" v-model="formData.role" class="form-control" placeholder="UI/UX Designer" />
                    </div>
                  </div>

                  <!-- About Textarea -->
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">About</label>
                      <textarea v-model="formData.about" class="form-control" rows="3" placeholder="Short employee bio..."></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Permissions Tab Pane -->
            <div v-show="activeTab === 'permissions'" class="tab-pane fade show active">
              <div class="modal-body">
                <div class="card bg-light shadow-none mb-3">
                  <div class="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                    <h6 class="mb-0 fw-semibold">Enable Options</h6>
                    <div class="d-flex align-items-center justify-content-end gap-3">
                      <div class="form-check form-switch me-2">
                        <label class="form-check-label mt-0">
                          <input class="form-check-input me-2" type="checkbox" role="switch" v-model="enableAllModules">
                          Enable all Module
                        </label>
                      </div>
                      <div class="form-check d-flex align-items-center">
                        <label class="form-check-label mt-0">
                          <input class="form-check-input me-1" type="checkbox" v-model="selectAllPermissions">
                          Select All
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="table-responsive border rounded">
                  <table class="table align-middle mb-0">
                    <thead class="thead-light">
                      <tr>
                        <th>Module</th>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Create</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="module in modules" :key="module">
                        <td>
                          <div class="form-check form-switch me-2">
                            <label class="form-check-label mt-0 fw-medium">
                              <input class="form-check-input me-2" type="checkbox" role="switch" checked>
                              {{ module }}
                            </label>
                          </div>
                        </td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="enableAllModules || selectAllPermissions">
                          </div>
                        </td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="enableAllModules || selectAllPermissions">
                          </div>
                        </td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="enableAllModules || selectAllPermissions">
                          </div>
                        </td>
                        <td>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" :checked="enableAllModules || selectAllPermissions">
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-light border me-2" @click="closeModal">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  employeeData: { type: Object, default: null }
});

const emit = defineEmits(['close', 'save']);

const activeTab = ref('basic');
const enableAllModules = ref(true);
const selectAllPermissions = ref(false);

const modules = ['Holidays', 'Leaves', 'Clients', 'Projects', 'Tasks', 'Chats', 'Assets', 'Timing Sheets'];

const isEditMode = computed(() => !!props.employeeData);

const formData = ref({
  firstName: '',
  lastName: '',
  name: '',
  empId: '',
  joiningDate: new Date().toISOString().split('T')[0],
  username: '',
  email: '',
  phone: '(123) 4567 890',
  company: 'SmartHR Technologies',
  department: 'Development',
  role: '',
  about: '',
  avatar: '',
  status: 'Active'
});

watch(
  () => props.employeeData,
  (newVal) => {
    activeTab.value = 'basic';
    if (newVal) {
      const parts = (newVal.name || '').split(' ');
      formData.value = {
        ...newVal,
        firstName: parts[0] || '',
        lastName: parts.slice(1).join(' ') || '',
        username: (parts[0] || '').toLowerCase(),
        phone: newVal.phone || '(123) 4567 890',
        company: newVal.company || 'SmartHR Technologies',
        about: newVal.about || ''
      };
    } else {
      formData.value = {
        firstName: '',
        lastName: '',
        name: '',
        empId: 'EMP-' + String(Math.floor(Math.random() * 900 + 100)),
        joiningDate: new Date().toISOString().split('T')[0],
        username: '',
        email: '',
        phone: '(123) 4567 890',
        company: 'SmartHR Technologies',
        department: 'Development',
        role: 'Software Developer',
        about: '',
        avatar: '/assets/img/profiles/avatar-02.jpg',
        status: 'Active'
      };
    }
  },
  { immediate: true }
);

function closeModal() {
  emit('close');
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    formData.value.avatar = URL.createObjectURL(file);
  }
}

function handleSubmit() {
  const fullName = `${formData.value.firstName} ${formData.value.lastName}`.trim();
  formData.value.name = fullName || formData.value.name;
  emit('save', { ...formData.value });
  closeModal();
}
</script>

