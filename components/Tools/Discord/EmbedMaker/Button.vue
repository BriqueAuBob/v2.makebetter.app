<script setup lang="ts">
enum ButtonStyle {
    PRIMARY = 1,
    SECONDARY = 2,
    SUCCESS = 3,
    DANGER = 4,
    LINK = 5,
}

const props = defineProps({
    buttonStyle: {
        type: Number as PropType<ButtonStyle>,
        default: 'primary',
    },
});

const color = computed(() => {
    switch (props.buttonStyle) {
        case ButtonStyle.PRIMARY:
            return 'bg-[#5865F2]';
        case ButtonStyle.SECONDARY:
            return 'bg-[#4F545C]';
        case ButtonStyle.SUCCESS:
            return 'bg-[#43B581]';
        case ButtonStyle.DANGER:
            return 'bg-[#F04747]';
        case ButtonStyle.LINK:
            return 'bg-[#4F545C]';
    }
});
</script>

<template>
    <button
        class="flex items-center justify-center gap-2 rounded-[4px] px-4 py-2 text-sm font-medium duration-300 ease-out hover:brightness-125"
        :class="color"
    >
        <slot />
        <svg
            aria-hidden="false"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            v-if="props.buttonStyle === ButtonStyle.LINK"
        >
            <path
                fill="currentColor"
                d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
            ></path>
            <path
                fill="currentColor"
                d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
            ></path>
        </svg>
    </button>
</template>
