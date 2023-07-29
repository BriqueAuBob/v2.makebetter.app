<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    collapse: {
        type: Boolean,
        default: false,
    },
    delete: {
        type: Boolean,
        default: false,
    },
});

const isCollapsed = ref(props.collapse);

const toggle = () => {
    isCollapsed.value = !isCollapsed.value;
};

defineEmits(['delete']);
</script>

<template>
    <UICard noPb>
        <template #header>
            <div class="flex cursor-pointer justify-between px-8 pt-8" :class="isCollapsed && 'pb-8'" @click="toggle">
                <h2 class="text-lg font-bold">
                    {{ title }}
                </h2>
                <div class="flex gap-2">
                    <NuxtIcon
                        v-if="delete"
                        class="icon text-red-500 duration-200 ease-smooth"
                        name="trash"
                        @click="
                            (e) => {
                                e.stopPropagation();
                                $emit('delete');
                            }
                        "
                    ></NuxtIcon>
                    <NuxtIcon
                        class="icon duration-200 ease-smooth"
                        :class="!isCollapsed && 'rotate-90'"
                        name="chevron/right"
                    ></NuxtIcon>
                </div>
            </div>
        </template>
        <div
            class="duration-300 ease-out"
            :class="isCollapsed ? '-mt-8 max-h-0 overflow-hidden opacity-0' : 'mb-2 mt-4'"
        >
            <slot></slot>
        </div>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </UICard>
</template>
