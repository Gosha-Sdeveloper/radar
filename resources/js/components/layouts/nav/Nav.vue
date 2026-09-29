<template>
    <div
        :class="['nav flex h-full  rounded-xl my-1 backdrop-blur-sm bg-white relative overflow-x-hidden', nav_hidden ? ' pl-1.5 w-18' : '']">
        <Transition name="from-left">
            <ul v-if="folders_opened" class="folders flex flex-col gap-1 h-full bg-[#1c1c1c] w-18 py-1.5">
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full bg-[#3f3f3f] hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white" width="27" height="27">
                            <use href="#folder"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Все</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-1" width="27" height="27">
                            <use href="#chanel"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Каналы</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-1.5" width="27" height="27">
                            <use href="#group"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Группы</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-2.5" width="27" height="27">
                            <use href="#user"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Личные</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-2.5" width="27" height="27">
                            <use href="#admin"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Рабочие</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-2.5" width="27" height="27">
                            <use href="#ecology"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Участие</span>
                    </button>
                </li>
                <li
                    class="folder__item folder p-0.5 flex flex-col items-center w-full hover:bg-[#3f3f3f] active:bg-[#6c6b6b] rounded-xl">
                    <button class="folder__btn flex flex-col cursor-pointer">
                        <svg class="folder__icon mb-1 text-white ml-2.5" width="27" height="27">
                            <use href="#suitcase"></use>
                        </svg>
                        <span class="folder__name block text-xs text-white">Клиенты</span>
                    </button>
                </li>

            </ul>
        </Transition>
        <button v-if="!nav_hidden" @click="toggleFolders()" class="nav__btn w-1.5 h-full cursor-e-resize"></button>
        <div :class="['nav-wrapper', nav_hidden ? 'w-14.5 pt-2' : 'w-full']">
            <Transition name="opacity">
                <div v-if="!nav_hidden" class="nav__section-info flex items-center justify-between p-1 pl-2.5  border-b border-[#c6c6c6]">
                    <div class="flex items-center">
                        <h2 class="nav__section-title text-xl font-medium mr-1">Контакты</h2>
                    </div>
                    <button @click="filter_opened = !filter_opened"
                        class="nav__filter contacts-filter rounded-full cursor-pointer hover:bg-black/10">
                        <svg width="30" height="30">
                            <use href="#open"></use>
                        </svg>
                    </button>

                </div>
            </Transition>
            <div v-if="nav_hidden" class="nav__top-decoration flex flex-col items-center mb-1" aria-hidden>
                <span class="text-xs">Контакты</span>
            </div>
            <ul
                class="nav__contacts-list mb-2  w-full max-w-75 max-h-[60vh] overflow-y-auto rounded-xl bg-white scrollbar-hidden">
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
                <Item></Item>
            </ul>

            <Transition name="opacity">
                <div v-if="!nav_hidden" class="nav__section-info flex items-center gap-1 p-1 pl-2.5">
                    <h2 class="nav__section-title text-xl font-medium">Вы</h2>
                    <svg class="-rotate-90 mt-0.5" width="21" height="21">
                        <use href="#open-btn"></use>
                    </svg>
                </div>
            </Transition>
            <div v-if="nav_hidden" class="nav__top-decoration flex flex-col items-center mb-1" aria-hidden>
                <span class="text-xs">Действия</span>
            </div>
            <ul
                class="nav__profile-list rounded-xl w-full max-w-75 max-h-[25vh] overflow-y-auto bg-white scrollbar-hidden">
                <li :class="['nav__profile-item rounded-lg flex items-center gap-1.5 p-1', nav_hidden ? 'pl-2' : 'pl-1.5']">
                    <div class="nav__profile-img p-1 bg-[#4F46E5] rounded-full">
                        <svg class="text-white" width="30" height="30">
                            <use href="#history"></use>
                        </svg>
                    </div>
                    <Transition name="opacity">
                        <span class="points w-5/6 leading-[1.3]" v-if="!nav_hidden">История</span>
                    </Transition>
                </li>
                <li :class="['nav__profile-item rounded-lg flex items-center gap-1.5 p-1 pl-1.5', nav_hidden ? 'pl-2' : 'pl-1.5']">
                    <div class="nav__profile-img p-1 bg-[#0EA5E9] rounded-full">
                        <svg class="text-white" width="30" height="30">
                            <use href="#time"></use>
                        </svg>
                    </div>
                    <Transition name="opacity">
                        <span class="points w-5/6 leading-[1.3]" v-if="!nav_hidden">Смотреть позже</span>
                    </Transition>
                </li>
                <li :class="['nav__profile-item rounded-lg flex items-center gap-1.5 p-1 pl-1.5', nav_hidden ? 'pl-2' : 'pl-1.5']">
                    <div class="nav__profile-img p-1 bg-[#0f7251] rounded-full">
                        <svg class="text-white" width="30" height="30">
                            <use href="#playlist"></use>
                        </svg>
                    </div>
                    <Transition name="opacity">
                        <span class="points w-5/6 leading-[1.3]" v-if="!nav_hidden">Сохраненные плейлисты</span>
                    </Transition>
                </li>
                <li :class="['nav__profile-item rounded-lg flex items-center gap-1.5 p-1 pl-1.5', nav_hidden ? 'pl-2' : 'pl-1.5']">
                    <div class="nav__profile-img p-1 bg-[#F97316] rounded-full">
                        <svg class="text-white" width="30" height="30">
                            <use href="#save"></use>
                        </svg>
                    </div>
                    <Transition name="opacity">
                        <span class="points w-5/6 leading-[1.3]" v-if="!nav_hidden">Избранное</span>
                    </Transition>
                </li>
                <li :class="['nav__profile-item rounded-lg flex items-center gap-1.5 p-1 pl-1.5', nav_hidden ? 'pl-2' : 'pl-1.5']">
                    <div class="nav__profile-img p-1 bg-yellow-600 rounded-full">
                        <svg class="text-white" width="30" height="30">
                            <use href="#settings"></use>
                        </svg>
                    </div>
                    <Transition name="opacity">
                        <span class="points w-5/6 leading-[1.3]" v-if="!nav_hidden">Настройки</span>
                    </Transition>
                </li>
            </ul>
            <ul
                :class="['nav__filter absolute top-5 right-1.5 bg-white z-5 p-2 rounded-xl shadow-xl border border-black/30', filter_opened ? 'menu-opened' : 'menu-closed']">
                <li class="nav__filter-option "><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Все контакты</button>
                </li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Каналы</button></li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Группы</button></li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Клиенты</button></li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Рабочие группы</button>
                </li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Личные чаты</button>
                </li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Кампании</button></li>
                <li class="nav__filter-option"><button
                        class="nav__filter-btn hover:opacity-70 focus:opacity-50 cursor-pointer">Благотворительность</button>
                </li>

            </ul>
        </div>
        <button @click="hidePanel()" class="nav__btn w-1.5 h-full cursor-e-resize"></button>
    </div>
</template>

<script>
import Item from '../../common/nav/Item.vue';

export default {
    name: "Nav",

    components: {
        Item,
    },

    data() {
        return {
            nav_hidden: false,
            filter_opened: false,
            folders_opened: true,
        }
    },

    methods: {
        toggleFolders() {
            this.folders_opened = !this.folders_opened
        },

        hidePanel() {
            this.folders_opened = false

            this.$emit('toggle-panel')

            setTimeout(() => {
                this.nav_hidden = !this.nav_hidden
            }, 300)
        }
    }


}
</script>

<style scoped>
.nav__profile-item:hover {
    cursor: pointer;
    background-color: #efefef;
}

.nav__profile-item:active {
    cursor: pointer;
    background-color: #5353533f;
}
</style>
