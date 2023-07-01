import type { ConcreteComponent } from "nuxt/dist/app/compat/capi";

export type NavigationItem = {
    label: string;
    href: string;
    megaMenu?: boolean;
    component?: string|ConcreteComponent;
}

export type NavigationItems = Array<NavigationItem>;