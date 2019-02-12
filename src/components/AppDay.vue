<template>
  <div class="day" :class="[day.observation.mark]">
    <div class="day__header">
      <span class="day__number">{{dateIndex(day) || 1 }}</span>
      <span class="day__date">{{day.date | moment("ddd DD.MM")}}</span>
    </div>
    <img v-if="isDayHasImage(day)" src="@/assets/img/baby_img.svg" alt="" class="day__img">
    <div>
      <div class="day__observation">
        <span class="observation-desc" v-if="day.observation.menstrual || day.observation.menstrual != 'N/A'">{{day.observation.menstrual}}</span>
        <span class="observation-desc" v-if="day.observation.indicator">{{day.observation.indicator}}</span>
        <span class="observation-desc" v-if="day.observation.color">{{day.observation.color}}</span>
        <span class="observation-desc" v-if="day.observation.sensation">{{day.observation.sensation}}</span>
      </div>
      <span class="day__frequency" v-if="day.observation.frequency">{{day.observation.frequency}}</span>
    </div>
    <span class="day__peak" v-if="day.observation.peak">{{day.observation.dayCount != 0 ? day.observation.dayCount :
      'P'}}</span>
    <div class="day__indicators">
      <i v-if="day.observation.comment" 
        class="el-icon-document day__indicator"></i>
      <font-awesome-icon 
        v-if="day.observation.sex" 
        icon="heart" 
        :color="!day.observation.menstrual ? '#F56C6C' : '#606266'"
        class="day__indicator"></font-awesome-icon>
      <i v-if="day.observation.intercourse"
        class="el-icon-check"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppDay',
  props: {
    index: Number,
    day: Object
  },
  computed: {
    ...mapGetters({
      days: 'days',
      currentCycle: 'currentCycle'
    })
  },
  methods: {
    isDayHasImage(day) {
      return day.observation.mark === 'white' || day.observation.mark === 'lightgreen'
    },
    dateIndex(day) {
      if(this.index) return this.index
      
      const daysInCycle = (cycleId) => {
        return this.days.filter(day => day.cycle_id == cycleId)
      }
      //new day
      if(!day.id && this.currentCycle) return daysInCycle(this.currentCycle.id).length + 1
      
      //edit day
      const cycleOfDate = this.$route.query.cycle_id 
      return daysInCycle(cycleOfDate).map(day => day.id).indexOf(day.id) + 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';

.day {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 52px;
  height: 135px;
  text-align: center;
  padding: 10px 10px 20px 10px;
  border: 1px solid $lighter-border;
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);

  &--red {
    background-color: $danger;
    color: $white;
  }

  &--green {
    background-color: $success;
    color: $white;
  }

  &--lightgreen {
    background-color: $lightgray;
  }

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__date {
    font-size: .65rem;
    font-style: italic;
  }

  &__img {
    width: 50px;
    height: 50px;
    margin: 0px auto;
  }

  &__observation {
    font-size: .75rem;
  }

  &__frequency {
    font-size: .75rem;
  }

  &__peak {
    position: absolute;
    font-size: 4.5rem;
    top: 45%;
    transform: translate(0%, -50%);
    opacity: .6;
  }

  &__indicators {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 20px;
    padding-right: 5px;
  }

  &__indicator {
    padding: 2px;
    font-size: .75rem;
  }
}

.observation-desc {
  padding: 0 2px;
}

.day.squeezed {
  width: 50px;
  height: 52px;
  text-align: center;
  padding: 10px;

  .day__date {
    font-size: .65rem;
    font-style: italic;
  }

  .day__img {
    display: none;
  }

  .day__observation {
    display: none;
  }

  .day__frequency {
    display: none;
  }

  .day__peak {
    position: absolute;
    font-size: 1.25rem;
    bottom: 0px;
    top: unset;
    transform: unset;
  }

  .day__comment {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
}
</style>
