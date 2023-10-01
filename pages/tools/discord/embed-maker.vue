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

watch(
    () => embedMakerStore.settings.webhookUrl,
    async (value: string) => {
        if (value && value.match(/https:\/\/discord\.com\/api\/webhooks\/\d+\/\w+/)) {
            const data = await $fetch(value);
            embedMakerStore.webhook = data;
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
}

onMounted(async () => {
    if (route.query.id) {
        try {
            const { save } = await $fetchApi<{ save: any }>(`/makebetter/tools/saves/${route.query.id}`);
            if (save?.permissions?.length > 0) {
                socket.value = useSocket(route.query.id as string);
            }
            embedMakerStore.editingSave = save;
            embedMakerStore.messages = save.data;
        } catch (err) {
            router.push({
                query: {
                    id: undefined,
                },
            });
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
        (permissions?.value?.length > 0 ? permissions?.value?.find(
            (p: any) => p.userId === authStore?.user?.id && (p.permission === 'edit' || p.permission === 'admin')
        ) : embedMakerStore.editingSave?.permissions?.find(
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
                            const data = e.data;
                            embedMakerStore.messages = data;
                            embedMakerStore.editingSave = {...e, data: null};
                            $router.push({
                                query: {
                                    id: e._id,
                                }
                            })
                        }"
                    />
                    <div class="relative">
                        <div
                            class="flex flex-col gap-12 duration-300 ease-out"
                            :class="!true && 'pointer-events-none opacity-20'"
                        >
                            <ToolsCardSwitcher
                                :elements="messageEditionChildrens"
                                :current="current"
                                ref="switcher"
                            />
                            <UIButton @click="addMessage">
                                {{ $t('tools.discord.embed-maker.steps.add_message') }}
                            </UIButton>
                        </div>
                        <Transition name="fade">
                            <div
                                v-if="!hasEditPermission"
                                class="absolute top-0 z-[100] h-full w-full py-32 text-center text-lg font-semibold bg-primary-100/75 backdrop-blur-sm rounded-3xl border-2 scale-105"
                            >
                                <div
                                    class="mx-auto w-fit rounded-xl border border-dashed border-primary-500 bg-primary-500/50 px-6 py-4 backdrop-blur-sm scale-95 text-white"
                                >
                                    Tu n'as pas la permission d'éditer cette sauvegarde.
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
                <div>
                    <ToolsDiscordEmbedMakerPreviewCard @change="() => socket?.emit('valueChange', embedMakerStore.messages)" />
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.dragging {
    @apply animate-wiggle after:opacity-25;
}
</style>
