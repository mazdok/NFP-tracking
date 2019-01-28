<template>
    <el-form ref="form" :model="day.observation" label-width="80px" class="day-form">
        <div class="marks">
            <!-- DAY -->
            <app-day class="current-mark" :day="day"></app-day>
            <el-radio-group v-model="day.observation.mark" class="marks__wrapper">
                <div>
                    <el-radio :label="'red'" class="day-form__radio-mark">
                        <div class="day-form__mark red"></div>
                    </el-radio>
                    <el-radio :label="'green'" class="day-form__radio-mark">
                        <div class="day-form__mark green"></div>
                    </el-radio>
                </div>
                <div>
                    <el-radio :label="'white'" class="day-form__radio-mark">
                        <div class="day-form__mark white"></div>
                    </el-radio>
                    <el-radio :label="'lightgreen'" class="day-form__radio-mark">
                        <div class="day-form__mark lightgreen"></div>
                    </el-radio>
                </div>
                <!-- <el-radio>
            <div class="day-form__mark day-form__mark--yellow"></div>
          </el-radio> -->
            </el-radio-group>
        </div>
        <el-form-item label="Indicator">
            <el-select v-model="day.observation.indicator" placeholder="Please select an option">
                <el-option label="N/A" value="null"></el-option>
                <el-option label="0" value="0"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="2W" value="2W"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="6" value="6"></el-option>
                <el-option label="8" value="8"></el-option>
                <el-option label="10" value="10"></el-option>
                <el-option label="10DL" value="10DL"></el-option>
                <el-option label="10SL" value="10SL"></el-option>
                <el-option label="10WL" value="10WL"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Color">
            <el-select v-model="day.observation.color" placeholder="Please select an option">
                <el-option label="N/A" value="null"></el-option>
                <el-option label="B" value="B"></el-option>
                <el-option label="C" value="C"></el-option>
                <el-option label="CK" value="CK"></el-option>
                <el-option label="K" value="K"></el-option>
                <el-option label="Y" value="Y"></el-option>
                <el-option label="G" value="G"></el-option>
                <el-option label="P" value="P"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Sensation">
            <el-radio-group v-model="day.observation.sensation" class="day-form__sensation">
                <el-radio :label="null">N/A</el-radio>
                <el-radio label="L"></el-radio>
                <el-radio label="G"></el-radio>
                <el-radio label="P"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Frequency">
            <el-select v-model="day.observation.frequency" placeholder="Please select an option">
                <el-option label="N/A" value="null"></el-option>
                <el-option label="X1" value="X1"></el-option>
                <el-option label="X2" value="X2"></el-option>
                <el-option label="X3" value="X3"></el-option>
                <el-option label="AD" value="AD"></el-option>
            </el-select>
        </el-form-item>
        <el-row class="show-more">
            <el-button @click="showMore = !showMore" type="text" :icon="showMore? 'el-icon-arrow-up' : 'el-icon-arrow-down'">
                {{showMore? 'Show less' : 'Show more'}}
            </el-button>
            <el-collapse-transition>
                <div v-show="showMore">
                    <el-form-item label="Menstrual">
                        <el-select v-model="day.observation.menstrual" placeholder="Please select an option">
                            <el-option label="N/A" value="null"></el-option>
                            <el-option label="H" value="H"></el-option>
                            <el-option label="M" value="M"></el-option>
                            <el-option label="L" value="L"></el-option>
                            <el-option label="VL" value="VL"></el-option>
                            <el-option label="B" value="B"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Peak">
                        <el-radio-group v-model="day.observation.peak">
                            <el-radio :label="false">No</el-radio>
                            <el-radio :label="true">Yes</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Day" v-if="day.observation.peak">
                        <!-- <el-radio-group v-model="day.observation.dayCount">
                            <el-radio label="0"></el-radio>
                            <el-radio label="1"></el-radio>
                            <el-radio label="2"></el-radio>
                            <el-radio label="3"></el-radio>
                        </el-radio-group> -->
                        <el-slider
                            v-model="day.observation.dayCount"
                            :step="1"
                            :max="3"
                            show-stops>
                        </el-slider>
                    </el-form-item>
                    <el-form-item label="Intercourse">
                        <el-radio-group v-model="day.observation.intercourse">
                            <el-radio :label="false">No</el-radio>
                            <el-radio :label="true">Yes</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-input type="textarea" :rows="2" placeholder="You can leave here a comment" v-model="day.observation.comment"></el-input>
                </div>
            </el-collapse-transition>
        </el-row>

        <div class="observation__btn-group">
            <el-button
                v-if="edit" 
                type="primary" 
                @click="editObservation " 
                class="observation__btn-submit">
                Edit</el-button>
            <el-button 
                v-else
                type="primary" 
                @click="submitObservation " 
                class="observation__btn-submit">
                Create</el-button>
        </div>
    </el-form>
</template>

<script>
import AppDay from '@/components/AppDay.vue'
export default {
	props: {
		day: Object,
		edit: Boolean
	},
	data() {
		return {
			showMore: false
		}
    },
    components: {
        AppDay
    },
	methods: {
		submitObservation() {
			const dayObs = this.day.observation;
			const currentDay = {
				id: null,
				date: Date.now(),
				observation: {
					mark: dayObs.mark,
					menstrual: dayObs.menstrual,
					indicator: dayObs.indicator,
					color: dayObs.color,
					sensation: dayObs.sensation,
					frequency: dayObs.frequency,
					peak: dayObs.peak,
					dayCount: dayObs.dayCount,
					intercourse: dayObs.intercourse,
					comment: dayObs.comment
				}
			}
            this.$store.dispatch('addDay', currentDay)
        },
        editObservation() {
            const dayObs = this.day.observation
            const currentDay = {
                id: this.day.id,
                cycle_id: this.day.cycle_id,
                date: this.day.date,
                observation: {
                mark: dayObs.mark,
                menstrual: dayObs.menstrual,
                indicator: dayObs.indicator,
                color: dayObs.color,
                sensation: dayObs.sensation,
                frequency: dayObs.frequency,
                peak: dayObs.peak,
                dayCount: dayObs.dayCount,
                intercourse: dayObs.intercourse,
                comment: dayObs.comment
                }
            }
            this.$confirm('Do you want to edit a day? Changes cannot be reversed', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'The data has been successfully updated'
                });
                this.$store.dispatch('editDay', currentDay)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Canceled'
                });
            });
        },
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/general.scss';

 .current-mark {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 70px;
	height: 128px;
	text-align: center;
	padding: 10px;
	border: 1px solid $lighter-border;
	border-radius: 5px;
	box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.day-form {
	&__mark {
		@extend .current-mark;
		width: 40px;
		height: 40px;
    }
    
    &__sensation {
        & .el-radio + .el-radio {
            margin-left: 15px; 
        }
    }
}

.marks {
	display: flex;
    align-items: center;
    justify-content: space-around;
    max-width: 280px;
    margin: 0 auto 1rem;

    &__wrapper {
		display: flex;
        flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}

.day-form__radio-mark + .day-form__radio-mark {
	margin-left: 5px;
}

.observation {
	&__btn-group {
		text-align: center;
	}

	&__btn-submit {
		margin-top: 1rem;
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
</style>
