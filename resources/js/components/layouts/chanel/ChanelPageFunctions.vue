<template>
    <div class=" py-1 px-1 scrollbar-hidden overflow-y-auto scrollbar-hidden">
        <div class="chanel-component w-full h-auto bg-white rounded-xl p-0.5">
            <div class="chanel-component__top border border-[#c6c6c6] rounded-xl border-t-0 shadow">
                <div
                    class="chanel-info relative chanel flex items-center justify-between px-2 py-1.5 rounded-xl overflow-hidden">
                    <div class="chanel-info__main flex items-center gap-2 z-2">
                        <img class="w-17 h-17 rounded-full border border-[#ffffff4d]"
                            src="../../../../images/themes/amethysts.jpg" alt="Иконка канала">
                        <div class="chanel-info__presentation flex flex-col gap-1">
                            <h1 class="chanel-info__title text-xl text-white font-medium leading-3 cursor-pointer">
                                Кристаллический лазерный
                                завод</h1>
                            <div
                                class="history__author-info history__views flex items-center gap-0.5 text-gray-400 cursor-default">

                                <span>150 тыс. подписчиков</span>
                                <svg width="3" height="3">
                                    <use href="#point"></use>
                                </svg>
                                <span>31 видео</span>
                                <svg width="3" height="3">
                                    <use href="#point"></use>
                                </svg>
                                <span>12 статей</span>
                            </div>

                        </div>
                    </div>
                    <div class="chanel-info__functions chanel-functions flex items-center gap-1.5 z-2">
                        <button @click="toggleActions()"
                            :class="['chanel-functions__more-btn text-white p-1.5 rounded-full backdrop-blur-xs cursor-pointer', actions_opened ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20']">
                            <svg width="30" height="30">
                                <use href="#open"></use>
                            </svg>
                        </button>
                        <SubscribeBtn type="chanel"></SubscribeBtn>
                    </div>
                    <div class="chanel-info__preview-img absolute inset-0 w-full h-full object-cover z-0">
                        <img class="w-full" src="../../../../images/themes/glasmorphism.jpg" alt="Фон">
                    </div>

                </div>
                <nav class="chanel-info__nav chanel-nav flex items-center justify-between px-2 py-1">
                    <div ref="nav" class="chanel-nav__left flex items-center gap-2.5 relative">
                        <button @click="toggleContent($event, 'main')" ref="main"
                            :class="['chanel-nav__left-link ripple-btn rounded-xs cursor-pointer px-1.5 py-0.5 transition-colors duration-100 hover:bg-[#5353533f]', opened === 'main' ? 'font-medium' : '']">Главная</button>
                        <button @click="toggleContent($event, 'line')" ref="line"
                            :class="['chanel-nav__left-link ripple-btn rounded-xs cursor-pointer px-1.5 py-0.5 transition-colors duration-100 hover:bg-[#5353533f]', opened === 'line' ? 'font-medium' : '']">Лента</button>
                        <button @click="toggleContent($event, 'content')" ref="content"
                            :class="['chanel-nav__left-link ripple-btn rounded-xs cursor-pointer px-1.5 py-0.5 transition-colors duration-100 hover:bg-[#5353533f]', opened === 'content' ? 'font-medium' : '']">Видео</button>
                        <button @click="toggleContent($event, 'playlists')" ref="playlists"
                            :class="['chanel-nav__left-link ripple-btn rounded-xs cursor-pointer px-1.5 py-0.5 transition-colors duration-100 hover:bg-[#5353533f]', opened === 'playlists' ? 'font-medium' : '']">Плейлисты</button>
                        <button @click="toggleContent($event, 'community')" ref="community"
                            :class="['chanel-nav__left-link ripple-btn rounded-xs cursor-pointer px-1.5 py-0.5 transition-colors duration-100 hover:bg-[#5353533f]', , opened === 'other' ? 'font-medium' : '']">Сообщества</button>
                        <span ref="active"
                            class="chanel-nav__active block absolute -bottom-0.5 w-16 h-1 rounded-full bg-indigo-900"></span>
                    </div>
                    <div class="chanel-info__right flex items-center relative">
                        <div class="chanel-info__search relative z-0">
                            <Search></Search>
                        </div>
                        <button @click="toggleSort()"
                            class="chat-panel__button filter-btn p-1 rounded-full cursor-pointer transition-colors duration-100 text-black"
                            type="button" aria-label="Искать сообщения в чате по дате или символам">
                            <svg width="25" height="25" class="z-2">
                                <use href="#filter"></use>
                            </svg>
                        </button>
                        <Transition name="menu">
                            <div v-show="sort_opened"
                                class="chat-panel__sort sort-panel rounded-xl bg-white shadow-md border z-5 border-[#c6c6c6]/30 overflow-hidden absolute -bottom-70 -left-40">
                                <!-- ВНИМАНИЕ!!! НА ЭТИ КНОПКИ НУЖНО БУДЕТ ПОДКЛЮЧИТЬ RIPPLE-BTN -->
                                <button @click="sortContent('popular')"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Популярные</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Показать
                                        самые
                                        популярные видео</span>
                                </button>
                                <button @click="sortContent('old-first')"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Старые</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Сначала
                                        старый
                                        контент</span>
                                </button>
                                <button @click="sortContent('raiting')"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Высокий рейтинг</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Видео с самым
                                        высоким
                                        рейтингом</span>
                                </button>
                                <button @click="sortContent('premium')"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Premium контент</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Показать
                                        только
                                        premium контент с этого канала</span>
                                </button>
                            </div>
                        </Transition>
                        <Transition name="menu">
                            <div v-if="actions_opened" class="absolute right-0 top-0">
                                <MoreActionsModal @open-info="openInfoPanel" @open-report="openReport"
                                    @open-donate="openDonate" />
                            </div>
                        </Transition>
                    </div>
                </nav>
            </div>
            <div class="chanel__about-contauner w-full px-3 py-1">
                <Transition name="opacity">
                    <AboutChanel v-if="opened === 'main'"></AboutChanel>
                </Transition>
                <Transition name="opacity">
                    <Videos v-if="opened === 'content'"></Videos>
                </Transition>
                <Transition name="opacity">
                    <Playlists v-if="opened === 'playlists'"></Playlists>
                </Transition>
                <Transition name="opacity">
                    <Community v-if="opened === 'community'"></Community>
                </Transition>
            </div>
        </div>
    </div>

    <Transition name="opacity">
        <ChanelPanel v-if="info_opened" @close-info="closeInfoPanel()"></ChanelPanel>
    </Transition>
    <Transition name="opacity">
        <Report v-if="report_opened" @close-report="closeReport()"></Report>
    </Transition>
    <Transition name="opacity">
        <Donate v-if="donate_opened" @close-donate="closeDonate()"></Donate>
    </Transition>
    <Transition name="opacity">
        <div v-if="dimining_active" class="fixed inset-0 bg-black/50 z-8 blackout"></div>
    </Transition>

</template>

<script>
import Nav from '../nav/Nav.vue';
import Search from '../../services/functions/Search.vue';
import MoreActionsModal from '../../services/functions/MoreActionsModal.vue';
import ChanelPanel from '../../services/functions/ChanelPanel.vue';
import Donate from '../../services/functions/Donate.vue';
import Report from '../../services/functions/Report.vue';
import AboutChanel from './AboutChanel.vue';
import Videos from './Videos.vue';
import Playlists from './Playlists.vue';
import Community from './Community.vue';
import SubscribeBtn from '../../ui/buttons/SubscribeBtn.vue';
import { useRipple } from '../../../composables/useRipple.js';

export default {
    name: "ChanelPageFunctions",

    components: {
        Nav,
        Search,
        MoreActionsModal,
        ChanelPanel,
        Donate,
        Report,
        AboutChanel,
        Videos,
        Playlists,
        Community,
        SubscribeBtn,
    },

    data() {
        return {
            opened: 'main',
            actions_opened: false,
            sort_opened: false,
            info_opened: false,
            report_opened: false,
            donate_opened: false,
            dimining_active: false,
        }
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        toggleSort() {
            this.sort_opened = !this.sort_opened
        },

        toggleActions() {
            this.actions_opened = !this.actions_opened
        },

        toggleContent(e, name) {
            this.createRipple(e)
            this.opened = name

            const active = this.$refs.active
            const target = this.$refs[name]
            const parent = this.$refs.nav   // добавим ref на контейнер

            if (!active || !target || !parent) return

            const rect = target.getBoundingClientRect()
            const parentRect = parent.getBoundingClientRect()

            const left = rect.left - parentRect.left

            active.style.left = `${left}px`
            active.style.width = `${rect.width}px`
        },

        sortContent(name) {
            this.sort_opened = !this.sort_opened
        },

        openInfoPanel(e) {
            this.actions_opened = false        // скрываем список
            this.info_opened = true            // открываем панель
            this.toggleDimming(true)           // включаем blackout
        },

        closeInfoPanel() {
            setTimeout(() => {
                this.info_opened = false
                this.toggleDimming(false)
            }, 300) // время твоей transition
        },

        // -----------------------------
        // REPORT PANEL
        // -----------------------------
        openReport(e) {
            this.actions_opened = false
            this.report_opened = true
            this.toggleDimming(true)
        },

        closeReport() {
            setTimeout(() => {
                this.report_opened = false
                this.toggleDimming(false)
            }, 300)
        },

        // -----------------------------
        // DONATE PANEL
        // -----------------------------
        openDonate(e) {
            this.actions_opened = false
            this.donate_opened = true
            this.toggleDimming(true)
        },

        closeDonate() {
            setTimeout(() => {
                this.donate_opened = false
                this.toggleDimming(false)
            }, 300)
        },

        // -----------------------------
        // DIMMING
        // -----------------------------
        toggleDimming(state) {
            this.dimining_active = state
        }
    }

}
</script>

<style scoped>
.chanel-info {
    /* background-image: url("../../../../images/themes/glasmorphism.jpg"); */
    background-color: black;
}

.chanel-info__preview-img::before {
    content: "";
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.71);
}

.chanel-nav__active {
    transition: transform 5s ease, width 0.45s ease;
}
</style>
