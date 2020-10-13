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
      <el-form ref="form" class="auth-form">
        <h3 class="auth-form__heading">Sign up</h3>
        <el-form-item label="Name">
          <el-input v-model="name" placeholder="John Doe" required></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="email" type="email" placeholder="example@domain.com" required></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password" placeholder="At least 6 characters" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox label="I'm at least 16 years old" v-model="isAdult" required></el-checkbox>
        </el-form-item>
        <el-form-item class="button-wrapper">
          <el-button type="primary" @click="signUp" :disabled="processing || !formValid">Register</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  components: {
    PageHeader
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      isAdult: false
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      processing: 'getProcessing',
      isUserAuthenticated: 'isUserAuthenticated'
    }),
    formValid() {
      return this.name && this.email && this.password && this.isAdult
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
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('signUp', user)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

</style>
