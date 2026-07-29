<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Subscription & Billing</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Super Admin</li>
            <li class="breadcrumb-item active" aria-current="page">Subscription</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <!-- Summary Widgets -->
    <div class="row">
      <div class="col-xl-3 col-md-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-body">
            <span class="fs-14 text-muted d-block mb-1">Total Spent</span>
            <h4 class="fw-bold mb-1">$5,340</h4>
            <span class="text-success fs-12"><i class="ti ti-arrow-up-right"></i>+19.01% this month</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-body">
            <span class="fs-14 text-muted d-block mb-1">Current Plan</span>
            <h4 class="fw-bold text-primary mb-1">Advanced Plan</h4>
            <span class="text-muted fs-12">Renews on Nov 11, 2026</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-body">
            <span class="fs-14 text-muted d-block mb-1">Active Users</span>
            <h4 class="fw-bold mb-1">48 / 100 Seats</h4>
            <span class="text-info fs-12">52 seats available</span>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-md-6 d-flex mb-3">
        <div class="card flex-fill">
          <div class="card-body">
            <span class="fs-14 text-muted d-block mb-1">Billing Cycle</span>
            <h4 class="fw-bold text-success mb-1">Annual</h4>
            <span class="text-muted fs-12">20% discount active</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Available Plans -->
    <div class="card mb-4">
      <div class="card-header">
        <h5 class="mb-0">Choose SaaS Subscription Plan</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="plan in plans" :key="plan.name">
            <div :class="['card h-100 border', plan.isCurrent ? 'border-primary shadow-sm' : '']">
              <div class="card-body text-center p-4">
                <span v-if="plan.isCurrent" class="badge bg-primary mb-2">Active Plan</span>
                <h4 class="fw-bold mb-2">{{ plan.name }}</h4>
                <h2 class="text-primary fw-bold mb-3">${{ plan.price }}<span class="fs-14 text-muted font-normal">/mo</span></h2>
                <ul class="list-unstyled mb-4 text-start">
                  <li class="mb-2" v-for="feat in plan.features" :key="feat">
                    <i class="ti ti-check text-success me-2"></i>{{ feat }}
                  </li>
                </ul>
                <button :class="['btn w-100', plan.isCurrent ? 'btn-outline-primary disabled' : 'btn-primary']" @click="selectPlan(plan.name)">
                  {{ plan.isCurrent ? 'Current Subscription' : 'Upgrade Plan' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment History -->
    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="mb-0">Billing & Payment History</h5>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Invoice #</th>
                <th>Plan Name</th>
                <th>Billing Cycle</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th class="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inv in billingHistory" :key="inv.id">
                <td><span class="fw-medium text-primary">{{ inv.id }}</span></td>
                <td>{{ inv.plan }}</td>
                <td>{{ inv.cycle }}</td>
                <td>{{ inv.method }}</td>
                <td><span class="fw-bold">${{ inv.amount }}</span></td>
                <td>{{ inv.date }}</td>
                <td><span class="badge bg-success-transparent text-success"><i class="ti ti-point-filled me-1"></i>{{ inv.status }}</span></td>
                <td class="text-end">
                  <button class="btn btn-sm btn-light" @click="downloadInvoice(inv.id)"><i class="ti ti-download me-1"></i>PDF</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const plans = ref([
  { name: 'Basic', price: 99, isCurrent: false, features: ['Up to 25 Employees', 'Basic HR & Attendance', 'Email Support', 'Standard Reports'] },
  { name: 'Advanced', price: 200, isCurrent: true, features: ['Up to 100 Employees', 'Payroll & Payslip Generator', 'Recruitment & Job Board', '24/7 Priority Support'] },
  { name: 'Enterprise', price: 400, isCurrent: false, features: ['Unlimited Employees', 'Custom Workflows & Roles', 'Dedicated Account Manager', 'Custom API & Webhooks'] }
]);

const billingHistory = ref([
  { id: 'INV-2024-001', plan: 'Advanced (Monthly)', cycle: '30 Days', method: 'Credit Card (**** 4242)', amount: 200, date: '12 Sep 2024', status: 'Paid' },
  { id: 'INV-2024-002', plan: 'Advanced (Monthly)', cycle: '30 Days', method: 'Credit Card (**** 4242)', amount: 200, date: '12 Oct 2024', status: 'Paid' },
  { id: 'INV-2024-003', plan: 'Advanced (Monthly)', cycle: '30 Days', method: 'Credit Card (**** 4242)', amount: 200, date: '12 Nov 2024', status: 'Paid' }
]);

function selectPlan(planName) {
  alert(`Upgrading subscription plan to ${planName}...`);
}

function downloadInvoice(id) {
  alert(`Downloading Invoice ${id}...`);
}
</script>
