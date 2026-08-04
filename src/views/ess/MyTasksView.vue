<template>
  <div>
    <!-- Page Header -->
    <PageHeader
      title="My Assigned Tasks"
      :breadcrumbs="['ESS', 'My Tasks']"
      add-label="Create Task"
      @add="isModalOpen = true"
    />

    <div class="card border-0 shadow-sm rounded-3">
      <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between">
        <h5 class="fw-bold mb-0">Tasks Checklist</h5>
        <div class="btn-group btn-group-sm">
          <button :class="['btn', filter === 'All' ? 'btn-primary' : 'btn-outline-secondary']" @click="filter = 'All'">All</button>
          <button :class="['btn', filter === 'Pending' ? 'btn-primary' : 'btn-outline-secondary']" @click="filter = 'Pending'">Pending</button>
          <button :class="['btn', filter === 'Completed' ? 'btn-primary' : 'btn-outline-secondary']" @click="filter = 'Completed'">Completed</button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="list-group list-group-flush">
          <div v-for="task in filteredTasks" :key="task.id" class="list-group-item p-3 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-3">
              <input class="form-check-input mt-0" type="checkbox" :checked="task.completed" @change="toggleTask(task)" />
              <div>
                <h6 :class="['mb-0 fw-semibold', { 'text-decoration-line-through text-muted': task.completed, 'text-dark': !task.completed }]">
                  {{ task.title }}
                </h6>
                <small class="text-muted">Due: {{ task.dueDate }} &bull; Project: {{ task.project }}</small>
              </div>
            </div>
            <span :class="['badge', task.priority === 'High' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info']">
              {{ task.priority }} Priority
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Task Modal -->
    <BaseModal
      v-model="isModalOpen"
      title="Create New Task"
      save-label="Add Task"
      @save="addTask"
    >
      <div class="mb-3">
        <label class="form-label fw-semibold">Task Title</label>
        <input type="text" v-model="newTaskTitle" class="form-control" placeholder="e.g. Review Q3 Payroll" required />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Due Date</label>
        <input type="date" v-model="newTaskDate" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Priority</label>
        <select v-model="newTaskPriority" class="form-select">
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import PageHeader from '../../components/common/PageHeader.vue';
import BaseModal from '../../components/common/BaseModal.vue';

const filter = ref('All');
const isModalOpen = ref(false);
const newTaskTitle = ref('');
const newTaskDate = ref('');
const newTaskPriority = ref('Medium');

const tasks = ref([
  { id: 1, title: 'Finalize Q3 Performance Review Forms', project: 'HR Operations', dueDate: '10 Aug 2026', priority: 'High', completed: false },
  { id: 2, title: 'Submit July Payroll Expenditure Report', project: 'Finance', dueDate: '05 Aug 2026', priority: 'High', completed: true },
  { id: 3, title: 'Schedule Candidate Interviews for Vue Engineer', project: 'Recruitment', dueDate: '12 Aug 2026', priority: 'Medium', completed: false }
]);

const filteredTasks = computed(() => {
  if (filter.value === 'Pending') return tasks.value.filter(t => !t.completed);
  if (filter.value === 'Completed') return tasks.value.filter(t => t.completed);
  return tasks.value;
});

function toggleTask(task) {
  task.completed = !task.completed;
}

function addTask() {
  if (!newTaskTitle.value.trim()) return;
  tasks.value.unshift({
    id: Date.now(),
    title: newTaskTitle.value,
    project: 'Personal Task',
    dueDate: newTaskDate.value || '15 Aug 2026',
    priority: newTaskPriority.value,
    completed: false
  });
  newTaskTitle.value = '';
  isModalOpen.value = false;
}
</script>
