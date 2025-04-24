import { TailvueToast } from 'tailvue';

declare module '#app' {
    interface NuxtApp {
        $toast: TailvueToast;
    }
}

export {};
