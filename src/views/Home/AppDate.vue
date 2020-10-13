<template>
  <div class="date">
    <!-- <i class="el-icon-arrow-left"></i> -->
    <span>{{date | moment("ddd DD.MM.YYYY")}}</span>
    <!-- <i class="el-icon-arrow-right"></i> -->
  </div>
</template>

<script>
export default {
  props: {
    date: Date,
    edit: Boolean
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/_variables.scss';

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 0;
    
    i {
      color: lightgray;
      padding: 0 5px;
      font-size: 1.25rem;
      &:hover, 
      &:active {
        color: unset;
      }
    }

    @media screen and (min-width: 768px) {
      margin: 1rem 0 2rem;
    }
  }
</style>
