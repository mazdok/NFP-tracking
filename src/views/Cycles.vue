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
        <!-- CYCLE -->
        <app-cycle :cycle="cycle" :index="index"></app-cycle>
      </div>
    </div>
  </div>
</template>

<script>
import AppCycle from '@/components/AppCycle.vue'

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
    daysInCycle(id) {
      return this.$store.getters.daysInCycle(id)
    }
  },
  components: {
    AppCycle  
  }
}
</script>

<style lang="scss" scoped>
  
  .cycle {
    margin-bottom: 2rem;
  }

  .add-cycle-btn {
    position: fixed;
    bottom: 5%;
    right: 50%;
    transform: translate(50%, 0);
    z-index: 1;
    box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.5);
  }

</style>
