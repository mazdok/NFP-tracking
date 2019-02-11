<template>
  <div class="edit-day" v-loading="!days.length">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <!-- DATE -->
        <app-date :date="day.date" :edit="true"></app-date>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
    </el-row>
    <!-- DAY FORM -->
    <day-form :day="day" :edit="true"></day-form>
  </div>
</template>

<script>
// @ is an alias to /src
import DayForm from '@/views/Home/DayForm.vue';
import AppDate from '@/views/Home/AppDate.vue';

export default {
  name: 'edit-day',
  components: {
    DayForm,
    AppDate
  },
  data() {
    return {
      day: {
        id: null,
        cycle_id: null,
        date: null,
        observation: {
          mark: null,
          menstrual: null,
          indicator: null,
          color: null,
          sensation: null,
          frequency: null,
          peak: false,
          dayCount: 0,
          intercourse: false,
          comment: '',
          sex: false
        }
      }
    }
  },
  computed: {
    days() {
      return this.$store.getters.days
    },
  },
  created() {
    if(this.days.length) {
      const dayId = this.$route.params.id
      const currentDay = this.days.find(day => day.id == dayId)
      this.day = currentDay
    }
  }
}
</script>

<style lang="scss" scoped>
</style>