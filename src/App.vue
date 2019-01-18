<template>
    <el-container id="app">
      <el-header v-if="isUserAuthenticated">
        <app-header></app-header>
      </el-header>
      
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
</template>

<script>

import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  }
}

</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    flex-direction: column;
  }
</style>
