<script setup>
defineI18nRoute({
    paths: {
        fr: '/avis',
    },
});

const { data } = useAsyncData(() => fetch('https://api.umaestro.fr/testimonials').then((res) => res.json()));
</script>

<template>
    <header class="bg-gradient-to-b from-primary-200 to-transparent pb-24 pt-48 text-center dark:from-primary-800">
        <h1 class="mb-4 text-3xl font-black">{{ $t('testimonials.title') }}</h1>
        <p class="text-lg font-semibold leading-relaxed">
            {{ $t('testimonials.description') }}
        </p>
        <UIButton class="mx-auto mt-8">{{ $t('testimonials.publish') }}</UIButton>
    </header>
    <section class="container relative gap-16 pb-64 pt-8">
        <div class="mt-8 grid grid-cols-3 gap-6">
            <CardReview
                v-for="(testimonial, id) in data?.testimonials"
                :key="id"
                :author="testimonial.author"
                :content="testimonial.message"
            ></CardReview>
        </div>
    </section>
</template>
