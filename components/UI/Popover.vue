<script setup>
defineProps({
	relative: {
		type: Boolean,
		default: true,
	},
	x: {
		type: [Number, String],
		default: 0,
	},
	y: {
		type: [Number, String],
		default: 0,
	},
	id: {
		type: String,
	},
	width: {
		type: String,
	}
});
</script>

<style scoped>
	.arrow {
		--arrow-color: #FFF;
	}

	html.dark .arrow {
		--arrow-color: #000;
	}
</style>

<template>
	<div :class="relative && 'relative'">
		<slot name="trigger"></slot>
		<div
			class="left-1/2 -translate-x-1/2 absolute top-full min-w-[400px] translate-y-4 rounded-2xl bg-white border-gray-200 dark:bg-black shadow-xl border-2 dark:border-gray-900 arrow ease-out duration-300"
			:style="{
				left: x + 'px',
				top: y + 'px',
				'max-width': width
			}"
			:id="id"
		>
			<slot name="popover"></slot>
		</div>
	</div>
</template>