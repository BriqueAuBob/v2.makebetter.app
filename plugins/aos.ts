import { defineNuxtPlugin } from 'nuxt/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

// aos plugin
export default defineNuxtPlugin((nuxtApp) => {
    if (typeof window === 'undefined') return;
    nuxtApp.AOS = AOS.init({
        once: true,
        duration: 250,
        easing: 'ease-in',
    });
});
