<template>
	<header
		class="relative bg-primary-500 bg-header-home bg-cover bg-center bg-no-repeat py-72 pt-48 text-white"
	>
		<h1 class="text-center text-4xl font-black lg:text-4xl xl:text-8xl">
			Build Better Projects
		</h1>
		<h2
			class="mx-auto mt-4 text-center font-sans text-xl font-bold leading-snug lg:max-w-xl lg:text-2xl xl:max-w-5xl xl:text-4xl"
		>
			Nous proposons les outils qui permettront à ton projet de grandir
			rapidement.
		</h2>
		<div class="mt-12 flex items-center justify-center gap-6">
			<UIButton size="lg" color="light"> Utiliser un outil </UIButton>
			<UIButton size="lg" :outlined="true" color="light">
				Rejoindre le Discord
			</UIButton>
		</div>
		<div
			id="examples"
			class="absolute left-1/2 flex max-w-full -translate-x-1/2 translate-y-8"
		>
			<div
				class="flex translate-y-24 justify-center gap-12 lg:gap-16 xl:gap-24"
			>
				<img
					class="w-2/3 -rotate-6 rounded-3xl border-8 border-primary-600"
					src="~/assets/images/demos/tool_demo.jpg"
					alt="Tool Demo"
				/>
				<img
					class="w-2/3 rotate-3 rounded-3xl border-8 border-primary-600"
					src="~/assets/images/demos/tool_demo.jpg"
					alt="Tool Demo"
				/>
				<img
					class="w-2/3 -rotate-12 rounded-3xl border-8 border-primary-600"
					src="~/assets/images/demos/tool_demo.jpg"
					alt="Tool Demo"
				/>
			</div>
		</div>
	</header>
	<section
		class="container mx-auto grid grid-cols-2 items-center gap-16 pb-36 pt-80"
	>
		<div>
			<h1 class="text-xl font-bold">Utilisez nos outils en équipe !</h1>
			<p>
				Tous nos outils disposent d'un
				<strong>mode collaboratif</strong> vous permettant de
				<strong>travailler avec</strong> les autres membres de
				<strong>votre équipe en temps réel.</strong>
			</p>
			<UIButton class="mt-8">Voir d'autres outils</UIButton>
		</div>
		<FakerEmbedCreatorDemo />
	</section>
</template>
