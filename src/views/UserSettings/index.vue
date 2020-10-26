<template>
  <el-card shadow="never">
    <div slot="header">
      <h1 class="my-0">User Settings</h1>
    </div>

    <div>
      <el-row class="mb-5">
        <h4 class="mb-4 mt-0">Observations</h4>

        <div>
          <el-switch
            style="display: block"
            v-model="accountSettings.observations.cervix"
            inactive-text="Cervix observation"
          >
          </el-switch>
        </div>
      </el-row>

      <el-row class="mt-4">
        <h4 class="mb-4 mt-0">The number of displayed cycles</h4>

        <div>
          <el-input-number v-model="accountSettings.numOfCycles" :min="1">
          </el-input-number>
        </div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    accountSettings: {
      observations: {
        cervix: false,
      },
      numOfCycles: 3,
    },
  }),
  computed: mapState({
    account: (state) => state.accountModule.account,
  }),
  watch: {
    accountSettings: {
      handler() {
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
    this.accountSettings = { ...this.accountSettings, ...account };
  },
};
</script>