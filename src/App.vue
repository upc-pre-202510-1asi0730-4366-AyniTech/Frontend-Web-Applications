<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  color-scheme: light;
}

body {
  color: #212529;
  margin: 0;
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
  background-color: #FFF5E0;
}

#app {
  min-height: 100vh;
}

/* Estilos globales para tipografía consistente */
h1, h2, h3, h4, h5, h6, p, span, div, button, input, select, textarea, label {
  font-family: 'Arial', sans-serif;
}

/* Estilos para enlaces, botones, etc. para mantener consistencia */
a {
  text-decoration: none;
  color: inherit;
}

button {
  font-family: 'Arial', sans-serif;
}
</style>