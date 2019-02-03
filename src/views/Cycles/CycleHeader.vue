<template>
  <div class="cycle__info" :class="{'active': cycle.current}">
    <div>
      <el-button size="mini" 
        :type="cycle.current? 'success' : ''" 
        :icon="cycle.current? 'el-icon-check' : 'el-icon-plus'"
        circle 
        @click="setCurrentCycle(cycle.id)"></el-button>
      <!-- <span v-if="cycle.current" class="cycle__current">Current</span> -->
    </div>
    <span v-if="daysInCycle.length" 
      class="cycle__dates">
      {{cycleStartDate | moment("DD-MM-YYYY")}} - {{cycleEndDate | moment("DD-MM-YYYY")}}</span>
    <el-dropdown size="small" trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-more el-icon--right el-icon--vertical"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-button size="mini" 
            type="text" 
            :icon="cycle.squeezed? 'el-icon-plus' : 'el-icon-minus'" 
            @click="resizeCycle(cycle.id)">
            {{cycle.squeezed? 'Expand days' : 'Minify days'}}
          </el-button>
        </el-dropdown-item>
        <el-dropdown-item v-if="!cycle.current">
          <el-button size="mini" 
            type="text" 
            icon="el-icon-check" 
            @click="setCurrentCycle(cycle.id)">
            {{'Set cycle as current'}}
          </el-button>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-button size="mini" 
            type="text" 
            icon="el-icon-delete" 
            @click="deleteCycle(cycle.id)">
            Delete row
          </el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
      cycle: Object,
      index: Number,
      daysInCycle: Array
    },
    computed: {
      days() {
        return this.$store.getters.days
      },
      cycleStartDate() {
        return this.daysInCycle[0].date;
      },
      cycleEndDate() {
        return this.daysInCycle.slice(-1)[0].date;
      }
    },
    methods: {
      ...mapActions({
        setCycleAsCurrent: 'setCurrentCycle',
        removeCycle: 'deleteCycle',
        resizeDaysInCycle: 'resizeCycle'
      }),
      setCurrentCycle(id) {
        this.setCycleAsCurrent(id)
      },
      deleteCycle(id) {
        this.$confirm('This will permanently delete the cycle and all days inside. Continue?', 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
          //remove cycle
          this.removeCycle(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      },
      resizeCycle(cycleId) {
        this.resizeDaysInCycle(cycleId)
      }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';

  .cycle {
    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 5px;
      font-size: 0.75rem;
      margin-bottom: 1rem;
      border-radius: 1rem;
      background: $gray-gradient;
      
      &.active {
        background: $green-gradient;
      }

      & div {
        z-index: 1;
      }
    }
  }
</style>
