<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<script>
  export default {
    data() {
      return {
        progressBarLoadingState: false,
        searchContent: ""
      }
    },
  }
</script>

<template>
  <HeaderComponent :searchContent="searchContent" @SearchContentUpdate="(content) => searchContent = content"/>
  <RouterView :searchContent="searchContent" @OverrideSearchContent="(content) => searchContent = content" @ProgressBarStateUpdate="(state) => progressBarLoadingState = state"/>
  <div :class="['PageProgressBarClass', (progressBarLoadingState ? 'PageProgressBarClassLoadingAnimClass' : 'PageProgressBarClassLoadedAnimClass') ]">No connection</div>
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
  width: 6px;
  height: 6px;
}
*::-webkit-scrollbar-track {
  background: var(--main-background-color);
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(61, 68, 78);
  border-radius: 10px;
}
.PageProgressBarClass{
    position: fixed;
    top: 0;
    left: 0;
    width: 20%;
    height: 4px;
    border-radius: 0 2px 2px 0;
    opacity: 1;
    text-align: center;
    font-size: 0;
}
.PageProgressBarClassLoadingAnimClass{
    animation: 12s PageProgressBarClassLoadingAnim forwards ease-out;
}
.PageProgressBarClassLoadedAnimClass{
    animation: 1s PageProgressBarClassLoadedAnim forwards;
}
@keyframes PageProgressBarClassLoadingAnim{
    0% {
        width: 0%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
        height: 4px;
        font-size: 0;
        top: 0;
    }
    5%{
        width: 40%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
    }
    70%{
        width: 60%;
        background-color: rgb(59, 130, 197);
        opacity: 1;
    }
    75%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
    }
    80%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 0.2;
    }
    85%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
    }
    90%{
        width: 60%;
        background-color: rgb(197, 59, 59);
        opacity: 0.2;
    }
    95%{
        width: 100%;
        background-color: rgb(197, 59, 59);
        opacity: 1;
        height: 4px;
        font-size: 0;
        top: 0;
    }
    100%{
        width: 100%;
        top: var(--header-height);
        background-color: rgb(197, 59, 59);
        height: 24px;
        font-size: 16px;
    }
}
@keyframes PageProgressBarClassLoadedAnim{
    0% {
        opacity: 1;
        width: 30%;
        background-color: rgb(59, 197, 105);
        height: 4px;
        font-size: 0;
    }
    80%{
        width: 100%;
        opacity: 1;
    }
    100%{
        width: 100%;
        background-color: rgb(59, 197, 105);
        opacity: 0;
        height: 4px;
        font-size: 0;
    }
}
</style>
