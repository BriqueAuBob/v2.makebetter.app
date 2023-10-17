<script setup lang="ts">
import { fileSize } from '@/composables/Blob';

defineProps({
    accept: {
        type: String,
        default: '*',
    },
    modelValue: {
        type: Array as unknown as () => FileList | null,
        required: false,
        default: [],
    },
});

const form = reactive<{ files: any }>({ files: [] });

const getFileExtension = (file: File): string => {
    return file.name.split('.').pop() || 'unknown';
};

const imageUrl = (file: File): string => {
    return URL.createObjectURL(file);
};

const removeFile = (file: File): void => {
    const index = Array.from(form.files as []).indexOf(file as never);
    if (index > -1) {
        form.files = Array.from(form.files as []) as [];
        form.files.splice(index, 1);
    }
};

type FileEtensionColor = {
    [key: string]: string;
};
const fileExtensionColors: FileEtensionColor = {
    pdf: 'bg-red-500',
    doc: 'bg-blue-500',
    docx: 'bg-blue-500',
    xls: 'bg-green-500',
    xlsx: 'bg-green-500',
    ppt: 'bg-orange-500',
    pptx: 'bg-orange-500',
    mp3: 'bg-zinc-500',
    mp4: 'bg-zinc-500',
    zip: 'bg-zinc-500',
    rar: 'bg-zinc-500',
    default: 'bg-primary-500',
};
const fileExtensionColor = (file: File): string => {
    const extension = getFileExtension(file);
    return fileExtensionColors[extension] || fileExtensionColors.default;
};

const emit = defineEmits(['update:modelValue']);

watch(
    () => form.files,
    (files) => {
        if (files) {
            emit('update:modelValue', files);
        }
    }
);
</script>

<template>
    <div>
        <div class="group relative">
            <input
                type="file"
                class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                @change="(e) => {
                    form.files = Array.from((e?.target as HTMLInputElement)?.files as FileList);
                }"
                multiple
                :accept="accept"
            />
            <div
                class="flex w-full items-center justify-between rounded-3xl border-2 border-dashed border-zinc-200 p-4 duration-300 ease-out dark:border-zinc-700 dark:bg-zinc-800"
            >
                <div class="flex items-center gap-3">
                    <div class="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-700">
                        <NuxtIcon
                            class="icon big text-zinc-600 dark:text-zinc-200"
                            name="image"
                        />
                    </div>
                    <div>
                        <div class="text-md font-semibold text-zinc-600 dark:text-zinc-300">
                            Upload un ou plusieurs fichier(s)
                        </div>
                        <div class="mt-1 text-xs text-zinc-400">SVG, JPG, PNG or GIF...</div>
                    </div>
                </div>
                <button
                    class="ease rounded-xl border px-4 py-2 text-xs text-zinc-400 duration-300 group-hover:bg-white group-hover:text-zinc-700"
                >
                    Upload
                </button>
            </div>
        </div>
        <Transition name="fadescalebottom">
            <div
                v-if="form.files?.length && form.files?.length > 0"
                class="mx-8 rounded-b-3xl border-x-2 border-b-2 border-dashed border-zinc-200 bg-zinc-50 px-6 pb-6 pt-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
                <div class="text-sm font-semibold text-zinc-400">Files uploaded</div>
                <div
                    class="mt-2 flex items-center gap-3"
                    v-for="file of form.files"
                >
                    <div class="rounded-xl bg-zinc-200 p-2 dark:bg-zinc-800">
                        <img
                            v-if="['png', 'jpeg', 'jpg'].includes(getFileExtension(file))"
                            :src="imageUrl(file)"
                            class="aspect-square h-16 w-16 rounded-lg object-cover"
                        />
                        <div
                            v-else
                            class="relative"
                        >
                            <NuxtIcon
                                class="icon xl text-zinc-600"
                                name="file"
                            />
                            <div
                                class="absolute left-1 top-6 rounded-lg px-2 py-1 text-xs font-bold text-white"
                                :class="fileExtensionColor(file)"
                            >
                                {{ getFileExtension(file) }}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="text-md overflow-hidden overflow-ellipsis font-semibold text-zinc-600">
                            {{ file.name }}
                        </div>
                        <div class="mt-1 text-xs text-zinc-400">{{ fileSize(file) }}</div>
                    </div>
                    <div class="ml-auto">
                        <NuxtIcon
                            @click="removeFile(file)"
                            class="icon text-zinc-400 duration-200 ease-out hover:text-red-500"
                            name="trash"
                        />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
