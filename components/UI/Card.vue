<script setup lang="ts">
defineProps({
	headerGrid: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: "Card Title",
	},
	description: {
		type: String,
		default:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.",
	},
	noHeading: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div
		class="overflow-hidden rounded-3xl border-2 bg-white dark:border-primary-800 dark:border-opacity-50 dark:bg-primary-900"
	>
		<div class="relative pb-4" v-if="!noHeading">
			<div
				:class="
					headerGrid &&
					'relative bg-grid-square bg-[30%] bg-repeat p-12'
				"
			>
				<div
					class="-z-1 absolute left-0 top-0 h-full w-full bg-gradient-radial from-transparent to-white dark:to-primary-900"
				></div>
				<div class="relative z-10">
					<slot name="header"></slot>
				</div>
			</div>
		</div>
		<div :class="noHeading ? 'p-8' : 'px-8 pb-8'">
			<slot name="content">
				<h3 class="mb-1 text-lg">{{ title }}</h3>
				<p class="text-sm text-gray-700">
					{{ description }}
				</p>
				<slot name="content_bottom"></slot>
			</slot>
		</div>
	</div>
</template>
