<template>
  <div class="edit-day">
    <el-row type="flex" justify="center">
      <el-col :span="10" class="date">
        <i class="el-icon-arrow-left"></i>
        <span>Sun, 13.01</span>
        <i class="el-icon-arrow-right"></i>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <!-- DAY -->
      <app-day :day="day" ></app-day>
    </el-row>
        <el-form ref="form" :model="day.observation" label-width="80px" class="day-form">
          <div>
            <el-radio-group v-model="day.observation.mark">
              <el-radio :label="'red'" class="day-form__radio-mark">
                <div class="day-form__mark red"></div>
              </el-radio>
              <el-radio :label="'green'" class="day-form__radio-mark">
                <div class="day-form__mark green"></div>
              </el-radio>
              <el-radio :label="'white'" class="day-form__radio-mark">
                <div class="day-form__mark white"></div>
              </el-radio>
              <el-radio :label="'lightgreen'" class="day-form__radio-mark">
                <div class="day-form__mark lightgreen"></div>
              </el-radio>
            </el-radio-group>
          </div>
          <el-form-item label="Menstrual">
            <el-select v-model="day.observation.menstrual" placeholder="Please select an option">
              <el-option label="N/A" value="null"></el-option>
              <el-option label="H" value="H"></el-option>
              <el-option label="M" value="M"></el-option>
              <el-option label="L" value="L"></el-option>
              <el-option label="VL" value="VL"></el-option>
              <el-option label="B" value="B"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Indicator">
            <el-select v-model="day.observation.indicator" placeholder="Please select an option">
              <el-option label="N/A" value="null"></el-option>
              <el-option label="0" value="0"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="2W" value="2W"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="10" value="10"></el-option>
              <el-option label="10DL" value="10DL"></el-option>
              <el-option label="10SL" value="10SL"></el-option>
              <el-option label="10WL" value="10WL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Color">
            <el-select v-model="day.observation.color" placeholder="Please select an option">
              <el-option label="N/A" value="null"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="CK" value="CK"></el-option>
              <el-option label="K" value="K"></el-option>
              <el-option label="Y" value="Y"></el-option>
              <el-option label="G" value="G"></el-option>
              <el-option label="P" value="P"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Sensation">
            <el-radio-group v-model="day.observation.sensation">
              <el-radio :label="null">N/A</el-radio>
              <el-radio label="L"></el-radio>
              <el-radio label="G"></el-radio>
              <el-radio label="P"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Frequency">
            <el-select v-model="day.observation.frequency" placeholder="Please select an option">
                <el-option label="N/A" value="null"></el-option>
                <el-option label="X1" value="X1"></el-option>
                <el-option label="X2" value="X2"></el-option>
                <el-option label="X3" value="X3"></el-option>
                <el-option label="AD" value="AD"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Peak">
            <el-radio-group v-model="day.observation.peak">
              <el-radio :label="false">No</el-radio>
              <el-radio :label="true">Yes</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Day Count">
            <el-radio-group v-model="day.observation.dayCount">
              <el-radio label="0"></el-radio>
              <el-radio label="1"></el-radio>
              <el-radio label="2"></el-radio>
              <el-radio label="3"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Intercourse">
            <el-radio-group v-model="day.observation.intercourse">
              <el-radio :label="false">No</el-radio>
              <el-radio :label="true">Yes</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-input 
            type="textarea"
            :rows="2"
            placeholder="You can leave here a comment"
            v-model="day.observation.comment"
            ></el-input>
          <div class="observation__btn-group">
            <el-button type="primary" @click="editObservation" class="observation__btn-submit">Create</el-button>
          </div>
        </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import AppDay from '@/components/AppDay.vue';

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
      console.log(currentDay)
      this.$store.dispatch('editDay', currentDay)
    },
  },
  components: {
    AppDay
  },
  created() {
    const dayId = this.$route.params.id
    const currentDay = this.days.find(day => day.id == dayId)
    this.day = currentDay
    console.log(this.day)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';

  .red {
    background-color: $danger;
  }
 
  .green {
    background-color: $success;
  }

  .lightgreen {
    background-color: $lightgray;
  }
 
  .white {
    background-color: $extra-light-border;
  }
 
  .yellow {
    background-color: $warning;
  }

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.25rem 0;
    i {
      color: lightgray;
      padding: 0 5px;
      font-size: 1.25rem;
      &:hover, 
      &:active {
        color: unset;
      }
    }
  }

  .current-mark {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 70px;
    height: 140px;
    margin-right: 5px;
    margin-bottom: 5px;
    text-align: center;
    padding: 10px;
    border: 1px solid $lighter-border;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  }

  .day-form {
    &__mark {
      @extend .current-mark;
      width: 40px;
      height: 40px;
    }
  }

  .observation {
    &__btn-group {
      text-align: center;
    }

    &__btn-submit {
      margin-top: 1rem;
    }
  }
</style>