<script setup lang="ts">
defineProps({
    headerGrid: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: 'Card Title',
    },
    description: {
        type: String,
        default:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nisl nisl sit amet lorem.',
    },
    noHover: {
        type: Boolean,
        default: false,
    },
    collapse: {
        type: Boolean,
        default: false,
    },
    noPb: {
        type: Boolean,
        default: false,
    },
    noPadding: {
        type: Boolean,
        default: false,
    },
    contentStyle: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <div
        class="rounded-3xl border-2 bg-white duration-300 ease-out dark:border-zinc-800 dark:border-opacity-50 dark:bg-zinc-900"
        :class="[
            !noHover && 'hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg',
            headerGrid && 'overflow-hidden',
        ]"
    >
        <div
            class="relative"
            :class="!noPb && 'pb-4'"
            v-if="$slots.header"
        >
            <div :class="headerGrid && 'relative bg-grid-square bg-[30%] bg-repeat p-12'">
                <div
                    class="absolute left-0 top-0 -z-1 h-full w-full bg-gradient-radial from-transparent to-white dark:to-zinc-900"
                    v-if="headerGrid"
                ></div>
                <div class="relative z-10">
                    <slot name="header"></slot>
                </div>
            </div>
        </div>
        <div
            :class="[!$slots.header ? 'p-8' : noPadding ? '' : 'px-8 pb-8', contentStyle && 'duration-300 ease-out']"
            :style="contentStyle"
        >
            <slot>
                <h3 class="mb-1 text-lg">{{ title }}</h3>
                <p class="text-sm text-zinc-500">
                    {{ description }}
                </p>
            </slot>
        </div>
        <slot name="footer"></slot>
    </div>
</template>
