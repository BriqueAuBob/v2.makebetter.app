<script setup lang="ts">
type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
};

const props = defineProps({
    personal: {
        type: Boolean,
        default: false,
    },
});

const modal = ref<UIModalType>();
const setIsOpen = () => {
    modal.value?.setIsOpen(true);
};
defineExpose({
    setIsOpen,
});

const totalRef = ref<number>(0);
const fetchTemplates = async (onScroll: boolean = false) => {
    loading.value = true;
    selected.value = undefined;
    try {
        const { saves, total } = await $fetchApi<{ saves: any[]; total: number }>(
            '/makebetter/tools/saves?page=' +
                page.value +
                '&search=' +
                form.search +
                '&sort_by=' +
                form.sort_by +
                '&tags=' +
                form.tags +
                (props.personal ? '&personal=true' : '')
        );
        templates.value = onScroll ? [...templates.value, ...saves] : saves;
        totalRef.value = total;
        if (!onScroll) {
            page.value = 1;
        }
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

const loading = ref<boolean>(false);
const selected = ref<string>();
const page = ref<number>(1);
const form = reactive<{
    search: string;
    sort_by: string;
    tags: string[];
}>({
    search: '',
    sort_by: '',
    tags: [],
});
const templates = ref<any[]>([]);
const scrollTemplatesContainer = ref<HTMLDivElement>();
const searchInput = ref<HTMLInputElement>();

onMounted(() => {
    fetchTemplates();
});
watch(
    () => scrollTemplatesContainer.value,
    (scrollContainer) => {
        if (!scrollContainer) return;
        scrollContainer.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
            if (scrollTop + clientHeight >= scrollHeight - 100 && templates.value.length < totalRef.value) {
                if (loading.value) return;
                page.value++;
                fetchTemplates(true);
            }
        });
    }
);

watch(
    () => props.personal,
    () => fetchTemplates()
);

const debouncedFetchTemplates = useDebounce(300, fetchTemplates);

const emits = defineEmits(['load']);
const loadSave = async () => {
    if (!selected.value) return;
    const { save } = await $fetchApi<{ save: any }>('/makebetter/tools/saves/' + selected.value);
    if (!save) return;
    emits('load', save);
    modal.value?.setIsOpen(false);
};
</script>

<template>
    <UIModal
        ref="modal"
        size="large"
        :title="personal ? $t('tools.discord.embed.save.list') : $t('tools.discord.embed.save.templates_community')"
        :description="
            personal
                ? $t('tools.discord.embed.save.list_description')
                : $t('tools.discord.embed.save.templates_community_description')
        "
        :okText="personal ? $t('tools.discord.embed.save.load') : $t('tools.discord.embed.save.load_template')"
        :buttonDisabled="!selected"
        :onApply="loadSave"
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
                    v-model="form.search"
                    ref="searchInput"
                    @input="() => debouncedFetchTemplates()"
                />
                <UISelect
                    class="h-full w-full lg:w-72"
                    placeholder="Trier par"
                    :options="[
                        { label: 'Publié récemment', value: 'createdAt:-1' },
                        { label: 'Publié il y a longtemps', value: 'createdAt:1' },
                        { label: 'Nom (A à Z)', value: 'name:1' },
                        { label: 'Nom (Z à A)', value: 'name:-1' },
                    ]"
                    v-model="form.sort_by"
                    @change="() => fetchTemplates()"
                />
                <UISelect
                    class="h-full w-full lg:w-56"
                    placeholder="Tags"
                    :options="[{ label: 'Tous', value: 'all' }, ...getDiscordMessageSaveTags()]"
                    v-model="form.tags"
                    @change="() => fetchTemplates()"
                    multiple
                />
            </div>
            <div
                class="grid max-h-[60vh] w-full gap-3 overflow-y-auto py-2 lg:grid-cols-2"
                ref="scrollTemplatesContainer"
                v-loading="loading"
                v-if="templates.length > 0"
            >
                <TransitionGroup
                    name="fadescale"
                    :duration="500"
                >
                    <ToolsDiscordEmbedMakerCardSave
                        v-for="template in templates"
                        :key="template._id"
                        :template="template"
                        @click="selected = template._id"
                        :isSelected="selected === template._id"
                    />
                </TransitionGroup>
            </div>
            <CommonEmptyState
                class="my-8"
                description="Nous n'avons trouvé aucun template réalisés par la communauté pour cette recherche..."
                buttonText="Faire une autre recherche"
                :buttonAction="
                    () => {
                        form.search = '';
                        form.sort_by = '';
                        form.tags = [];
                        searchInput?.focus();
                        fetchTemplates();
                    }
                "
                v-loading="loading"
                v-else
            />
        </div>
    </UIModal>
</template>
