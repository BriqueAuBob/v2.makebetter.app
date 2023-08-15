<script setup lang="ts">
type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const modal = ref<UIModalType>();
const setIsOpen = () => {
    modal.value?.setIsOpen(true);
};
defineExpose({
    setIsOpen,
});

const messages = [
    {
        username: 'UMaestro',
        avatar_url:
            'https://cdn.discordapp.com/avatars/988400676537249832/76f7a68e7c0da0fc8aebc7f0c08e5309.png?size=256',
        content: '',
        components: [
            {
                type: 1,
                components: [],
            },
        ],
        files: null,
        embeds: [
            {
                color: '#2F3136',
                title: '',
                url: '',
                author: {
                    url: '',
                    name: "Créateur d'embeds & leur rédaction!",
                    icon_url: 'https://cdn.discordapp.com/emojis/979107826578370680.webp?size=96&quality=lossless',
                },
                description:
                    "<:um_item1:985493065504542740> Cet outil a été pensé pour vous, notamment pour les créateurs de serveurs. Le rédacteur d'embeds vous permet d'illustrer vos textes en les mettant en valeur, grâce à votre charte graphique qui peut y etre ajoutée (Images & Emojis) ou encore avec des Markdowns & Liens. \n\n <:um_item1:985493065504542740> Une complète personnalisation est possible. Avec cet outils, plusieurs nouvelles fonctionnalités sont disponibles, dont la possibilités de mettre plusieurs images et ajuster la taille de votre embed grace aux barres de séparations disponibles selon les couleurs de vos choix !\n\n<:um_item1:985493065504542740>  Vous avez le choix de customiser la dispositions de vos textes dans les embeds grâce aux fields, ils peuvent etre tous allignés et/ou superposés. \n\n<:um_item1:985493065504542740> Il existe aussi 2 parties qui font office d'introductions à vos textes : Auteur & Footer. L'auteur permet d'introduire un nom & une image pour réveler l'identité du rédacteur. Et le footer est utile pour signer vos créations !\n\n<:icons_dwhite:875710295253848144> En choisisant cet outil, vous avez la possibilité d'enregister, supprimer, combiner et retrouver vos messages ! Le code de l'embed vous est aussi fournit.\n\n<:icons_dblurple:875710295258046535> Enfin, la partie nécessaire à son envoie sur Discord est l'intrégration Webhook | Intégrations que vous retrouverez dans les paramètres d'un salon et dans les paramètres de serveur.\n\nBonne utilisation à vous ! <:copinou_coucou:878308800682147850>",
                thumbnail: {
                    url: '',
                },
                fields: [],
                image: {
                    url: 'https://i.imgur.com/kdJejsd.png',
                },
                timestamp: '',
                footer: {
                    text: 'UMaestro',
                    icon_url: 'https://cdn.discordapp.com/emojis/979107826578370680.webp?size=96&quality=lossless',
                },
            },
        ],
    },
];

for (let i = 0; i < 30; i++) {
    messages.push(JSON.parse(JSON.stringify(messages[0])));
}

const selected = ref<number>();
const form = reactive<{
    sort_by: string;
    tags: string[];
}>({
    sort_by: '',
    tags: [],
});

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
</script>

<template>
    <UIModal
        ref="modal"
        size="large"
        title="Templates disponible"
        description="Liste des templates créés par la communauté ou par l'équipe de MakeBetter"
    >
        <div class="my-6 flex flex-col items-center">
            <div
                class="mb-4 flex w-full flex-col items-center gap-1 rounded-2xl border border-primary-300 bg-primary-200 bg-opacity-25 p-2 shadow-lg shadow-primary-50 dark:border-primary-600 dark:bg-primary-600 dark:shadow-primary-800 lg:flex-row"
            >
                <UIInput
                    class="h-full w-full"
                    name="template_name"
                    label="Nom du template"
                    placeholder="Rechercher un template"
                    :displayLabel="false"
                />
                <UISelect
                    class="h-full w-full lg:w-72"
                    placeholder="Trier par"
                    :options="['Date de création']"
                    v-model="form.sort_by"
                />
                <UISelect
                    class="h-full w-full lg:w-56"
                    placeholder="Tags"
                    :options="['Tous', 'Réglement', 'Annonce', 'Présentation', 'Information', 'Autre']"
                    v-model="form.tags"
                    multiple
                />
            </div>
            <div class="grid max-h-[60vh] w-full gap-3 overflow-y-auto py-2 lg:grid-cols-2">
                <div
                    v-for="(message, id) of messages"
                    :key="id"
                    class="relative h-96 w-full cursor-pointer overflow-hidden rounded-2xl border-2 p-8 duration-300 ease-out lg:w-96"
                    :class="
                        selected === id
                            ? '-translate-y-2 border-primary-500 bg-white shadow-lg shadow-primary-400 dark:bg-primary-600 dark:shadow-primary-800'
                            : 'border-transparent bg-primary-200 hover:-translate-y-2 hover:bg-white hover:shadow-md hover:shadow-primary-300 dark:bg-primary-900 dark:hover:bg-primary-600 dark:hover:shadow-primary-800'
                    "
                    @click="selected = id"
                >
                    <ToolsDiscordEmbedMakerPreview
                        :message="message"
                        :isDark="isDark"
                        class="absolute left-1/2 top-12 -translate-x-1/2"
                    />
                    <div
                        class="absolute left-0 top-0 flex h-full w-full flex-col justify-between bg-gradient-to-b from-transparent to-primary-500 p-6 dark:to-primary-700"
                    >
                        <div class="flex items-center justify-between">
                            <div
                                class="flex w-fit items-center gap-1 rounded-full bg-white p-1 pr-2 text-xs font-semibold text-black"
                            >
                                <UIAvatar
                                    size="xs"
                                    :user="{
                                        avatar: 'https://cdn.discordapp.com/avatars/307531336388968458/450ed5f16e48774180bcccdbc9867c3d.webp?size=80',
                                        username: 'briqueaubob',
                                    }"
                                />
                                briqueaubob
                            </div>
                            <nuxt-icon
                                class="icon"
                                name="verified"
                                filled
                            />
                        </div>
                        <div>
                            <div
                                class="absolute bottom-0 left-0 h-24 w-full overflow-hidden rounded-3xl bg-primary-500 opacity-75 blur-xl dark:bg-primary-700"
                            ></div>
                            <div class="relative z-10">
                                <div class="text-lg font-semibold text-white">Réglement de serveur</div>
                                <div class="mt-1 text-sm font-medium text-gray-400">
                                    Adipisicing non velit enim ex quis esse in excepteur magna tempor.
                                </div>
                                <div class="mt-2 flex items-center justify-between">
                                    <span class="text-xs font-medium text-gray-500">Créé le 12/08/2023</span>
                                    <div class="flex flex-wrap items-center gap-1">
                                        <span
                                            class="rounded-lg bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
                                        >
                                            Réglement
                                        </span>
                                        <span
                                            class="rounded-lg bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
                                        >
                                            Développement
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </UIModal>
</template>
