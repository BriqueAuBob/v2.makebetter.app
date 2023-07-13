export type EmbedAuthor = {
	name: string;
	url: string;
	icon_url: string;
};

export type EmbedField = {
	name: string;
	value: string;
	inline?: boolean;
};

export type EmbedFooter = {
	text: string;
	icon_url: string;
};

export type EmbedImage = {
	url: string;
}

export type EmbedThumbnail = {
	url: string;
}

export type Embed = {
	author: EmbedAuthor;
	title: string;
	description: string;
	url: string;
	color: string;
	fields: EmbedField[];
	footer: EmbedFooter;
	image: EmbedImage;
	thumbnail: EmbedThumbnail;
	timestamp: string;
};

export type Component = {
	type: number;
	label?: string;
	style?: number;
	emoji?: Partial<{
		name: string;
		id: string;
		animated: boolean;
	}>;
	url?: string;
	components?: Component[];
};

export type DiscordWebhookMessage = {
	username: string;
	avatar_url: string;
	content: string;
	embeds: Embed[];
	components: Component[];
};

export type DiscordWebhook = {
	id: string;
	token: string;
	name: string;
	avatar: string;
	channel_id: string;
	guild_id: string;
	application_id: string|null;
}