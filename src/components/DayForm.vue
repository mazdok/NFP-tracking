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
        <el-form-item label="Color">
            <el-select v-model="day.observation.color" placeholder="Please select an option">
                <el-option label="N/A" value="">
                    <strong>N/A</strong>
                </el-option>
                <el-option value="B">
                    <strong>B</strong> - <small> brown or black spotting</small>
                </el-option>
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
        <el-form-item label="Sensation">
            <el-select v-model="day.observation.sensation" placeholder="Please select an option">
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
        <el-form-item label="Frequency">
            <el-select v-model="day.observation.frequency" placeholder="Please select an option">
                <el-option label="N/A" value=""></el-option>
                <el-option label="X1" value="X1"></el-option>
                <el-option label="X2" value="X2"></el-option>
                <el-option label="X3" value="X3"></el-option>
                <el-option value="AD">
                    <strong>AD</strong> - <small> all day</small>
                </el-option>
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
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="Peak">
                                <el-checkbox v-model="day.observation.peak"></el-checkbox>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                            <el-form-item label="Intercourse">
                            <el-checkbox v-model="day.observation.intercourse"></el-checkbox>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="Sex">
                                <el-checkbox v-model="day.observation.sex"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-slider
                        v-if="day.observation.peak"
                        v-model="day.observation.dayCount"
                        :step="1"
                        :max="3"
                        show-stops>
                    </el-slider>
                    
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
    components: {
        AppDay
    },
	props: {
		day: Object,
		edit: Boolean
	},
	data() {
		return {
			showMore: false
		}
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
                    comment: dayObs.comment,
                    sex: dayObs.sex
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
                comment: dayObs.comment,
                sex: dayObs.sex
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
        }
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
	padding: 10px 10px 20px 10px;
	border: 1px solid $lighter-border;
	border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    & .day__peak {
        top: 45%;
    }
}

.day-form {
	&__mark {
		@extend .current-mark;
		width: 40px;
		height: 40px;
    }
    
    @media screen and (min-width: 768px) {
        max-width: 700px;
        margin: 0 auto;
        box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.1);
        padding: 1.5rem 1rem 2rem;
        border-radius: 5px;
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
