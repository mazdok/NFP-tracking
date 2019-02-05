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
      // prevDayId: null,
      // nextDayId: null
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

      // test
      // navidation links
      // const daysIds = this.days.map((day) => day.id)
      // const currentDayIndex = daysIds.findIndex((curr, index) => {
      //   if(curr == dayId) {
      //     return index
      //   }
      // })
      // this.prevDayId = daysIds[currentDayIndex - 1]
      // this.nextDayId = daysIds[currentDayIndex + 1]
      // console.log(this.prevDayId)
      // console.log(this.nextDayId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>