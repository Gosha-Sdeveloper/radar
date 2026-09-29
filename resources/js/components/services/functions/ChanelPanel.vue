<template>
    <div class="chat-panel fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-full max-w-180 h-[80%] bg-white shadow-md rounded-xl z-10
            grid grid-rows-[1fr_auto] items-start justify-items-stretch overflow-hidden">
        <div class="chat-panel__main h-full overflow-auto">
            <div class="chat-panel__top relative h-12.5 flex justify-end items-center overflow-hidden">
                <img class="absolute top-1/2 left-1/2  w-full -translate-x-1/2 -translate-y-1/2 transform"
                    src="../../../../images/themes/amethysts.jpg" alt="Фоновое изображение канала">
                <button @click="closePanel()"
                    class="text-white z-10 relative p-2 rounded-full bg-white/20 mr-1 cursor-pointer hover:bg-white/30 active:bg-white/40"
                    aria-label="Закрыть панель информации">
                    <svg width="26" height="26" aria-hidden="true">
                        <use href="#close"></use>
                    </svg>
                </button>
            </div>
            <div class="chat-panel__main-info px-3 pt-3 pb-0.5 flex items-start gap-2.5">
                <img class="h-25 w-25 rounded-full" src="../../../../images/themes/amethysts.jpg" alt="">
                <div class="chat-panel__main-textcontent flex flex-col pt-2">
                    <h2 @click="toggleText('title')"
                        :class="['chat-panel__title chat-name font-medium text-lg leading-tight', title_opened ? 'cursor-default' : 'points cursor-pointer']">
                        Кристаллический
                        лазерный завод</h2>
                    <p @click="toggleText('descr')"
                        :class="['chat-panel__description chat-description text-[#6E6E6E] leading-[1.15] text-sm pb-1.5', descr_opened ? 'cursor-default' : 'point-three cursor-pointer']">
                        Организация посвящена тому, чтобы
                        люди узнали о современном кристаллическом лазерном заводе и понимали о том, из чего в основном
                        делают процессоры, электронные устройства, энергоносители, а также украшения. Нельзя не сказать
                        о
                        том, что проект сделан для обучения молодёжи.кристаллическом лазерном заводе и понимали о том,
                        из чего в основном
                        делают процессоры, электронные устройства, энергоносители, а также украшения. Нельзя не сказать
                        о
                        том, что проект сделан для обучения молодёжи.</p>
                </div>
            </div>
            <div class="chat-panel__carusel flex pb-1">
                <div class="chat-panel__main-theme chat-theme flex items-center gap-0.5">
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">горнодобыча</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">оборудование</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">производство</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">наука</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">обслуживание</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">курсы</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">программирование</a>
                </div>
                <div class="chat-panel__main-theme chat-theme flex items-center gap-0.5">
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">горнодобыча</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">оборудование</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">производство</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">наука</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">обслуживание</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">курсы</a>
                    <a href="#"
                        class="chat-panel__theme-btn p-0.5 px-2 text-sm bg-[#efefef] rounded-full hover:bg-[#5353533f] cursor-pointer">программирование</a>
                </div>
            </div>
            <ul
                class="chat-panel__organizations grid grid-cols-[120px_120px_120px_180px_180px] px-2 py-0.5 pb-0 h-21 gap-1 overflow-x-auto mb-3 ">
                <li @click="createRipple"
                    class="chat-panel__organization ripple-btn h-20 flex flex-col justify-center items-center border border-white shadow-sm rounded-xl p-2 hover:bg-[#efefef] cursor-pointer">
                    <svg class="chat-panel__organization-icon z-2" width="26" height="26">
                        <use href="#chanel"></use>
                    </svg>
                    <span class="chat-panel__organization-type z-2 points">1 канал</span>
                </li>
                <li @click="openBottomPanel('groups', $event)"
                    :class="['chat-panel__organization ripple-btn h-20  flex flex-col justify-center items-center border border-white shadow-sm rounded-xl p-2 hover:bg-[#efefef] cursor-pointer', opened.includes('groups') ? 'bg-[#efefef] hover:bg-[#5353533f] active' : '']">
                    <svg class="chat-panel__organization-icon z-2" width="26" height="26">
                        <use href="#group"></use>
                    </svg>
                    <span class="chat-panel__organization-type z-2 points">3 группы</span>
                </li>
                <li @click="createRipple"
                    class="chat-panel__organization ripple-btn h-20  flex flex-col justify-center items-center border border-white shadow-sm rounded-xl p-2 hover:bg-[#efefef] cursor-pointer">
                    <svg class="chat-panel__organization-icon z-2" width="26" height="26">
                        <use href="#admin"></use>
                    </svg>
                    <span class="chat-panel__organization-type z-2 points">12 админов</span>
                </li>
                <li @click="createRipple"
                    class="chat-panel__organization ripple-btn h-20  flex flex-col justify-center items-center border border-white shadow-sm rounded-xl p-2 hover:bg-[#efefef] cursor-pointer">
                    <svg class="chat-panel__organization-icon z-2" width="26" height="26">
                        <use href="#user"></use>
                    </svg>
                    <span class="chat-panel__organization-type z-2 points">1300 участников</span>
                </li>
                <li @click="createRipple"
                    class="chat-panel__organization ripple-btn h-20  flex flex-col justify-center items-center border border-white shadow-sm rounded-xl p-2 hover:bg-[#efefef] cursor-pointer">
                    <svg class="chat-panel__organization-icon z-2" width="26" height="26">
                        <use href="#ecology"></use>
                    </svg>
                    <span class="chat-panel__organization-type z-2 points">Нет мероприятий</span>
                </li>
            </ul>
            <div class="chat-panel__content overflow-hidden">
                <Transition name="list">
                    <div v-show="opened.includes('default')" class="chat-panel__connection px-3 overflow-hidden">
                        <h3 class="chat-panel__connection-title font-medium text-lg leading-tight mb-1">Информация
                        </h3>
                        <ul class="chat-panel__connection-list flex flex-col pb-1 border-b border-gray-300 mb-1">
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon" width="20" height="20">
                                    <use href="#media"></use>
                                </svg>
                                <span class="font-medium text-black/65">Мультимедиа:</span>
                                <span class="chat-panel__connection-text relative text-black/80">15 видео, 7
                                    статей</span>
                            </li>
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon" width="20" height="20">
                                    <use href="#views"></use>
                                </svg>
                                <span class="font-medium text-black/65">Просмотры:</span>
                                <span class="chat-panel__connection-text relative text-black/80">195732</span>
                            </li>
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon" width="20" height="20">
                                    <use href="#email"></use>
                                </svg>
                                <span class="font-medium text-black/65">Почта:</span>
                                <span
                                    class="chat-panel__connection-text relative text-black/80">cristall.plasehouse.admin@mail.com</span>
                            </li>
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon" width="20" height="20">
                                    <use href="#phone"></use>
                                </svg>
                                <span class="font-medium text-black/65">Телефон:</span>
                                <span class="chat-panel__connection-text relative text-black/80">+7-(931)-55-71</span>
                            </li>

                        </ul>
                        <h3 class="chat-panel__connection-title font-medium text-lg leading-tight mb-1">Ссылки</h3>
                        <ul class="chat-panel__connection-list flex flex-col">
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon text-[#2C3036]" width="20" height="20">
                                    <use href="#dzen"></use>
                                </svg>
                                <span class="font-medium text-black/65">Дзен:</span>
                                <span
                                    class="chat-panel__connection-text relative text-base">Inteses-cristallic-placehouse</span>
                            </li>
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon" width="20" height="20">
                                    <use href="#tik_tok"></use>
                                </svg>
                                <span class="font-medium text-black/65">Tiktok:</span>
                                <span
                                    class="chat-panel__connection-text relative text-base">Inteses-cristallic-placehouse</span>
                            </li>
                            <li class="chat-panel__connection-item cursor-pointer flex items-center gap-1">
                                <svg class="chat-panel__connection-icon text-[#2C3036]" width="20" height="20">
                                    <use href="#ozon"></use>
                                </svg>
                                <span class="font-medium text-black/65">Ozon:</span>
                                <span
                                    class="chat-panel__connection-text relative text-base">Cristall-warehouse-decorations</span>
                            </li>
                        </ul>
                    </div>
                </Transition>
                <Transition name="list">
                    <div v-show="!opened.includes('default')"
                        class="chat-panel__organization-details organization-details px-0.5 overflow-hidden">
                        <div class="organization-details__top flex items-center mb-1.5 pl-2 gap-1">
                            <button @click="openBottomPanel('default', $event)"
                                class="organization-details__back px-0.75 py-0.5 pl-0 rounded-full bg-[#efefef] cursor-pointer ripple-btn"
                                aria-label="Назад" title="Назад">
                                <svg width="20" height="20" class="rotate-180 z-2" aria-hidden>
                                    <use href="#arrow-right"></use>
                                </svg>
                            </button>
                            <h3 class="organization-details__title font-medium text-lg leading-tight">Группы</h3>
                        </div>
                        <ul class="organization-details__list flex flex-col gap-1">
                            <li
                                class="organization-details__item flex items-center gap-1.5 px-1.5 py-0.5 hover:bg-[#efefef] rounded-md cursor-pointer">
                                <img class="orginisation-details__avatar w-10 h-10 rounded-full"
                                    src="../../../../images/themes/amethysts.jpg" alt="Иконка канала">
                                <div class="organization-details__item-info flex flex-col">
                                    <h4 class="organization-details__item-title text-base leading-none">Сообщество
                                        кристаллического лазерного завода
                                    </h4>
                                    <p class="organization-details__item-info text-sm text-[#6E6E6E]">1514 участников
                                    </p>
                                </div>
                                <svg class="text-[#6E6E6E] ml-auto" width="20" height="20" title="Перейти">
                                    <use href="#move"></use>
                                </svg>
                            </li>
                            <li
                                class="organization-details__item flex items-center gap-1.5 px-1.5 py-0.5 hover:bg-[#efefef] rounded-md cursor-pointer">
                                <img class="orginisation-details__avatar w-10 h-10 rounded-full"
                                    src="../../../../images/themes/amethysts.jpg" alt="Иконка канала">
                                <div class="organization-details__item-info flex flex-col">
                                    <h4 class="organization-details__item-title text-base leading-none">Сообщество
                                        кремнеперерабатывающего завода
                                    </h4>
                                    <p class="organization-details__item-info text-sm text-[#6E6E6E]">5141 участников
                                    </p>
                                </div>
                                <svg class="text-[#6E6E6E] ml-auto" width="20" height="20" title="Перейти">
                                    <use href="#move"></use>
                                </svg>
                            </li>
                            <li
                                class="organization-details__item flex items-center gap-1.5 px-1.5 py-0.5 hover:bg-[#efefef] rounded-md cursor-pointer">
                                <img class="orginisation-details__avatar w-10 h-10 rounded-full"
                                    src="../../../../images/themes/amethysts.jpg" alt="Иконка канала">
                                <div class="organization-details__item-info flex flex-col">
                                    <h4 class="organization-details__item-title text-base leading-none">Сибирская
                                        алмазная
                                        шахта
                                    </h4>
                                    <p class="organization-details__item-info text-sm text-[#6E6E6E]">450 участников</p>
                                </div>
                                <svg class="text-[#6E6E6E] ml-auto" width="20" height="20" title="Перейти">
                                    <use href="#move"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                </Transition>
            </div>
        </div>
        <div class="chat-panel__functions self-end flex justify-between px-2 pb-2 pt-6">
            <div class="chat-panel__functions-main flex items-end gap-0.5">
                <button class="chat-panel__function relative flex gap-0.5 items-center cursor-pointer">
                    <svg class="chat-panel__connection-icon" width="16" height="16" aria-hidden="true">
                        <use href="#share"></use>
                    </svg>
                    <span class="chat-panel__function-text text-sm">Поделиться</span>
                </button>
                <span aria-hidden="true"> |</span>
                <button class="chat-panel__function relative flex items-center cursor-pointer">
                    <svg class="chat-panel__connection-icon pt-px" width="16" height="16">
                        <use href="#ruble"></use>
                    </svg>
                    <span class="chat-panel__function-text text-sm">Поддержать</span>
                </button>
            </div>
            <button class="chat-panel__function relative flex gap-0.5 items-center cursor-pointer">
                <svg class="chat-panel__connection-icon pt-px" width="16" height="16">
                    <use href="#activities"></use>
                </svg>
                <span class="chat-panel__function-text text-sm">Пожаловаться</span>
            </button>
        </div>
    </div>
</template>

<script>
import Report from './Report.vue';
import { useRipple } from '../../../composables/useRipple.js';
export default {
    name: "chatPanel",

    data() {
        return {
            // Умолчание 'default'
            // Группы 'groups'
            opened: ['default'],
            title_opened: false,
            descr_opened: false,
        }
    },

    methods: {
        openBottomPanel(name, e) {
            this.createRipple(e)
            setTimeout(() => {
                this.opened[0] = name
            }, 10);
        },

        toggleText(name) {
            if (name == 'title') {
                this.title_opened = !this.title_opened
            } else {
                this.descr_opened = !this.descr_opened
            }
        },

        closePanel() {
            this.$emit('close-info')
        },

        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        }
    }
}
</script>

<style scoped>
.chat-panel {
    overflow-y: auto;
}

.chat-panel__top::before {
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.432);
}

.chat-panel__organizations::-webkit-scrollbar {
    display: none;
}

.chat-panel__organizations {
    overflow-x: auto;
}


.chat-panel__organization.active {
    transition: background-color 0s linear 350ms;
}

/* ВНИМАНИЕ ПОВТОРЕНИЕ СТИЛЕЙ - ПОДЧЁРКНУТЫЙ ТЕКСТ */
.chat-panel__function::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: black;
    border-radius: 50%;
    opacity: 0;
}

.chat-panel__function:hover::before {
    opacity: 1;
}

.chat-panel__connection-text::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: rgb(0, 0, 0);
    opacity: 0;
}

.chat-panel__connection-item:hover .chat-panel__connection-text::before {
    opacity: 0.3
}

/* ВНИМАНИЕ АНИМАЦИЯ КАРУСЕЛИ МОЖЕТ ПОНАДОВИТЬСЯ ДЛЯ ПРЕЗЕНТАЦИИ НА ГЛАВНОЙ */
.chat-panel__carusel {
    position: relative;
    overflow-x: auto;
}

.chat-panel__carusel::before,
.chat-panel__carusel::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 60px;
    pointer-events: none;
    z-index: 2;
}

.chat-panel__carusel::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.chat-panel__carusel::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}


.chat-panel__carusel::-webkit-scrollbar {
    display: none;
}

.chat-panel__main-theme {
    animation: spin 60s infinite linear;
}

.chat-panel__carusel:hover .chat-panel__main-theme {
    animation-play-state: paused;
}

@keyframes spin {
    from {
        translate: 0;
    }

    to {
        translate: -50%;
    }
}


/* ВНИМАНИЕ!!! ПОВТОРЕНИЕ АНИМАЦИИ ДЛЯ TRANSITION, ТАКАЯ ЖЕ НА ГЛАВНОЙ ПРИ РАСКРЫТИИ СПИСКА */

/* === Появление (enter) === */
.list-enter-from {
    opacity: 0;
    transform: translateX(40px);
    /* приходит сбоку */
}

.list-enter-active {
    transition: transform 750ms ease 10ms, opacity 450ms ease 10ms;
}

.list-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.list-leave-from {
    opacity: 1;
}

.list-leave-active {
    transition: none;
}

.list-leave-to {
    opacity: 0;
}
</style>
