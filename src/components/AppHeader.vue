<template>
  <el-menu class="main-nav" mode="horizontal">
    <div 
      index="1" 
      class="menu-toggler" 
      @click="toggleMenu">
      <font-awesome-icon icon="bars" size="2x"></font-awesome-icon>
    </div>


    <el-menu-item index="2" class="hide-active-border">
      <div class="main-nav__brand">
        <router-link to="/">
          <img src="@/assets/img/logo.svg" class="main-nav__img" alt="">
        </router-link>
      </div>
    </el-menu-item>
    <!-- <el-menu-item index="3" class="hide-active-border"> -->
        <!-- <button @click="signOut">Out</button> -->
      <!-- <el-dropdown  trigger="click"> -->
        <!-- <span class="el-dropdown-link"> -->
          <!-- <i class="el-icon-more el-icon-more--vertical"></i> -->
        <!-- </span> -->
        <!-- <el-dropdown-menu slot="dropdown"> -->
          <!-- <el-dropdown-item >
           <router-link to="/settings">
             <el-button 
              icon="el-icon-setting" 
              type="text">Settings</el-button>
           </router-link>
          </el-dropdown-item> -->
          <!-- <el-dropdown-item >
            <el-button 
              @click.prevent="signOut"
              icon="el-icon-back" 
              type="text">Sign out</el-button>
          </el-dropdown-item> -->
        <!-- </el-dropdown-menu> -->
      <!-- </el-dropdown> -->
    <!-- </el-menu-item> -->
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      isSidebarOpen: state => state.generalModule.isSidebarOpen,
    }),
  },
  methods: {
    toggleMenu() {
      this.$store.commit('TOGGLE_SIDEBAR', !this.isSidebarOpen)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';

  .main-nav {
    &__brand {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__img {
      width: 40px;
    }

    &__menu-link {
      font-size: 12px;
    }

    .menu-toggler {
      position: absolute;
      display: flex;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      font-size: 12px;
      color: $regular-text;
    }
  }

  .el-icon-more--vertical {
    transform: rotate(90deg);
  }

  .hide-active-border {
    border-bottom: none !important;
  }
</style>
