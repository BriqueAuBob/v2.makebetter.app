<script setup>
const localePath = useLocalePath();
const items = [
	{
		name: "Discord",
		href: "/",
		list: [
			{
				label: "Créateur d'embeds",
				href: localePath("/tools/discord/embed-maker"),
				img: 'images/demos/tool_demo.jpg'
			},
			{
				label: "Créateur d'emojis",
				href: "/",
				img: 'images/banner/background_primary.png'
			},
			{
				label: "Créateur de badges",
				href: "/",
				img: 'images/banner/hiring_right.png'
			},
		],
	},
	{
		name: 'Général',
		href: "/",
		list: [
			{
				label: 'Editeur Markdown',
				href: '/',
				img: 'images/backgrounds/header_home.jpg'
			},
			{
				label: 'Vérificateur de pseudo',
				href: '/',
				img: 'images/articles/fake.png'
			}
		]
	}
];

const currentSelected = ref(items[0]);
const onHover = (child) => {
	currentSelected.value = child;
}
</script>

<template>
	<div class="grid grid-cols-3">
		<ul class="flex flex-col gap-2 py-4 pl-4 bg-gray-100 dark:bg-gray-900 rounded-l-xl">
			<li v-for="(child, id) of items" :key="id">
				<NuxtLink 
					:to="child.href"
					class="font-semibold text-md text-gray-900 hover:text-white dark:text-gray-300 hover:bg-primary-500 px-3 py-2 rounded-l-lg block ease-out duration-500"
					:class="currentSelected.name === child.name && 'bg-primary-500 text-white'"
					@mouseover="() => onHover(child)"
				>
					{{ child.name }}
				</NuxtLink>
			</li>
		</ul>
		<div class="col-span-2 p-6">
			<ul class="text-gray-400 grid grid-cols-2 gap-4">
				<transition-group name="fadescale">
					<li v-for="(link, id) of currentSelected.list" :key="id">
						<NuxtLink :to="link.href">
							<nuxt-img class="w-full rounded-lg shadow-lg hover:brightness-125 cursor-pointer ease duration-300 h-24 object-cover" :src="link.img" />	
						</NuxtLink>
					</li>
				</transition-group>
			</ul>
		</div>
	</div>
</template>
