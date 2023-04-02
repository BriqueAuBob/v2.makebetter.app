<script setup lang="ts">
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor =
	| "primary"
	| "secondary"
	| "danger"
	| "warning"
	| "success"
	| "info"
	| "light"
	| "dark";

const props = defineProps({
	size: {
		type: String as () => ButtonSize,
		default: "md",
	},
	outlined: {
		type: Boolean,
		default: false,
	},
	color: {
		type: String as () => ButtonColor,
		default: "primary",
	},
	disabled: {
		type: Boolean,
		default: false,
	},
});

const sizeClasses = computed(
	() =>
		({
			sm: "text-sm py-1 px-3 rounded-xl",
			md: "text-base py-3 px-6 rounded-2xl",
			lg: "text-lg py-5 px-9 rounded-3xl",
		}[props.size])
);
const colorsClasses = computed(() => {
	switch (props.outlined) {
		case true:
			return (
				{
					primary:
						"bg-transparent text-primary-500 border-primary-500",
					secondary:
						"bg-transparent text-secondary-500 border-secondary-500",
					danger: "bg-transparent text-danger-500 border-danger-500",
					warning:
						"bg-transparent text-warning-500 border-warning-500",
					success:
						"bg-transparent text-success-500 border-success-500",
					info: "bg-transparent text-info-500 border-info-500",
					light: "bg-transparent text-white border-white",
					dark: "bg-transparent text-dark-500 border-dark-500",
				}[props.color] + " hover:bg-white hover:bg-opacity-20"
			);
		case false:
			return (
				{
					primary: "bg-primary-500 text-white hover:bg-primary-700",
					secondary:
						"bg-secondary-500 text-white hover:bg-secondary-700",
					danger: "bg-danger-500 text-white hover:bg-danger-700",
					warning: "bg-warning-500 text-white hover:bg-warning-700",
					success: "bg-success-500 text-white hover:bg-success-700",
					info: "bg-info-500 text-white hover:bg-info-700",
					light: "bg-white text-black hover:bg-gray-300",
					dark: "bg-dark-500 text-white hover:bg-dark-700",
				}[props.color] + " border-gray-800 border-opacity-50 shadow-lg"
			);
	}
});
</script>

<template>
	<button
		:class="[
			'border-2 font-display font-semibold duration-300 hover:-translate-y-1',
			colorsClasses,
			sizeClasses,
			disabled && 'cursor-not-allowed opacity-25',
		]"
	>
		<slot></slot>
	</button>
</template>
