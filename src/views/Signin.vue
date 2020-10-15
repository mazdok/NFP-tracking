<template>
  <div class="signup">
    <page-header>Login</page-header>

    <el-row>
      <el-alert v-if="error" :title="error" show-icon type="error"> </el-alert>
      <el-form ref="form" class="auth-form">
        <h3 class="auth-form__heading">Login</h3>
        <el-form-item label="Email">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="button-wrapper">
          <el-button
            type="primary"
            @click="signIn"
            :disabled="processing || !formValid"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import PageHeader from "@/components/layout/PageHeader";
import { mapGetters } from "vuex";

export default {
  name: "signup",
  components: {
    PageHeader,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters({
      error: "getError",
      processing: "getProcessing",
      isUserAuthenticated: "isUserAuthenticated",
    }),
    formValid() {
      return this.email && this.password;
    },
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) this.$router.push("/");
    },
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("signIn", user);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>
