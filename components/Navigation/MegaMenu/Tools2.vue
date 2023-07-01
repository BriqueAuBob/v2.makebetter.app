<script setup>
const items = [
	{
		name: "Général",
		list: [
			{
				label: "Créateur",
				href: "/",
			},
			{
				label: "Créateur dmakrodnwn",
				href: "/",
			},
			{
				label: "Créateur de badges",
				href: "/",
			},
		],
	},
];
</script>

<template>
	<div v-for="(child, id) of items">
		<div class="grid grid-cols-3">
			<div class="text-sm font-medium text-gray-300">
				{{ child.name }}
			</div>
			<div class="col-span-2 flex flex-col gap-2">
				<a
					v-for="(link, id) of child.list"
					:key="id"
					:href="link.href"
					class="text-gray-400 hover:text-gray-100"
				>
					{{ link.label }}
				</a>
			</div>
		</div>
	</div>
</template>
