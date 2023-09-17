<script setup lang="ts">
import { parse, rules, rulesExtended } from 'discord-markdown-parser';
import type { ASTNode, SingleASTNode } from 'simple-markdown';
import SimpleMarkdown, { parserFor } from 'simple-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const props = defineProps({
    content: {
        type: String,
        required: true,
    },
});

const markdown = computed<ASTNode>(() => {
    return parse(props.content, 'normal');
});

const renderNodes = (nodes: SingleASTNode[]): string => {
    return nodes.map((node: SingleASTNode) => renderNode(node)).join('');
};

const renderNode = (node: SingleASTNode): string => {
    console.log(node);
    switch (node.type) {
        case 'text':
            return node.content;
        case 'br':
        case 'newline':
            return '<br>';
        case 'strong':
            return `<strong>${renderNodes(node.content)}</strong>`;
        case 'em':
            return `<em>${renderNodes(node.content)}</em>`;
        case 'underline':
            return `<u>${renderNodes(node.content)}</u>`;
        case 'strike':
        case 'strikethrough':
        case 's':
            return `<s>${renderNodes(node.content)}</s>`;
        case 'codeBlock':
            const highlighted = hljs.highlight(node.content, {
                language: node.lang,
            }).value;
            return `<pre><code class="md-code hljs ${node.lang}">${highlighted}</code></pre>`;
        case 'inlineCode':
            return `<code class="md-code">${node.content}</code>`;
        case 'blockquote':
            return `<blockquote>${renderNodes(node.content)}</blockquote>`;
        case 'emoji':
            return `<img src="https://cdn.discordapp.com/emojis/${node.id}.${
                node.animated ? 'gif' : 'webp'
            }?size=96&quality=lossless" alt="${node.name}" class="md-emoji">`;
        case 'twemoji':
            return node.name;
        case 'user':
            return `<span class="md-mention">@${node.id}</span>`;
        case 'role':
            return `<span class="md-mention role">@${node.id}</span>`;
        case 'everyone':
            return `<span class="md-mention">@everyone</span>`;
        case 'here':
            return `<span class="md-mention">@here</span>`;
        case 'channel':
            return `<span class="md-mention">#${node.id}</span>`;
        case 'spoiler':
            return `<span class="md-spoiler">${renderNodes(node.content)}</span>`;
        case 'timestamp':
            return `<span class="md-timestamp">${node.content}</span>`;
        case 'heading':
            return `<h${node.level} class="${
                ['text-2xl', 'text-xl', 'text-base'][node.level - 1]
            } font-bold mt-4 mb-1.5">${renderNodes(node.content)}</h${node.level}>`;
        case 'link':
            return `<a class="text-blue-500 hover:underline" href="${node.target}">${node.content}</a>`;
        case 'list':
            return `<ul class="list-disc ml-4">${node.items.map((item: string) => `<li>${item}</li>`).join('')}</ul>`;
        default:
            return node.content;
    }
};

const rulesNew = {
    ...rules,
    heading: {
        order: 0,
        match: SimpleMarkdown.blockRegex(/^ *(#{1,3} ) *([^\n]+?) *#*(?:\n|$)/),
        parse: (capture: string[], parse: any, state: any) => ({
            type: 'heading',
            level: capture[1].length - 1,
            content: SimpleMarkdown.parseInline(parse, capture[2].trim(), state),
        }),
    },
    url: {
        order: 0,
        match: SimpleMarkdown.inlineRegex(/^ *\[([^\]]+?)\]\((<[^>]+>|[^)\n]+)(?: "([^"]+)")?\)/),
        parse: (capture: string[]) => ({
            type: 'link',
            content: capture[1],
            target: capture[2],
        }),
    },
    autolink: {
        order: 0,
        match: SimpleMarkdown.inlineRegex(/^<(https?:\/\/[^ >]+)>/),
        parse: (capture: string[]) => ({
            type: 'link',
            content: capture[1],
            target: capture[1],
        }),
    },
    list: {
        order: 0,
        match: SimpleMarkdown.blockRegex(
            /^( *)[*+-] [\s\S]+?(?:\n+(?=(?: *[-*_]){3,} *(?:\n+|$))|\n+(?=\1?(?:[*+-]|\d+[.)]))|\n{2,}(?! )(?!\1(?:[*+-]|\d+[.)]))|\s*$)/
        ),
        parse: (capture: string[]) => ({
            type: 'list',
            ordered: false,
            start: capture[1],
            items: capture[0].replace(/^ *([*+-]|\d+[.)]) +/, '').split(/\n(?=\1?(?:[*+-]|\d+[.)]))/),
        }),
    },
};
const parser = parserFor(rulesNew);
const astNodesToHtml = computed(() => {
    return renderNodes(parser(props.content));
});
</script>

<template>
    <p v-html="astNodesToHtml"></p>
</template>

<style>
.md-code {
    background: hsl(216, calc(var(--saturation-factor, 1) * 7.2%), 13.5%) !important;
    border: none;
    border-radius: 3px;
    font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
    font-size: 0.875rem;
    margin: -0.2em 0;
    padding: 0.2em;
    white-space: pre-wrap;
}
pre code.md-code {
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-indent: 0;
    white-space: pre-wrap;
    border: 1px solid hsl(216, calc(var(--saturation-factor, 1) * 7.2%), 13.5%);
}
.hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em !important;
    border-radius: 4px;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    text-size-adjust: none;
    color: var(--text-normal);
    background: var(--background-secondary);
}
.md-mention {
    border-radius: 3px;
    padding: 0 2px;
    color: hsla(236, 83.3%, 92.9%);
    background: rgba(88, 101, 242, 0.3);
}
.md-mention.role {
    background: rgba(242, 121, 88, 0.3);
}
.md-emoji {
    width: 1.375em;
    height: 1.375em;
    vertical-align: bottom;
    object-fit: contain;
}
.md-spoiler {
    background: #26282a;
    color: #26282a;
    border-radius: 3px;
    padding: 0 2px;
}
.md-spoiler:hover {
    color: hsl(0, 0%, 100%);
}
</style>
