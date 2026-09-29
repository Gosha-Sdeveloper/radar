<template>
    <div class="grid grid-cols-[300px_1fr] items-center shadow bg-white">
        <Header></Header>
        <div class="main-functions flex max-h-12.5 items-center">
            <form class="main-functions__search-form pl-[20%] flex items-center">
                <div class="main-functions__search-block flex items-center py-1 border border-[#c6c6c6]"
                    aria-hidden="true">
                    <button type="button"
                        class="main-functions__search-filter flex items-center gap-1.5 px-2.5 py-1 text-sm border border-[#c6c6c6] bg-[#efefef] text-gray-600">
                        <span>Все</span>
                        <svg class="main-functions__search-select w-1.75 h-1.75" aria-hidden="true">
                            <use href="#select"></use>
                        </svg>
                    </button>
                    <input class="main-functions__search-input text-base w-full px-2 pl-3" id="main-search" type="text"
                        autocomplete="off" spellcheck="false" placeholder="Введите запрос">
                </div>
                <button
                    class="main-functions__search-btn px-3 py-1.75 border-[#c6c6c6] border bg-[#efefef] hover:bg-[#5353533f] cursor-pointer"
                    aria-label="Искать информацию по запросу">
                    <svg width="24" height="24" class="">
                        <use href="#search"></use>
                    </svg>
                </button>
                <div class="main-functions__search-types hidden">

                </div>
            </form>
            <div class="flex items-center ml-auto main-functions__buttons gap-2 pr-3.75">
                <a @click="createRipple"
                    class="ripple-btn flex items-start box-shadow-transition main-functions__button-create px-4 py-1 rounded-full bg-[#efefef] border border-[#c6c6c6] font-medium"
                    href="#">
                    <svg color="#000" width="26" height="26" class="z-2">
                        <use href="#plus"></use>
                    </svg>
                    <span class="z-2">Создать</span>
                </a>
                <div class="main-functions__buttons flex gap-0">
                    <button @click="openFilter()"
                        class="p-1.75 rounded-full cursor-pointer bg-transparent main-functions__button-filter filter-btn">
                        <svg width="28" height="28">
                            <use href="#filter"></use>
                        </svg>
                    </button>
                    <button @click="toggleActivitiesBlock()"
                        :class="['function-btn p-1.75 rounded-full cursor-pointer main-functions__button-main bg-transparent main-functions__button-activities', { 'active': activities_opened }]">
                        <svg width="28" height="28" class="z-2">
                            <use href="#activities"></use>
                        </svg>
                    </button>
                    <button @click="toggleNotificationsBlock()"
                        :class="['function-btn p-1.75 rounded-full cursor-pointer main-functions__button-main bg-transparent main-functions__button-messeges', { 'active': notifications_opened }]">
                        <svg width="28" height="28">
                            <use href="#notifications"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <Transition name="menu">
                <div v-if="notifications_opened"
                    class="bg-white main-functions__notifications main-functions__popup  w-110.5 flex flex-col absolute rounded-xl shadow-sm border border-[#c6c6c6] top-13 right-2 pt-2 pb-5 z-3">
                    <div
                        class="main-functions__notifications-header mb-1 pl-5 pr-2 flex items-center justify-between z-5">
                        <h4 class="text-lg font-medium">Уведомления</h4>
                        <span v-if="user_notifications?.length"
                            class="main-functions__notifications-count main-functions__popup-count  text-sm bg-black text-white ">{{
                                user_notifications.length }}</span>
                    </div>
                    <div class="border-b border-[#c6c6c6]"></div>
                    <div v-if="!user_notifications.length"
                        class="main-functions__notifications-none main-functions__popup-none flex flex-col items-center pt-6">
                        <svg class="main-functions__notifications-noneimg main-functions__popup-noneimg">
                            <use href="#not_notifications"></use>
                        </svg>
                        <p class="font-medium">Здесь пока ничего нет</p>
                        <p class="text-sm text-center text-gray-600 max-w-[95%]">В этом разделе будут указаны все
                            написавшие
                            вам
                            лица,
                            которые не занесены в блок "не беспокоить".
                        </p>
                    </div>
                    <ul v-if="user_notifications?.length" class="main-functions__notifications-list flex flex-col">
                        <li
                            class="main-functions__notifications-item notifications-item flex gap-2 items-center border-b border-[#c6c6c6] cursor-pointer hover:bg-gray-100 p-3">
                            <img class="notifications-item__img" src="../../../../images/themes/red.jpg" alt="">
                            <div class="main-functions__notifications-textblock">
                                <div class="flex items-center justify-between">
                                    <span class="notifications-item__username points font-medium">Андрей
                                        Чернышевский</span>
                                    <span class="notifications-item__date text-sm text-gray-800">2 часа назад</span>
                                </div>
                                <p class="notifications-item__message text-sm text-gray-600 points-two m-0">Пользователь
                                    отправил
                                    вам личное
                                    сообщение. Нажмите, чтобы открыть.</p>
                            </div>
                        </li>
                        <li
                            class="main-functions__notifications-item notifications-item flex gap-2 items-center border-b border-[#c6c6c6] cursor-pointer hover:bg-gray-100 p-3">
                            <img class="notifications-item__img" src="../../../../images/themes/blue-black.jpg" alt="">
                            <div class="main-functions__notifications-textblock">
                                <div class="flex items-center justify-between">
                                    <span class="notifications-item__username points font-medium">Иван Курчатов</span>
                                    <span class="notifications-item__date text-sm text-gray-800">1 день назад</span>
                                </div>
                                <p class="notifications-item__message text-sm points-two text-gray-600 m-0">Пользователь
                                    ответил
                                    вам на ваш комментарий под постом "Как работают АЭС. Введение в продвинутый курс.".
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </Transition>
            <Transition name="menu">
                <div v-if="activities_opened"
                    class="bg-white main-functions__activities main-functions__popup w-110.5 flex flex-col absolute rounded-xl shadow-sm border border-[#c6c6c6] top-13 right-2 pt-2 pb-5 z-5">
                    <div class="main-functions__activities-header mb-1 pl-5 pr-2 flex items-center justify-between">
                        <h4 class="text-lg font-medium">Активности</h4>
                        <span v-if="user_activities?.length"
                            class="main-functions__activities-count main-functions__popup-count  text-sm bg-black text-white">{{
                                user_activities.length }}</span>
                    </div>
                    <div class="border-b border-[#c6c6c6]"></div>
                    <div v-if="!user_activities.length"
                        class="main-functions__activities-none main-functions__popup-none mb-15 flex flex-col items-center pt-6">
                        <svg class="main-functions__activities-noneimg main-functions__popup-noneimg">
                            <use href="#connection"></use>
                        </svg>
                        <p class="font-medium">Вы пока нигде не учавствуете</p>
                        <p class="text-sm text-center text-gray-600 max-w-[97%]">Участвуйте в&nbsp;кампаниях, опросах,
                            митингах, мероприятиях и&nbsp;благотворительных акциях&nbsp;&mdash; влияйте на&nbsp;мир
                            и&nbsp;жизнь окружающих.</p>
                    </div>
                    <ul v-if="user_activities?.length" class="main-functions__activities-list activities mb-40">
                        <li class="activities__item py-2 px-2 border-b border-[#c6c6c6] flex gap-3 cursor-pointer">
                            <img class="activities__img rounded-xl" src="../../../../images/themes/green-middle.jpg"
                                alt="" srcset="">
                            <div class="activities__content flex flex-col">
                                <h5 class="activities__item-name points font-medium">Жилищная кампания</h5>
                                <p class="activities__item-specifications text-sm text-gray-600 points"><span>25089
                                        учавствуют</span> | <span>9756 активных</span></p>
                            </div>
                            <div class="activities__item-actions ml-auto">
                                <button class="">
                                    <svg width="28" height="28">
                                        <use href="#open"></use>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li class="activities__item py-2 px-2 border-b border-[#c6c6c6] flex gap-3 cursor-pointer">
                            <img class="activities__img rounded-xl" src="../../../../images/themes/amethysts.jpg" alt=""
                                srcset="">
                            <div class="activities__content flex flex-col">
                                <h5 class="activities__item-name points font-medium">Вишневая кампания</h5>
                                <p class="activities__item-specifications text-sm text-gray-600 points"><span>500
                                        учавствуют</span> | <span>150 активных</span></p>
                            </div>
                            <div class="activities__item-actions ml-auto">
                                <button class="">
                                    <svg width="28" height="28">
                                        <use href="#open"></use>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div class="main-functions__activities-links grid grid-cols-2 items-center gap-1 mb-auto px-2">
                        <a class="main-functions__activities-link border border-[#c6c6c6] text-center p-1.5 rounded-full bg-[#efefef] hover:bg-gray-100 active:bg-neutral-300 duration-100"
                            href="#">Мои награды</a>
                        <a class="main-functions__activities-link p-1.5 text-center bg-black text-white rounded-full hover:bg-neutral-800 active:opacity-70 duration-100"
                            href="#">Все активности</a>
                    </div>
                </div>
            </Transition>
        </div>
        <Transition name="from-right">
            <FilterPanel v-if="filter_panel_opened" @close-panel="filter_panel_opened = false"></FilterPanel>
        </Transition>
    </div>
    <Transition name="dimming_panel">
        <div v-if="dimming_panel_opened" class="fixed inset-0 bg-black/30 z-10 blackout"></div>
    </Transition>
</template>

<script>
import { useRipple } from '../../../composables/useRipple.js';
import FilterPanel from '../../services/home/FilterPanel.vue';
import Header from '../nav/Header.vue';

export default {
    name: 'MainPageFunctions',

    data() {
        return {
            filter_panel_opened: false,
            notifications_opened: false,
            activities_opened: false,
            dimming_panel_opened: false,
            user_notifications: [1],
            user_activities: [1],
        }
    },

    watch: {
        filter_panel_opened(opened) {
            opened ? this.dimming_panel_opened = true : this.dimming_panel_opened = false
        }
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        toggleNotificationsBlock() {
            this.notifications_opened = !this.notifications_opened
            this.activities_opened = false
        },

        toggleActivitiesBlock() {
            this.activities_opened = !this.activities_opened
            this.notifications_opened = false
        },

        openFilter() {
            this.filter_panel_opened = true
            this.activities_opened = false
            this.notifications_opened = false
        }
    },

    components: {
        FilterPanel,
        Header,
    }

}
</script>

<style scoped>
.main-functions__search-filter {
    border-radius: 20px;
}

.main-functions__search-filter:hover {
    background-color: #5353533f;
    color: #000;
}

.main-functions__search-filter:focus {
    outline: 1px solid oklch(35.9% 0.144 278.697);
    color: #000;
}

.main-functions__search-filter:hover svg {
    color: #000;
}

.main-functions__search-select {
    margin-top: 1px;
    color: #4a5565;
}

.main-functions__search-block {
    padding-left: 3px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 505px;
}

.main-functions__search-input {
    padding-top: 3px;
    padding-bottom: 3px;
    outline: none;
}

.main-functions__search-block:has(.main-functions__search-input:focus) {
    border-color: oklch(35.9% 0.144 278.697);
    box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.09);
}

.main-functions__search-btn {
    border-left: none;
    transition: background-color 100ms ease;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.main-functions__search-btn:focus {
    outline: 1px solid oklch(35.9% 0.144 278.697);
}

.main-functions__button-create {
    transition: box-shadow 150ms ease;
}

.main-functions__button-create:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.main-functions__button-create:active {
    box-shadow: none;
}


.main-functions__button-main {
    transition: background-color 100ms ease;
}

.main-functions__popup-noneimg {
    width: 70px;
    height: 70px;
    color: oklch(37.3% 0.034 259.733);
}

.main-functions__popup-count {
    border-radius: 14px;
    font-size: 14px;
    padding: 1px 7px;
}

.notifications-item__img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    pointer-events: none;
    z-index: 2;
}

.notifications-item__message {
    line-height: 125%;
}

.activities__img {
    width: 65px;
    height: 65px;
}

.activities__item {
    transition: box-shadow 75ms ease;
    will-change: box-shadow;
}

.activities__item:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.activities__item:active {
    box-shadow: none;
}

/*. */
.dimming_panel-enter-active,
.dimming_panel-leave-active {
    transition: opacity 150ms ease;
}

.dimming_panel-enter-from,
.dimming_panel-leave-to {
    opacity: 0;
}

.dimming_panel-enter-from,
.dimming_panel-leave-to {
    opacity: 0;
}
</style>
