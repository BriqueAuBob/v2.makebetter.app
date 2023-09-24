<script setup lang="ts">
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
import { useEmbedMakerStore } from '~/stores/embed-maker';

defineI18nRoute({
    paths: {
        fr: '/outils/discord/createur-dembeds-v2',
    },
});

const embedMakerStore = useEmbedMakerStore();
const embedMaker = storeToRefs(embedMakerStore);

const { settings } = embedMaker;
const { useWebhook, useCustomBot } = settings.value;

const current = ref(0);

const { t } = useI18n();
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
            },
        };
    });
});

const addMessage = () => {
    embedMakerStore.addMessage();
    current.value = embedMakerStore.messages.length - 1;
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
                <!-- <ToolsEditors
                    :editors="editors"
                    :displayShare="true"
                    :onShare="onShare"
                />
                <LazyToolsPermissionsModal
                    ref="permissionsModal"
                    @change="onChangePermissions"
                /> -->
            </div>
            <!-- <div
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
            </div> -->
            <div class="grid gap-8 pt-12 lg:grid-cols-2">
                <div class="flex flex-col gap-12">
                    <ToolsDiscordEmbedMakerSendMethod />
                    <ToolsLoadSaveTemplate :title="$t('tools.discord.embed-maker.steps.load_messages')" />
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
                        <!-- <Transition name="fade">
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
                        </Transition> -->
                    </div>
                </div>
                <div>
                    <UICard
                        class="sticky top-4"
                        noHover
                        noPadding
                        noPb
                        ref="previewCard"
                    >
                        <template #header>
                            <div class="flex items-center justify-between border-b p-8 dark:border-b-zinc-800">
                                <div>
                                    <h3 class="mb-1 text-lg">Prévisualisation</h3>
                                    <p class="text-sm text-zinc-600">Vois à quoi ressemblera ton embed !</p>
                                </div>
                            </div>
                        </template>
                        <draggable
                            v-model="embedMakerStore.messages"
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
                                    :isDark="true"
                                />
                            </template>
                        </draggable>
                        <template #footer>
                            <div class="flex flex-wrap justify-end gap-2 border-t p-8 dark:border-t-zinc-800"></div>
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
