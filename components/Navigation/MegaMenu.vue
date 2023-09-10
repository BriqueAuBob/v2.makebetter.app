<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
    x: {
        type: Number,
        default: 0,
    },
    y: {
        type: Number,
        default: 0,
    },
    show: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <UIPopover
        id="megamenu"
        :relative="false"
        :center="false"
        :x="x"
        :y="y"
        width="40vw"
    >
        <template #popover>
            <component :is="item.component" />
        </template>
    </UIPopover>
</template>
