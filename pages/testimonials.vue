<script setup lang="ts">
import { $fetchApi } from '~/composables/fetch';

defineI18nRoute({
    paths: {
        fr: '/avis',
    },
});

const { data } = useAsyncData(() => $fetchApi('testimonials'));

type Modal = {
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
};
const testimonial_modal = ref<Modal>();
</script>

<template>
    <header class="bg-gradient-to-b from-primary-400 to-transparent pb-24 pt-48 text-center dark:from-zinc-800">
        <h1 class="mb-4 text-3xl font-black">{{ $t('testimonials.title') }}</h1>
        <p class="text-lg font-semibold leading-relaxed">
            {{ $t('testimonials.description') }}
        </p>
        <UIButton
            class="mx-auto mt-8"
            @click="testimonial_modal?.openModal()"
        >
            {{ $t('testimonials.publish') }}
            <ModalTestimonialCreate ref="testimonial_modal" />
        </UIButton>
    </header>
    <section class="container relative gap-16 pb-64 pt-8">
        <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CardReview
                v-for="(testimonial, id) in data?.testimonials"
                :key="id"
                :author="testimonial.author"
                :content="testimonial.message"
            ></CardReview>
        </div>
    </section>
</template>
