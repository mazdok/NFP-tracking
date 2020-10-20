<template>
  <div class="day shadow" :class="[markClass, { squeezed: isSqueezed }]">
    <!-- Background img -->
    <div v-if="isDayHasImage(day)" class="day__img fill-current">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M344.991 99.176a21.519 21.519 0 00-6.344-15.315c-8.443-8.442-22.183-8.444-30.629 0a7.499 7.499 0 1010.605 10.606c2.596-2.598 6.82-2.597 9.417-.001a6.62 6.62 0 011.951 4.71c0 1.778-.693 3.45-1.951 4.708a7.498 7.498 0 000 10.605 7.476 7.476 0 005.304 2.197 7.477 7.477 0 005.303-2.196 21.519 21.519 0 006.344-15.314z"
        />
        <path
          d="M499.549 211.905c7.241-17.967 11.147-37.244 11.366-57.052.431-38.973-13.418-75.605-39.145-103.979a66.338 66.338 0 0127.046-15.514 7.498 7.498 0 005.11-9.293 7.498 7.498 0 00-9.293-5.11 81.358 81.358 0 00-33.469 19.313C416.819.08 353.957-9.072 300.173 12.512 289.935 4.404 277.351 0 264.169 0c-.293 0-.587.002-.879.006-15.189.226-29.472 6.267-40.215 17.011-18.263 18.263-22.033 45.629-10.609 67.682a34.263 34.263 0 00-13.641 2.156C165.266 99.45 116.22 132.528 87.168 162.16c-15.965 16.282-24.375 38.737-23.075 61.607.382 6.713 1.019 14.167 1.884 22.198-19.66 18.208-37.458 41.194-49.165 63.612-7.766 14.873-19.453 42.571-10.466 60.972l.109.223c-14.087 38.386-4.74 81.331 24.351 110.421 20.131 20.131 46.891 30.809 74.19 30.807 12.148 0 24.405-2.124 36.226-6.461.075.038.152.079.227.115 4.401 2.149 9.655 3.206 15.612 3.206 14.81 0 33.949-6.535 55.019-19.067 19.497-11.597 38.47-27.102 53.924-43.765 8.061.866 15.525 1.498 22.228 1.88a81.2 81.2 0 004.623.131c21.248 0 41.801-8.318 56.985-23.205 16.983-16.652 35.584-40.27 51.036-64.8a7.499 7.499 0 10-12.69-7.993c-14.857 23.584-32.66 46.212-48.846 62.083-13.275 13.016-31.586 19.874-50.255 18.81-3.522-.2-7.275-.475-11.222-.818a180.058 180.058 0 005.687-7.71c9.412-13.54 14.28-29.585 14.079-46.399-.342-28.584-3.903-77.794-12.869-130.184l-.27-1.554c48.317 9.682 88.748 22.601 117.408 37.561 8.697 4.541 12.657 14.892 9.208 24.078-1.664 4.432-3.767 9.284-6.253 14.425a7.5 7.5 0 0013.503 6.531c2.684-5.551 4.97-10.827 6.792-15.685a34.27 34.27 0 002.155-13.636 57.742 57.742 0 0026.579 6.484c14.91 0 29.765-5.759 41.104-17.098 10.744-10.745 16.786-25.027 17.01-40.217.196-13.469-4.199-26.356-12.447-36.807zM233.68 27.622c13.751-13.75 34.248-16.361 50.581-7.677-13.403 7.199-26.012 16.46-37.338 27.786a160.347 160.347 0 00-22.231 27.795c-7.08-15.925-3.932-34.984 8.988-47.904zM41.411 470.587c-23.283-23.283-31.808-56.92-23.008-88.065 11.427 7.352 34.147 17.58 80.568 30.511 5.519 19.778 11.106 37.136 16.457 51.031 5.431 14.102 10.111 23.353 14.102 29.518-31.158 8.825-64.822.302-88.119-22.995zm229.822-54.745c-15.819 22.757-40.798 45.582-66.82 61.06-24.38 14.501-45.985 20.35-56.383 15.275a5.45 5.45 0 01-.741-.452 7.658 7.658 0 00-.882-.72c-6.151-5.633-18.424-28.616-34.024-85.689a7.628 7.628 0 00-.196-.715 1037.597 1037.597 0 01-5.427-20.801 7.498 7.498 0 00-9.096-5.455 7.5 7.5 0 00-5.455 9.095c.737 2.947 1.479 5.843 2.223 8.711-56.898-16.496-70.569-27.339-73.74-30.966-.052-.065-.108-.126-.162-.189-.426-.512-.625-.857-.709-1.029-7.988-16.358 11.775-61.98 48.435-99.324 3.58 26.481 9.08 57.258 15.888 88.354.886 4.047 4.886 6.605 8.93 5.723a7.501 7.501 0 005.723-8.929c-10.586-48.358-17.962-95.788-19.729-126.876-1.061-18.664 5.794-36.981 18.81-50.255 27.747-28.302 74.403-59.823 106.217-71.765 9.184-3.45 19.537.51 24.078 9.208 11.833 22.669 27.901 68.599 39.522 127.182.042.683.173 1.347.39 1.978 8.091 41.345 13.943 88.872 14.543 138.918.165 13.678-3.776 26.7-11.395 37.661zm148.633-136.19a34.281 34.281 0 00-11.03-9.121c-31.513-16.45-74.306-29.941-127.249-40.123-7.685-39.817-20.336-89.35-40.118-127.244a34.283 34.283 0 00-9.121-11.031c6.665-12.382 15.114-23.729 25.18-33.795 55.35-55.35 144.37-56.386 198.445-2.311 54.074 54.074 53.038 143.095-2.311 198.443-10.067 10.069-21.414 18.516-33.796 25.182zm64.512-1.332c-12.92 12.919-31.979 16.067-47.903 8.988a160.331 160.331 0 0027.794-22.231c11.194-11.194 20.52-23.749 27.821-37.274 8.64 16.321 6.02 36.784-7.712 50.517z"
        />
        <path
          d="M412.824 167.01a21.515 21.515 0 00-15.315 6.344 7.5 7.5 0 1010.607 10.604 6.614 6.614 0 014.708-1.95c1.778 0 3.451.692 4.709 1.951a6.615 6.615 0 011.951 4.708 6.62 6.62 0 01-1.951 4.71 7.499 7.499 0 1010.607 10.604c4.091-4.091 6.344-9.529 6.344-15.314s-2.253-11.224-6.344-15.313a21.515 21.515 0 00-15.316-6.344zM366.483 158.76a12.436 12.436 0 01-9.641-3.602 12.423 12.423 0 01-3.603-9.642 7.499 7.499 0 10-14.962-1.027 27.42 27.42 0 007.96 21.274 27.414 27.414 0 0021.274 7.959 7.5 7.5 0 006.968-7.995c-.285-4.132-3.862-7.244-7.996-6.967z"
        />
      </svg>
    </div>

    <div class="day__info">
      <!-- Date / day number -->
      <div class="day__header">
        <span class="day__number">{{ dateIndex(day) || 1 }}</span>
        <span class="day__date">{{ dayDate(day) }}</span>
      </div>

      <div class="day__main max-w-full">
        <div class="day__observation ellipsis">
          <span
            class="observation-desc"
            v-if="
              day.observation.menstrual || day.observation.menstrual != 'N/A'
            "
            >{{ day.observation.menstrual }}</span
          >
          <span class="observation-desc" v-if="day.observation.indicator">{{
            day.observation.indicator
          }}</span>
          <span class="observation-desc" v-if="day.observation.color">{{
            day.observation.color
          }}</span>
          <span class="observation-desc" v-if="day.observation.sensation">{{
            day.observation.sensation
          }}</span>
        </div>
        <span class="day__frequency" v-if="day.observation.frequency">{{
          day.observation.frequency
        }}</span>

        <!-- Peak -->
        <span class="day__peak" v-if="day.observation.peak">
          {{ peakIndicator }}
        </span>

        <!-- Indicators -->
        <footer class="day__indicators">
          <CervixIndicator
            v-if="day.observation.cervix"
            :cervix="day.observation.cervix"
            class="mr-1"
          />

          <i
            v-if="day.observation.comment"
            class="el-icon-document day__indicator"
          ></i>
          <font-awesome-icon
            v-if="day.observation.sex"
            icon="heart"
            :color="!day.observation.menstrual ? '#F56C6C' : '#606266'"
            class="day__indicator"
          ></font-awesome-icon>
          <i v-if="day.observation.intercourse" class="el-icon-check"></i>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CervixIndicator from "@/components/card/CervixIndicator.vue";

export default {
  name: "AppDay",
  components: {
    CervixIndicator,
  },
  props: {
    index: Number,
    day: Object,
    isSqueezed: Boolean,
  },
  computed: {
    ...mapGetters({
      days: "sortedDays",
      currentCycle: "currentCycle",
      daysInCycle: "daysInCycle",
    }),
    markClass() {
      return {
        "bg-white":
          !this.day.observation.menstrual && !this.day.observation.mark,
        "bg-red": this.day.observation.menstrual,
        [`bg-${this.day.observation.mark}`]:
          this.day.observation.mark && !this.day.observation.menstrual,
      };
    },
    peakIndicator() {
      return this.day.observation.dayCount != 0
        ? this.day.observation.dayCount
        : "P";
    },
  },
  methods: {
    dayDate(day) {
      const format = this.isSqueezed ? "DD.MM" : "ddd DD.MM";
      return this.$moment(day.date).format(format);
    },
    isDayHasImage(day) {
      if (day.observation.menstrual) {
        return;
      }

      return (
        day.observation.mark === "white" ||
        day.observation.mark === "lightgreen"
      );
    },
    dateIndex(day) {
      if (this.index) return this.index;

      const daysInCycle = (cycleId) => {
        return this.days.filter((day) => day.cycle_id == cycleId);
      };

      // new day
      if (!day.id && this.currentCycle)
        return daysInCycle(this.currentCycle.id).length + 1;

      // edit day
      const cycleOfDate = this.$route.query.cycle_id;
      return (
        daysInCycle(cycleOfDate)
          .map((day) => day.id)
          .indexOf(day.id) + 1
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_variables.scss";

// FIXME clean up styles
.day {
  position: relative;
  width: 75px;
  height: 130px;
  text-align: center;
  padding: 10px 5px 40px 5px;
  border-radius: 5px;

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    z-index: 1;
  }

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__main {
    z-index: 1;
  }

  &__date {
    font-size: 0.65rem;
    font-style: italic;
  }

  &__img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 90%;
    color: $gray-300;
  }

  &__observation,
  &__frequency {
    font-size: 0.75rem;
  }

  &__peak {
    position: absolute;
    font-size: 4.5rem;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    opacity: 0.3;
  }

  &__indicators {
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25px;
    padding: 5px;
    z-index: 1;
    border-top: 2px solid rgba($gray-300, 0.5);
    background: rgba($gray-100, 0.5);
    overflow: hidden;
  }

  &__indicator {
    padding: 2px;
    font-size: 0.75rem;
  }

  &.bg-lightgreen {
    .day__img {
      color: $green-300;
    }
  }
}

.observation-desc {
  padding: 0 2px;
}

.day.squeezed {
  width: 55px;
  height: 77px;
  text-align: center;
  padding: 10px;

  .day__info {
    justify-content: unset;
  }

  .day__date {
    position: absolute;
    top: 2px;
    right: 5px;
  }

  .day__main {
    line-height: 1;
    margin-top: 1rem;
  }

  .day__observation,
  .day__frequency {
    font-size: 0.65rem;
  }

  .day__number {
    position: absolute;
    left: 5px;
    top: 2px;
  }

  .day__peak {
    position: absolute;
    font-size: 1.25rem;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%);
  }
}

.max-w-full {
  max-width: 100%;
}
</style>
