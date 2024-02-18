<script setup lang="ts">
type UIModalType = {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: Ref<boolean>;
};

const personal = ref(false);

const modal = ref<UIModalType>();
const setIsOpen = (open: boolean, isPersonal: boolean) => {
    personal.value = isPersonal;
    modal.value?.setIsOpen(open);
    if (open) {
        page.value = 1;
        loading.value = true;
        templates.value = [];
        fetchTemplates();
    }
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
                (personal.value ? '&personal=true' : '')
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

const debouncedFetchTemplates = useDebounce(300, fetchTemplates);

const emits = defineEmits(['load']);
const loadSave = async () => {
    if (!selected.value) return;
    const { save } = await $fetchApi<{ save: any }>('/makebetter/tools/saves/' + selected.value);
    if (!save) return;
    emits('load', save);
    modal.value?.setIsOpen(false);
};

const { t } = useI18n();
const filters = ['Tout', ...getDiscordMessageSaveTags().map((tag) => t(tag.shouldTranslate))];
const selectedFilter = ref<string>('Tout');
</script>

<template>
    <UIModal
        ref="modal"
        size="large"
        :okText="
            personal ? $t('tools.discord.embed-maker.save.load') : $t('tools.discord.embed-maker.save.load_template')
        "
        :buttonDisabled="!selected"
        :onApply="loadSave"
        noPadding
    >
        <div class="mb-4 flex w-full items-center gap-1 border-b px-4 dark:border-zinc-600">
            <NuxtIcon
                class="text-2xl"
                name="search"
            />
            <input
                class="h-full w-full border-none bg-transparent p-2 py-6 outline-none"
                name="template_name"
                label="Nom du template"
                placeholder="Rechercher un template..."
                :displayLabel="false"
                v-model="form.search"
                ref="searchInput"
                @input="() => debouncedFetchTemplates()"
            />
        </div>
        <div class="no-scrollbar mb-2 flex w-full gap-2 overflow-x-auto border-b px-4 pb-4 dark:border-zinc-700">
            <button
                v-for="(filter, index) in filters"
                :key="index"
                class="rounded-lg px-5 py-2 duration-300 ease-in"
                :class="selectedFilter === filter ? 'bg-primary-500 text-white' : 'bg-neutral-200 dark:bg-neutral-800'"
                @click="selectedFilter = filter"
            >
                {{ filter }}
            </button>
        </div>
        <div class="px-4">
            <div
                class="grid max-h-[60vh] min-h-[50vh] w-full gap-3 overflow-y-auto py-2 lg:grid-cols-2"
                ref="scrollTemplatesContainer"
                v-loading="loading"
                v-if="templates.length > 0 || loading"
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
                v-else
            />
        </div>
    </UIModal>
</template>
