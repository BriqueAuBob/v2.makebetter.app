import { createRouter, defineEventHandler, useBase } from 'h3';

const router = createRouter();

router.post(
    '/guilds',
    defineEventHandler(async (event) => {
        const body = await readBody(event);
        const config = useRuntimeConfig();
        let guilds;
        if (body?.bot_token) {
            guilds = await $fetch<{ guilds: any[] }>('https://discord.com/api/v10/users/@me/guilds', {
                headers: {
                    Authorization: `Bot ${body?.bot_token}`,
                },
            });
        } else {
            const { guilds: guildsData } = await $fetch<{ guilds: any[] }>('/auth/user/guilds', {
                baseURL: config.public.baseUrl,
                headers: {
                    Authorization: event.context.user.token,
                },
            });
            guilds = guildsData;
        }
        return guilds;
    })
);

router.post(
    '/guilds/:guildId/channels',
    defineEventHandler(async (req) => {
        const guildId = req?.context?.params?.guildId;
        if (!guildId) return { error: 'No guild ID provided' };
        const body = await readBody(req);

        const config = useRuntimeConfig();
        const channels: any[] = await $fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
            headers: {
                Authorization: `Bot ${body?.bot_token || config.bot_token}`,
            },
        });

        const reduced = channels
            .filter((channel) => [0, 4, 5, 15, 16].includes(channel.type))
            .sort((a, b) => a.position - b.position)
            .reduce((acc, channel) => {
                const category = acc.find((c: any) => c.id === channel.parent_id);
                if (channel.type === 4 && !category) {
                    acc.push({
                        id: channel.id,
                        name: channel.name,
                        channels: [],
                    });
                    return acc;
                }
                if (channel.parent_id) {
                    const categoryName = channels.find((c) => c.id === channel.parent_id)?.name;
                    if (category) {
                        category.channels.push(channel);
                    } else {
                        acc.push({
                            id: channel.parent_id,
                            name: categoryName,
                            channels: [],
                        });
                    }
                } else {
                    acc.push({
                        id: channel.id,
                        name: '',
                        channels: [channel],
                    });
                }
                return acc;
            }, []);

        return reduced;
    })
);

router.post(
    '/guilds/:guildId/channels/:channelId',
    defineEventHandler(async (req) => {
        const guildId = req?.context?.params?.guildId;
        const channelId = req?.context?.params?.channelId;
        const formData = await readMultipartFormData(req);
        if (!guildId) return { error: 'No guild ID provided' };
        if (!channelId) return { error: 'No channel ID provided' };
        if (!formData) return { error: 'No body provided' };

        const buffer = formData?.[0]?.data;
        if (!buffer) return { error: 'No body provided' };
        const body = buffer.toString('utf-8');

        const tokenBuffer = formData?.[1]?.data;
        const token = tokenBuffer?.toString('utf-8');

        const config = useRuntimeConfig();
        await $fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bot ${token || config.bot_token}`,
                'Content-Type': 'application/json',
            },
            body: body,
        });
    })
);

export default useBase('/api/tools/discord/embed-maker', router.handler);
