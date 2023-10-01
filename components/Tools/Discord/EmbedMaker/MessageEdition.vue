<script setup lang="ts">
import type { PropType } from 'vue';
import type { DiscordWebhookMessage } from '~/types/discord';
import { _primary } from '#tailwind-config/theme/colors';
import { useEmbedMakerStore } from '~/stores/embed-maker';

const embedMakerStore = useEmbedMakerStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    message: {
        type: Object as PropType<DiscordWebhookMessage>,
        required: true,
    },
    onUpdate: {
        type: Function as PropType<() => void>,
        required: true,
    }
});

const defaultEmbed = {
    title: '',
    description: '',
    url: '',
    color: _primary['500'],
    author: {
        name: '',
        url: '',
        icon_url: '',
    },
    thumbnail: {
        url: '',
    },
    image: {
        url: '',
    },
    footer: {
        text: '',
        icon_url: '',
    },
    fields: [],
    timestamp: '',
};

const addEmbed = () => {
    props.message.embeds ??= [];
    props?.message?.embeds?.push(structuredClone(defaultEmbed));
    emitUpdate();
};

const addField = (embedId: number) => {
    props.message.embeds![embedId] ??= structuredClone(defaultEmbed);
    props.message.embeds![embedId].fields ??= [];
    props.message.embeds![embedId]!.fields!.push({
        name: '',
        value: '',
        inline: false,
    });
    emitUpdate();
};

const addButton = () => {
    props.message?.components?.[0]?.components?.push({
        type: 2,
        style: 5,
        label: '',
        url: '',
        custom_id: '',
    });
    emitUpdate();
};

const emit = defineEmits(['update:message']);
const emitUpdate = () => {
    emit('update:message', props.message);
    props.onUpdate();
}
</script>

<template>
    <div class="mt-2 flex flex-col gap-8">
        <ToolsCardCollapsible
            collapse
            title="Auteur du message"
            noHover
        >
            <UIInput
                class="mb-4"
                :name="`username_message_${id}`"
                :label="$t('tools.discord.embed-maker.fields.username.label')"
                :placeholder="$t('tools.discord.embed-maker.fields.username.placeholder')"
                v-model="message.username"
                @change="emitUpdate"
            />
            <UIInput
                class="mb-4"
                :name="`avatar_url_message_${id}`"
                :label="$t('tools.discord.embed-maker.fields.avatar_url.label')"
                :placeholder="$t('tools.discord.embed-maker.fields.avatar_url.placeholder')"
                v-model="message.avatar_url"
                @change="emitUpdate"
            />
        </ToolsCardCollapsible>
        <UIInput
            :name="`content_message_${id}`"
            :label="$t('tools.discord.embed-maker.fields.content.label')"
            :placeholder="$t('tools.discord.embed-maker.fields.content.placeholder')"
            longText
            v-model="message.content"
                @change="emitUpdate"
        />
        <UIFileUploader
            placeholder="Upload a file"
            v-model="message.files"
        />
        <ToolsCardCollapsible
            collapse
            title="Embeds"
            noHover
        >
            <TransitionGroup
                name="fadescale"
                tag="div"
                class="flex flex-col gap-4"
            >
                <ToolsCardCollapsible
                    collapse
                    :title="`Embed n°${embedId + 1}`"
                    class="embed_edit relative border-dashed after:absolute after:left-0 after:top-0 after:h-full after:w-1 after:content-[''] hover:shadow-lg"
                    :style="`--embed-color: ${embed.color};`"
                    noHover
                    v-for="(embed, embedId) in message.embeds"
                    :key="embedId"
                    delete
                >
                    <UICollapse
                        :title="$t('tools.discord.embed-maker.steps.embed.author')"
                        smallTitle
                    >
                        <UIInput
                            class="mb-4"
                            :name="`author_username_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.author.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.author.placeholder')"
                            v-model="embed.author.name"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`author_icon_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.author_icon.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.author_icon.placeholder')"
                            v-model="embed.author.icon_url"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`author_url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.author_url.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.author_url.placeholder')"
                            v-model="embed.author.url"
                @change="emitUpdate"
                        />
                    </UICollapse>
                    <UICollapse
                        :title="$t('tools.discord.embed-maker.steps.embed.images')"
                        smallTitle
                    >
                        <UIInput
                            class="mb-4"
                            :name="`thumbnail_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.thumbnail.label')"
                            placeholder="https://imageplaceholder.com/image.jpg"
                            v-model="embed.thumbnail.url"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`image_url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.image.label')"
                            placeholder="https://imageplaceholder.com/image.jpg"
                            v-model="embed.image.url"
                @change="emitUpdate"
                        />
                    </UICollapse>
                    <UICollapse
                        :title="$t('tools.discord.embed-maker.steps.embed.body')"
                        smallTitle
                    >
                        <UIInput
                            class="mb-4"
                            :name="`title_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.title.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.title.placeholder')"
                            v-model="embed.title"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`description_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.description.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.description.placeholder')"
                            v-model="embed.description"
                @change="emitUpdate"
                            longText
                        />
                        <UIInput
                            class="mb-4"
                            :name="`url_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.url.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.url.placeholder')"
                            v-model="embed.url"
                @change="emitUpdate"
                        />
                        <div>
                            <div class="pointer-events-none ml-4 text-sm font-medium italic text-zinc-400">
                                {{ $t('tools.discord.embed-maker.fields.color.label') }}
                            </div>
                            <UIColorGroup
                                class="mt-1"
                                v-model="embed.color"
                @change="emitUpdate"
                            />
                        </div>
                    </UICollapse>
                    <UICollapse
                        :title="$t('tools.discord.embed-maker.steps.embed.fields')"
                        smallTitle
                    >
                        <TransitionGroup
                            name="fadescale"
                            tag="div"
                            class="flex flex-col gap-4"
                        >
                            <ToolsCardCollapsible
                                collapse
                                v-for="(field, fieldId) in embed.fields"
                                :key="fieldId"
                                :title="`Champ n°${fieldId + 1}`"
                                noHover
                                delete
                            >
                                <UIInput
                                    class="mb-4"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_name`"
                                    :label="$t('tools.discord.embed-maker.fields.field_name.label')"
                                    :placeholder="$t('tools.discord.embed-maker.fields.field_name.placeholder')"
                                    v-model="field.name"
                @change="emitUpdate"
                                />
                                <UIInput
                                    class="mb-4"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_value`"
                                    :label="$t('tools.discord.embed-maker.fields.field_value.label')"
                                    :placeholder="$t('tools.discord.embed-maker.fields.field_value.placeholder')"
                                    v-model="field.value"
                @change="emitUpdate"
                                />
                                <UIToggle
                                    class="pt-2"
                                    :name="`message_${id}_embed_${embedId}_fields_${fieldId}_field_inline`"
                                    :label="$t('tools.discord.embed-maker.fields.field_inline.label')"
                                    v-model="field.inline"
                @change="emitUpdate"
                                />
                            </ToolsCardCollapsible>
                        </TransitionGroup>
                        <UIButton
                            class="mb-2 mt-4 w-full"
                            @click="addField(embedId)"
                        >
                            {{ $t('tools.discord.embed-maker.steps.embed.add_field') }}
                        </UIButton>
                    </UICollapse>
                    <UICollapse
                        :title="$t('tools.discord.embed-maker.steps.embed.footer')"
                        smallTitle
                    >
                        <UIInput
                            class="mb-4"
                            :name="`footer_text_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.footer_text.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.footer_text.placeholder')"
                            v-model="embed.footer.text"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`footer_icon_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.footer_icon.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.footer_icon.placeholder')"
                            v-model="embed.footer.icon_url"
                @change="emitUpdate"
                        />
                        <UIInput
                            class="mb-4"
                            :name="`timestamp_message_${id}_embed_${embedId}`"
                            :label="$t('tools.discord.embed-maker.fields.timestamp.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.timestamp.placeholder')"
                            v-model="embed.timestamp"
                @change="emitUpdate"
                            type="datetime-local"
                        />
                    </UICollapse>
                </ToolsCardCollapsible>
            </TransitionGroup>
            <UIButton
                class="w-full"
                :class="message?.embeds?.length && message?.embeds?.length > 0 ? 'mt-8' : 'mt-4'"
                @click="addEmbed"
            >
                {{
                    $t('tools.discord.embed-maker.steps.embed.add', {
                        amount: message?.embeds?.length,
                        max: 10,
                    })
                }}
            </UIButton>
        </ToolsCardCollapsible>
        <div
            class="relative pb-12 lg:pb-12"
            :class="!embedMakerStore?.webhook?.application_id && 'p-12'"
        >
            <ToolsCardCollapsible
                class="overflow-hidden"
                collapse
                :title="$t('tools.discord.embed-maker.steps.buttons.title')"
                smallTitle
                noHover
            >
                <TransitionGroup
                    name="fadescale"
                    tag="div"
                    class="flex flex-col gap-4"
                >
                    <ToolsCardCollapsible
                        collapse
                        v-for="(component, componentId) in message.components?.[0]?.components"
                        :key="componentId"
                        class="border-dashed"
                        :title="`Button n°${componentId + 1}`"
                        noHover
                        delete
                        @delete="() => message?.components?.[0]?.components?.splice(componentId, 1)"
                    >
                        <UIInput
                            class="mb-4"
                            :name="`message_${id}_components_${componentId}_label`"
                            :label="$t('tools.discord.embed-maker.fields.button_label.label')"
                            :placeholder="$t('tools.discord.embed-maker.fields.button_label.placeholder')"
                            v-model="component.label"
                @change="emitUpdate"
                        />
                        <Transition
                            name="fade"
                            mode="out-in"
                            :duration="200"
                        >
                            <UIInput
                                class="mb-4"
                                :name="`message_${id}_components_${componentId}_url`"
                                :label="$t('tools.discord.embed-maker.fields.button_url.label')"
                                :placeholder="$t('tools.discord.embed-maker.fields.button_url.placeholder')"
                                v-model="component.url"
                                v-if="component.style === 5"
                @change="emitUpdate"
                            />
                            <UIInput
                                class="mb-4"
                                :name="`message_${id}_components_${componentId}_custom_id`"
                                :label="$t('tools.discord.embed-maker.fields.button_custom_id.label')"
                                :placeholder="$t('tools.discord.embed-maker.fields.button_custom_id.placeholder')"
                                v-model="component.custom_id"
                @change="emitUpdate"
                                v-else
                            />
                        </Transition>
                        <div
                            class="relative duration-300 ease-out"
                            :class="!embedMakerStore.settings.useWebhook && 'py-8'"
                        >
                            <label class="pointer-events-none ml-4 text-sm font-medium italic text-zinc-400">
                                Style du bouton
                            </label>
                            <div class="mt-2 grid grid-cols-4 gap-2">
                                <ToolsDiscordEmbedMakerButton
                                    v-for="style in 5"
                                    :class="
                                        component.style === style && !embedMakerStore.settings.useWebhook
                                            ? '-translate-y-1 outline outline-1 outline-offset-2 outline-white'
                                            : 'opacity-75 hover:-translate-y-1 hover:opacity-100'
                                    "
                                    @click="() => {
                                        component.style = style;
                                        emitUpdate();
                                    }"
                                    :buttonStyle="style"
                                >
                                    Bouton
                                </ToolsDiscordEmbedMakerButton>
                            </div>
                            <div
                                class="absolute left-0 top-0 flex h-full w-full scale-110 items-center justify-center backdrop-blur-sm dark:bg-zinc-900/75"
                                v-if="embedMakerStore.settings.useWebhook && !embedMakerStore.settings.useCustomBot"
                            >
                                <div class="px-16 text-center">
                                    Envoie ton message avec un bot pour pouvoir personnaliser le style des boutons
                                    <UIButton
                                        class="mx-auto mt-4"
                                        color="color-mode"
                                    >
                                        Utiliser un bot
                                    </UIButton>
                                </div>
                            </div>
                        </div>
                    </ToolsCardCollapsible>
                </TransitionGroup>
                <UIButton
                    class="mt-8 w-full"
                    @click="addButton"
                >
                    {{ $t('tools.discord.embed-maker.steps.buttons.add') }}
                </UIButton>
            </ToolsCardCollapsible>
            <div
                class="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-between rounded-3xl border-2 border-dashed border-zinc-100 bg-opacity-90 bg-gradient-to-br from-white to-primary-100 p-6 font-semibold backdrop-blur-md dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 lg:flex-row lg:items-center lg:justify-start lg:gap-8 lg:p-10"
                v-if="!embedMakerStore?.webhook?.application_id"
            >
                <nuxt-img
                    src="/images/tools/discord/bot.png"
                    class="w-12 lg:w-auto"
                />
                <div class="text-primary-400">
                    {{ $t('tools.discord.embed-maker.steps.buttons.bot') }}
                    <UIButton
                        class="mt-2"
                        size="sm"
                        color="light"
                    >
                        {{ $t('how_to') }}
                    </UIButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.embed_edit::after {
    background: var(--embed-color);
}
</style>
