<script setup lang="ts">
defineProps({
    placeholder: {
        type: String,
        default: 'Upload a file',
    },
});

const form = reactive({ files: [] });

const getFileExtension = (file: File): string => {
    return file.name.split('.').pop() || 'unknown';
};

const imageUrl = (file: File): string => {
    return URL.createObjectURL(file);
};

const fileSize = (file: File): string => {
    const size = file.size;
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
};
</script>

<template>
    <div>
        <div class="relative">
            <input
                type="file"
                class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                @change="(e) => {
                    files = (<HTMLInputElement>e.target)!.files
                    // @ts-ignore
                    this.$forceUpdate()
                }"
                multiple
            />
            <div
                class="flex w-full items-center justify-between rounded-3xl border-2 border-dashed border-gray-200 p-4 dark:border-primary-700 dark:bg-primary-800"
            >
                <div class="flex items-center gap-3">
                    <div class="rounded-xl bg-gray-100 p-4 dark:bg-primary-700">
                        <NuxtIcon class="icon big text-gray-600 dark:text-primary-200" name="image" />
                    </div>
                    <div>
                        <div class="text-md font-semibold text-gray-600 dark:text-gray-300">
                            Upload un ou plusieurs fichier(s)
                        </div>
                        <div class="mt-1 text-xs text-gray-400">SVG, JPG, PNG or GIF...</div>
                    </div>
                </div>
                <button class="rounded-xl border px-4 py-2 text-xs text-gray-400">Upload</button>
            </div>
        </div>
        <div
            class="mx-8 rounded-b-3xl border-x-2 border-b-2 border-dashed border-gray-200 bg-gray-50 px-6 pb-6 pt-4 shadow-sm dark:border-primary-800 dark:bg-primary-900"
        >
            <div class="text-sm font-semibold text-gray-400">Files uploaded</div>
            <div class="mt-2 flex items-center gap-3" v-for="file of files">
                <div class="rounded-xl bg-gray-200 p-2">
                    <img
                        v-if="['png', 'jpeg', 'jpg'].includes(getFileExtension(file))"
                        :src="imageUrl(file)"
                        class="h-16 w-16 rounded-lg object-cover"
                    />
                    <div v-else>
                        {{ getFileExtension(file) }}
                    </div>
                </div>
                <div>
                    <div class="text-md font-semibold text-gray-600">{{ file.name }}</div>
                    <div class="mt-1 text-xs text-gray-400">{{ fileSize(file) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
