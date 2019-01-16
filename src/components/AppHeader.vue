<template>
    <el-menu
        class="main-nav" 
        mode="horizontal" 
        >
        <el-menu-item index="1">
        <router-link to="/cycles">
            <i class="el-icon-date"></i>
        </router-link>
        </el-menu-item>
        <el-menu-item index="2">
        <router-link to="/">
            <img src="@/assets/logo.png" class="navbar-logo" alt="">
        </router-link>
        </el-menu-item>
        <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
  .navbar-logo {
    max-width: 40px;
    padding: 10px;
  }
</style>
