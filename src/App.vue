<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        progressBarLoadingState: false
      }
    },
  }
</script>

<template>
  <HeaderComponent :loading="this.progressBarLoadingState"/>
  <RouterView @ProgressBarStateUpdate="(state) => this.progressBarLoadingState = state"/>
</template>

<style>
:root{
  --header-height: 60px;
  --light-font-color: white;
  --dark-font-color: black;
  --film-mini-width: 28vh;
  --film-mini-height: 55vh;
  --film-mini-image-height: 38vh;
  --film-view-left-bar-width: 30vw;
  --page-nav-height: 40px;
}
body{
  background: rgb(24,24,24);
  background: linear-gradient(180deg, rgba(24,24,24,1) 0%, rgb(36, 43, 54)100%);
}
*{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
/* Custom scrollbar */
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
*::-webkit-scrollbar-track {
  background: var(--main-background-color);
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(61, 68, 78);
  border-radius: 10px;
}
</style>
