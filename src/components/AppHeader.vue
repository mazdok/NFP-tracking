<template>
  <el-menu class="main-nav" mode="horizontal">
    <el-menu-item index="1">
      <router-link to="/cycles">
        <i class="el-icon-date"></i>
      </router-link>
    </el-menu-item>
    <div class="main-nav__brand">
      <router-link to="/">
        <img src="@/assets/img/logo.svg" class="main-nav__img" alt="">
      </router-link>
    </div>
    <el-menu-item index="3">
     <router-link to="/settings">
      <i class="el-icon-setting"></i></router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    
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
