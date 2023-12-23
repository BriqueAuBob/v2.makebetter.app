<template>
    <BannerDefault
        :title="$t('banners.hiring.title')"
        :description="$t('banners.hiring.description')"
        class="relative text-center"
    >
        <template #header>
            <div class="mb-8 flex items-center justify-center gap-2">
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/gab.png"
                            alt="Gab"
                            class="aspect-square w-14 translate-y-6 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-900 p-1 shadow-md shadow-blue-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="text-lg font-semibold">Gab</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">Modérateur</span>
                        </div>
                    </template>
                </UIPopover>
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/yanis.png"
                            alt="Yanis"
                            class="aspect-square w-16 translate-y-2 -scale-x-100 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-900 p-1 shadow-md shadow-blue-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="text-lg font-semibold">Yanis</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">
                                Le modérateur au look éphémère 👓
                            </span>
                        </div>
                    </template>
                </UIPopover>
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/bob.png"
                            alt="Brique au bob"
                            class="aspect-square w-20 rounded-full border-2 border-red-500 bg-gradient-to-b from-red-400 to-red-900 p-1 shadow-md shadow-red-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="whitespace-nowrap text-lg font-semibold">Brique au bob</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">
                                Le couteau suisse de l'équipe 🖐️
                            </span>
                        </div>
                    </template>
                </UIPopover>
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/draks.png"
                            alt="Draks"
                            class="aspect-square w-20 rounded-full border-2 border-red-500 bg-gradient-to-b from-red-400 to-red-900 p-2 shadow-md shadow-red-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="text-lg font-semibold">DrakS</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">
                                Le voyageur aux idées farfelues 🛫
                            </span>
                        </div>
                    </template>
                </UIPopover>
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/kaito.png"
                            alt="Kaito"
                            class="aspect-square w-16 translate-y-2 rounded-full border-2 border-pink-500 bg-gradient-to-b from-pink-400 to-pink-900 p-1 shadow-md shadow-pink-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="text-lg font-semibold">Kaito</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">
                                Rédige pour vous pousser vers la lumière ☀️
                            </span>
                        </div>
                    </template>
                </UIPopover>
                <UIPopover
                    :relative="true"
                    x="50%"
                    :y="64"
                >
                    <template #trigger>
                        <img
                            src="/images/team/flayte.png"
                            alt="Flayte"
                            class="aspect-square w-16 translate-y-6 rounded-full border-2 border-purple-500 bg-gradient-to-b from-purple-400 to-purple-900 p-1 shadow-md shadow-purple-800"
                        />
                    </template>
                    <template #popover>
                        <div class="px-4 py-2 text-center">
                            <div class="text-lg font-semibold">Flayte</div>
                            <span class="whitespace-nowrap text-sm text-zinc-500">
                                Code avec une précision chirurgicale 😷
                            </span>
                        </div>
                    </template>
                </UIPopover>
            </div>
        </template>
        <template #left>
            <NuxtLink
                to="https://docs.google.com/forms/d/e/1FAIpQLScCszcMFVbGvE5Y0bqNapkw1pcvm6fr7V_jvlVI48L87T81CA/viewform"
                target="_blank"
                class="mx-auto flex w-fit justify-center"
            >
                <UIButton
                    class="mt-8"
                    color="light"
                >
                    {{ $t('banners.hiring.button') }}
                </UIButton>
            </NuxtLink>
        </template>
    </BannerDefault>
</template>
