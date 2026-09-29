<template>
    <!-- ВНИМАНИЕ!!! Повторение кнопки закрытия можно вынести в отдельный компонент! -->
    <div
        class="donate-panel fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-full max-w-140 h-[90%] bg-white shadow-md rounded-xl z-10 flex flex-col scrollbar-hidden overflow-y-auto">
        <div class="donate-panel__top flex items-center justify-between pl-2 pr-1 pt-1">
            <h2 class="donate-panel__title chanel-name font-medium text-lg leading-tight">Поддержать</h2>
            <button @click="closeDonate()"
                class="report__close-btn p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] cursor-pointer border border-transparent active:border-[#c6c6c6]"
                aria-label="Закрыть окно">
                <svg width="26" height="26" aria-hidden="true">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
        <div class="donate-panel__info-block py-1">
            <div class="donate-panel__info-block flex items-center justify-between px-2 mb-4">
                <div class="donate-panel__author flex gap-1">
                    <img class="w-9.5 h-9.5 rounded-full border border-black/80"
                        src="../../../../images/themes/amethysts.jpg" alt="Аватарка канала (название канала)">
                    <div class="donate-panel__author-textcontent flex flex-col">
                        <h3 class="donate-panel__author-name text-sm font-medium cursor-default points">Кристаллический
                            лазерный завод</h3>
                        <span class="donate-panel__author__subscribers text-[#6E6E6E] text-xs cursor-default points">31
                            тыс.
                            подписчиковв</span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <div class="donate-panel__level donate-level flex items-center gap-1 p-1 px-1.5 border cursor-default rounded-full"
                        :style="{ background: donate_result.colors[0], 'border-color': donate_result.colors[1] }">
                        <svg class="z-2 donate-level__text-icon rounded-full" width="18" height="18">
                            <use href="#premium"></use>
                        </svg>
                        <span class="donate-level__text">{{ donate_result.name }}</span>
                    </div>
                    <div
                        class="donate-panel__money-input money-input flex items-center gap-1 p-1 px-1.5 border border-[#c6c6c6] bg-[#efefef] rounded-full">
                        <svg class="z-2 text-white bg-black rounded-full" width="18" height="18">
                            <use href="#ruble"></use>
                        </svg>
                        <input v-model="donate_result.money" class="outline-none border-none inline-block" type="text"
                            :style="{ width: donate_result.money.toString().length + 'ch' }">
                        <span class="money-input__text">рублей</span>
                    </div>
                </div>

            </div>
            <!--Это реактивный ползунок -->
            <div class="reactive__line w-full h-0.5 bg-black relative mt-4">
                <div ref="thumb" @mousedown="startDrag" class="reactive__icon absolute p-1.25 border border-black bg-white rounded-full
                top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-2">
                    <div class="w-2 h-2 bg-black rounded-full"></div>
                </div>
            </div>
            <div ref="scrollArea" class="donate-panel__scrollbar reactive mb-4 px-2">
                <div class="reactive__line w-full h-0.5 relative">
                </div>
                <div class="reactive__scale w-full flex items-center justify-between pl-10">
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">100</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">250</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">500</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">1000</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">1500</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">2000</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">2500</span>
                    </div>
                    <div class="reactive__scale-value no-copy flex flex-col items-center">
                        <svg class="bg-black" width="2" height="18">
                            <use href="#line"></use>
                        </svg>
                        <span class="text-sm">3000</span>
                    </div>
                </div>
            </div>

            <div class="donate-panel__donate-way donate-way w-full grid grid-cols-3 p-1 bg-[#efefef] rouded-full mb-2">
                <button @click="toggleDonateWay('card')"
                    :class="['donate-way__type no-copy text-center rounded-md py-0.5 cursor-pointer', this.active_way === 'card' ? 'bg-white shadow' : '']">Карта</button>
                <button @click="toggleDonateWay('spb')"
                    :class="['donate-way__type no-copy text-center rounded-md py-0.5 cursor-pointer', this.active_way === 'spb' ? 'bg-white shadow' : '']">Спб</button>
                <button @click="toggleDonateWay('service')"
                    :class="['donate-way__type no-copy text-center rounded-md py-0.5 cursor-pointer', this.active_way === 'service' ? 'bg-white shadow' : '']">SberPay
                    и др.</button>
            </div>
            <form class="donate-panel__form h-full grid grid-cols-1 px-6">
                <div class="donate-panel__form-top">
                    <fieldset class="donate-panel__card-inputs flex flex-col gap-1.5 mb-4.5">
                        <Input value="" label="Номер карты (от 16 до 19 цифр)" id="card-number" />
                        <Input value="" label="Имя владельца" id="card-user-name" />
                        <div class="donate-panel__card-group flex justify-between gap-7">
                            <Input value="" label="Срок действия" id="card-datetime" />
                            <Input value="" label="CVV-код" id="card-cvv-code" />
                        </div>
                    </fieldset>
                    <Textarea class="mb-1.5" value="" label="Сообщение автору" id="message" />
                    <button class="donate-panel__card-brain card-brain flex items-center gap-1.5 mb-2" type="button">
                        <Switch id="brain-setting" v-model="notifications_on" />
                        <span class="card-brain__text">Запомнить реквизиты</span>
                    </button>
                </div>

                <div class="flex flex-col mt-auto">
                    <button
                        class="donate-panel__submit block w-full p-1 bg-black rounded-xl text-white active:opacity-70 cursor-pointer mb-1"
                        type="submit">Оплатить</button>
                    <p class="donate-panel__agreement text-center text-sm leading-[1.15] px-3">Мы используем безопасную
                        и отличную платёжную систему Robokassa.
                        Подробнее о ней вы можете прочитать на их <a class="underline decoration-1 hover:decoration-0"
                            href="#">оффициальном сайте</a>.</p>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
import Input from '../../ui/buttons/Input.vue';
import Switch from '../../ui/buttons/Switch.vue';
import Textarea from '../../ui/buttons/Textarea.vue';


export default {
    name: "Donate",

    components: {
        Input,
        Textarea,
        Switch,
    },

    data() {
        return {
            active_way: 'card',
            donate_result: {
                name: 'Начальный',
                money: 100,
                colors: ['#f0fbff', '#b9dde9']
            },
            isDragging: false,
            startX: 0,
            startLeft: 0,
        }
    },

    mounted() {
        this.$refs.thumb.style.left = '8.8%';  // Начальный
    },

    methods: {
        toggleDonateWay(name) {
            this.active_way = name
        },

        startDrag(e) {
            this.isDragging = true;
            this.startX = e.clientX;
            this.startLeft = this.$refs.thumb.offsetLeft;

            document.addEventListener('mousemove', this.onMove);
            document.addEventListener('mouseup', this.onUp);
        },

        onMove(e) {
            if (!this.isDragging) return;

            const delta = e.clientX - this.startX;

            const parent = this.$refs.thumb.parentElement;
            const maxLeft = parent.offsetWidth - this.$refs.thumb.offsetWidth;

            const newLeft = Math.min(Math.max(this.startLeft + delta, 0), maxLeft);

            this.$refs.thumb.style.left = newLeft + 'px';

            const percent = newLeft / maxLeft;
            console.log(percent)
            this.toggleDonate(percent)


            const scrollArea = this.$refs.scrollArea;
            scrollArea.scrollLeft = percent * (scrollArea.scrollWidth - scrollArea.clientWidth);
        },

        onUp() {
            this.isDragging = false;
            document.removeEventListener('mousemove', this.onMove);
            document.removeEventListener('mouseup', this.onUp);
        },

        toggleDonate(percent) {
            if (percent >= 0.94) {
                this.donate_result = {
                    name: 'ULTRA-донат',
                    money: 3000,
                    colors: [
                        'linear-gradient(135deg, #FFCDD2 0%, #FFE0B2 20%, #FFF9C4 40%, #C8E6C9 60%, #B2EBF2 75%, #BBDEFB 90%, #E1BEE7 100%)',
                        '#6D28D9'
                    ]
                }
            } else if (percent >= 0.815) {
                this.donate_result = {
                    name: 'PRO-донат',
                    money: 2500,
                    colors: [
                        'linear-gradient(135deg, #D6F5FF 0%, #CFE3FF 35%, #D9FFE9 70%, #C7FFF2 100%)',
                        '#16A34A'
                    ]
                }
            } else if (percent >= 0.688) {
                this.donate_result = {
                    name: 'Элитный',
                    money: 2000,
                    colors: ['#F5EEFF', '#7C3AED']
                }
            } else if (percent >= 0.562) {
                this.donate_result = {
                    name: 'Эпический',
                    money: 1500,
                    colors: ['#EFFFFB', '#14B8A6']
                }
            } else if (percent >= 0.435) {
                this.donate_result = {
                    name: 'Премиальный',
                    money: 1000,
                    colors: ['#EEF7FF', '#0EA5E9']
                }

            } else if (percent >= 0.315) {
                this.donate_result = {
                    name: 'Продвинутый',
                    money: 500,
                    colors: ['#ECFFFB', '#12b4a1']
                }
            } else if (percent >= 0.202) {
                this.donate_result = {
                    name: 'Улучшенный',
                    money: 250,
                    colors: ['#FFFBE6', '#F59E0B']
                }
            } else if (percent >= 0.088) {
                this.donate_result = {
                    name: 'Начальный',
                    money: 100,
                    colors: ['#f0fbff', '#b9dde9']
                }
            }
        },

        closeDonate() {

            this.$emit('close-donate')
        },

    },
}

</script>
