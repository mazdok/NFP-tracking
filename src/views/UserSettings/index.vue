<template>
  <div>
    <h1 class="mb-4">User Settings</h1>

    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <h4 class="my-0">Observations</h4>
      </div>

      <div>
        <el-switch
          style="display: block"
          v-model="accountSettings.observations.cervix"
          inactive-text="Cervix observation"
        >
        </el-switch>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    accountSettings: {
      observations: {
        cervix: false,
      },
    },
  }),
  computed: mapState({
    account: (state) => state.accountModule.account,
  }),
  watch: {
    accountSettings: {
      handler(value) {
        const account = {
          ...this.account,
          ...this.accountSettings,
        };

        this.$store.dispatch("editAccount", account);
      },
      deep: true,
    },
  },
  async created() {
    const account = await this.$store.dispatch("bindAccounts");
    this.accountSettings = { ...this.accountSettings, ...this.account };
  },
};
</script>