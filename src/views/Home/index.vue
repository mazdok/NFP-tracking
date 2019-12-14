<template>
  <div class="home">
    <el-alert v-if="getError" :title="getError.message" type="error"></el-alert>

    <h1 class="hidden-sm-and-down">Add Day</h1>
    
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <app-date :date="day.date"></app-date>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center"></el-row>
    
    <el-row>
      <!-- DAY FORM -->
      <day-form :day="day"></day-form>
    </el-row>
  </div>
</template>

<script>
import DayForm from "@/views/Home/DayForm.vue";
import AppDate from "@/views/Home/AppDate.vue";

export default {
  name: "home",
  components: {
    DayForm,
    AppDate
  },
  data() {
    return {
      day: {
        id: null,
        date: new Date(),
        observation: {
          mark: null,
          menstrual: null,
          indicator: null,
          color: null,
          sensation: null,
          frequency: "AD",
          peak: false,
          dayCount: 0,
          intercourse: false,
          comment: "",
          sex: false
        }
      }
    };
  },
  computed: {
    getError() {
      return this.$store.getters.getError;
    }
  }
};
</script>