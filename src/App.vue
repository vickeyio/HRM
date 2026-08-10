<template>
  <router-view />
  <GlobalAlertContainer />
  <GlobalModalProvider />
</template>

<script setup>
import GlobalAlertContainer from './components/common/GlobalAlertContainer.vue';
import GlobalModalProvider from './components/common/GlobalModalProvider.vue';
</script>

<style>
/* Base overrides */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}
</style>
