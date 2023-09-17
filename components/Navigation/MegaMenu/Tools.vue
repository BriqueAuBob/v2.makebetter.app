<script setup>
const localePath = useLocalePath();
const items = [
    {
        name: 'Discord',
        href: '/',
        list: [
            {
                label: "Créateur d'embeds",
                href: localePath('/tools/discord/embed-maker'),
                img: 'images/demos/tool_demo.jpg',
            },
        ],
    },
];

const currentSelected = ref(items[0]);
const onHover = (child) => {
    currentSelected.value = child;
};
</script>

<template>
    <div class="grid grid-cols-3">
        <ul class="flex flex-col gap-2 rounded-l-xl bg-zinc-100 py-4 pl-4 dark:bg-zinc-900">
            <li
                v-for="(child, id) of items"
                :key="id"
            >
                <NuxtLink
                    :to="child.href"
                    class="text-md block rounded-l-lg px-3 py-2 font-semibold text-zinc-900 duration-500 ease-out hover:bg-primary-500 hover:text-white dark:text-zinc-300"
                    :class="currentSelected.name === child.name && 'bg-primary-500 text-white'"
                    @mouseover="() => onHover(child)"
                >
                    {{ child.name }}
                </NuxtLink>
            </li>
        </ul>
        <div class="col-span-2 p-6">
            <ul class="grid grid-cols-2 gap-4 text-zinc-400">
                <transition-group name="fadescale">
                    <li
                        v-for="(link, id) of currentSelected.list"
                        :key="id"
                    >
                        <NuxtLink :to="link.href">
                            <nuxt-img
                                class="ease h-24 w-full cursor-pointer rounded-lg object-cover shadow-lg duration-300 hover:brightness-125"
                                :src="link.img"
                            />
                        </NuxtLink>
                    </li>
                </transition-group>
            </ul>
        </div>
    </div>
</template>
