<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel } from 'vue3-carousel';
</script>

<template>
    <Carousel
        :wrap-around="true"
        snap-align="center"
        :autoplay="500"
        :transition="700"
        :breakpoints="{
            640: {
                itemsToShow: 1,
            },
            768: {
                itemsToShow: 2,
            },
            1024: {
                itemsToShow: 3,
            },
        }"
        :mouse-drag="false"
        :touch-drag="false"
    >
        <slot></slot>
    </Carousel>
</template>

<style>
.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.75;
    filter: blur(4px);
    transform: rotate(-12deg) scale(0.6);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotate(12deg) scale(0.6);
}

.carousel__slide--prev {
    transform: rotate(-6deg) scale(0.7);
}

.carousel__slide--next {
    transform: rotate(6deg) scale(0.7) !important;
}

.carousel__slide--active {
    transform: rotate(0) scale(1);
}

.carousel__slide--visible {
    opacity: 1;
    filter: blur(0px);
}
</style>
