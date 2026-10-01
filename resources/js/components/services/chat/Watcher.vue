<template>
    <div class="watcher fixed inset-0 grid grid-rows-[52px_1fr] z-10">

        <div
            class="watcher__top z-11 w-full flex items-center justify-between px-2 py-2 bg-[#1c1c1c]/90 backdrop-blur-xs">
            <div class="watcher__info flex gap-2">
                <img class="watcher__sender-avatar w-9 h-9 rounded-full" src="../../../../images/themes/green-black.jpg"
                    alt="Аватар отправителя">
                <div class="watcher__meta flex flex-col">
                    <h4 class="watcher__file-name text-white leading-4">Кристаллы_на_зеленом_фоне.jpg (1 из 5)</h4>
                    <div class="watcher__file-data flex items-center gap-0.5 text-white cursor-default">
                        <span class="watcher__file-characteristic text-sm text-gray-400">15 мб</span>
                        <svg class="text-gray-400" width="3" height="3">
                            <use href="#point"></use>
                        </svg>
                        <span class="watcher__file-characteristic text-sm text-gray-400">15 авг. 2026</span>
                    </div>
                </div>
            </div>
            <ul class="watcher__functions flex items-center">
                <li class="watcher__function function">
                    <button @click="changeScale('-')"
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Уменьшить масштаб" aria-label="Уменьшить масштаб">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#zoom-out"></use>
                        </svg>
                    </button>
                </li>
                <li class="watcher__function function">
                    <button @click="changeScale('+')"
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Увеличить масштаб" aria-label="Увеличить масштаб">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#zoom-in"></use>
                        </svg>
                    </button>
                </li>
                <li class="watcher__function function">
                    <button
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Поделиться" aria-label="Поделиться изображением">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#share"></use>
                        </svg>
                    </button>
                </li>
                <li class="watcher__function function">
                    <button
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Загрузить" aria-label="Загрузить изображение">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#donload"></use>
                        </svg>
                    </button>
                </li>
                <li class="watcher__function function">
                    <button @click="checkForViruses('src')"
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Проверить" aria-label="Проверить на вирусы">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#shield"></use>
                        </svg>
                    </button>
                </li>
                <li class="watcher__function function">
                    <button @click="closeWatcher()"
                        class="function__btn tooltip-btn tooltip-btn--bottom  text-white p-1.25 rounded-full cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]"
                        data-tooltip="Скрыть" aria-label="Закрыть окно">
                        <svg width="21" height="21" aria-hidden>
                            <use href="#close"></use>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>

        <div class="watcher__content min-h-0 overflow-hidden bg-black/80
            grid grid-cols-[50px_1fr_50px] gap-1 relative">

            <button
                class="watcher__last-btn bg-transparent min-h-0 p-1 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]">
                <svg width="30" height="30">
                    <use href="#arrow-left"></use>
                </svg>
            </button>

            <div class="rounded-xl origin-center overflow-auto h-full min-h-0 scrollbar-hidden">
                <img ref="image" class="watcher__image w-full transition-transform duration-200 object-contain"
                    src="../../../../images/themes/green-black.jpg">
            </div>
            <button
                class="watcher__next-btn bg-transparent min-h-0 p-1 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#3f3f3f] active:bg-[#6c6b6b]">
                <svg width="30" height="30">
                    <use href="#arrow-right"></use>
                </svg>
            </button>

            <div class="watcher__img-settings flex items-center gap-1  absolute bottom-2.5 right-3">
                <Transition name="opacity">
                    <div v-if="checked_value === 1"
                        class="wathcer__img-scale flex items-center gap-1 px-3 py-1 bg-black/30 backdrop-blur-md text-white text-sm rounded-full">
                        <svg width="20" height="20">
                            <use href="#checked"></use>
                        </svg>
                        <span class="">Угроз не обнаружено</span>
                    </div>
                </Transition>
                <Transition name="opacity">
                    <div v-if="checked_value === 2"
                        class="wathcer__img-scale flex items-center gap-1 px-3 py-1 bg-black/30 backdrop-blur-md text-white text-sm rounded-full">
                        <svg width="20" height="20">
                            <use href="#info"></use>
                        </svg>
                        <span class="">Файл может быть опасным</span>
                    </div>
                </Transition>
                <Transition name="opacity">
                    <div v-if="scale !== 1"
                        class="wathcer__img-scale px-3 py-1 bg-black/30 backdrop-blur-md text-white text-sm rounded-full">
                        Масштаб: {{ scale }}</div>
                </Transition>
            </div>

        </div>

    </div>

</template>

<script>
export default {
    name: "Watcher",

    data() {
        return {
            images_src: [],
            scale: 1,
            checked_value: 0,
            share_opened: false,

        }
    },

    methods: {
        changeScale(operation) {
            const step = 0.25
            const min = 0.25
            const max = 3
            const image = this.$refs.image

            this.scale = operation === "+"
                ? Math.min(this.scale + step, max)
                : Math.max(this.scale - step, min)

            image.style.transform = `scale(${this.scale})`
        },

        donloadImage(src) {

        },

        checkForViruses(src) {
            const value = 2
            // Зарос на обрабтку файла к антивирусу...
            this.checked_value = value
        },

        closeWatcher() {
            this.scale = 1
            this.images_src = []
            this.$emit('close-watcher')
        }

    }
}
</script>
