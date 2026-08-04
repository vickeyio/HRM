<template>
  <div class="bg-white vh-100">
    <div class="main-wrapper">
      <div class="container-fluid p-0">
        <div class="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
          <div class="row g-0">
            <!-- Left Side Branding Overlay -->
            <div class="col-lg-5">
              <div class="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100 p-4">
                <!-- Background Decorative 3D Spheres & Shapes -->
                <div class="bg-overlay-shapes">
                  <div class="shape-sphere sphere-top-right"></div>
                  <div class="shape-sphere sphere-bottom-left"></div>
                  <div class="shape-spiral spiral-bottom-right"></div>
                </div>

                <!-- Authentication Card Container -->
                <div class="authentication-card w-100 position-relative" style="z-index: 2; max-width: 460px;">
                  <div class="authen-overlay-item border border-white-20 rounded-4 p-4 p-xl-4 text-center glassmorphism">
                    <h1 class="text-white fs-30 fw-bold mb-3 text-start" style="line-height: 1.3;">
                      Empowering people <br />
                      through seamless HR <br />
                      management.
                    </h1>

                    <div class="my-3 mx-auto authen-overlay-img text-center">
                      <img
                        src="/assets/img/bg/authentication-bg-01-removebg-preview.png"
                        alt="HR Team"
                        class="img-fluid"
                        style="max-height: 220px; object-fit: contain;"
                      />
                    </div>

                    <div>
                      <p class="text-white fs-15 fw-semibold text-center mb-0" style="line-height: 1.45; opacity: 0.95;">
                        Efficiently manage your workforce, streamline <br />
                        operations effortlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side Auth Form Content -->
            <div class="col-lg-7 col-md-12 col-sm-12">
              <div class="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap m-0">
                <div class="col-md-7 mx-auto vh-100">
                  <router-view />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.login-background {
  background: linear-gradient(145deg, #c74409 0%, #e65100 45%, #f57c00 85%, #d84315 100%);
  overflow: hidden;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
}

.bg-overlay-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.shape-sphere {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff8a65, #e65100);
  box-shadow: inset -8px -8px 16px rgba(0,0,0,0.25), 0 12px 24px rgba(0,0,0,0.15);
}

.sphere-top-right {
  width: 100px;
  height: 100px;
  top: 36%;
  right: 14%;
}

.sphere-bottom-left {
  width: 120px;
  height: 120px;
  bottom: -20px;
  left: 30px;
}

.spiral-bottom-right {
  position: absolute;
  bottom: -30px;
  right: -20px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, #fbc02d, #f57f17);
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.85;
}
</style>
