import type { ToolCategories } from './types/config';

const appVersion: string = `v2`;
const prodUrl: string = `https://makebetter.app`;
const devUrl: string = `http://localhost:3333`;

const toolCategories: ToolCategories = [
    {
        name: "Discord",
        slug: "discord",
        icon: "discord",
        color: "#5865F2"
    }
];

export { appVersion, prodUrl, devUrl, toolCategories };