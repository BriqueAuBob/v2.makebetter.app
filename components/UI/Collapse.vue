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
    smallTitle: {
        type: Boolean,
        default: false,
    },
});

const content = ref<HTMLElement | null>(null);
const collapsed = ref(!props.defaultOpen);

const emit = defineEmits(['toggle', 'open', 'close']);

const isCollapsed = computed(() => {
    if (props.state) return false;
    return collapsed.value;
});

const toggle = () => {
    let state = typeof props.state === 'undefined' ? collapsed.value : props.state;
    state = !state;
    emit('toggle', state);
    if (state) emit('open');
    else emit('close');

    if (typeof props.state === 'undefined') collapsed.value = state;
};
const collapseStyle = computed(() => {
    return {
        paddingBottom: isCollapsed.value ? '0' : '4rem',
    };
});
</script>

<template>
    <div class="border-b border-gray-200 dark:border-primary-800">
        <div
            class="flex cursor-pointer justify-between py-4"
            @click="toggle"
        >
            <h2 :class="[smallTitle ? 'text-md font-semibold' : 'text-lg font-bold', 'select-none']">
                {{ title }}
            </h2>
            <NuxtIcon
                class="icon duration-200 ease-smooth"
                :class="!isCollapsed && 'rotate-90'"
                name="chevron/right"
            ></NuxtIcon>
        </div>
        <div
            class="flex w-full flex-col overflow-hidden px-1 duration-300 ease-out"
            :class="isCollapsed ? 'pointer-events-none max-h-0 overflow-hidden opacity-0' : 'mb-4'"
            ref="content"
        >
            <slot />
        </div>
    </div>
</template>
