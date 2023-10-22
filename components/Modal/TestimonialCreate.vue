<script setup lang="ts">
const { t } = useI18n();
type Modal = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};
const modal = ref<Modal>();

function openModal() {
    modal.value?.setIsOpen(true);
}

function closeModal() {
    modal.value?.setIsOpen(false);
}

defineExpose({
    openModal,
    closeModal,
    toggleModal: () => modal.value?.setIsOpen(!modal.value?.isOpen),
});

const form = reactive({
    stars: 5,
    comment: '',
});
const loading = ref(false);
const errors = ref<string[]>([]);

const publishTestimonial = () => {
    loading.value = true;
    $fetchApi('testimonials', {
        method: 'POST',
        body: {
            message: form.comment,
            star: form.stars,
        },
    })
        .then(() => {
            form.comment = '';
            form.stars = 5;
            closeModal();
        })
        .catch((e) => {
            errors.value = e.response?._data?.errors ? e.response._data.errors.map((error: any) => error.message) : [];
            errors.value = errors.value.filter((error, id) => errors.value.indexOf(error) === id);
        })
        .finally(() => {
            loading.value = false;
        });
    return true;
};
</script>

<template>
    <UIModal
        ref="modal"
        :title="t('testimonials.publish')"
        :description="t('testimonials.publish_description')"
        :okText="t('testimonials.modal.button')"
        :onApply="publishTestimonial"
    >
        <div class="py-2">
            <label class="pointer-events-none ml-4 text-sm font-medium italic text-zinc-400">
                {{ $t('testimonials.modal.stars.label') }}
            </label>
            <div class="group flex w-full items-center justify-between gap-2">
                <NuxtIcon
                    v-for="i in 5"
                    :key="i"
                    :name="form.stars >= i ? 'star_filled' : 'star'"
                    class="star cursor-pointer text-7xl duration-300 ease-out hover:text-yellow-400 group-hover:text-yellow-400"
                    :class="form.stars >= i ? 'text-yellow-400' : 'text-zinc-600'"
                    @click="form.stars = i"
                />
            </div>
        </div>
        <div class="py-2">
            <UIInput
                :label="t('testimonials.modal.input.label')"
                :placeholder="t('testimonials.modal.input.placeholder')"
                v-model="form.comment"
                name="comment"
            />
            <TransitionGroup
                name="fade"
                enter-active-class="duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-300 ease-out"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <span
                    v-for="(error, id) in errors"
                    :key="id"
                    class="mt-1 block text-xs text-red-500"
                >
                    {{ error }}
                </span>
            </TransitionGroup>
            <span class="mt-1 block text-xs text-gray-500">{{ $t('testimonials.modal.input.help') }}</span>
        </div>
    </UIModal>
</template>

<style scoped>
/* put all stars before the one hovered in yellow */
.star:hover ~ .star {
    @apply text-zinc-600;
}
</style>
