<template>
  <div>
    <i class="el-icon-date text-gray mr-2"></i>
    <span class="text-gray--700">{{ formattedDate }}</span>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: () => {
        return new Date();
      },
    },
  },
  computed: {
    formattedDate() {
      return this.$moment(this.date).format("ddd DD.MM");
    },
  },
};
</script>