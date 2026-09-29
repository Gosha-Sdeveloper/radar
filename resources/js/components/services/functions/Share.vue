<template>
    <div class="share p-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-full max-w-100 h-full max-h-150 bg-white shadow-md rounded-xl z-10 backdrop-blur-2xl flex flex-col">
        <div class="share__header flex items-center justify-between mb-1">
            <h3 v-if="!record_opened" class="share__title text-lg font-medium">Поделиться</h3>
            <Transition name="opacity">
                <h3 v-if="record_opened" class="share__title text-lg font-medium">Новая запись</h3>
            </Transition>

            <button @click="closeSharePopup()" type="button"
                class="share__close-btn p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] text-black cursor-pointer border border-transparent active:border-[#c6c6c6]"
                aria-label="Закрыть окно">
                <svg width="24" height="24">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
        <div v-if="!record_opened" class="share__content">
            <form
                class="share__form relative flex items-center gap-1 px-2.25 pr-0 bg-white rounded-full border border-[#c6c6c6] mb-2 focus-within:shadow-sm">
                <svg class="rotate-90 text-[#6E6E6E]/60" width="28" height="28">
                    <use href="#search"></use>
                </svg>
                <input class="share__form-input w-full text-[#454545] outline-none" type="text"
                    aria-label="Искать в папке" placeholder="Искать в...">
                <button @click="openFilter()" type="button"
                    :class="['share__form-folder py-2 bg-[#efefef] hover:bg-[#5353532f] flex gap-0.5 items-center justify-center px-2 cursor-pointer', filter_opened ? 'w-27.5 rounded-t-xl rounded-b-none hover:bg-[#efefef]' : 'w-auto rounded-r-full ']">
                    <svg class="text-black" width="18" height="18">
                        <use :href="filter_active[0]"></use>
                    </svg>
                    <span class="text-xs">{{ filter_active[1] }}</span>
                </button>
                <Transition name="menu">
                    <ul v-if="filter_opened"
                        class="share__search-filter shadow-md py-1 absolute top-8.5 right-0 z-3 rounded-b-xl overflow-hidden border border-[#c6c6c6]">
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#folder', 'Все')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5  flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#folder"></use>
                                </svg>
                                <span class="text-xs">Все</span>
                            </button>
                        </li>
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#chanel', 'Каналы')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5  flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#chanel"></use>
                                </svg>
                                <span class="text-xs">Каналы</span>
                            </button>
                        </li>
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#group', 'Группы')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5 flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#group"></use>
                                </svg>
                                <span class="text-xs">Группы</span>
                            </button>
                        </li>
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#user', 'Личные')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5 flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#user"></use>
                                </svg>
                                <span class="text-xs">Личные</span>
                            </button>
                        </li>
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#admin', 'Рабочие')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5 flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#admin"></use>
                                </svg>
                                <span class="text-xs">Рабочие</span>
                            </button>
                        </li>
                        <li class="share__filter-item filter-btn">
                            <button @click="toggleFilterMethod('#suitcase', 'Клиенты')" type="button"
                                class="filter-btn__btn cursor-pointer bg-white hover:bg-[#efefef] w-full active:bg-[#5353532f] backdrop-blur-md py-0.75 px-1.5 flex items-center gap-1">
                                <svg class="text-black" width="18" height="18">
                                    <use href="#suitcase"></use>
                                </svg>
                                <span class="text-xs">Клиенты</span>
                            </button>
                        </li>
                    </ul>
                </Transition>
            </form>
            <ul class="share__contacts flex flex-col py-1 gap-1 h-80">
                <li @click="toggleUser($event, 5)"
                    class="share__contacts-item py-1 contact ripple-btn flex items-center justify-between cursor-pointer hover:bg-[#efefef] rounded-xl pr-1">
                    <div class="contact__left flex items-center gap-1.5">
                        <img class="contact__avatar w-10 h-10 rounded-full"
                            src="../../../../images/themes/blue-black.jpg" alt="Аватар пользователя">
                        <div class="contact__info flex flex-col">
                            <span class="contact__name font-medium leading-4">userLaravel</span>
                            <span class="contact__info text-sm leading-4 text-[#6E6E6E]">Был недавно</span>
                        </div>
                    </div>
                    <div class="contact__is-active border border-[#c6c6c6] rounded-full">
                        <div
                            :class="['w-5 h-5 bg-indigo-900 transition-opacity duration-300 opacity-0 rounded-full text-white', share_ids.includes(5) ? 'opacity-100' : 'opacity-0']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li @click="toggleUser($event, 1)"
                    class="share__contacts-item py-1 contact ripple-btn flex items-center justify-between cursor-pointer hover:bg-[#efefef] rounded-xl pr-1">
                    <div class="contact__left flex items-center gap-1.5">
                        <img class="contact__avatar w-10 h-10 rounded-full"
                            src="../../../../images/themes/green-black.jpg" alt="Аватар пользователя">
                        <div class="contact__info flex flex-col">
                            <span class="contact__name font-medium leading-4">Пользователь-нулевой</span>
                            <span class="contact__info text-sm leading-4 text-[#6E6E6E]">Был недавно</span>
                        </div>
                    </div>
                    <div class="contact__is-active border border-[#c6c6c6] rounded-full">
                        <div
                            :class="['w-5 h-5 bg-indigo-900 transition-opacity duration-300 rounded-full text-white', share_ids.includes(1) ? 'opacity-100' : 'opacity-0']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li @click="toggleUser($event, 2)"
                    class="share__contacts-item py-1 contact ripple-btn flex items-center justify-between cursor-pointer hover:bg-[#efefef] rounded-xl pr-1">
                    <div class="contact__left flex items-center gap-1.5">
                        <img class="contact__avatar w-10 h-10 rounded-full" src="../../../../images/themes/red.jpg"
                            alt="Аватар пользователя">
                        <div class="contact__info flex flex-col">
                            <span class="contact__name font-medium leading-4">Андрей Чернышевский</span>
                            <span class="contact__info text-sm leading-4 text-[#6E6E6E]">Был в 12:45</span>
                        </div>
                    </div>
                    <div class="contact__is-active border border-[#c6c6c6] rounded-full">
                        <div
                            :class="['w-5 h-5 bg-indigo-900 transition-opacity duration-300 rounded-full text-white', share_ids.includes(2) ? 'opacity-100' : 'opacity-0']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li @click="toggleUser($event, 3)"
                    class="share__contacts-item py-1 contact ripple-btn flex items-center justify-between cursor-pointer hover:bg-[#efefef] rounded-xl pr-1">
                    <div class="contact__left flex items-center gap-1.5">
                        <img class="contact__avatar w-10 h-10 rounded-full"
                            src="../../../../images/themes/amethysts.jpg" alt="Аватар пользователя">
                        <div class="contact__info flex flex-col">
                            <span class="contact__name font-medium leading-4">Кристаллический лазерный завод</span>
                            <span class="contact__info text-sm leading-4 text-[#6E6E6E]">1543 участников</span>
                        </div>
                    </div>
                    <div class="contact__is-active border border-[#c6c6c6] rounded-full">
                        <div
                            :class="['w-5 h-5 bg-indigo-900 transition-opacity duration-300 rounded-full text-white', share_ids.includes(3) ? 'opacity-100' : 'opacity-0']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                        </div>
                    </div>
                </li>
                <li @click="toggleUser($event, 4)"
                    class="share__contacts-item py-1 contact ripple-btn flex items-center justify-between cursor-pointer hover:bg-[#efefef] rounded-xl pr-1">
                    <div class="contact__left flex items-center gap-1.5">
                        <img class="contact__avatar w-10 h-10 rounded-full"
                            src="../../../../images/themes/green-light.jpg" alt="Аватар пользователя">
                        <div class="contact__info flex flex-col">
                            <span class="contact__name font-medium leading-4">Дмитрий Антонов</span>
                            <span class="contact__info text-sm leading-4 text-[#6E6E6E]">Был в недавно</span>
                        </div>
                    </div>
                    <div class="contact__is-active border border-[#c6c6c6] rounded-full">
                        <div
                            :class="['w-5 h-5 bg-indigo-900 transition-opacity duration-300 rounded-full text-white', share_ids.includes(4) ? 'opacity-100' : 'opacity-0']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Transition name="opacity">
            <div v-if="record_opened" class="share__record-container">
                <div
                    class="share__record-place grid grid-cols-2 gap-1 mb-2 bg-[#efefef] rounded-xl border-2 border-[#efefef] overflow-hidden">
                    <button @click="editRecordPlace('chanel')"
                        :class="['share__record-navigator transition-colors duration-300 ease-in cursor-pointer py-1', record_place === 'chanel' ? 'bg-white' : 'bg-transparent']">Канал</button>
                    <button @click="editRecordPlace('groups')"
                        :class="['share__record-navigator transition-colors duration-300 ease-in cursor-pointer py-1', record_place === 'groups' ? 'bg-white' : 'bg-transparent']">Группы</button>

                </div>
                <div
                    class="share__record-content record-content flex items-center gap-1 bg-[#efefef] p-2 rounded-xl mb-3">
                    <img class="record-content__img w-12 h-12 rounded-xl"
                        src="../../../../images/themes/green-black.jpg" alt="Изображение пересылаемой записи">
                    <div class="record-content__info">
                        <h5 class="record-content__title font-medium leading-5">Кристаллы_на_зеленом_фоне.jpg</h5>
                        <div class="record-content__info text-sm flex items-center gap-1">
                            <svg class="record-content__icon" width="14" height="14">
                                <use href="#share"></use>
                            </svg>
                            <span class="record-content__text">Переслано от</span>
                            <a href="#"
                                class="record-content__author flex items-center gap-1 px-1 bg-[#53535355] rounded-full">
                                <img class="w-4 h-4 rounded-full" src="../../../../images/themes/blue-black.jpg"
                                    alt="Иконка цитируемого автора">
                                <span class="record-content__text">userLaravel</span>
                            </a>
                        </div>
                    </div>
                </div>
                <Textarea class="mb-1.5" value="" label="Описание пересылаемой записи" id="message" />


            </div>
        </Transition>
        <div class="share__btns mt-auto">
            <button @click="openRecord()" v-if="!record_opened" type="button"
                class="share__btn py-1 w-full flex items-center justify-center rounded-full bg-[#efefef] hover:bg-[#5353532f] active:bg-[#53535355] mb-1 cursor-pointer">
                <svg class="share__btn-icon" width="24" height="24">
                    <use href="#plus"></use>
                </svg>
                <span class="share__btn-text">Создать запись</span>
            </button>
            <button v-if="!record_opened" type="button"
                class="share__btn py-1 w-full flex items-center justify-center gap-1.5 rounded-full bg-[#1c1c1c] text-white hover:opacity-90 active:opacity-80 cursor-pointer">
                <svg class="share__btn-icon" width="21" height="21">
                    <use href="#share"></use>
                </svg>
                <span class="share__btn-text">Переслать</span>
            </button>
            <Transition name="opacity">
                <button v-if="record_opened" type="button"
                    class="share__btn py-1 w-full flex items-center justify-center rounded-full bg-[#1c1c1c] text-white hover:opacity-90 active:opacity-80 cursor-pointer">
                    <span class="share__btn-text">Создать</span>
                </button>
            </Transition>
        </div>
    </div>
</template>

<script>
import { useRipple } from '../../../composables/useRipple';
import Input from '../../ui/buttons/Input.vue';
import Textarea from '../../ui/buttons/Textarea.vue';
export default {
    name: "Share",

    components: {
        Input,
        Textarea,
    },

    data() {
        return {
            filter_opened: false,
            filter_active: ['#folder', 'Все'], // 0 - svg-path, 1 - name
            share_ids: [],
            record_opened: false,
            record_place: 'chanel',
        }
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        openFilter() {
            this.filter_opened = true
            this.filter_active = ['#open-btn', 'Выбрать']

        },

        toggleFilterMethod(icon, name) {
            this.filter_opened = false
            this.filter_active = [icon, name]

        },

        toggleUser(e, id) {
            this.createRipple(e)
            const index = this.share_ids.indexOf(id)

            if (index === -1) {
                this.share_ids.push(id)
            } else {
                this.share_ids.splice(index, 1)
            }

            console.log(this.share_ids)
        },

        openRecord() {
            this.record_opened = true
        },

        editRecordPlace(name) {
            this.record_place = name
        },

        closeSharePopup() {
            this.$emit('close-share')
        }

    },


}

</script>
