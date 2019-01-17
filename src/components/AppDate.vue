<template>
  <div class="date">
    <i class="el-icon-arrow-left"></i>
    <span>{{today | moment("DD.MM.YYYY")}}</span>
    <i class="el-icon-arrow-right"></i>
  </div>
</template>

<script>
export default {
  computed: {
    today() {
      return this.$moment(this.$moment(), "YYYY MM DD")
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
</style>
