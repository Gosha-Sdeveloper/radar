<template>
    <div class="save py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-full max-w-100 h-full max-h-140 bg-white shadow-md rounded-xl z-10 backdrop-blur-2xl flex flex-col">

        <div class="save__header flex items-center justify-between pr-2 pl-3 mb-1">
            <h3 v-if="!create_window_opened" class="save__title text-lg font-medium">Сохранить</h3>
            <Transition name="opacity">
                <h3 v-if="create_window_opened" class="save__title text-lg font-medium">Новый плейлист</h3>
            </Transition>


            <button @click="closeSavePopup()" type="button"
                class="save__close-btn p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] text-black cursor-pointer border border-transparent active:border-[#c6c6c6]"
                aria-label="Закрыть окно">
                <svg width="24" height="24">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
        <div v-if="!create_window_opened" class="save__content flex flex-col h-full">
            <div class="save__default-playlists grid grid-cols-2 gap-1 px-2 mb-2">
                <button @click="save('watch-later')"
                    class="save__default-playlist hover:bg-[#9696963f] cursor-pointer bg-[#efefef] rounded-full py-1 default-playlist flex items-center gap-1 justify-center">
                    <div class="default-playlist__icon-wrapper p-0.75 rounded-full bg-[#0EA5E9] text-white">
                        <svg class="default-playlist__icon" width="24" height="24">
                            <use href="#time"></use>
                        </svg>
                    </div>
                    <span class="default-playlist__title">Смотреть позже</span>
                </button>
                <button @click="save('favourites')"
                    class="save__default-playlist hover:bg-[#9696963f] cursor-pointer bg-[#efefef] rounded-full py-1 default-playlist flex items-center gap-1 justify-center">
                    <div class="default-playlist__icon-wrapper p-0.75 rounded-full bg-[#F97316] text-white">
                        <svg class="default-playlist__icon" width="24" height="24">
                            <use href="#save"></use>
                        </svg>
                    </div>
                    <span class="default-playlist__title">Избранное</span>
                </button>
            </div>
            <ul class="save__playlists px-1">
                <li class="save__playlist playlist">
                    <button @click="save('playlist', $event)"
                        class="playlist__btn ripple-btn py-1 rounded-xl w-full flex items-center justify-between">
                        <div class="playlist__main-content flex items-center gap-1">
                            <img class="playlist__preview-img w-14 h-10 rounded-xl mr-1"
                                src="../../../../images/themes/glasmorphism.jpg" alt=" Изображение плейлиста">
                            <div class="playlist__info flex flex-col">
                                <span class="playlist__title font-medium leading-4 text-left">Моё обучение</span>
                                <span class="playlist__title text-[#6E6E6E] leading-5 text-sm">Ограниченный
                                    доступ</span>
                            </div>
                        </div>
                        <svg class="playlist__decoration-icon mr-1 fill-transparent" width="24" height="24">
                            <use href="#favourites"></use>
                        </svg>

                    </button>
                </li>
                <li class="save__playlist playlist">
                    <button @click="save('playlist', $event)"
                        class="playlist__btn ripple-btn py-1 rounded-xl w-full flex items-center justify-between">
                        <div class="playlist__main-content flex items-center gap-1">
                            <img class="playlist__preview-img w-14 h-10 rounded-xl mr-1"
                                src="../../../../images/themes/glasmorphism.jpg" alt=" Изображение плейлиста">
                            <div class="playlist__info flex flex-col">
                                <span class="playlist__title font-medium leading-4 text-left">Моё обучение</span>
                                <span class="playlist__title text-[#6E6E6E] leading-5 text-sm">Ограниченный
                                    доступ</span>
                            </div>
                        </div>
                        <svg class="playlist__decoration-icon mr-1 fill-transparent" width="24" height="24">
                            <use href="#favourites"></use>
                        </svg>

                    </button>
                </li>
                <li class="save__playlist playlist">
                    <button @click="save('playlist', $event)"
                        class="playlist__btn ripple-btn py-1 rounded-xl w-full flex items-center justify-between">
                        <div class="playlist__main-content flex items-center gap-1">
                            <img class="playlist__preview-img w-14 h-10 rounded-xl mr-1"
                                src="../../../../images/themes/glasmorphism.jpg" alt=" Изображение плейлиста">
                            <div class="playlist__info flex flex-col">
                                <span class="playlist__title font-medium leading-4 text-left">Моё обучение</span>
                                <span class="playlist__title text-[#6E6E6E] leading-5 text-sm">Ограниченный
                                    доступ</span>
                            </div>
                        </div>
                        <svg class="playlist__decoration-icon mr-1 fill-transparent" width="24" height="24">
                            <use href="#favourites"></use>
                        </svg>

                    </button>
                </li>
            </ul>
            <button @click="newPlaylistWindow()"
                class="save__new-playlist mx-2 playlist-btn flex items-center justify-center gap-1.5 py-1 bg-[#efefef] hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer rounded-full mt-auto">
                <svg class="playlist-btn__icon" width="24" height="24">
                    <use href="#plus"></use>
                </svg>
                <span class="playlist-btn__text">Новый плейлист</span>
            </button>
        </div>
        <Transition v-if="create_window_opened" name="opacity">
            <div class="save__new-playlist new-playlist px-2 flex flex-col h-full">
                <Textarea label="Название" id="new-playlist-input"></Textarea>

                <button
                    class="new-playlist__create mt-auto py-1 w-full flex items-center justify-center gap-1.5 rounded-full bg-[#1c1c1c] text-white hover:opacity-90 active:opacity-80 cursor-pointer">Создать</button>
            </div>
        </Transition>
    </div>

</template>

<script>
import { useRipple } from '../../../composables/useRipple';
import Textarea from '../../ui/buttons/Textarea.vue';

export default {
    name: "Save",

    data() {
        return {
            create_window_opened: false,
        }
    },

    components: {
        Textarea,
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        save(name, e) {
            if (name === 'watch-later') {
                // Запрос в смотреть позже
            } else if (name === 'favourites') {
                // Запрос в избранное
            } else if (name === 'playlist') {
                this.createRipple(e)
                // Запрос в плейлист
            }

            setTimeout(() => {
                this.closeSavePopup()
            }, 360);
        },

        closeSavePopup() {
            this.$emit('close-save')
        },

        newPlaylistWindow() {
            this.create_window_opened = !this.create_window_opened
        },
    },
}
</script>

<style scoped>
.save__default-playlist:focus {
    transition: background-color 600ms ease, color 600ms ease;
    background-color: #1c1c1c;
    color: white;
}

.playlist__btn:hover .playlist__decoration-icon {
    fill: #1c1c1c;
}

.playlist__btn:focus .playlist__decoration-icon {
    fill: #1c1c1c;
}
</style>
