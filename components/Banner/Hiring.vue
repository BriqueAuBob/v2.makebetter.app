<template>
    <BannerDefault
        :title="$t('banners.hiring.title')"
        :description="$t('banners.hiring.description')"
    >
        <template #left>
            <NuxtLink
                to="https://docs.google.com/forms/d/e/1FAIpQLScCszcMFVbGvE5Y0bqNapkw1pcvm6fr7V_jvlVI48L87T81CA/viewform"
                target="_blank"
            >
                <UIButton
                    class="mt-8"
                    color="light"
                >
                    {{ $t('banners.hiring.button') }}
                </UIButton>
            </NuxtLink>
        </template>
        <template #right>
            <nuxt-img
                class="ml-auto w-full"
                src="/images/banner/hiring_right.png"
            />
        </template>
    </BannerDefault>
</template>
