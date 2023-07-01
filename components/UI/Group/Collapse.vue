<script setup lang="ts">
import type { CollapseGroupItems } from "~/types/collapse";

const props = defineProps({
	elements: {
		type: Array as () => CollapseGroupItems,
		required: true,
	},
	canOpenMultiple: {
		type: Boolean,
		default: false,
	},
});

const collapses = ref<HTMLElement | null>(null);
const states = ref<boolean[]>([true, false, false]);
function onOpen(index: number) {
	if (!props.canOpenMultiple) {
		states.value = states.value.map((state, i) => {
			if (i === index) return true;
			return false;
		});
	}
}
function onClose(index: number) {
	states.value[index] = false;
}
</script>

<template>
	<div class="flex flex-col gap-1">
		<UICollapse
			v-for="(element, index) in elements"
			:key="index"
			:title="element.title"
			@open="onOpen(index)"
			@close="onClose(index)"
			ref="collapses"
			:state="states[index]"
			data-aos="fade-up"
			data-aos-duration="5000"
			data-aos-offset="300"
		>
			<p>{{ element.content }}</p>
		</UICollapse>
	</div>
</template>
