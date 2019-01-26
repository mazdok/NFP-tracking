<template>
    <el-container id="app">
      <el-header v-if="isUserAuthenticated">
        <app-header></app-header>
      </el-header>
      <app-sidebar></app-sidebar>
      
      <el-main>
        <router-view/>
        <transition name="el-fade-in-linear">
          <div class="overlay" v-show="isSidebarOpen" @click="hideSidebar"></div>
        </transition>
      </el-main>
    </el-container>
</template>

<script>

import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'
import { mapState } from 'vuex'

export default {
  components: {
    AppHeader,
    AppSidebar
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.generalModule.isSidebarOpen,
    }),
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  },
  methods: {
    hideSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR', false)
    }
  }
}

</script>

<style lang="scss">
  @import '@/assets/styles/variables.scss';

  :focus {
    outline: none;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    flex-direction: column;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    transition: all .5s ease-in-out;
  }
</style>
