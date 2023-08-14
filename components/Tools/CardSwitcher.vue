<script setup lang="ts">
type Element = {
    title: string;
    component: any;
    props?: object;
};

const props = defineProps({
    elements: {
        type: Array as PropType<Element[]>,
        required: true,
    },
    current: {
        type: Number,
        required: false,
    },
});

const activeElement = ref<number>(props.current || 0);

const setActiveElement = (index: number) => {
    if (index < 0) index = props.elements.length - 1;
    if (index >= props.elements.length) index = 0;
    activeElement.value = index;
};

watch(
    () => props.current,
    (value) => {
        setActiveElement(value || 0);
    }
);
</script>

<template>
    <div class="relative mt-2">
        <UICard
            v-for="(element, index) of elements"
            :key="index"
            :class="
                activeElement === index
                    ? 'relative z-[99]'
                    : 'absolute -top-2 z-10 max-h-96 w-full translate-x-2 rotate-1 overflow-hidden opacity-30'
            "
            :noHover="activeElement !== index"
        >
            <template #header>
                <div class="flex items-center justify-between px-6 pt-6 font-display text-lg font-semibold">
                    <NuxtIcon
                        name="arrow/left"
                        class="mr-2 p-2 text-xl"
                        @click="setActiveElement(activeElement - 1)"
                    />
                    {{ element.title }}
                    <NuxtIcon
                        name="arrow/right"
                        class="ml-2 p-2 text-xl"
                        @click="setActiveElement(activeElement + 1)"
                    />
                </div>
            </template>
            <component
                :is="element.component"
                :id="index"
                v-bind="element.props"
            />
        </UICard>
    </div>
</template>
