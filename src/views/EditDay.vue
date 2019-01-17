<template>
  <div class="edit-day">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <!-- DATE -->
        <app-date></app-date>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <!-- DAY -->
      <app-day :day="day" ></app-day>
    </el-row>
    <!-- DAY FORM -->
    <day-form :day="day" :edit="true"></day-form>

  </div>
</template>

<script>
// @ is an alias to /src
import AppDay from '@/components/AppDay.vue';
import DayForm from '@/components/DayForm.vue';
import AppDate from '@/components/AppDate.vue';

export default {
  name: 'edit-day',
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
          comment: ''
        }
      }
    }
  },
  computed: {
    days() {
      return this.$store.getters.days
    },
  },
  methods: {
    editObservation() {
      const dayObs = this.day.observation
      const currentDay = {
        id: this.day.id,
        cycle_id: this.day.cycle_id,
        date: this.day.date,
        observation: {
          mark: dayObs.mark,
          menstrual: dayObs.menstrual,
          indicator: dayObs.indicator,
          color: dayObs.color,
          sensation: dayObs.sensation,
          frequency: dayObs.frequency,
          peak: dayObs.peak,
          dayCount: dayObs.dayCount,
          intercourse: dayObs.intercourse,
          comment: dayObs.comment
        }
      }
      // console.log(currentDay)
      this.$store.dispatch('editDay', currentDay)
    },
  },
  components: {
    AppDay,
    DayForm,
    AppDate
  },
  created() {
    const dayId = this.$route.params.id
    const currentDay = this.days.find(day => day.id == dayId)
    this.day = currentDay
    // console.log(this.day)
  }
}
</script>

<style lang="scss" scoped>
</style>