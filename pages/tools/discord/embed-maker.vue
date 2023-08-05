<script setup lang="ts">
import { useNuxtApp } from '#app';
import { _primary } from '#tailwind-config/theme/colors';
import type { DiscordWebhookMessage, DiscordWebhook, Component, DiscordChannel } from 'types/discord';
import { themes, ThemeType } from '@/composables/discordThemes';

const MessageEdition = resolveComponent('ToolsDiscordEmbedMakerMessageEdition');
const { t } = useI18n();
const { $toast } = useNuxtApp();

const editors = [
    {
        username: 'Brique au bob',
        avatar: 'https://cdn.discordapp.com/avatars/307531336388968458/450ed5f16e48774180bcccdbc9867c3d.png?size=256',
    },
    {
        username: 'Brique au bob',
        avatar: 'https://cdn.discordapp.com/avatars/307531336388968458/450ed5f16e48774180bcccdbc9867c3d.png?size=256',
    },
    {
        username: 'Brique au bob',
        avatar: 'https://cdn.discordapp.com/avatars/307531336388968458/450ed5f16e48774180bcccdbc9867c3d.png?size=256',
    },
];

type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const switcher = ref();
const current = ref<number>(0);
const webhook = ref<DiscordWebhook | null>(null);

const channelModal = ref<UIModalType>();
const themeModal = ref<UIModalType>();
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
    webhook_url:
        'https://discord.com/api/webhooks/1127532943238246440/6Bi9R6ynUV9Zu9aZrukyB4VHU-Zikv2RaV4nIFOrVJCQ9Nia0I4sbAc33YW33HYxQ_dR',
    messages: [] as DiscordWebhookMessage[],
    thread_name: '',
    thread_id: '',
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
            title: t('tools.discord.embed.steps.edit_message_id', {
                id: id + 1,
            }),
            component: MessageEdition,
            props: {
                message,
                webhookCreatedByBot: webhook.value?.application_id !== null,
                setMessage: (message: DiscordWebhookMessage) => setMessage(id, message),
            },
        };
    });
});

const setMessage = (id: number, message: DiscordWebhookMessage) => {
    form.messages[id] = message;
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
    }
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
        title: t('tools.discord.embed.export.copied.title'),
        message: t('tools.discord.embed.export.copied.message', form.messages.length),
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
const onShare = () => {
    // url params
    router.push({
        query: {
            id: 'abcde',
            token: 'abchudbzg',
        },
    });
};
</script>

<template>
    <div>
        <ToolsHeader
            platform="discord"
            :title="$t('tools.discord.embed.name')"
            :description="$t('tools.discord.embed.description')"
            :buttonText="$t('tools.discord.embed.button')"
        />
        <section class="container py-24">
            <div class="flex justify-between">
                <div>
                    <h1 class="text-2xl font-bold">
                        {{ $t('tools.discord.embed.name') }}
                    </h1>
                    <h2 class="text-md mt-2 font-medium">
                        {{ $t('tools.discord.embed.instructions.global') }}
                    </h2>
                </div>
                <ToolsEditors
                    :editors="editors"
                    :displayShare="true"
                    :onShare="onShare"
                />
            </div>
            <div class="grid gap-8 pt-12 md:grid-cols-2">
                <div class="flex flex-col gap-12">
                    <div>
                        <div class="mb-2 font-display text-lg font-semibold">
                            Commence par entrer l'URL de ton Webhook
                        </div>
                        <UIInput
                            v-model="form.webhook_url"
                            type="password"
                            name="webhook_url"
                            label="Webhook URL"
                            placeholder="https://discord.com/api/v10/webhooks/..."
                            secure
                        />
                    </div>
                    <ToolsLoadSaveTemplate :title="$t('tools.discord.embed.steps.load_messages')" />
                    <ToolsCardSwitcher
                        :elements="elements"
                        :current="current"
                        ref="switcher"
                    />
                    <UIButton @click="addMessage">
                        {{ $t('tools.discord.embed.steps.add_message') }}
                    </UIButton>
                </div>
                <div>
                    <UICard
                        class="sticky top-4"
                        :class="theme.current.isDark ? 'dark' : ''"
                        noHover
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
                            <div class="flex items-center justify-between border-b p-8 dark:border-b-primary-800">
                                <div>
                                    <h3 class="mb-1 text-lg">Prévisualisation</h3>
                                    <p class="text-sm text-gray-700">Vois à quoi ressemblera ton embed !</p>
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
                                            class="relative flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-100 p-4 text-black after:absolute after:inset-0 after:rounded-full after:border-2 after:text-lg after:duration-300 after:ease-out after:content-[''] dark:border-gray-800"
                                            @click="theme.selected = discordTheme"
                                            :class="
                                                theme.selected.name === discordTheme.name
                                                    ? 'after:border-primary-500 after:bg-white after:bg-opacity-30'
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
                        <TransitionGroup
                            name="fadescale"
                            tag="div"
                            class="flex flex-col gap-4 pt-5"
                        >
                            <ToolsDiscordEmbedMakerPreview
                                v-for="(message, key) in form.messages"
                                :key="key"
                                :message="message"
                                :isDark="
                                    theme.current.name === 'Default' ? colorMode.value === 'dark' : theme.current.isDark
                                "
                                @change="(message: any) => {
									console.log(message)
                            		form.messages[current] = message;
									switcherRerender();
								}"
                            />
                        </TransitionGroup>
                        <template #footer>
                            <div class="flex justify-end gap-2 border-t p-8 dark:border-t-primary-800">
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
                                    :description="$t('tools.discord.embed.export.description')"
                                    ref="exportModal"
                                    :okText="$t('tools.discord.embed.export.copy_code')"
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
                                            class="rounded-r-2xl border-2 border-gray-200 border-opacity-50 bg-primary-500 p-2 text-white hover:bg-primary-400 dark:border-primary-600"
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
                                                class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                            >
                                                <HeadlessMenuItem v-slot="{ active }">
                                                    <button
                                                        :class="[
                                                            active ? 'bg-primary-500 text-white' : 'text-gray-900',
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
                                                            active ? 'bg-primary-500 text-white' : 'text-gray-900',
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
                                        :title="$t('tools.discord.embed.send_in_thread.title')"
                                        :description="$t('tools.discord.embed.send_in_thread.description')"
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
