<template>
  <div class="home">
    <el-alert
      v-if="getError"
      :title="getError.message"
      type="error">
    </el-alert>
    <h1 class="hidden-sm-and-down">Add Day</h1>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <!-- DATE -->
        <app-date></app-date>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
    </el-row>
    <el-row>
      <!-- DAY FORM -->
      <day-form :day="day"></day-form>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import DayForm from '@/components/DayForm.vue'
import AppDate from '@/components/AppDate.vue'

export default {
  name: 'home',
  data() {
    return {
      day: {
        id: null,
        date: null,
        observation: {
          mark: null,
          menstrual: null,
          indicator: null,
          color: null,
          sensation: null,
          frequency: 'AD',
          peak: false,
          dayCount: 0,
          intercourse: false,
          comment: '',
          sex: false
        }
      },
    }
  },
  computed: {
    getError() {
      return this.$store.getters.getError
    }
  },
  components: {
    DayForm,
    AppDate
  }
}
</script>

<style lang="scss" scoped>

</style>