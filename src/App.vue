<template>
  <div id="app">
    <router-view />
    
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script lang="ts" setup>
import { api_getList } from "@/api/login";

// api_getList('22').then(res=>{
//   console.log(res);
  
// })
</script>
