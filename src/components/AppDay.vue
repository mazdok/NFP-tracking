<template>
  <div class="day" :class="[day.observation.mark]">
    <div class="day__header">
      <span class="day__number">{{dateIndex(day) || 1 }}</span>
      <span class="day__date">{{day.date | moment("Do MM")}}</span>
    </div>
    <img v-if="isDayHasImage(day)" src="@/assets/img/baby_img.svg" alt="" class="day__img">
    <div>
      <div class="day__observation">
        <span v-if="day.observation.menstrual">{{day.observation.menstrual}}</span>
        <span v-if="day.observation.indicator">{{day.observation.indicator}}</span>
        <span v-if="day.observation.color">{{day.observation.color}}</span>
        <span v-if="day.observation.sensation">{{day.observation.sensation}}</span>
        <span v-if="day.observation.intercourse">I</span>
      </div>
      <span class="day__frequency" v-if="day.observation.frequency">{{day.observation.frequency}}</span>
    </div>
    <span class="day__peak" v-if="day.observation.peak">{{day.observation.dayCount != 0 ? day.observation.dayCount :
      'P'}}</span>
    <i class="el-icon-document day__comment" v-if="day.observation.comment"></i>
  </div>
</template>

<script>
export default {
  name: 'AppDay',
  props: {
    index: Number,
    day: Object
  },
  computed: {
    days() {
      return this.$store.getters.days
    },
    currentCycle() {
      return this.$store.getters.currentCycle;
    },
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
    width: 60px;
    height: 140px;
    text-align: center;
    padding: 10px;
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
      font-size: .75rem;
      font-style: italic;
    }

    &__img {
      width: 50px;
      height: 50px;
      margin: 5px auto;
    }

    &__observation {
      font-size: .75rem;
    }

    &__frequency {
      font-size: .75rem;
    }

    &__peak {
      position: absolute;
      font-size: 5rem;
      top: 50%;
      transform: translate(0%, -50%);
      opacity: .6;
    }

    &__comment {
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }

  .day.squeezed {
    width: 50px;
    height: 52px;
    text-align: center;
    padding: 10px;

    .day__date {
      font-size: .75rem;
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
