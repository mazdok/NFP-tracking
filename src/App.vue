<template>
    <el-container id="app">
      <el-header v-if="isUserAuthenticated">
        <app-header></app-header>
      </el-header>
      <app-sidebar></app-sidebar>
      
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</template>

<script>

import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'

export default {
  components: {
    AppHeader,
    AppSidebar
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  }
}

</script>

<style lang="scss">
  @import '@/assets/styles/variables.scss';

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    flex-direction: column;
  }
</style>
