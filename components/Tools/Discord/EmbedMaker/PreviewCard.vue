<script setup lang="ts">
import draggable from 'vuedraggable';
import { useEmbedMakerStore } from '~/stores/embed-maker';
import { useAuthStore } from '~/stores/auth';

type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const embedMakerStore = useEmbedMakerStore();
const { $toast } = useNuxtApp();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Theme switching
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');
const theme = reactive({
    current: themes[0],
    selected: themes[0],
});
const previewCard = ref<any>(null);
const themeModal = ref(null);

const onSwitchTheme = (t: ThemeType) => {
    theme.current = t;
    const element = previewCard?.value?.$el as HTMLDivElement;
    const discordTheme = themes.find((discordTheme) => discordTheme.name === theme.current.name);
    if (discordTheme) {
        for (const [key, value] of Object.entries(discordTheme.css)) {
            element.style.setProperty(key, value);
        }
    }
};

// Exporting code
const exportModal = ref<UIModalType>();
const exportTypes = ['JSON', 'Discord.js', 'Discord.js - EmbedBuilder()'];
type ExportType = (typeof exportTypes)[number];
const exportType = ref<ExportType>('JSON');

const generatedCode = computed(() => {
    return generateCode(getDriver(exportType.value), embedMakerStore.messages, embedMakerStore.settings.webhookUrl);
});

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value);
    $toast.show({
        title: t('tools.discord.embed-maker.export.copied.title'),
        message: t('tools.discord.embed-maker.export.copied.message', embedMakerStore.messages.length),
        type: 'success',
        timeout: 8,
    });
    return true;
};

// Save messages
const modifyCurrentSave = ref<boolean>();
const saveModal = ref<UIModalType>();
const formSave = reactive({
    name: '',
    description: '',
    tags: [] as string[],
    isPublic: false,
});

const saveMessages = async () => {
    useFetchApi('/makebetter/saves', {
        method: 'POST',
        body: {
            type: 'discord_embed',
            name: formSave.name,
            description: formSave.description,
            tags: formSave.tags,
            data: embedMakerStore.messages,
            isPublic: formSave.isPublic,
        },
    })
        .then((res: any) => {
            modifyCurrentSave.value = true;
            embedMakerStore.editingSave = res?.data?.value;
            router.push({
                query: {
                    id: res?.data?.value?._id,
                },
            });
            $toast.show({
                title: t('tools.global.save.success.title'),
                message: t('tools.global.save.success.message'),
                type: 'success',
                timeout: 5,
            });
        })
        .catch((err) => {
            console.log(err);
            $toast.show({
                title: t('tools.discord.embed-maker.save.error.title'),
                message: t('tools.discord.embed-maker.save.error.message'),
                type: 'danger',
                timeout: 5,
            });
        });
};

const updateMessages = async () => {
    useFetchApi('/makebetter/saves/' + route?.query?.id, {
        method: 'PUT',
        body: {
            type: 'discord_embed',
            name: formSave.name,
            description: formSave.description,
            tags: formSave.tags,
            data: embedMakerStore.messages,
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

const sendMessages = () => {
    embedMakerStore.sendMessages();
};

const displayPreview = ref(false);
const togglePreview = () => {
    displayPreview.value = !displayPreview.value;
    if (displayPreview.value) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
};

onMounted(() => {
    if (process.client) {
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && displayPreview.value) {
                togglePreview();
            }
        });
    }
});

defineEmits(['change']);
</script>

<template>
    <UICard
        class="lg:pointer-events-auto lg:sticky lg:top-4 lg:opacity-100"
        :class="
            displayPreview
                ? 'pointer-events-auto fixed left-0 top-0 z-[120] block h-full w-full rounded-none opacity-100'
                : 'pointer-events-none opacity-0'
        "
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
            <div class="flex justify-end p-4 lg:hidden">
                <button class="p-4">
                    <NuxtIcon
                        name="close"
                        class="icon"
                        @click="togglePreview"
                    />
                </button>
            </div>
            <div class="flex items-center justify-between border-b px-8 pb-8 lg:pt-8 dark:border-b-zinc-800">
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
            </div>
        </template>
        <div class="max-h-[70vh] overflow-y-auto px-8 py-8">
            <ClientOnly>
                <draggable
                    v-model="embedMakerStore.messages"
                    :drag-options="{
                        animation: 200,
                    }"
                    tag="div"
                    :itemKey="'id'"
                    ghost-class="dragging"
                    id="messages_draggable"
                    class="flex flex-col gap-4"
                >
                    <template #item="{ element }">
                        <ToolsDiscordEmbedMakerPreview
                            class="cursor-pointer duration-300 ease-out hover:animate-pulse"
                            :message="element"
                            :isDark="theme.current.name === 'Default' ? isDark : theme.current.isDark"
                            @change="$emit('change')"
                        />
                    </template>
                </draggable>
            </ClientOnly>
            <div class="flex gap-2 pt-4">
                <UIButton
                    @click="embedMakerStore.addMessage"
                    size="sm"
                    color="color-mode"
                >
                    {{ $t('tools.discord.embed-maker.steps.add_message') }}
                </UIButton>
            </div>
        </div>
        <template #footer>
            <div class="flex flex-wrap justify-end gap-2 border-t p-8 dark:border-t-zinc-800">
                <UIButton
                    size="sm"
                    color="light"
                    @click="
                        () => {
                            ($refs.saveModal as UIModalType).setIsOpen(true);
                        }
                    "
                    :disabled="authStore.user === null"
                >
                    {{ $t('buttons.save') }}
                </UIButton>
                <UIButton
                    size="sm"
                    color="light"
                    @click="() => {
                        ($refs.exportModal as UIModalType).setIsOpen(true);
                    }"
                >
                    {{ $t('buttons.export') }}
                </UIButton>
                <UIButton
                    size="sm"
                    @click="sendMessages"
                >
                    Envoyer
                    <NuxtIcon
                        name="paper_plane"
                        class="icon"
                    />
                </UIButton>
            </div>
        </template>
    </UICard>

    <!---------- Modals ----------->
    <!--- Modal theme switching --->
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

    <!-- Modal code generation -->
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

    <!-- Save modal -->
    <UIModal
        :title="$t('tools.discord.embed-maker.save.title', { count: embedMakerStore.messages.length })"
        :description="
            $t('tools.discord.embed-maker.save.description', {
                count: embedMakerStore.messages.length,
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
                    :placeholder="$t('tools.discord.embed-maker.save.form.name.placeholder')"
                    name="name"
                    :label="$t('tools.discord.embed-maker.save.form.name.label')"
                    required
                />
                <UIInput
                    v-model="formSave.description"
                    :placeholder="$t('tools.discord.embed-maker.save.form.description.placeholder')"
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
                    data: embedMakerStore.messages,
                    author: authStore.user,
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
                        modifyCurrentSave = false;
                    }
                "
                >Créer une nouvelle sauvegarde</UIButton
            >
            <UIButton
                @click="
                    () => {
                        if (!embedMakerStore.editingSave) return;
                        formSave.name = embedMakerStore.editingSave?.name;
                        formSave.description = embedMakerStore.editingSave?.description;
                        formSave.tags = embedMakerStore.editingSave?.tags;
                        formSave.isPublic = embedMakerStore.editingSave?.isPublic;
                        modifyCurrentSave = true;
                    }
                "
                >Modifier la sauvegarde</UIButton
            >
        </div>
    </UIModal>

    <button
        class="fixed bottom-4 right-4 z-[110] flex items-center rounded-full border bg-white p-4 text-sm shadow-lg lg:hidden"
        @click="togglePreview"
    >
        <NuxtIcon
            name="eye"
            class="icon big-timeout"
        />
        <span class="hide-timeout overflow-hidden whitespace-nowrap font-medium">Voir la prévisualisation</span>
    </button>
</template>

<style scoped>
.hide-timeout {
    animation: hide 7s ease-out forwards;
}

.big-timeout {
    animation: big 7s ease-out forwards;
}

@keyframes hide {
    90% {
        max-width: 200px;
        margin-left: 0.7rem;
    }
    100% {
        max-width: 0px;
        margin-left: 0rem;
    }
}
@keyframes big {
    90% {
        @apply text-2xl;
    }
    100% {
        @apply text-4xl;
    }
}
</style>
