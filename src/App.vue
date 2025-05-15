<script setup>
import { RouterView } from 'vue-router'
import Profile from './app/iam/components/profile';
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style scoped>
:root {
  color-scheme: light;
}

body {
  color: #212529;
  margin: 0;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  padding: 2rem 0 0 0;
  display: flex;
}
</style>