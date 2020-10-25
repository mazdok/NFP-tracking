<template>
  <el-form
    label-position="top"
    ref="form"
    :model="day.observation"
    label-width="80px"
    class="day-form"
  >
    <div class="marks mx-auto mb-3">
      <!-- DAY -->
      <app-day :day="day" class="mr-3"></app-day>

      <!-- Mark colors -->
      <el-form-item label="Mark color">
        <el-radio-group v-model="day.observation.mark" class="marks__wrapper">
          <el-radio :label="'yellow'" class="day-form__radio-mark mr-3 mb-2">
            <div class="day-form__mark shadow bg-yellow"></div>
          </el-radio>
          <el-radio :label="'green'" class="day-form__radio-mark mr-3 mb-2">
            <div class="day-form__mark shadow bg-green"></div>
          </el-radio>
          <el-radio
            :label="'lightgreen'"
            class="day-form__radio-mark mr-3 mb-2"
          >
            <div class="day-form__mark shadow bg-lightgreen"></div>
          </el-radio>
          <el-radio :label="'white'" class="day-form__radio-mark mr-3 mb-2">
            <div class="day-form__mark shadow bg-white"></div>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    <!-- Indicator -->
    <el-form-item label="Indicator">
      <el-select
        v-model="day.observation.indicator"
        placeholder="Please select an option"
      >
        <el-option label="N/A" value=""><strong>N/A</strong></el-option>
        <el-option value="0">
          <strong>0</strong> - <small>dry</small>
        </el-option>
        <el-option value="2">
          <strong>2</strong> - <small>damp without lubrication</small>
        </el-option>
        <el-option value="2W">
          <strong>2W</strong> - <small>wet without lubrication</small>
        </el-option>
        <el-option value="4">
          <strong>4</strong> - <small>shiny without lubrication</small>
        </el-option>
        <el-option value="6">
          <strong>6</strong> - <small>sticky</small>
        </el-option>
        <el-option value="8">
          <strong>8</strong> - <small>tacky</small>
        </el-option>
        <el-option value="10">
          <strong>10</strong> - <small>stretchy</small>
        </el-option>
        <el-option value="10DL">
          <strong>10DL</strong> - <small>damp with lubrication</small>
        </el-option>
        <el-option value="10SL">
          <strong>10SL</strong> - <small>shiny with lubrication</small>
        </el-option>
        <el-option value="10WL">
          <strong>10WL</strong> - <small>wet with lubrication</small>
        </el-option>
      </el-select>
    </el-form-item>

    <!-- Color -->
    <el-form-item label="Color">
      <el-select
        v-model="day.observation.color"
        placeholder="Please select an option"
      >
        <el-option label="N/A" value="">
          <strong>N/A</strong>
        </el-option>
        <!-- <el-option value="B">
                    <strong>B</strong> - <small> brown or black spotting</small>
                </el-option> -->
        <el-option value="C">
          <strong>C</strong> - <small> cloudy white</small>
        </el-option>
        <el-option value="CK">
          <strong>CK</strong> - <small> cloudy/clear</small>
        </el-option>
        <el-option value="K">
          <strong>K</strong> - <small> clear</small>
        </el-option>
        <el-option value="Y">
          <strong>Y</strong> - <small> yellow</small>
        </el-option>
      </el-select>
    </el-form-item>

    <!-- Sensation -->
    <el-form-item label="Sensation">
      <el-select
        v-model="day.observation.sensation"
        placeholder="Please select an option"
      >
        <el-option label="N/A" value="">
          <strong>N/A</strong>
        </el-option>
        <el-option value="L">
          <strong>L</strong> - <small> lubricate</small>
        </el-option>
        <el-option value="G">
          <strong>G</strong> - <small> gluey/gummy</small>
        </el-option>
        <el-option value="P">
          <strong>P</strong> - <small> pasty</small>
        </el-option>
      </el-select>
    </el-form-item>

    <!-- Frequency -->
    <el-form-item label="Frequency">
      <el-radio-group v-model="day.observation.frequency" size="small">
        <el-radio-button label="" border>N/A</el-radio-button>
        <el-radio-button label="X1" border>X1</el-radio-button>
        <el-radio-button label="X2" border>X2</el-radio-button>
        <el-radio-button label="X3" border>X3</el-radio-button>
        <el-radio-button label="AD" border
          >AD - <small> all day</small></el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <!-- Cervix -->
    <el-row v-if="isCervix" class="cervix-row">
      <el-row type="flex" justify="start" align="middle">
        <h4 class="mr-3">Cervix</h4>
        <el-switch v-model="isCervixEnabled"></el-switch>
      </el-row>
      <!-- Cervical Position -->
      <el-form-item label="Cervical Position">
        <el-radio
          v-model="day.observation.cervix.position"
          border
          size="small"
          label="L"
          >Low</el-radio
        >
        <el-radio
          v-model="day.observation.cervix.position"
          border
          size="small"
          label="M"
          >Medium</el-radio
        >
        <el-radio
          v-model="day.observation.cervix.position"
          border
          size="small"
          label="H"
          >High</el-radio
        >
      </el-form-item>

      <!-- Firmness -->
      <el-form-item label="Tissue Softness">
        <el-radio
          v-model="day.observation.cervix.firmness"
          border
          size="small"
          label="F"
          >Firm (F)</el-radio
        >
        <el-radio
          v-model="day.observation.cervix.firmness"
          border
          size="small"
          label="S"
          >Soft (S)</el-radio
        >
      </el-form-item>

      <!-- Cervical Opening -->
      <el-form-item label="Cervical Opening">
        <el-radio
          v-model="day.observation.cervix.opening"
          border
          size="small"
          label="0"
          >Closed</el-radio
        >
        <el-radio
          v-model="day.observation.cervix.opening"
          border
          size="small"
          label="1"
          >Partially open</el-radio
        >
        <el-radio
          v-model="day.observation.cervix.opening"
          border
          size="small"
          label="2"
          >Open</el-radio
        >
      </el-form-item>
    </el-row>

    <el-row class="show-more">
      <el-button
        @click="showMore = !showMore"
        type="text"
        :icon="showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      >
        {{ showMore ? "Show less" : "Show more" }}
      </el-button>

      <el-collapse-transition>
        <div v-show="showMore">
          <!-- Menstrual -->
          <el-form-item label="Menstrual">
            <el-select
              v-model="day.observation.menstrual"
              placeholder="Please select an option"
            >
              <el-option value="">
                <strong>N/A</strong>
              </el-option>
              <el-option value="H">
                <strong>H</strong> - <small> heavy</small>
              </el-option>
              <el-option label="M" value="M">
                <strong>M</strong> - <small> moderate</small>
              </el-option>
              <el-option label="L" value="L">
                <strong>L</strong> - <small> light</small>
              </el-option>
              <el-option label="VL" value="VL">
                <strong>VL</strong> - <small> very light</small>
              </el-option>
              <el-option label="B" value="B">
                <strong>B</strong> - <small> brown</small>
              </el-option>
            </el-select>
          </el-form-item>

          <!-- Peak / Intercourse / Sex -->
          <el-form-item>
            <el-checkbox
              v-model="day.observation.peak"
              label="Peak"
              border
              size="small"
            ></el-checkbox>
            <el-checkbox
              v-model="day.observation.intercourse"
              label="Intercourse"
              border
              size="small"
            ></el-checkbox>
            <el-checkbox
              v-model="day.observation.sex"
              label="Sex"
              border
              size="small"
            ></el-checkbox>
          </el-form-item>

          <div v-if="day.observation.peak">
            <label for="peak-day">
              <small>Peak day</small>
            </label>
            <el-slider
              v-model="day.observation.dayCount"
              :step="1"
              :max="3"
              show-stops
              id="peak-day"
              :marks="{ 1: '1', 2: '2', 3: '3' }"
            >
            </el-slider>
          </div>

          <!-- Date -->
          <el-form-item label="Date">
            <el-date-picker
              v-model="day.date"
              type="date"
              placeholder="Pick a day"
              :picker-options="dateOptions"
            >
            </el-date-picker>
          </el-form-item>

          <!-- Comment -->
          <el-form-item label="Comment">
            <el-input
              type="textarea"
              :rows="1"
              placeholder="You can leave here a comment"
              v-model="day.observation.comment"
            ></el-input>
          </el-form-item>

          <!-- Remove day -->
          <div class="danger-zone" v-if="edit">
            <el-button
              type="danger"
              circle
              icon="el-icon-delete"
              @click="removeDay(day.id)"
            ></el-button>
          </div>
        </div>
      </el-collapse-transition>
    </el-row>

    <!-- Footer actions -->
    <div class="text-center mt-4">
      <el-button v-if="edit" type="primary" @click="editObservation">
        Edit</el-button
      >

      <template v-else>
        <el-row>
          <el-button type="primary" @click="submitObservation">
            Create
          </el-button>
        </el-row>

        <el-row v-if="lastDayInCycle">
          <el-button
            type="text"
            icon="el-icon-document-copy"
            @click="copyPreviousDay"
            class="mt-2"
          >
            Copy previous day
          </el-button>
        </el-row>
      </template>
    </div>
  </el-form>
</template>

<script>
import AppDay from "@/components/DayCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AppDay,
  },
  props: {
    dayData: Object,
  },
  data() {
    return {
      day: {
        id: null,
        date: new Date(),
        observation: {
          mark: null,
          menstrual: null,
          indicator: null,
          color: null,
          sensation: null,
          frequency: "AD",
          peak: false,
          dayCount: 0,
          intercourse: false,
          comment: "",
          sex: false,
          cervix: {
            firmness: null,
            opening: null,
            position: null,
          },
        },
      },
      showMore: false,
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      isCervixEnabled: false,
    };
  },
  computed: {
    ...mapGetters([
      "isCervix",
      "currentCycle",
      "daysInCycle",
      "lastDayInCycle",
    ]),
    edit() {
      return !!this.dayData;
    },
    isCervixObservationsEmpty() {
      const cervix = this.day.observation.cervix;
      return !cervix?.firmness && !cervix?.opening && !cervix?.position;
    },
  },
  watch: {
    isCervixEnabled(value) {
      if (!value) {
        this.updateDayObservation({
          cervix: {
            firmness: null,
            opening: null,
            position: null,
          },
        });
      }

      if (value && this.isCervixObservationsEmpty) {
        this.updateDayObservation({
          cervix: {
            firmness: "F",
            opening: "0",
            position: "L",
          },
        });
      }
    },
    "day.observation.cervix": {
      deep: true,
      handler(val) {
        if (!this.isCervixObservationsEmpty) {
          this.isCervixEnabled = true;
        }
      },
    },
  },
  created() {
    if (this.dayData) {
      this.day = {
        ...this.day,
        ...this.dayData,
        observation: {
          ...this.day.observation,
          ...this.dayData.observation,
        },
      };
    }
  },
  methods: {
    updateDayObservation(observationData) {
      this.day = {
        ...this.day,
        observation: {
          ...this.day.observation,
          ...observationData,
        },
      };
    },
    isCardForCurrentDayPresent() {
      const daysInCycle = this.daysInCycle(this.currentCycle.id);
      const today = `${this.day.date.getDate()}-${this.day.date.getMonth()}`;
      const dates = daysInCycle.map(
        (day) => day.date.getDate() + "-" + day.date.getMonth()
      );
      return dates.some((day) => day === today);
    },
    submitObservation() {
      if (this.isCardForCurrentDayPresent()) {
        this.$confirm(
          "You've already created a card for this day. Create a new card anyway?",
          "Info",
          {
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
            type: "info",
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              duration: 500,
              message: "The cart was successfully created",
            });
            this.$store.dispatch("addDay", this.day);
          })
          .catch(() => {
            this.$message({
              type: "info",
              duration: 500,
              message: "Canceled",
            });
          });
      } else {
        this.$store.dispatch("addDay", this.day);
      }
    },
    copyPreviousDay() {
      this.$store.dispatch("addDay", this.lastDayInCycle);
    },
    editObservation() {
      this.$confirm(
        "Do you want to edit a day? Changes cannot be reversed",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "The data has been successfully updated",
          });
          this.$store.dispatch("editDay", this.day);
          this.$router.push("/cycles");
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 1000,
            message: "Canceled",
          });
        });
    },
    removeDay(id) {
      this.$confirm("Do you want to delete a day?", "Warning", {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            duration: 1000,
            message: "The day was deleted",
          });
          this.$store
            .dispatch("deleteDay", id)
            .then(() => this.$router.push("/cycles"));
        })
        .catch(() => {
          this.$message({
            type: "info",
            duration: 1000,
            message: "Canceled",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.day-form {
  &__mark {
    width: 50px;
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    max-width: 700px;
    margin: 0 auto;
    background-color: #fff;
    padding: 1.5rem 1rem 2rem;
    border-radius: 5px;
  }
}

.marks {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 400px; // FIXME

  &__wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}

.show-more {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-select {
  width: 100%;
}

.danger-zone {
  text-align: right;
  padding-top: 1rem;
}

.cervix-row {
  background-color: $gray-100;
  margin: 20px -20px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    margin: 20px 0px;
  }
}

.el-radio,
.el-checkbox {
  margin-right: 10px;
}
</style>
