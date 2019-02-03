<template>
	<div>
		<!-- CYCLE HEADER -->
		<cycle-header :cycle="cycle" :index="index" :daysInCycle="daysInCycle(cycle.id)"></cycle-header>
		<div class="days">
			<h3 v-if="!daysInCycle(cycle.id).length" 
				class="cycle__empty">
				The cycle has no days</h3>
			<!-- <div v-for="(day, index) in days.filter(day => day.cycle_id === cycle.id)"  -->
			<div v-for="(day, index) in daysInCycle(cycle.id)" 
				:key="day.id" 
				class="day-wrapper">
				<router-link tag="div" 
					:to="{ name: 'edit-day', params: { id: day.id }, query: {cycle_id: cycle.id}}">
					<!-- DAY -->
					<app-day 
						:index="index + 1" 
						:day="day" 
						:class="{'squeezed': cycle.squeezed }"></app-day>
				</router-link>
			</div>
			<div v-show="cycle.current" class="add-day">
				<router-link to="/">
					<el-button size="mini" 
						type="success" 
						icon="el-icon-plus" 
						circle class="add-day__btn"></el-button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import CycleHeader from '@/views/Cycles/CycleHeader.vue'
import AppDay from '@/components/AppDay.vue'

export default {
	components: {
		AppDay,
		CycleHeader
	},
	props: {
		cycle: Object,
		index: Number
	},
	methods: {
		daysInCycle(id) {
			return this.$store.getters.daysInCycle(id)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.cycle {
	&:last-child {
		margin-bottom: 0;
	}

	&__current {
		font-weight: bold;
		color: $success;
		margin-left: .5rem;
	}

	&__dates {
		display: inline-block;
		font-size: 0.75rem;
		font-style: italic;
	}

	&__empty {
		font-size: 1rem;
		color: $secondary-text;
		text-transform: uppercase;
	}
}

.add-day {
	display: flex;
	align-items: center;
	z-index: 1;

	&__btn {
		margin-left: 5px;
	}
}

.days {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
}

.day-wrapper {
	margin-right: 5px;
	margin-bottom: 5px;
}

</style>
