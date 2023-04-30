<script setup lang="ts">
defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "/images/banner/background_primary.png",
	},
});
</script>

<template>
	<section
		class="bg-primary-500 bg-cover bg-center bg-no-repeat py-16"
		:style="`background-image: url(${image})`"
	>
		<div class="container grid items-center lg:grid-cols-4">
			<div class="col-span-3">
				<h1 class="text-4xl font-bold text-white">{{ title }}</h1>
				<p class="mt-2 text-lg text-white">{{ description }}</p>
				<slot name="left"></slot>
			</div>
			<slot name="right"></slot>
		</div>
	</section>
</template>
