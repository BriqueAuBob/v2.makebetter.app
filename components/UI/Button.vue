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
	| "dark"
	| "transparent"
	| "color-mode";

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
	fake: {
		type: Boolean,
		default: false,
	},
	href: {
		type: String,
		default: "",
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
					light: "bg-transparent text-white border-white hover:bg-opacity-25",
					dark: "bg-transparent text-dark-500 border-dark-500",
					transparent: "border-0 shadow-none",
					"color-mode":
						"bg-transparent text-white border-white hover:bg-opacity-25 dark:border-primary-800",
				}[props.color] + " hover:bg-white hover:bg-opacity-20"
			);
		case false:
			return (
				{
					primary:
						"bg-primary-500 text-white dark:border-primary-600",
					secondary: "bg-secondary-500 text-white",
					danger: "bg-danger-500 text-white",
					warning: "bg-warning-500 text-white",
					success: "bg-success-500 text-white",
					info: "bg-info-500 text-white",
					light: "bg-white text-black",
					dark: "bg-dark-500 text-white",
					transparent: "border-0 shadow-none",
					"color-mode":
						"bg-white text-black dark:bg-primary-900 dark:border-primary-700 dark:text-white",
				}[props.color] + " border-gray-200 border-opacity-50"
			);
	}
});
const hoverClasses = computed(() => {
	return {
		primary: "hover:bg-primary-700",
		secondary: "hover:bg-secondary-700",
		danger: "hover:bg-danger-700",
		warning: "hover:bg-warning-700",
		success: "hover:bg-success-700",
		info: "hover:bg-info-700",
		light: "hover:bg-gray-100",
		dark: "hover:bg-dark-700",
		transparent: "hover:bg-gray-500 hover:bg-opacity-10",
		"color-mode": "hover:bg-gray-100 dark:hover:bg-primary-800",
	}[props.color];
});

const component = computed(() => {
	if (props.href) return resolveComponent("NuxtLink");
	return "button";
});
</script>

<template>
	<component
		:is="component"
		:href="href"
		class="inline-block"
		:class="[
			'font-display font-semibold duration-300 ease-smooth',
			colorsClasses,
			sizeClasses,
			disabled && 'cursor-not-allowed opacity-25',
			color !== 'transparent' && 'border-2',
			!(disabled || fake || color === 'transparent') &&
				'hover:-translate-y-1 ' + hoverClasses,
			(color !== 'transparent' &&
				!props.outlined && !fake) &&
				'shadow-sm hover:shadow-lg',
		]"
		:disabled="disabled || fake"
	>
		<slot></slot>
	</component>
</template>
