<template>
  <router-view />
  <GlobalModalProvider />
</template>

<script setup>
import GlobalModalProvider from './components/common/GlobalModalProvider.vue';
</script>

<style>
/* Base overrides */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa;
}
</style>
