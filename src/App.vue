<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header/Header.vue'
import NavBar from './components/nav-bar/NavBar.vue'
</script>

<template>
  <div class="container">
    <!-- <Header class="header" /> -->

    <NavBar class="navbar" />

    <RouterView />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
