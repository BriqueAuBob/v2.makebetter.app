<script setup lang="ts">
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	defaultOpen: {
		type: Boolean,
		default: false,
	},
	state: {
		type: Boolean,
		default: undefined,
	},
});

const content = ref<HTMLElement | null>(null);
const contentHeight = ref(0);
const collapsed = ref(!props.defaultOpen);

const emit = defineEmits(["toggle", "open", "close"]);

const isCollapsed = computed(() => {
	if (props.state) return false;
	return collapsed.value;
});

const toggle = () => {
	let state =
		typeof props.state === "undefined" ? collapsed.value : props.state;
	state = !state;
	emit("toggle", state);
	if (state) emit("open");
	else emit("close");

	if (typeof props.state === "undefined") collapsed.value = state;
};
const collapseStyle = computed(() => {
	return {
		maxHeight: isCollapsed.value ? "0" : `${contentHeight.value}px`,
		paddingBottom: isCollapsed.value ? "0" : "4rem",
	};
});

const toggleRef = ref<Function | null>(null);
onMounted(() => {
	contentHeight.value = content.value?.scrollHeight || 0;
	toggleRef.value = toggle;
});

onUpdated(() => {
	contentHeight.value = content.value?.scrollHeight || 0;
});
</script>

<template>
	<div class="border-b border-gray-200 dark:border-primary-800">
		<div class="flex cursor-pointer justify-between py-4" @click="toggle">
			<h2 class="text-lg font-bold">
				{{ title }}
			</h2>
			<NuxtIcon
				class="icon duration-200 ease-smooth"
				:class="!isCollapsed && 'rotate-90'"
				name="chevron/right"
			></NuxtIcon>
		</div>
		<div
			class="flex w-full flex-col overflow-hidden duration-300 ease-in-out"
			:style="collapseStyle"
			ref="content"
		>
			<slot />
		</div>
	</div>
</template>
