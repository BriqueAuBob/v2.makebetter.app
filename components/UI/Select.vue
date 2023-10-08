<script setup lang="ts">
type SelectOption = {
    label: string;
    value: string;
    disabled?: boolean;
    icon?: string;
    shouldTranslate?: string;
};

type SelectColors = 'primary' | 'white';

const props = defineProps({
    placeholder: {
        type: String,
    },
    options: {
        type: Array as PropType<string[] | SelectOption[]>,
        required: true,
    },
    modelValue: {
        type: [String, Array],
        required: true,
    },
    color: {
        type: String as PropType<SelectColors>,
        default: 'primary',
    },
    label: {
        type: String,
    },
    displayLabel: {
        type: Boolean,
        default: true,
    },
    multiple: {
        type: Boolean,
        default: false,
    },
});

const options = computed<SelectOption[]>(() => {
    return props.options.map((option: string | SelectOption) => {
        if (typeof option === 'string') {
            return {
                label: option,
                value: option,
            };
        }

        return option;
    });
});
const selected = ref<(string | SelectOption)[] | string | SelectOption>(
    props.placeholder ||
        options.value.find((option: string | SelectOption) =>
            typeof option !== 'string' ? option.value === props.modelValue : option === props.modelValue
        ) ||
        options.value[0]
);

const emit = defineEmits(['update:modelValue', 'change', 'focus']);

const colors: Record<
    SelectColors,
    {
        button: string;
        options: string;
        option: {
            [key: string]: string;
        };
    }
> = {
    primary: {
        button: 'bg-white border-zinc-200 dark:bg-zinc-500 text-black dark:text-white dark:border-zinc-700',
        options: 'bg-white dark:bg-zinc-50 text-black',
        option: {
            default: 'hover:bg-primary-50 dark:hover:bg-primary-300 cursor-pointer',
            active: 'bg-primary-50 dark:bg-zinc-200',
        },
    },
    white: {
        button: 'bg-white text-black hover:bg-zinc-200',
        options: 'bg-white text-black',
        option: {
            default: 'cursor-pointer',
            active: 'bg-zinc-200',
            selected: 'bg-primary-100 text-primary-500',
        },
    },
};
</script>

<template>
    <HeadlessListbox
        as="div"
        :model-value="modelValue"
        @update:modelValue="
			(value: string[] | string) => {
				if(multiple && typeof value !== 'string') {
					if(value.find((i: string) => i === 'all')) {
						selected = options.filter((o: SelectOption) => o.value === 'all');
						emit('update:modelValue', ['all']);
					} else {
						selected = options.filter((o: SelectOption) => value.includes(o.value));
					}
				} else {
					selected = options.find((o: SelectOption) => o.value === value)!;
				}
				emit('update:modelValue', value);
				emit('change', value);
			}
		"
        :multiple="multiple"
    >
        <div class="relative">
            <label
                v-if="label && displayLabel"
                class="pointer-events-none ml-4 text-sm font-medium italic text-zinc-400"
            >
                {{ label }}
            </label>
            <HeadlessListboxButton
                class="relative flex w-full cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-3 text-left duration-300 ease-in sm:text-sm"
                :class="colors[color].button"
            >
                <div
                    class="flex items-center gap-2 font-semibold"
                    v-if="typeof selected === 'string' || (selected as SelectOption)?.label"
                >
                    <NuxtIcon
                        v-if="typeof selected !== 'string' && 'icon' in selected"
                        :name="selected?.icon!"
                        class="flex items-center rounded-md text-base"
                        filled
                    />
                    {{ typeof selected === 'object' ? (selected as SelectOption)?.label : selected }}
                </div>
                <div
                    class="flex items-center gap-2 overflow-hidden font-semibold"
                    v-else
                >
                    {{ placeholder }}
                    <span
                        v-if="(selected as [])?.length > 0"
                        class="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-primary-400 text-xs text-white"
                    >
                        {{ (selected as [])?.length }}
                    </span>
                </div>
                <NuxtIcon
                    name="chevron/down"
                    class="text-zinc-700"
                />
            </HeadlessListboxButton>
            <HeadlessTransitionRoot>
                <HeadlessTransitionChild
                    enter="transition bouncy-bezier duration-300"
                    enter-from="transform opacity-0 scale-0"
                    enter-to="transform opacity-100 scale-100"
                    leave="transition bouncy-bezier duration-300"
                    leave-from="transform opacity-100 scale-100"
                    leave-to="transform opacity-0 scale-0"
                >
                    <HeadlessListboxOptions
                        class="absolute right-0 z-10 mt-1 max-h-60 w-full min-w-[200px] overflow-auto rounded-xl py-1 text-base shadow-lg focus:outline-none sm:text-sm"
                        :class="colors[color].options"
                    >
                        <HeadlessListboxOption
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            :disabled="option.disabled"
                            v-slot="{ active, selected }"
                            as="template"
                        >
                            <li
                                :class="[
                                    'relative select-none px-4 py-2 duration-200 ease-out',
                                    selected
                                        ? colors?.[color]?.option?.selected
                                        : active && colors[color].option.active,
                                    !option.disabled && colors[color].option.default,
                                    option.disabled && 'opacity-50',
                                ]"
                            >
                                <NuxtIcon
                                    v-if="option.disabled"
                                    name="lock"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-base text-black"
                                />
                                <NuxtIcon
                                    v-if="option.icon"
                                    :name="option.icon"
                                    class="absolute inset-y-0 left-0 flex items-center rounded-md pl-3 text-base"
                                    filled
                                />
                                <span
                                    :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate',
                                        option.disabled && 'pl-6',
                                        option.icon && 'pl-5',
                                    ]"
                                    >{{ option.shouldTranslate ? $t(option.shouldTranslate) : option?.label }}</span
                                >
                                <span
                                    v-show="selected"
                                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    <NuxtIcon
                                        name="check"
                                        class="icon"
                                    />
                                </span>
                            </li>
                        </HeadlessListboxOption>
                    </HeadlessListboxOptions>
                </HeadlessTransitionChild>
            </HeadlessTransitionRoot>
        </div>
    </HeadlessListbox>
</template>
