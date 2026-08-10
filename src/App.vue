<template>
  <router-view />
  <GlobalAlertContainer />
</template>

<script setup>
import GlobalAlertContainer from './components/common/GlobalAlertContainer.vue';
</script>

<style>
/* Base overrides */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}
</style>
