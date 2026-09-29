<template>
    <div class="grid grid-cols-[300px_1fr] items-center bg-white">
        <Header></Header>
        <div class="chat-panel flex max-h-12.5 items-center justify-between pr-3 pl-1.5 relative">
            <div class="chat-panel__info flex items-center gap-2">
                <img class="w-9.5 h-9.5 rounded-full border border-black/80"
                    src="../../../../images/themes/amethysts.jpg" alt="Аватарка канала (название канала)">
                <div class="chat-panel__info-block flex flex-col mr-1">
                    <h2 class="chat-panel__name text-sm font-medium cursor-pointer">Сообщество кристаллического
                        лазерного завода</h2>
                    <p class="chat-panel__info-block flex items-center gap-1 text-[#6E6E6E] text-xs cursor-default">
                        <span>1514 участников</span>
                        <svg width="3" height="3">
                            <use href="#point"></use>
                        </svg>
                        <span>31 в сети</span>
                    </p>
                </div>
                <SubscribeBtn type="chat"></SubscribeBtn>

            </div>
            <ul class="chat-panel__buttons flex items-center">

                <li class="chat-panel__button-wrapper relative">
                    <Search></Search>
                </li>
                <li class="chat-panel__button-wrapper">
                    <button @click="togglePin()"
                        :class="['chat-panel__button tooltip-btn function-btn p-1.25 rounded-full cursor-pointer hover:bg-[#efefef] bg-transparent', { 'active': pin_block_opened }]"
                        type="button" aria-label="Показать закреплённые сообщения" data-tooltip="Закрепленные сообщения">
                        <svg color="#000" width="28" height="28" class="z-2">
                            <use href="#pin"></use>
                        </svg>
                    </button>
                </li>
                <li class="chat-panel__button-wrapper">
                    <button @click="toggleFunctions()"
                        :class="['chat-panel__button function-btn p-1.25 rounded-full cursor-pointer hover:bg-[#efefef] bg-transparent', { 'active': actions_opened }]"
                        type="button" aria-label="Раскрыть список возможностей">
                        <svg width="26" height="26">
                            <use href="#open"></use>
                        </svg>
                    </button>
                </li>
            </ul>
            <Transition name="functions">
                <div v-if="actions_opened" class="absolute right-1 top-12">
                    <MoreActionsModal @open-info="openInfoPanel" @open-report="openReport" @open-donate="openDonate" />
                </div>
            </Transition>
            <Transition name="menu">
                <div v-show="pin_block_opened"
                    class="pined-messeges absolute right-1 top-12 w-150 rounded-xl bg-white shadow-md overflow-hidden py-1">
                    <div class="pined-messeges__top flex justify-between px-2 pr-1 pb-1 border-b border-[#c6c6c6]">
                        <div class="pined-messeges__title-content flex items-center gap-1">
                            <svg width="24" height="24" class="z-2 text-black/80">
                                <use href="#pin-filled"></use>
                            </svg>
                            <h3 class="pined-messeges__title font-medium text-md">Закрепленные сообщения</h3>
                        </div>
                        <button @click="toggleSort()"
                            class="pined-messeges__sort main-functions__search-filter flex items-center gap-1 px-2.5 py-1 text-sm bg-[#efefef] text-[#6E6E6E] rounded-xl cursor-pointer relative active:opacity-75">
                            <svg width="7" height="7" class="duration-0" :class="{ 'rotate-180': !sort_pined_new }">
                                <use href="#select"></use>
                            </svg>
                            <span>{{ this.sort_pined_new ? 'Новые' : 'Старые' }}</span>
                        </button>
                    </div>
                    <ul class="pined-messeges__list">
                        <li class="pined-messeges__item flex items-center px-1.5 py-1 rounded-xl cursor-pointer">
                            <span class="pined-messeges__item-count text-[#6E6E6E] block mr-1">1</span>
                            <img class="w-16 h-11 rounded-xl block mr-1.5"
                                src="../../../../images/themes/blue-black.jpg" alt="Изображение к прикрепленному посту">
                            <div class="pined-messeges__item-info flex flex-col max-w-117.75">
                                <h4
                                    class="pined-messeges__item-title inline relative text-base font-medium leading-tight points">
                                    Поставки по всей России. Успей приобрести выгодно
                                </h4>
                                <p class="pined-messeges__item-text points text-sm text-[#6E6E6E] leading-tight">
                                    Посмотрите,
                                    какие товары
                                    вы можете купить у нашего лазерного завода</p>
                            </div>
                            <svg class="text-[#6E6E6E]" width="24" height="24" title="Перейти">
                                <use href="#move"></use>
                            </svg>
                        </li>
                        <li class="pined-messeges__item flex items-center px-1.5 py-1 rounded-xl cursor-pointer">
                            <span class="pined-messeges__item-count text-[#6E6E6E] block mr-1">2</span>
                            <img class="w-16 h-11 rounded-xl block mr-1.5" src="../../../../images/themes/red.jpg"
                                alt="Изображение к прикрепленному посту">
                            <div class="pined-messeges__item-info flex flex-col max-w-117.75">
                                <h4
                                    class="pined-messeges__item-title inline relative text-base font-medium leading-tight points">
                                    Напиши нам совё изобретение. Если оно крутое - дадим патент
                                </h4>
                                <p class="pined-messeges__item-text points text-sm text-[#6E6E6E] leading-tight">
                                    Бесплатно
                                    оформляем патент, помогающим кристаллическому лазерному заводу</p>
                            </div>
                            <svg class="text-[#6E6E6E]" width="24" height="24" title="Перейти">
                                <use href="#move"></use>
                            </svg>
                        </li>
                        <li class="pined-messeges__item flex items-center px-1.5 py-1 rounded-xl cursor-pointer">
                            <span class="pined-messeges__item-count text-[#6E6E6E] block mr-1">3</span>
                            <img class="w-16 h-11 rounded-xl block mr-1.5"
                                src="../../../../images/themes/green-middle.jpg"
                                alt="Изображение к прикрепленному посту">
                            <div class="pined-messeges__item-info flex flex-col max-w-117.75">
                                <h4
                                    class="pined-messeges__item-title inline relative text-base font-medium leading-tight points">
                                    Вакансии в кристаллический лазерный завод
                                </h4>
                                <p class="pined-messeges__item-text points text-sm text-[#6E6E6E] leading-tight">
                                    Проживание, зарплата от 100 тыс. рублей. Места есть, опыт не обязателен, заходите и
                                    смотрите</p>
                            </div>
                            <svg class="text-[#6E6E6E]" width="24" height="24" title="Перейти">
                                <use href="#move"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            </Transition>
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

import Header from '../nav/Header.vue';
import SubscribeBtn from '../../ui/buttons/SubscribeBtn.vue';
import Search from '../../services/functions/Search.vue';
import MoreActionsModal from '../../services/functions/MoreActionsModal.vue';
import ChanelPanel from '../../services/functions/ChanelPanel.vue';
import Donate from '../../services/functions/Donate.vue';
import Report from '../../services/functions/Report.vue';

export default {
    name: "ChatPagepanel",

    data() {
        return {
            actions_opened: false,
            search_opened: false,
            search_has_value: false,
            pin_block_opened: false,
            search_data: [['text'], ['date']],
            searchQuery: '',
            sort_pined_new: true,
            actions_opened: false,
            info_opened: false,
            report_opened: false,
            donate_opened: false,
            dimining_active: false,

        }
    },

    components: {
        Header,
        Search,
        SubscribeBtn,
        MoreActionsModal,
        ChanelPanel,
        Donate,
        Report,
    },

    methods: {
        toggleFunctions() {
            this.actions_opened = !this.actions_opened
        },

        togglePin() {
            this.pin_block_opened = !this.pin_block_opened
        },

        toggleSort() {
            this.sort_pined_new = !this.sort_pined_new
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
    },
}
</script>

<style scoped>

.chat-panel__functions {
    border-top-right-radius: 0;
    will-change: transform, opacity;
}

.pined-messeges__item-title::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 90%;
    background-color: rgba(0, 0, 0, 0.372);
    opacity: 0;
}

.pined-messeges__item:hover .pined-messeges__item-title::before {
    opacity: 1;
}



</style>
