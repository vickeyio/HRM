<template>
  <div>
    <!-- Breadcrumb -->
    <div class="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
      <div class="my-auto mb-2">
        <h2 class="mb-1">Payslip</h2>
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/"><i class="ti ti-smart-home"></i></router-link>
            </li>
            <li class="breadcrumb-item">Payroll</li>
            <li class="breadcrumb-item active" aria-current="page">Payslip</li>
          </ol>
        </nav>
      </div>
      <div class="d-flex my-xl-auto right-content align-items-center flex-wrap">
        <div class="mb-2">
          <button class="btn btn-dark d-flex align-items-center" @click="downloadPDF">
            <i class="ti ti-download me-2"></i>Download PDF
          </button>
        </div>
      </div>
    </div>
    <!-- /Breadcrumb -->

    <div class="card">
      <div class="card-body">
        <div class="row justify-content-between align-items-center border-bottom pb-3 mb-3">
          <div class="col-md-6">
            <div class="mb-2">
              <img src="/assets/img/logo.svg" class="img-fluid mb-2" style="max-height: 40px;" alt="logo" @error="handleLogoError">
              <p class="text-muted mb-0">3099 Kennedy Court Framingham, MA 01702</p>
            </div>
          </div>
          <div class="col-md-6 text-md-end">
            <h5 class="text-gray mb-1">Payslip No <span class="text-primary">#PS4283</span></h5>
            <p class="fw-medium mb-0">Salary Month : <span class="text-dark">October 2024</span></p>
          </div>
        </div>

        <div class="row border-bottom pb-3 mb-4">
          <div class="col-md-6">
            <p class="text-dark mb-2 fw-semibold">From</p>
            <h5 class="mb-1">SmartHR SaaS Technologies</h5>
            <p class="mb-1 text-muted">2077 Chicago Avenue Orosi, CA 93647</p>
            <p class="mb-1 text-muted">Email: admin@smarthr.co.in</p>
            <p class="text-muted">Phone: +1 987 654 3210</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="text-dark mb-2 fw-semibold">To</p>
            <h5 class="mb-1">Anthony Lewis</h5>
            <p class="mb-1 text-muted">Web Designer (Emp ID: Emp-001)</p>
            <p class="mb-1 text-muted">Email: anthony@smarthr.co.in</p>
            <p class="text-muted">Phone: +1 458 268 4738</p>
          </div>
        </div>

        <h5 class="text-center mb-4">Payslip for the month of October 2024</h5>
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="list-group mb-3">
              <div class="list-group-item bg-light p-3">
                <h6 class="mb-0 fw-bold">Earnings</h6>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Basic Salary</span>
                <span class="fw-medium">$3,000</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>House Rent Allowance (H.R.A.)</span>
                <span class="fw-medium">$1,000</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Conveyance</span>
                <span class="fw-medium">$200</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Other Allowance</span>
                <span class="fw-medium">$100</span>
              </div>
              <div class="list-group-item bg-light-subtle d-flex justify-content-between fw-bold">
                <span>Total Earnings</span>
                <span class="text-success">$4,300</span>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="list-group mb-3">
              <div class="list-group-item bg-light p-3">
                <h6 class="mb-0 fw-bold">Deductions</h6>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Tax Deducted at Source (T.D.S.)</span>
                <span class="fw-medium">$200</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Provident Fund</span>
                <span class="fw-medium">$300</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>ESI</span>
                <span class="fw-medium">$150</span>
              </div>
              <div class="list-group-item d-flex justify-content-between">
                <span>Loan</span>
                <span class="fw-medium">$50</span>
              </div>
              <div class="list-group-item bg-light-subtle d-flex justify-content-between fw-bold">
                <span>Total Deductions</span>
                <span class="text-danger">$700</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 bg-light rounded text-center border">
          <h4 class="mb-0">Net Salary: <span class="text-primary fw-bold">$3,600</span> <span class="fs-14 text-muted ms-2">(Three thousand six hundred dollars only)</span></h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function downloadPDF() {
  window.print();
}

function handleLogoError(e) {
  e.target.src = 'https://ui-avatars.com/api/?name=SmartHR&background=0D8ABC&color=fff';
}
</script>
