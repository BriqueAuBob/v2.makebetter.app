<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';

import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);

const props = defineProps({
    language: {
        type: String,
        default: 'html',
    },
    code: {
        type: String,
        default: '',
    },
});

const code = computed(() => {
    return hljs.highlightAuto(props.code).value;
});
</script>

<template>
    <pre class="max-h-96 overflow-auto rounded-xl bg-white p-4 shadow-lg dark:bg-zinc-800 dark:shadow-zinc-800">
<code v-html="code"></code>
	</pre>
</template>
