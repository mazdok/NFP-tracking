<template>
  <div class="signup">

    <page-header>Register</page-header>  

    <el-row>
      <el-alert
        v-if="error"
        :title="error"
        show-icon
        type="error">
      </el-alert>
      <el-form ref="form">
        <el-form-item label="Email">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="I'm at least 16 years old" v-model="isAdult"></el-checkbox>
        </el-form-item>
        <el-form-item class="button-wrapper">
          <el-button type="primary" @click="signUp" :disabled="processing || !isAdult">Register</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
  name: 'signup',
  data() {
    return {
      email: null,
      password: null,
      isAdult: false
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if(val === true)
        this.$router.push("/")
    }
  },
  methods: {
    signUp() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUp', user)
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="scss" scoped>
  .button-wrapper {
    display: flex;
    justify-content: center;
  }
</style>
