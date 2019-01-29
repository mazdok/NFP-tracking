<template>
  <div class="date">
    <!-- <i class="el-icon-arrow-left"></i> -->
    <span>{{today | moment("ddd MM.YYYY")}}</span>
    <!-- <i class="el-icon-arrow-right"></i> -->
  </div>
</template>

<script>
export default {
  computed: {
    today() {
      return new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/variables.scss';
  @import '@/assets/styles/general.scss';

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: .5rem;
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
</style>
