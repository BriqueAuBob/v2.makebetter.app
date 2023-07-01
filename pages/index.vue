<script setup lang="ts">
import type { CollapseGroupItems } from "~/types/collapse";
import type { Testimonials as TestimonialsType, Statistics as StatisticsType } from "~/types/api_response";
import { Slide } from "vue3-carousel";
import { useI18n } from "#i18n";
const localePath = useLocalePath()

const { t } = useI18n();
const previews = ["images/demos/emoji_maker.jpg", "images/demos/emoji_maker.jpg"];
const collapsibleElements: CollapseGroupItems = [
	{
		title: t('tools.discord.embed.name'),
		content: t('tools.discord.embed.description'),
		defaultOpen: true,
	},
	{
		title: t('tools.discord.embed.name'),
		content: t('tools.discord.embed.description'),
	},
	{
		title: t('tools.discord.embed.name'),
		content: t('tools.discord.embed.description'),
	},
];

type Testimonials = {
	testimonials: any[]
}
type Statistics = {
	members: number
}
const { data: testimonialsData } = await useFetch<TestimonialsType>('https://api.umaestro.fr/testimonials?max=3');
const { data: statisticsData } = await useFetch<StatisticsType>('https://api.umaestro.fr/statistics');
</script>

<template>
	<header
		class="relative bg-primary-500 bg-header-home bg-cover bg-center bg-no-repeat py-72 pt-48 text-white"
	>
		<h1 class="text-center text-4xl font-black lg:text-4xl xl:text-8xl">
			{{ $t('homepage.header.title') }}
		</h1>
		<h2
			class="mx-auto mt-4 text-center font-sans text-xl font-bold leading-snug lg:max-w-xl lg:text-2xl xl:max-w-5xl xl:text-4xl"
		>
			{{ $t('homepage.header.description') }}
		</h2>
		<div class="mt-12 flex items-center justify-center gap-6">
			<UIButton size="lg" color="light">{{ $t('homepage.header.buttons.use_tool') }}</UIButton>
			<NuxtLink
				to="https://discord.com/invite/GWpGBK8gmA"
				target="_blank"
			>
				<UIButton size="lg" :outlined="true" color="light">
					{{ $t('homepage.header.buttons.join_discord') }}
				</UIButton>
			</NuxtLink>
		</div>
		<div
			id="examples"
			class="absolute left-1/2 flex w-full max-w-full -translate-x-1/2 translate-y-8"
		>
			<div
				class="flex translate-y-24 justify-center gap-4 lg:gap-8 xl:gap-16"
			>
				<UICarousel>
					<Slide v-for="(preview, index) in previews" :key="index">
						<div
							class="w-full overflow-hidden rounded-3xl border-8 border-primary-600"
						>
							<nuxt-img
								:src="preview"
								class="w-full object-cover"
								alt="Tool Demo"
								sizes="sm:100vw lg:50vw"
							/>
						</div>
					</Slide>
				</UICarousel>
			</div>
		</div>
	</header>
	<section
		class="container grid items-center gap-16 pb-36 pt-80 lg:grid-cols-2"
	>
		<div>
			<h1 class="text-xl font-bold">
				{{ $t('homepage.collaborative.title') }}
			</h1>
			<i18n-t class="mt-2 mb-4" tag="p" keypath="homepage.collaborative.description.base">
				<strong>{{ $t('homepage.collaborative.description.system') }}</strong>
				<strong>{{ $t('homepage.collaborative.description.work_in_team') }}</strong>
				<strong>{{ $t('homepage.collaborative.description.in_real_time') }}</strong>
			</i18n-t>
			<UIGroupCollapse :elements="collapsibleElements" />
			<UIButton data-aos="fade-up" class="mt-12">{{ $t('homepage.collaborative.view_tools') }}</UIButton>
		</div>
		<div class="relative" data-aos="zoom-in-up">
			<div
				class="absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary-700 to-primary-300 opacity-25 blur-3xl"
			></div>
			<FakerEmbedCreatorDemo />
		</div>
	</section>
	<section class="container relative gap-16 pb-48 pt-16">
		<h1 class="mx-auto text-center text-xl font-bold">
			{{ $t('homepage.share.title') }}
		</h1>
		<div
			class="to-primary-30 absolute left-1/2 top-1/2 -z-10 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary-700 opacity-10 blur-3xl"
		></div>
		<div class="mt-8 grid grid-cols-2 gap-8">
			<UICard
				:header-grid="true"
				:title="$t('homepage.share.collaborators.title')"
				:description="$t('homepage.share.collaborators.description')"
				data-aos="fade-up"
			>
				<template #header>
					<div class="mx-auto flex max-w-sm flex-col gap-4">
						<UIInput
							name="fake_embed_creator"
							label="URL"
							type="text"
							placeholder="makebetter.app/tools/discord/embeds/05448f3b-4b1a-467f-93e4-6487a182e6f7"
							class="mx-auto w-full"
							fake
						></UIInput>
						<UIButton color="color-mode" size="md" fake>
							{{ $t('buttons.share') }}
						</UIButton>
					</div>
				</template>
			</UICard>
			<UICard
				:header-grid="true"
				:title="$t('homepage.share.public.title')"
				:description="$t('homepage.share.public.description')"
				data-aos="fade-up"
			>
				<template #header>
					<div class="mx-auto flex max-w-sm gap-4">
						<div
							class="flex h-32 w-52 items-center justify-center rounded-2xl border bg-white dark:border-primary-700 dark:bg-primary-800"
						>
							<nuxt-img
								class="h-24 w-24"
								src="/images/fake_icon.svg"
							/>
						</div>
						<div class="flex w-full flex-col gap-4">
							<UIButton
								class="h-full w-full"
								color="color-mode"
								size="md"
								fake
							>
								{{ $t('buttons.download') }}
							</UIButton>
							<UIButton
								class="h-full w-full"
								color="color-mode"
								size="md"
								fake
							>
								{{ $t('buttons.make_public') }}
							</UIButton>
						</div>
					</div>
				</template>
			</UICard>
		</div>
	</section>
	<BannerHiring data-aos="fade-down" />
	<section class="container relative gap-16 py-32">
		<h1 class="mx-auto text-center text-xl font-bold">
			{{ $t('homepage.need_help') }}
		</h1>
		<div class="mt-8 grid grid-cols-3 gap-6">
			<CardArticle v-for="i in 6" data-aos="zoom-in-up" :data-aos-offset="100 + i * 100"></CardArticle>
		</div>
		<div class="flex justify-center">
			<UIButton class="mt-12" color="color-mode">
				{{ $t('homepage.view_tutorials') }}
			</UIButton>
		</div>
	</section>
	<section class="container relative gap-16 pb-64 pt-24">
		<p class="mb-4 text-center text-lg font-semibold leading-relaxed whitespace-pre">
			{{  $t('homepage.stat_usage_rates', {
				usersCount: statisticsData?.members,
				ratesCount: 250,
			}) }}
		</p>
		<h1 class="text-center text-3xl font-black">Pourquoi pas toi&nbsp;?</h1>
		<div class="mt-8 grid grid-cols-3 gap-6">
			<CardReview 
				v-for="(testimonial, id) in testimonialsData?.testimonials" 
				:key="id" 
				:author="testimonial.author" 
				:content="testimonial.message"
				data-aos="zoom-in-up" 
				:data-aos-offset="100 + id * 100"
			></CardReview>
		</div>
		<div class="flex items-center justify-center gap-6">
			<UIButton class="mt-12" color="color-mode">
				{{ $t('testimonials.publish') }}
			</UIButton>
			<UIButton :href="localePath('testimonials')" class="mt-12" color="transparent">
				{{ $t('testimonials.view') }}
			</UIButton>
		</div>
	</section>
</template>
