<template>
  <div>
    <el-alert v-if="getError" :title="getError.message" type="error"></el-alert>

    <el-card shadow="never">
      <div slot="header">
        <el-row type="flex" justify="space-between" align="middle">
          <h3 class="my-0">Track</h3>
          <app-date></app-date>
        </el-row>
      </div>

      <el-row>
        <day-form></day-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import DayForm from "@/views/Home/DayForm.vue";
import AppDate from "@/views/Home/AppDate.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    DayForm,
    AppDate,
  },
  computed: {
    ...mapGetters(["getError"]),
  },
};
</script>