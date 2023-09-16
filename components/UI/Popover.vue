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
    },
});
</script>

<style scoped>
.arrow {
    --arrow-color: #fff;
}

html.dark .arrow {
    --arrow-color: #000;
}
</style>

<template>
    <div :class="[relative && 'relative', 'group']">
        <slot name="trigger"></slot>
        <div
            class="absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-4 rounded-2xl border-2 border-gray-200 bg-white opacity-0 shadow-xl duration-300 ease-out arrow group-hover:opacity-100 dark:border-gray-900 dark:bg-black"
            :style="{
                left: x + 'px',
                top: y + 'px',
                'max-width': width,
            }"
            :id="id"
        >
            <slot name="popover"></slot>
        </div>
    </div>
</template>
