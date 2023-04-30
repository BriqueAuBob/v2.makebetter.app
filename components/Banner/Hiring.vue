<template>
	<BannerDefault
		title="On recrute"
		description="
			Pour continuer de vous proposer des services comme celui-ci,
			nous avons besoin de personnes dans de multiples domaines
			comme le développement, le graphisme...
		"
	>
		<template #left>
			<UIButton class="mt-8" color="light">
				Voir les postes disponibles
			</UIButton>
		</template>
		<template #right>
			<nuxt-img
				class="ml-auto w-full"
				src="/images/banner/hiring_right.png"
			/>
		</template>
	</BannerDefault>
</template>
