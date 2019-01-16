<template>
  <div class="cycles-page">
    <div class="cycles">
      <h1>Cycles</h1>
      <el-button 
        type="success" 
        icon="el-icon-plus" 
        circle 
        class="add-cycle-btn"
        @click="addCycle"></el-button>
      <h3 v-if="!cycles.length" class="cycle__empty">No cycles yet. Click the "plus" button to create one</h3>
      <div 
        class="cycle" 
        v-for="(cycle, index) in cycles" 
        :key="cycle.id">
        <!-- refactor it -->
      <span v-if="cycleDays(cycle.id).length" class="cycle__dates">{{cycleStartDate(cycle.id) |  moment("DD-MM-YYYY")}} - {{cycleEndDate(cycle.id) |  moment("DD-MM-YYYY")}}</span>
       <div class="cycle__info">
          <div>
            <el-button
            size="mini" 
            :type="cycle.current? 'success' : ''" 
            :icon="cycle.current? 'el-icon-check' : 'el-icon-plus'" 
            circle
            @click="setCurrentCycle(index)"></el-button>
            <span v-if="cycle.current" class="cycle__current">Current</span>
          </div>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-delete"
            circle
            @click="deleteCycle(cycle.id)"
            >
          </el-button>
       </div>
        <div class="days">
          <h3 v-if="!cycleDays(cycle.id).length" class="cycle__empty">The cycle has no days</h3>
          <div 
            v-for="(day, index) in days.filter(day => day.cycle_id === cycle.id)" 
            :key="day.id"
            class="day-wrapper">
            <router-link tag="div" :to="{ name: 'edit-day', params: { id: day.id }, query: {cycle_id: cycle.id}}">
              <!-- DAY -->
              <app-day :index="index + 1" :day="day"></app-day>
            </router-link>
          </div>
          <div v-if="cycle.current" class="add-day">
           <router-link to="/">
             <el-button
                size="mini" 
                type="success" 
                icon="el-icon-plus" 
                circle 
                class="add-day__btn"
                ></el-button>
           </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDay from '@/components/AppDay.vue';

export default {
  data() {
    return {
    }
  },
  computed: {
    cycles() {
      return this.$store.getters.cycles
    },
    days() {
      return this.$store.getters.days
    }
  },
  methods: {
    addCycle() {
      this.$store.dispatch('addCycle')
    },
    setCurrentCycle(index) {
      this.$store.dispatch('setCurrentCycle', index)
    },
    deleteCycle(id) {
      this.$store.dispatch('deleteCycle', id)
    },
    cycleDays(id) {
      return this.days.filter(day => day.cycle_id === id)
    },
    cycleStartDate(id) {
      return this.cycleDays(id)[0].date;
    },
    cycleEndDate(id) {
      return this.cycleDays(id).slice(-1)[0].date;
    }
  },
  components: {
    AppDay  
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';

  .cycle {
    // border: 1px dashed lightgray;
    &::after {
      display: block;
      content: '';
      background-color: $base-border;
      height: 2px;
      margin: 1rem 0;
    }

    &:last-child {
      &::after {
        content: none;
      }
    }

    &__info {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      margin-bottom: .5rem;
    }
    
    &__current {
      font-weight: bold;
      color: $success;
      margin-left: .5rem;
    }

    &__dates {
      display: inline-block;
      font-size: 0.75rem;
      font-style: italic;
      margin-bottom: 0.5rem;
    }

    &__empty {
      font-size: 1rem;
      color: $secondary-text;
      text-transform: uppercase;
    }
  }

  .add-cycle-btn {
    position: fixed;
    bottom: 5%;
    right: 50%;
    transform: translate(50%, 0);
  }

  .add-day {
    display: flex;
    align-items: center;
    &__btn {
      margin-left: 5px;
    }
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .day-wrapper {
    margin-right: 5px;
    margin-bottom: 5px;
    // &:last-child {
    //   margin-right: 0;
    // }
  }
</style>
