<template>
  <el-menu class="main-nav" mode="horizontal">
    <el-menu-item index="1">
      <router-link to="/cycles">
        <i class="el-icon-date"></i>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <div class="main-nav__brand">
        <router-link to="/">
          <img src="@/assets/img/logo.svg" class="main-nav__img" alt="">
        </router-link>
      </div>
    </el-menu-item>
    <el-menu-item index="3">
     <!-- <router-link to="/settings"> -->
        <button @click="signOut">Out</button>
      <!-- <el-dropdown  trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.prevent="signOut">
            sign out
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- </router-link> -->
    </el-menu-item>
  </el-menu>
</template>

<script>
// import firebase from 'firebase'

export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-nav {
    &__brand {
      display: flex;
      align-items: center;
    }

    &__img {
      width: 40px;
    }
  }
</style>
