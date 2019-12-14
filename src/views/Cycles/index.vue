<template>
  <div class="cycles-page">
    <el-alert
      v-if="getError"
      :title="getError.message"
      type="error">
    </el-alert>

    <div class="add-cycles__wrapper">
      <h1 class="mr-2">Cycles</h1>
      <el-button 
        size="mini"
        type="success" 
        icon="el-icon-plus" 
        circle
        class="add-cycle__btn" 
        @click="addCycle"></el-button>
    </div>

    <div class="cycles" v-loading="getProcessing">
      <!-- <el-button 
        type="success" 
        icon="el-icon-plus" 
        circle 
        class="add-cycle-btn"
        @click="addCycle"></el-button> -->
        
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
import AppCycle from '@/views/Cycles/AppCycle.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppCycle  
  },
  computed: {
    ...mapGetters([
      'getProcessing',
      'cycles',
      'getError'
    ])
  },
  methods: {
    addCycle() {
      this.$store.dispatch('addCycle')
    },
  }
}
</script>

<style lang="scss" scoped>
  
  .cycle {
    margin-bottom: 2rem;
  }

  // .add-cycle-btn {
  //   position: fixed;
  //   bottom: 5%;
  //   right: 50%;
  //   transform: translate(50%, 0);
  //   z-index: 1;
  //   box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.5);
  // }

  .add-cycles__wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .add-cycle__btn {
    z-index: 1;
  }

  .mr-2 {
    margin-right: 1rem;
  }

</style>
