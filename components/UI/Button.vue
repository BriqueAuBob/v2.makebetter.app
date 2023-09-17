<script setup lang="ts">
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'info'
    | 'light'
    | 'dark'
    | 'transparent'
    | 'color-mode'
    | 'black';

const props = defineProps({
    size: {
        type: String as () => ButtonSize,
        default: 'md',
    },
    outlined: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String as () => ButtonColor,
        default: 'primary',
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
        default: '',
    },
});

const sizeClasses = computed(
    () =>
        ({
            sm: 'text-sm py-2 px-3 rounded-xl',
            md: 'text-base py-3 px-6 rounded-2xl',
            lg: 'text-lg py-5 px-9 rounded-3xl',
        }[props.size])
);
const colorsClasses = computed(() => {
    switch (props.outlined) {
        case true:
            return (
                {
                    primary: 'bg-transparent text-primary-500 border-primary-500',
                    secondary: 'bg-transparent text-secondary-500 border-secondary-500',
                    danger: 'bg-transparent text-red-500 border-red-500',
                    warning: 'bg-transparent text-orange-500 border-orange-500',
                    success: 'bg-transparent text-green-500 border-green-500',
                    info: 'bg-transparent text-info-500 border-info-500',
                    light: 'bg-transparent text-white border-white hover:bg-opacity-25',
                    dark: 'bg-transparent text-dark-500 border-dark-500',
                    black: 'bg-transparent text-black border-black',
                    transparent: 'border-0 shadow-none',
                    'color-mode': 'bg-transparent text-white border-white hover:bg-opacity-25 dark:border-zinc-800',
                }[props.color] + ' hover:bg-white hover:bg-opacity-20'
            );
        case false:
            return (
                {
                    primary: 'bg-primary-500 text-white dark:border-zinc-600',
                    // primary:
                    //     'bg-gradient-to-b from-primary-500 to-primary-00 hover:brightness-125 text-white dark:border-zinc-600',
                    secondary: 'bg-secondary-500 text-white',
                    danger: 'bg-red-500 text-white',
                    warning: 'bg-orange-500 text-white',
                    success: 'bg-green-500 text-white',
                    info: 'bg-info-500 text-white',
                    light: 'bg-white text-black',
                    dark: 'bg-primary-700 text-white',
                    black: 'bg-zinc-900 text-white',
                    transparent: 'border-0 shadow-none',
                    'color-mode': 'bg-white text-black dark:bg-zinc-900 dark:border-zinc-700 dark:text-white',
                }[props.color] + ' border-zinc-200 border-opacity-50'
            );
    }
});
const hoverClasses = computed(() => {
    return {
        primary: 'hover:bg-primary-400',
        secondary: 'hover:bg-secondary-700',
        danger: 'hover:bg-red-700',
        warning: 'hover:bg-orange-700',
        success: 'hover:bg-green-700',
        info: 'hover:bg-info-700',
        light: 'hover:bg-zinc-100',
        dark: 'hover:bg-primary-600',
        transparent: 'hover:bg-zinc-500 hover:bg-opacity-10',
        black: 'hover:bg-zinc-800',
        'color-mode': 'hover:bg-zinc-100 dark:hover:bg-primary-800',
    }[props.color];
});

const component = computed(() => {
    if (props.href) return resolveComponent('NuxtLink');
    return 'button';
});
</script>

<template>
    <component
        :is="component"
        :href="href"
        class="inline-block"
        :class="[
            'flex items-center justify-center gap-2 font-display font-semibold duration-300 ease-smooth',
            colorsClasses,
            sizeClasses,
            disabled && 'cursor-not-allowed opacity-25',
            color !== 'transparent' && 'border-2',
            !(disabled || fake || color === 'transparent') &&
                'hover:-translate-y-1 group-hover:-translate-y-1 ' + hoverClasses,
            color !== 'transparent' && !props.outlined && !fake && 'shadow-sm hover:shadow-lg',
        ]"
        :disabled="disabled || fake"
    >
        <slot></slot>
    </component>
</template>
