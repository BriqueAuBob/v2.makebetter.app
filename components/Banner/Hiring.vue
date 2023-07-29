<template>
    <BannerDefault :title="$t('banners.hiring.title')" :description="$t('banners.hiring.description')">
        <template #left>
            <UIButton class="mt-8" color="light">
                {{ $t('banners.hiring.button') }}
            </UIButton>
        </template>
        <template #right>
            <nuxt-img class="ml-auto w-full" src="/images/banner/hiring_right.png" />
        </template>
    </BannerDefault>
</template>
