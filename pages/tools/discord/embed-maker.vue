<script setup lang="ts">
import draggable from 'vuedraggable';
import { useNuxtApp } from '#app';
import { _primary } from '#tailwind-config/theme/colors';
import type { DiscordWebhookMessage, DiscordWebhook, Component, DiscordChannel } from '~/types/discord';
import { themes, ThemeType } from '@/composables/discordThemes';
import useSocket from '~/composables/socket';
import { Socket } from 'socket.io-client';
import type { User } from '~/types/user';
import { getDiscordMessageSaveTags } from '~/utils/embed_maker';
import { useAuthStore } from '~/stores/auth';

const MessageEdition = resolveComponent('ToolsDiscordEmbedMakerMessageEdition');
const { t } = useI18n();
const { $toast } = useNuxtApp();

type Editor = User & {
    socketId: string;
    color: string;
    textColor: string;
    position: {
        x: number;
        y: number;
    };
};
const editors = ref<Editor[]>([]);

type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const switcher = ref();
const current = ref<number>(0);
const webhook = ref<DiscordWebhook | null>(null);

const channelModal = ref<UIModalType>();
const themeModal = ref<UIModalType>();
const saveModal = ref<UIModalType>();
const permissionsModal = ref<{
    open: () => void;
}>();
const modifyCurrentSave = ref<boolean>();
const colorMode = useColorMode();
const theme = reactive({
    current: themes[0],
    selected: themes[0],
});

const exportModal = ref<UIModalType>();
const exportTypes = ['JSON', 'Discord.js', 'Discord.js - EmbedBuilder()'];
type ExportType = (typeof exportTypes)[number];
const exportType = ref<ExportType>('JSON');

const defaultMessage: DiscordWebhookMessage = {
    username: '',
    avatar_url: '',
    content: '',
    embeds: [],
    components: [
        {
            type: 1,
            components: [],
        },
    ],
    files: null,
};

const form = reactive({
    webhook_url: '',
    bot_token: '',
    messages: [] as DiscordWebhookMessage[],
    thread_name: '',
    thread_id: '',
    guildSelected: null as any | null,
    channelSelected: null as DiscordChannel | null,
});

const formSave = reactive({
    name: '',
    description: '',
    tags: [] as string[],
    isPublic: false,
});

onMounted(() => {
    form.messages.push({
        ...defaultMessage,
        username: webhook.value?.name ?? 'MakeBetter',
        avatar_url:
            webhook.value?.avatar ??
            'https://cdn.discordapp.com/avatars/983094528791683182/3ca96d35287c9c560f435c143f4b3448.webp?size=128',
        embeds: [
            {
                id: 'IUFHUIdg8987989fg7zg7fzg',
                title: 'MakeBetter',
                description:
                    'MakeBetter est un bot Discord qui permet de faire des sondages, des giveaways, des quiz et bien plus encore !',
                url: 'https://makebetter.app',
                color: _primary['500'],
                fields: [],
                author: {
                    name: 'Informations',
                    url: '',
                    icon_url: '',
                },
                footer: {
                    text: 'MakeBetter',
                    icon_url: '',
                },
                image: {
                    url: '',
                },
                thumbnail: {
                    url: '',
                },
                timestamp: '',
            },
        ],
    });
    fetchWebhook();
});

const elements = computed(() => {
    return form.messages.map((message, id) => {
        return {
            title: t('tools.discord.embed-maker.steps.edit_message_id', {
                id: id + 1,
            }),
            component: MessageEdition,
            props: {
                message,
                webhookCreatedByBot: webhook.value?.application_id !== null,
                setMessage: (message: DiscordWebhookMessage) => setMessage(id, message),
                sendWithBot: !sendWithWebhook.value,
            },
        };
    });
});

const setMessage = (id: number, message: DiscordWebhookMessage) => {
    form.messages[id] = message;
    socket.value?.emit('valueChange', form.messages);
};

const addMessage = () => {
    form.messages.push({
        ...defaultMessage,
        username: webhook.value?.name ?? '',
        avatar_url: webhook.value?.avatar ?? 'http://localhost:3333/images/tools/discord/default_avatar.png',
    });
    current.value = form.messages.length - 1;
};

const removeEmptyFields = (object: any) => {
    for (const key in object) {
        if (object[key] === '' || key === 'id') {
            delete object[key];
        }
        if (typeof object[key] === 'object') {
            removeEmptyFields(object[key]);
        }
        if (key === 'color' && typeof object[key] === 'string') {
            object[key] = parseInt(
                object[key] ? (object[key] === 'transparent' ? '2b2d31' : object[key].replace('#', '')) : '0',
                16
            );
        }
    }
};

const sendMessage = async () => {
    for (const message of form.messages) {
        const formMessage = new FormData();
        const messageCopy = JSON.parse(JSON.stringify(message));
        removeEmptyFields(messageCopy);
        if (messageCopy.components[0].components.length === 0) {
            delete messageCopy.components;
        } else {
            for (const component of messageCopy.components[0].components) {
                if (component.style === 5) {
                    delete component.custom_id;
                } else {
                    if (sendWithWebhook.value) {
                        $toast.show({
                            title: 'Attention !',
                            message:
                                "Tu dois utiliser un bot pour personnaliser l'apparence des boutons. Nous avons remis le style par défaut.",
                            type: 'warning',
                            timeout: 5,
                        });
                        component.style = 5;
                        delete component.custom_id;
                        component.url = component.url ?? 'https://makebetter.app';
                    } else {
                        delete component.url;
                    }
                }
            }
        }
        messageCopy.thread_name = form.thread_name;
        formMessage.append('payload_json', JSON.stringify(messageCopy));
        if (message.files) {
            let i = 0;
            for (const file of message.files) {
                formMessage.append(`file${i}`, await transformFileIntoBlob(file as File), (file as File).name);
                i++;
            }
        }
        if (sendWithWebhook.value) {
            await $fetch(form.webhook_url + '?wait=true' + (form.thread_id ? `&thread_id=${form.thread_id}` : ''), {
                method: 'POST',
                body: formMessage,
            }).catch((err) => {
                const data = err.data;
                if (data) {
                    for (const error of Object.values(data)) {
                        $toast.show({
                            title: t('errors.encountered'),
                            message: error as string,
                            type: 'danger',
                            timeout: 5,
                        });
                    }
                } else {
                    $toast.show({
                        title: t('errors.encountered'),
                        type: 'danger',
                        timeout: 5,
                    });
                }
            });
        } else {
            try {
                if (useCustomBot.value && form.bot_token) {
                    formMessage.append('token', form.bot_token);
                }
                await $fetch(
                    `/api/tools/discord/embed-maker/guilds/${form.guildSelected?.id}/channels/${form.channelSelected?.id}`,
                    {
                        method: 'POST',
                        body: formMessage,
                        headers: {
                            Authorization: 'Bearer ' + useAuthStore().token,
                        },
                    }
                );
            } catch (err: any) {
                $toast.show({
                    title: t('errors.encountered'),
                    message: t('tools.discord.embed-maker.send_with_bot.verify_bot_access_channel'),
                    type: 'danger',
                    timeout: 5,
                });
            }
        }
    }
};

const saveMessages = async () => {
    useFetchApi('/makebetter/tools/saves', {
        method: 'POST',
        body: {
            type: 'discord_embed',
            name: formSave.name,
            description: formSave.description,
            tags: formSave.tags,
            data: form.messages,
            isPublic: formSave.isPublic,
        },
    })
        .then((res) => {
            $toast.show({
                title: t('tools.global.save.success.title'),
                message: t('tools.global.save.success.message'),
                type: 'success',
                timeout: 5,
            });
        })
        .catch((err) => {
            $toast.show({
                title: t('tools.discord.embed-maker.save.error.title'),
                message: t('tools.discord.embed-maker.save.error.message'),
                type: 'danger',
                timeout: 5,
            });
        });
};

const updateMessages = async () => {
    useFetchApi('/makebetter/tools/saves/' + route?.query?.id, {
        method: 'PUT',
        body: {
            type: 'discord_embed',
            name: formSave.name,
            description: formSave.description,
            tags: formSave.tags,
            data: form.messages,
            isPublic: formSave.isPublic,
        },
    })
        .then((res) => {
            $toast.show({
                title: t('tools.global.save.success.title'),
                message: t('tools.global.save.success.message'),
                type: 'success',
                timeout: 5,
            });
        })
        .catch((err) => {
            $toast.show({
                title: t('tools.discord.embed-maker.save.error.title'),
                message: t('tools.discord.embed-maker.save.error.message'),
                type: 'danger',
                timeout: 5,
            });
        });
};

const fetchWebhook = () => {
    fetch(form.webhook_url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(async (data: DiscordWebhook) => {
            webhook.value = data;
            for (const message of form.messages) {
                if (!message.username || message.username === '') {
                    message.username = data.name;
                }
                if (!message.avatar_url) {
                    message.avatar_url = data.avatar ?? 'http://localhost:3333/images/tools/discord/default_avatar.png';
                }
            }
            if (data.channel_id) {
                const { channel } = (await $fetchApi('/discord/channels/' + data.channel_id)) as {
                    channel: DiscordChannel;
                };
                webhook.value = {
                    ...webhook.value,
                    channel,
                };
            }
        });
};

const previewCard = ref();
const onSwitchTheme = (t: ThemeType) => {
    theme.current = t;
    const element = previewCard.value.$el as HTMLDivElement;
    const discordTheme = themes.find((discordTheme) => discordTheme.name === theme.current.name);
    if (discordTheme) {
        for (const [key, value] of Object.entries(discordTheme.css)) {
            element.style.setProperty(key, value);
        }
    }
};

watch(
    () => form.webhook_url,
    () => fetchWebhook()
);

watch(current, (value) => {
    scrollTo({
        behavior: 'smooth',
        top: switcher?.value?.$el?.offsetTop - 16 ?? 0,
    });
});

const generatedCode = computed(() => {
    return generateCode(getDriver(exportType.value), form.messages, form.webhook_url);
});

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value);
    $toast.show({
        title: t('tools.discord.embed-maker.export.copied.title'),
        message: t('tools.discord.embed-maker.export.copied.message', form.messages.length),
        type: 'success',
        timeout: 8,
    });
    return true;
};

const renderSwitcher = ref(true);
const switcherRerender = async () => {
    renderSwitcher.value = false;
    await nextTick();
    renderSwitcher.value = true;
};

const router = useRouter();
const route = useRoute();
const onShare = () => {
    if (!route?.query?.id) {
        return $toast.show({ type: 'danger', title: t('tools.global.collaboration.need_to_save'), timeout: 5 });
    }
    permissionsModal.value?.open();
};

const onLeavePage = () => {
    if (form.messages.length > 0) {
        localStorage.setItem('discordEmbed', JSON.stringify(form.messages));
    }
    socket.value?.disconnect();
};

const socket = ref<any>();
const messages = computed(() => {
    return form.messages;
});
const saveRef = ref<any>();
onMounted(async () => {
    if (route.query.id) {
        try {
            const { save } = await $fetchApi<{ save: any }>(`/makebetter/tools/saves/${route.query.id}`);
            if (save?.permissions?.length > 0) {
                socket.value = useSocket(route.query.id as string);
            }
            saveRef.value = save;
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
                form.messages = data;
            });
            value.on('change_permissions', (permissions: any) => {
                saveRef.value.permissions = permissions;
            });
        }
    }
);

const editorsCursors = computed(() => {
    return editors.value.filter((editor) => editor.socketId !== socket.value?.id);
});

const onChangePermissions = (permissions: any[]) => {
    saveRef.value.permissions = permissions;
    if (permissions.filter((p) => p.permission !== 'none' && p.permission !== 'admin').length > 0) {
        socket.value ??= useSocket(route.query.id as string);
    } else if (socket.value) {
        editors.value = [];
        socket.value.disconnect();
        socket.value = null;
    }
};

const authStore = useAuthStore();
const hasEditPermission = computed(
    () =>
        !route.query.id ||
        !saveRef ||
        saveRef.value?.authorId === authStore?.user?.id ||
        saveRef.value?.permissions?.find(
            (p: any) => p.userId === authStore?.user?.id && (p.permission === 'edit' || p.permission === 'admin')
        )
);

const sendWithWebhook = ref(true);
const useCustomBot = ref(true);

defineI18nRoute({
    paths: {
        fr: '/outils/discord/createur-dembeds',
    },
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
                    <div>
                        <ToolsDiscordEmbedMakerSendMethod
                            :form="form"
                            :sendWithWebhook="sendWithWebhook"
                            :useCustomBot="useCustomBot"
                            @change="(e: any) => {
                                if(e.hasOwnProperty('sendWithWebhook')) {
                                    sendWithWebhook = e.sendWithWebhook;
                                }
                                if(e.hasOwnProperty('useCustomBot')) {
                                    useCustomBot = e.useCustomBot;
                                }
                                if(e.hasOwnProperty('form')) {
                                    form.webhook_url = e.form.webhook_url;
                                    form.bot_token = e.form.bot_token;
                                }
                            }"
                        />
                    </div>
                    <ToolsLoadSaveTemplate
                        :title="$t('tools.discord.embed-maker.steps.load_messages')"
                        @load="
                            (e: any, isPersonal: boolean) => {
								router.push({
									query: {
										id: isPersonal ? e._id : undefined,
									}
								})
                                form.messages = e.data;
								formSave.name = e.name;
								formSave.description = e.description;
								formSave.tags = e.tags;
								formSave.isPublic = e.isPublic;
								saveRef = e;
                                switcherRerender();
                            }
                        "
                    />
                    <div class="relative">
                        <div
                            class="flex flex-col gap-12 duration-300 ease-out"
                            :class="!hasEditPermission && 'pointer-events-none opacity-20'"
                        >
                            <ToolsCardSwitcher
                                :elements="elements"
                                :current="current"
                                ref="switcher"
                                @use-bot="sendWithWebhook = false"
                            />
                            <UIButton @click="addMessage">
                                {{ $t('tools.discord.embed-maker.steps.add_message') }}
                            </UIButton>
                        </div>
                        <Transition name="fade">
                            <div
                                v-if="!hasEditPermission"
                                class="absolute top-0 z-[100] h-full w-full py-32 text-center text-lg font-semibold"
                            >
                                <div
                                    class="mx-auto w-fit rounded-xl border border-dashed border-primary-500 bg-primary-500/50 px-6 py-4 backdrop-blur-sm"
                                >
                                    Tu n'as pas la permission d'éditer cette sauvegarde.
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
                <div>
                    <UICard
                        class="sticky top-4"
                        :class="theme.current.isDark ? 'dark' : ''"
                        noHover
                        noPadding
                        noPb
                        ref="previewCard"
                        :contentStyle="
                            theme.current.noOverlay
                                ? 'background: var(--discord-background);'
                                : `
							background: linear-gradient(
										rgb(${theme.current.isDark ? '0 0 0/0.8' : '255 255 255/0.9'}),
										rgb(${theme.current.isDark ? '0 0 0/0.8' : '255 255 255/0.9'})
									)
									fixed 0 0 / cover,
								var(--discord-background) fixed 0 0 / cover;
							`
                        "
                    >
                        <template #header>
                            <div class="flex items-center justify-between border-b p-8 dark:border-b-zinc-800">
                                <div>
                                    <h3 class="mb-1 text-lg">Prévisualisation</h3>
                                    <p class="text-sm text-zinc-600">Vois à quoi ressemblera ton embed !</p>
                                </div>
                                <UIButton
                                    size="sm"
                                    @click="
										() => {
											($refs.themeModal as UIModalType).setIsOpen(true);
										}
									"
                                >
                                    {{ $t('tools.global.theme.title') }}
                                </UIButton>
                                <UIModal
                                    :title="$t('tools.global.theme.title')"
                                    :description="$t('tools.global.theme.description')"
                                    ref="themeModal"
                                    :onApply="() => onSwitchTheme(theme.selected)"
                                >
                                    <div class="grid grid-cols-6 gap-2 py-4">
                                        <div
                                            v-for="(discordTheme, id) of themes"
                                            :key="id"
                                            class="relative flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-100 p-4 text-black after:absolute after:inset-0 after:rounded-full after:border-2 after:text-lg after:duration-300 after:ease-out after:content-[''] dark:border-zinc-800"
                                            @click="theme.selected = discordTheme"
                                            :class="
                                                theme.selected.name === discordTheme.name
                                                    ? 'after:border-zinc-500 after:bg-white after:bg-opacity-30'
                                                    : 'after:border-transparent after:bg-opacity-0 after:text-transparent'
                                            "
                                            :style="`background: ${discordTheme.css['--discord-background']}`"
                                        >
                                            <HeadlessTransitionRoot
                                                :show="theme.selected.name === discordTheme.name"
                                                appear
                                            >
                                                <HeadlessTransitionChild
                                                    name="fade"
                                                    appear
                                                >
                                                    <NuxtIcon
                                                        name="check"
                                                        class="icon"
                                                        :style="`color: ${!discordTheme.isDark ? 'black' : 'white'}`"
                                                    />
                                                </HeadlessTransitionChild>
                                            </HeadlessTransitionRoot>
                                        </div>
                                    </div>
                                </UIModal>
                            </div>
                        </template>
                        <draggable
                            v-model="form.messages"
                            :drag-options="{
                                animation: 200,
                            }"
                            tag="div"
                            class="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-8 py-8"
                            :itemKey="'id'"
                            ghost-class="dragging"
                            id="messages_draggable"
                        >
                            <template #item="{ element }">
                                <ToolsDiscordEmbedMakerPreview
                                    class="cursor-pointer duration-300 ease-out hover:animate-pulse"
                                    :message="element"
                                    :isDark="
                                        theme.current.name === 'Default'
                                            ? colorMode.value === 'dark'
                                            : theme.current.isDark
                                    "
                                    @change="(message: any) => {
										form.messages[current] = message;
										switcherRerender();
									}"
                                />
                            </template>
                        </draggable>
                        <template #footer>
                            <div class="flex flex-wrap justify-end gap-2 border-t p-8 dark:border-t-zinc-800">
                                <UIButton
                                    size="sm"
                                    color="light"
                                    @click="() => {
										($refs.saveModal as UIModalType).setIsOpen(true);
									}"
                                >
                                    {{ $t('buttons.save') }}
                                </UIButton>
                                <UIModal
                                    :title="$t('tools.discord.embed-maker.save.title', { count: form.messages.length })"
                                    :description="
                                        $t('tools.discord.embed-maker.save.description', {
                                            count: form.messages.length,
                                        })
                                    "
                                    ref="saveModal"
                                    :onApply="modifyCurrentSave ? updateMessages : saveMessages"
                                    :okText="$t('buttons.save')"
                                    size="large"
                                    :noButtons="!!route.query.id && !modifyCurrentSave"
                                    @close="
                                        () => {
                                            modifyCurrentSave = false;
                                        }
                                    "
                                >
                                    <div
                                        class="grid gap-4 pb-2 pt-6 lg:grid-cols-2"
                                        v-if="!route.query.id || modifyCurrentSave"
                                    >
                                        <div class="flex flex-col gap-2">
                                            <div class="text-md font-semibold text-zinc-500">
                                                {{ $t('tools.discord.embed-maker.save.infos') }}
                                            </div>
                                            <UIInput
                                                v-model="formSave.name"
                                                :placeholder="
                                                    $t('tools.discord.embed-maker.save.form.name.placeholder')
                                                "
                                                name="name"
                                                :label="$t('tools.discord.embed-maker.save.form.name.label')"
                                                required
                                            />
                                            <UIInput
                                                v-model="formSave.description"
                                                :placeholder="
                                                    $t('tools.discord.embed-maker.save.form.description.placeholder')
                                                "
                                                name="description"
                                                :label="$t('tools.discord.embed-maker.save.form.description.label')"
                                            />
                                            <UISelect
                                                v-model="formSave.tags"
                                                placeholder="Tags"
                                                :options="getDiscordMessageSaveTags()"
                                                name="tags"
                                                label="Tags"
                                                multiple
                                            />
                                            <UIToggle
                                                v-model="formSave.isPublic"
                                                name="isPublic"
                                                :label="$t('tools.discord.embed-maker.save.should_be_public')"
                                            />
                                        </div>
                                        <ToolsDiscordEmbedMakerCardSave
                                            :template="{
                                                name: formSave.name,
                                                description: formSave.description,
                                                tags: formSave.tags,
                                                data: form.messages,
                                                author: useAuthStore().user,
                                                createdAt: new Date(),
                                            }"
                                        />
                                    </div>
                                    <div
                                        class="grid gap-4 pb-2 pt-6 lg:grid-cols-2"
                                        v-else
                                    >
                                        <UIButton
                                            @click="
                                                () => {
                                                    router.push({
                                                        query: {
                                                            id: undefined,
                                                        },
                                                    });
                                                    formSave.name = '';
                                                    formSave.description = '';
                                                    formSave.tags = [];
                                                    formSave.isPublic = false;
                                                    modifyCurrentSave = true;
                                                }
                                            "
                                            >Créer une nouvelle sauvegarde</UIButton
                                        >
                                        <UIButton
                                            @click="
                                                () => {
                                                    modifyCurrentSave = true;
                                                }
                                            "
                                            >Modifier la sauvegarde</UIButton
                                        >
                                    </div>
                                </UIModal>
                                <UIButton
                                    size="sm"
                                    color="light"
                                    @click="() => {
										($refs.exportModal as UIModalType).setIsOpen(true);
									}"
                                >
                                    {{ $t('buttons.export') }}
                                </UIButton>
                                <UIModal
                                    :title="$t('buttons.export')"
                                    :description="$t('tools.discord.embed-maker.export.description')"
                                    ref="exportModal"
                                    :okText="$t('tools.discord.embed-maker.export.copy_code')"
                                    :onApply="copyCode"
                                >
                                    <div class="py-2">
                                        <UISelect
                                            v-model="exportType"
                                            name="exportType"
                                            label="Format de l'export"
                                            :options="exportTypes"
                                        />
                                        <UICode
                                            class="mt-4"
                                            :code="generatedCode"
                                        ></UICode>
                                    </div>
                                </UIModal>
                                <UIGroupButton>
                                    <UIButton
                                        size="sm"
                                        @click="sendMessage"
                                    >
                                        Envoyer
                                        <NuxtIcon
                                            name="paper_plane"
                                            class="icon"
                                        />
                                    </UIButton>
                                    <HeadlessMenu
                                        as="div"
                                        class="relative z-20"
                                    >
                                        <HeadlessMenuButton
                                            class="rounded-r-2xl border-2 border-zinc-200 border-opacity-50 bg-primary-500 p-2 text-white hover:bg-primary-400 dark:border-zinc-700"
                                        >
                                            <NuxtIcon
                                                name="chevron/down"
                                                class="icon"
                                            />
                                        </HeadlessMenuButton>
                                        <transition
                                            enter-active-class="transition duration-100 ease-out"
                                            enter-from-class="transform scale-95 opacity-0"
                                            enter-to-class="transform scale-100 opacity-100"
                                            leave-active-class="transition duration-75 ease-in"
                                            leave-from-class="transform scale-100 opacity-100"
                                            leave-to-class="transform scale-95 opacity-0"
                                        >
                                            <HeadlessMenuItems
                                                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <HeadlessMenuItem v-slot="{ active }">
                                                    <button
                                                        :class="[
                                                            active ? 'bg-primary-500 text-white' : 'text-zinc-900',
                                                            'group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm',
                                                        ]"
                                                        @click="() => {
															($refs.channelModal as UIModalType).setIsOpen(true);
														}"
                                                    >
                                                        Send in a thread
                                                    </button>
                                                </HeadlessMenuItem>
                                                <HeadlessMenuItem v-slot="{ active }">
                                                    <button
                                                        :class="[
                                                            active ? 'bg-primary-500 text-white' : 'text-zinc-900',
                                                            'group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm',
                                                        ]"
                                                        @click="sendMessage"
                                                    >
                                                        Send normally
                                                    </button>
                                                </HeadlessMenuItem>
                                            </HeadlessMenuItems>
                                        </transition>
                                    </HeadlessMenu>
                                    <UIModal
                                        :title="$t('tools.discord.embed-maker.send_in_thread.title')"
                                        :description="$t('tools.discord.embed-maker.send_in_thread.description')"
                                        ref="channelModal"
                                        :onApply="sendMessage"
                                        :okText="$t('buttons.send')"
                                    >
                                        <UIInput
                                            v-model="form.thread_id"
                                            placeholder="thread id"
                                            name="threadId"
                                            label="Thread ID"
                                        />
                                        <UIInput
                                            v-model="form.thread_name"
                                            placeholder="thread name"
                                            name="threadName"
                                            label="Thread name"
                                        />
                                    </UIModal>
                                </UIGroupButton>
                            </div>
                        </template>
                    </UICard>
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
