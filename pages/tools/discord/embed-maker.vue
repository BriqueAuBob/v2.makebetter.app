<script setup lang="ts">
import { useEmbedMakerStore } from '~/stores/embed-maker';
import type { User } from '~/types/user';
import useSocket from '~/composables/socket';
import { useAuthStore } from '~/stores/auth';

defineI18nRoute({
    paths: {
        fr: '/outils/discord/createur-dembeds',
    },
});

const authStore = useAuthStore();
const embedMakerStore = useEmbedMakerStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { $toast } = useNuxtApp();
const loadDiscordMessageModal = ref<any>(null);

watch(
    () => embedMakerStore.settings.webhookUrl,
    async (value: string) => {
        if (value && value.match(/https:\/\/discord\.com\/api\/webhooks\/\d+\/\w+/)) {
            embedMakerStore.webhook = await $fetch(value);
        }
    }
);

const current = ref(0);

const MessageEdition = resolveComponent('ToolsDiscordEmbedMakerMessageEdition');
const messageEditionChildrens = computed(() => {
    return embedMakerStore.messages.map((message, id) => {
        return {
            title: t('tools.discord.embed-maker.steps.edit_message_id', {
                id: id + 1,
            }),
            component: MessageEdition,
            props: {
                message,
                id,
                onUpdate: () => {
                    socket?.value?.emit('valueChange', embedMakerStore.messages);
                },
            },
        };
    });
});

const addMessage = () => {
    embedMakerStore.addMessage();
    current.value = embedMakerStore.messages.length - 1;
};

// collaboration
type Editor = User & {
    socketId: string;
    color: string;
    textColor: string;
    position: {
        x: number;
        y: number;
    };
};
const socket = ref<any>();
const editors = ref<Editor[]>([]);
const permissionsModal = ref<any>(null);
const permissions = ref<any>([]);

const onLeavePage = () => {
    if (embedMakerStore.messages.length > 0) {
        localStorage.setItem('discordEmbed', JSON.stringify(embedMakerStore.messages));
    }
    socket.value?.disconnect();
};

onMounted(async () => {
    if (route.query.id) {
        try {
            // const { save } = await $fetchApi<{ save: any }>(`/makebetter/saves/${route.query.id}`);
            // if (save?.permissions?.length > 0) {
            socket.value = useSocket(route.query.id as string);
            // }
            // embedMakerStore.editingSave = save;
            // embedMakerStore.messages = save.data;
        } catch (err) {
            console.log(err);
            // await router.push({
            //     query: {
            //         id: undefined,
            //     },
            // });
        }
    }
    window.onunload = onLeavePage;
});
onUnmounted(() => {
    window.onunload = null;
    onLeavePage();
});
watch(
    () => route.query,
    (value) => {
        if (socket.value) {
            socket.value.disconnect();
            socket.value = null;
        }
        if (value.id) {
            socket.value = useSocket(value.id as string);
        }
    }
);
watch(
    () => socket.value,
    (value) => {
        if (value) {
            value.on('onlineUsers', (users: any) => {
                editors.value = users;
            });
            value.on('valueChange', (data: any) => {
                embedMakerStore.messages = data;
            });
            value.on('change_permissions', (data: any) => {
                permissions.value = data;
            });
        }
    }
);
const editorsCursors = computed(() => {
    return editors.value.filter((editor) => editor.socketId !== socket.value?.id);
});

const hasEditPermission = computed(
    () =>
        !route.query.id ||
        !embedMakerStore.editingSave ||
        embedMakerStore.editingSave?.authorId === authStore?.user?.id ||
        (permissions?.value?.length > 0
            ? permissions?.value?.find(
                  (p: any) => p.userId === authStore?.user?.id && (p.permission === 'edit' || p.permission === 'admin')
              )
            : embedMakerStore.editingSave?.permissions?.find(
                  (p: any) => p.userId === authStore?.user?.id && (p.permission === 'edit' || p.permission === 'admin')
              ))
);

const onShare = () => {
    if (!route?.query?.id) {
        return $toast.show({ type: 'danger', title: t('tools.global.collaboration.need_to_save'), timeout: 5 });
    }
    permissionsModal.value?.open();
};

const onChangePermissions = (data: any[]) => {
    permissions.value = data;
    if (data.filter((p) => p.permission !== 'none' && p.permission !== 'admin').length > 0) {
        socket.value ??= useSocket(route.query.id as string);
    } else if (socket.value) {
        editors.value = [];
        socket.value.disconnect();
        socket.value = null;
    }
};

const loadJsonFile = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (f: any) => {
        try {
            const data = JSON.parse(f.target.result);
            embedMakerStore.messages = data;
            embedMakerStore.editingSave = false;
            router.push({
                query: {
                    id: undefined,
                },
            });
            e.target.value = null;
        } catch (err) {
            $toast.show({ type: 'danger', title: t('tools.global.load.file.error') });
        }
    };
    reader.readAsText(file);
};

useSeoMeta({
    title: "Créateur d'embeds Discord",
    ogTitle: "Créateur d'embeds Discord",
    description:
        'Créez facilement des messages personnalisés pour votre serveur Discord en y ajoutant des embeds ! Deviens le meilleur serveur de ta catégorie !',
    ogDescription:
        'Créez facilement des messages personnalisés pour votre serveur Discord en y ajoutant des embeds ! Deviens le meilleur serveur de ta catégorie !',
    ogImage: 'https://beta.makebetter.app/images/demos/embedcreator-fr.png',
    ogUrl: 'https://beta.makebetter.app/outils/discord/createur-dembeds',
    ogType: 'website',
    ogLocale: 'fr_FR',
    twitterDescription:
        'Créez facilement des messages personnalisés pour votre serveur Discord en y ajoutant des embeds ! Deviens le meilleur serveur de ta catégorie !',
    twitterTitle: "Créateur d'embeds Discord",
    twitterImage: 'https://beta.makebetter.app/images/demos/embedcreator-fr.png',
});
</script>

<template>
    <div>
        <ToolsHeader
            platform="discord"
            :title="$t('tools.discord.embed-maker.name')"
            :description="$t('tools.discord.embed-maker.description')"
            :buttonText="$t('tools.discord.embed-maker.button')"
        />
        <section
            class="container py-24"
            id="tool"
        >
            <div class="flex flex-col justify-between gap-4 xl:flex-row">
                <div>
                    <h1 class="text-2xl font-bold">
                        {{ $t('tools.discord.embed-maker.name') }}
                    </h1>
                    <h2 class="text-md mt-2 font-medium">
                        {{ $t('tools.discord.embed-maker.instructions.global') }}
                    </h2>
                </div>
                <ToolsEditors
                    :editors="editors"
                    :displayShare="true"
                    :onShare="onShare"
                />
                <LazyToolsPermissionsModal
                    ref="permissionsModal"
                    @change="onChangePermissions"
                />
            </div>
            <div
                v-for="(editor, id) in editorsCursors"
                :key="id"
                class="absolute z-[200] rounded-lg border border-zinc-200 px-2 py-1 text-xs font-semibold"
                :style="`
                    top: ${editor.position?.y + 12}px;
                    left: ${editor.position?.x + 24}px;
					background: ${editor.color};
					color: ${editor.textColor};
                `"
            >
                <NuxtIcon
                    name="cursor"
                    class="icon sm absolute -left-6 -top-2"
                    :style="`color: ${editor.color};`"
                    filled
                />
                {{ editor.username }}
            </div>
            <div class="grid gap-8 pt-12 lg:grid-cols-2">
                <div class="flex flex-col gap-12">
                    <ToolsDiscordEmbedMakerSendMethod />
                    <ToolsLoadSaveTemplate
                        :title="$t('tools.discord.embed-maker.steps.load_messages')"
                        @load="(e: any) => {
                            embedMakerStore.messages = e.data;
                            embedMakerStore.editingSave = {...e, data: null};
                            if(!e.is_public) {
                                router.push({
                                    query: {
                                        id: e.id,
                                    }
                                })
                            } else {
								router.push({
									query: {
										id: undefined,
									}
								})
							}
                        }"
                    >
                        <template #extra>
                            <div
                                class="noise relative cursor-pointer rounded-3xl border border-zinc-300 bg-gradient-to-bl from-white to-yellow-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-yellow-400 dark:from-yellow-500 dark:to-yellow-950 dark:shadow-yellow-900 dark:hover:brightness-125"
                            >
                                <NuxtIcon
                                    name="file-text"
                                    class="text-3xl"
                                />
                                <div class="mt-2 text-lg font-semibold">{{ $t('tools.global.load.file.title') }}</div>
                                <p class="mt-1 text-sm">
                                    {{ $t('tools.global.load.file.description') }}
                                </p>
                                <input
                                    type="file"
                                    class="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                                    ref="fileInput"
                                    @change="loadJsonFile"
                                    accept=".json"
                                />
                            </div>
                            <!-- <div
                                class="noise cursor-pointer rounded-3xl border border-zinc-300 bg-gradient-to-bl from-white to-pink-200 p-6 shadow-md duration-300 ease-out hover:-translate-y-1 hover:brightness-105 dark:border-pink-400 dark:from-pink-500 dark:to-pink-950 dark:shadow-pink-900 dark:hover:brightness-125"
                                @click="
                                    () => {
                                        loadDiscordMessageModal.setIsOpen(true);
                                    }
                                "
                            >
                                <NuxtIcon
                                    name="link/in"
                                    class="text-3xl"
                                />
                                <div class="mt-2 text-lg font-semibold">{{ $t('tools.global.load.url.title') }}</div>
                                <p class="mt-1 text-sm">
                                    {{ $t('tools.global.load.url.description') }}
                                </p>
                            </div> -->
                            <ToolsDiscordEmbedMakerLoadMessageFromUrl ref="loadDiscordMessageModal" />
                        </template>
                    </ToolsLoadSaveTemplate>
                    <div class="relative">
                        <div
                            class="flex flex-col gap-12 duration-300 ease-out"
                            :class="!hasEditPermission && 'pointer-events-none opacity-20'"
                        >
                            <ToolsCardSwitcher
                                :elements="messageEditionChildrens"
                                :current="current"
                                ref="switcher"
                            />
                            <UIButton
                                @click="addMessage"
                                color="light"
                            >
                                {{ $t('tools.discord.embed-maker.steps.add_message') }}
                            </UIButton>
                        </div>
                        <Transition name="fade">
                            <div
                                v-if="!hasEditPermission"
                                class="absolute top-0 z-[100] h-full w-full scale-105 rounded-3xl border-2 bg-primary-100/75 py-32 text-center text-lg font-semibold backdrop-blur-sm"
                            >
                                <div
                                    class="mx-auto w-fit scale-95 rounded-xl border border-dashed border-primary-500 bg-primary-500/50 px-6 py-4 text-white backdrop-blur-sm"
                                >
                                    Tu n'as pas la permission d'éditer cette sauvegarde.
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
                <div>
                    <ToolsDiscordEmbedMakerPreviewCard
                        @change="() => socket?.emit('valueChange', embedMakerStore.messages)"
                    />
                </div>
            </div>
        </section>
    </div>
</template>
