<script setup lang="ts">
import { Embed, EmbedField } from '~/types/discord';

const props = defineProps({
    embed: {
        type: Object as PropType<Embed>,
        required: true,
    },
    isDark: {
        type: Boolean,
        default: false,
    },
    editable: {
        type: Boolean,
        default: true,
    },
});

const getFieldColumn = (field: EmbedField) => {
    const MAX_FIELDS_PER_ROW = 3;
    const FIELD_GRID_SIZE = 12;

    const embed = props.embed;
    const fieldIndex = embed.fields.indexOf(field);

    if (!field.inline) return `1/${FIELD_GRID_SIZE + 1}`;

    let startingField = fieldIndex;
    while (startingField > 0 && embed.fields[startingField - 1].inline) {
        startingField--;
    }

    let totalInlineFields = 0;
    while (
        embed.fields.length > startingField + totalInlineFields &&
        embed.fields[startingField + totalInlineFields].inline
    ) {
        totalInlineFields++;
    }

    const indexInSequence = fieldIndex - startingField;
    const currentRow = indexInSequence / MAX_FIELDS_PER_ROW;
    const indexOnRow = indexInSequence % MAX_FIELDS_PER_ROW;
    const totalOnLastRow = totalInlineFields % MAX_FIELDS_PER_ROW || MAX_FIELDS_PER_ROW;
    const fullRows = (totalInlineFields - totalOnLastRow) / MAX_FIELDS_PER_ROW;
    const totalOnRow = currentRow >= fullRows ? totalOnLastRow : MAX_FIELDS_PER_ROW;

    const columnSpan = FIELD_GRID_SIZE / totalOnRow;
    const start = indexOnRow * columnSpan + 1;
    const end = start + columnSpan;

    return `${start}/${end}`;
};

const emits = defineEmits(['delete']);
const deleteEmbed = () => emits('delete');
</script>

<template>
    <div
        class="embed group relative cursor-pointer border-l-4 duration-200 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-r-sm after:bg-[--color] after:opacity-0 after:duration-200 after:ease-in hover:animate-pulse dark:after:bg-gradient-to-br dark:after:from-primary-700 dark:after:to-primary-800"
        :style="`
			--color: ${embed.color};
			border-color: ${embed.color}; max-width: ${embed?.image?.url ? '432' : '516'}px; background-color: ${
            isDark ? '#2B2D31' : '#F2F3F5'
        };`"
    >
        <div
            v-if="
                embed.author?.name ||
                embed.title ||
                embed.description ||
                embed.fields.length > 0 ||
                embed.thumbnail?.url
            "
            class="flex justify-between"
        >
            <div class="mr-2 py-2">
                <div
                    v-if="embed.author?.icon_url || embed.author?.name"
                    class="mb-2 flex items-center text-sm font-semibold"
                >
                    <img
                        v-if="embed.author.icon_url"
                        class="mr-2 h-6 w-6 rounded-full"
                        :src="embed.author.icon_url"
                    />
                    {{ embed.author?.name }}
                </div>
                <a
                    v-if="embed.title && embed.url"
                    :href="embed.url"
                    target="_blank"
                    class="block font-semibold"
                    :class="embed.url && 'title hover:underline'"
                >
                    {{ embed.title }}
                </a>
                <div
                    v-else-if="embed.title"
                    class="font-semibold"
                >
                    {{ embed.title }}
                </div>
                <ToolsDiscordMarkdown
                    v-if="embed.description"
                    class="mt-2 box-border whitespace-pre-wrap break-words text-sm leading-snug"
                    :content="embed.description"
                />
                <div class="grid gap-x-6 gap-y-2">
                    <div
                        v-for="(field, key) in embed.fields"
                        :key="key"
                        class="mt-2 text-sm"
                        :style="`grid-column: ${getFieldColumn(field)};`"
                    >
                        <p class="font-semibold">{{ field.name }}</p>
                        <p class="font-normal">{{ field.value }}</p>
                    </div>
                </div>
            </div>
            <div
                class="flex-none"
                v-if="embed.thumbnail?.url"
            >
                <img
                    class="w-20 rounded-[4px]"
                    :src="embed.thumbnail.url"
                />
            </div>
        </div>
        <div v-if="embed.image?.url">
            <img
                class="w-full rounded-[4px]"
                :class="
                    embed.author?.name || embed.title || embed.description || embed.fields.length > 0 ? 'mt-1' : 'mt-4'
                "
                :src="embed.image.url"
            />
        </div>
        <footer
            v-if="embed.timestamp || embed.footer?.text || embed.footer?.icon_url"
            class="mt-2 flex items-center"
        >
            <img
                v-if="embed.footer?.icon_url"
                class="mr-2 h-5 w-5 rounded-full"
                :src="embed.footer.icon_url"
            />
            <span class="text-xs text-zinc-400">
                <span v-if="embed.footer?.text">{{ embed.footer?.text }}</span>
                <span
                    class="mx-1"
                    v-if="embed.timestamp && embed.footer?.text"
                    >•</span
                >
                <span v-if="embed.timestamp">{{ embed.timestamp }}</span>
            </span>
        </footer>
        <div
            class="absolute -right-2 -top-2 z-10 rounded-xl border-2 border-zinc-200 bg-white p-2 opacity-0 duration-500 ease-smooth group-hover:opacity-100"
            @click="deleteEmbed"
            v-if="editable"
        >
            <NuxtIcon
                name="trash"
                class="icon sm text-red-500"
            />
        </div>
    </div>
</template>

<style scoped>
.embed {
    padding: 0.5rem 1rem 1rem 0.75rem;
    border-radius: 4px;
    max-width: 428px;
}

.embed .title {
    color: #0897d1;
}

.embed a {
    color: #0897d1;
}

.embed a:hover {
    text-decoration: underline;
}

.embed blockquote {
    border-left: 4px solid #747474;
    padding-left: 0.5rem;
}

.embed code {
    font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 0.875rem;
    border-radius: 3px;
    padding: 0.2em;
    margin: -0.2em 0;
    border: none;
    white-space: pre-wrap;
    background: hsl(216, calc(var(--saturation-factor, 1) * 7.2%), 13.5%);
}
</style>
