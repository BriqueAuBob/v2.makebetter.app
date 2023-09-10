<template>
    <BannerDefault
        :title="$t('banners.hiring.title')"
        :description="$t('banners.hiring.description')"
        class="relative text-center"
    >
        <template #header>
            <div class="mb-8 flex items-center justify-center gap-2">
                <img
                    src="/images/team/willz.png"
                    alt="Willz"
                    class="aspect-square w-12 translate-y-8 rounded-full border-2 border-orange-500 bg-gradient-to-b from-orange-400 to-orange-900 p-1 shadow-md shadow-orange-800"
                />
                <img
                    src="/images/team/gab.png"
                    alt="Gab"
                    class="aspect-square w-14 translate-y-6 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-900 p-1 shadow-md shadow-blue-800"
                />
                <img
                    src="/images/team/yanis.png"
                    alt="Yanis"
                    class="aspect-square w-16 translate-y-4 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-900 p-1 shadow-md shadow-blue-800"
                />
                <img
                    src="/images/team/ewan.png"
                    alt="Ewan HSavoie"
                    class="aspect-square w-16 translate-y-2 rounded-full border-2 border-blue-500 bg-gradient-to-b from-blue-400 to-blue-900 p-1 shadow-md shadow-blue-800"
                />
                <img
                    src="/images/team/bob.png"
                    alt="Brique au bob"
                    class="aspect-square w-20 rounded-full border-2 border-red-500 bg-gradient-to-b from-red-400 to-red-900 p-1 shadow-md shadow-red-800"
                />
                <img
                    src="/images/team/draks.png"
                    alt="Draks"
                    class="aspect-square w-20 rounded-full border-2 border-red-500 bg-gradient-to-b from-red-400 to-red-900 p-2 shadow-md shadow-red-800"
                />
                <img
                    src="/images/team/kaito.png"
                    alt="Kaito"
                    class="aspect-square w-16 translate-y-2 rounded-full border-2 border-pink-500 bg-gradient-to-b from-pink-400 to-pink-900 p-1 shadow-md shadow-pink-800"
                />
                <img
                    src="/images/team/flayte.png"
                    alt="Flayte"
                    class="aspect-square w-16 translate-y-4 rounded-full border-2 border-purple-500 bg-gradient-to-b from-purple-400 to-purple-900 p-1 shadow-md shadow-purple-800"
                />
                <img
                    src="/images/team/toinoux.png"
                    alt="Toinoux"
                    class="aspect-square w-14 translate-y-6 rounded-full border-2 border-green-500 bg-gradient-to-b from-green-400 to-green-900 p-1 shadow-md shadow-green-800"
                />
                <img
                    src="/images/team/chris.png"
                    alt="Chris"
                    class="aspect-square w-12 translate-y-8 rounded-full border-2 border-green-500 bg-gradient-to-b from-green-400 to-green-900 p-1 shadow-md shadow-green-800"
                />
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
