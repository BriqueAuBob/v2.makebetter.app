import type { DiscordWebhookMessage } from 'types/discord';

interface Driver {
    generateCode(messages: DiscordWebhookMessage[], webhook_url: string): string;
}

class JsonDriver implements Driver {
    generateCode(messages: DiscordWebhookMessage[], webhook_url: string): string {
        return JSON.stringify(messages, null, 2);
    }
}

class DiscordJsDriver implements Driver {
    generateCode(messages: DiscordWebhookMessage[], webhook_url: string): string {
        return `// Discord.js >v13 example
const { WebhookClient } = require("discord.js");
const webhook = new WebhookClient({ url: "${webhook_url}" });
(async () => {
	const messages = ${JSON.stringify(messages)};
	for(const message of messages) {
		await webhook.send(message);
	}
})();`;
    }
}

class DiscordJsBuilderDriver implements Driver {
    generateEmbedCode(embed: any): string {
        let code = `new EmbedBuilder()`;
        if (embed.title) code += `\n\t\t.setTitle("${embed.title}")`;
        if (embed.description) code += `\n\t\t.setDescription("${embed.description}")`;
        if (embed.url) code += `\n\t\t.setURL("${embed.url}")`;
        if (embed.color) code += `\n\t\t.setColor("${embed.color}")`;

        for (const field of embed.fields) code += `\n\t\t.addField("${field.name}", "${field.value}", ${field.inline})`;
        if (embed.author?.name || embed.author?.icon_url)
            code += `\n\t\t.setAuthor("${embed.author.name}", "${embed.author.icon_url}", "${embed.author.url}")`;
        if (embed.thumbnail?.url) code += `\n\t\t.setThumbnail("${embed.thumbnail.url}")`;
        if (embed.image?.url) code += `\n\t\t.setImage("${embed.image.url}")`;
        if (embed.footer?.text || embed.footer?.icon_url)
            code += `\n\t\t.setFooter("${embed.footer.text}", "${embed.footer.icon_url}")`;
        if (embed.timestamp) code += `\n\t\t.setTimestamp("${embed.timestamp}")`;
        return code;
    }

    generateCode(messages: DiscordWebhookMessage[], webhook_url: string): string {
        const messagesCopy = JSON.parse(JSON.stringify(messages));
        const messagesEmbedCode = [];
        let messageCount = 0;
        for (const message of messagesCopy) {
            let code = `const message${messageCount} = {
		content: "${message.content}",
		username: "${message.username}",
		avatar_url: "${message.avatar_url}",
		embeds: []
	}\n`;
            for (let i = 0; i < message.embeds.length; i++) {
                const embed = message.embeds[i];
                code += `\tconst embed${messageCount}${i} = ${this.generateEmbedCode(embed)}
	message.embeds.push(embed${i})
	await webhook.send(message${messageCount})
	`;
            }
            messagesEmbedCode.push(code);
            delete message.embeds;
            messageCount++;
        }

        const code = `// Discord.js >v13 example
const { WebhookClient, EmbedBuilder } = require("discord.js");
const webhook = new WebhookClient({ url: "${webhook_url}" });
(async () => {
	${messagesEmbedCode.join('\n\t')}
})();`;

        return code;
    }
}

function generateCode(driver: Driver, messages: DiscordWebhookMessage[], webhook_url: string) {
    return driver.generateCode(messages, webhook_url);
}

function getDriver(driver: string): Driver {
    switch (driver) {
        case 'JSON':
            return new JsonDriver();
        case 'Discord.js':
            return new DiscordJsDriver();
        case 'Discord.js - EmbedBuilder()':
            return new DiscordJsBuilderDriver();
        default:
            throw new Error('Invalid driver');
    }
}

export const getDiscordMessageSaveTags = () => [
    { label: 'rules', value: 'rules', shouldTranslate: 'tools.discord.embed.save.tags.rules' },
    { label: 'presentation', value: 'presentation', shouldTranslate: 'tools.discord.embed.save.tags.presentation' },
];

export { generateCode, getDriver, JsonDriver, DiscordJsDriver, DiscordJsBuilderDriver };
