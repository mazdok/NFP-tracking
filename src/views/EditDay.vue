<template>
  <div v-loading="!day">
    <el-card v-if="day" shadow="never">
      <div slot="header">
        <el-row type="flex" justify="space-between" align="middle">
          <h3 class="my-0">Edit day</h3>
          <app-date :date="day.date"></app-date>
        </el-row>
      </div>

      <el-row>
        <day-form :dayData="day"></day-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import DayForm from "@/views/Home/DayForm.vue";
import AppDate from "@/views/Home/AppDate.vue";

export default {
  name: "edit-day",
  components: {
    DayForm,
    AppDate,
  },
  data() {
    return {
      day: null,
    };
  },
  async created() {
    const dayId = this.$route.params.id;
    this.day = await this.$store.dispatch("bindDay", dayId);
  },
};
</script>