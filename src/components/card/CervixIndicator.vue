<template>
  <div class="cervix">
    <div v-if="cervix.firmness" class="cervix__firmness mr-1">
      {{ cervix.firmness }}
    </div>
    <div
      v-if="cervix.opening && cervix.position"
      class="indicator"
      :class="[indicatorPosition, indicatorOpening]"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    cervix: Object,
  },
  computed: {
    indicatorPosition() {
      return `indicator--${this.cervix.position.toLowerCase()}`;
    },
    indicatorOpening() {
      const opening = {
        0: "closed",
        1: "partially-opened",
        2: "opened",
      };
      return `indicator--${opening[this.cervix.opening]}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

.cervix {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;

  &__firmness {
    align-self: center;
    font-size: 12px;
  }
}

.indicator {
  position: relative;
  border-radius: 50%;
  border: 1px solid $gray-900;
  z-index: 1;

  &--closed {
    width: 5px;
    height: 5px;
    background-color: $gray-900;
  }

  &--partially-opened {
    width: 10px;
    height: 10px;
    background: linear-gradient(-90deg, $gray-900 50%, #fff 50%);
  }

  &--opened {
    width: 10px;
    height: 10px;
  }

  &--l {
    align-self: flex-end;
  }

  &--m {
    align-self: center;
  }

  &--h {
    align-self: flex-start;
  }
}
</style>