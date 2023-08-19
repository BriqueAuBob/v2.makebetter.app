export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('loading', {
        updated(el, binding) {
            if (binding.value) {
                el.classList.add('loading');
            } else {
                el.classList.remove('loading');
            }
        },
    });
});
