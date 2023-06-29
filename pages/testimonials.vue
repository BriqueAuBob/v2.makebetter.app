<script setup>
const { data } = useAsyncData(() =>
	fetch("https://api.umaestro.fr/testimonials").then((res) => res.json())
);
</script>

<template>
	<header class="pt-48 text-center">
		<h1 class="mb-4 text-3xl font-black">Avis</h1>
		<p class="text-lg font-semibold leading-relaxed">
			Découvrez ce que nos utilisateurs pensent de notre plateforme.
		</p>
		<UIButton class="mt-8">Publier un avis</UIButton>
	</header>
	<section class="container relative gap-16 pb-64 pt-24">
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
