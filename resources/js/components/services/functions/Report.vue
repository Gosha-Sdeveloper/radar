<template>
    <div class="report fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-full max-w-100 h-full max-h-110 bg-white shadow-md rounded-xl z-10
            grid grid-rows-[1fr_auto] px-3 py-3">
        <div class="report__main-wrapper">
            <div v-if="!report_posted" class="report__top flex items-center justify-between">
                <h2 class="report__title font-medium text-lg leading-tight">Пожаловаться</h2>
                <button @click="closeReport()"
                    class="report__close-btn p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] cursor-pointer border border-transparent active:border-[#c6c6c6]"
                    aria-label="Закрыть окно">
                    <svg width="26" height="26" aria-hidden="true">
                        <use href="#close"></use>
                    </svg>
                </button>
            </div>
            <form v-if="!report_posted" class="report__form">
                <fieldset
                    class="report__radio-wrapper p-px scrollbar-hidden flex flex-col gap-2 max-h-54 h-full mb-2 overflow-y-auto">
                    <Radio label="Жестокие и оттакливающие сцены" id="report-1" name="report-option"
                        model-value="true" />
                    <Radio label="Вредные или опасные действия" id="report-4" name="report-option" />
                    <Radio label="Нарушение законодательства" id="report-10" name="report-option" />
                    <Radio label="Нарушение авторских прав" id="report-9" name="report-option" />
                    <Radio label="Издевательства над животными" id="report-3" name="report-option" />
                    <Radio label="Причинение вреда себе" id="report-5" name="report-option" />
                    <Radio label="Ложная или неподтверждённая информация" id="report-6" name="report-option" />
                    <Radio label="Оскорбления или клевета" id="report-2" name="report-option" />
                    <Radio label="Пропаганда вредных привычек" id="report-7" name="report-option" />
                    <Radio label="Пропаганда терроризма" id="report-8" name="report-option" />
                    <Radio label="Бесполезный и глупый контент" id="report-11" name="report-option" />
                </fieldset>
                <textarea class="w-full h-30 max-h-30 rounded-xl p-0.75 pl-1.25" name="report-text" id="report-text"
                    placeholder="Напишите подробнее о жалобе (необязательно)"></textarea>
            </form>
            <div v-if="report_posted" class="report__success flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="120" role="img"
                    aria-label="Жалоба получена">
                    <!-- Envelope (primary color) -->
                    <rect x="6" y="18" width="40" height="28" rx="3" fill="oklch(39.8% 0.195 277.366)" />
                    <polygon points="6,18 26,34 46,18" fill="white" opacity="0.12" />
                    <path d="M6 18 L26 34 L46 18" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round"
                        stroke-linejoin="round" opacity="0.18" />

                    <!-- Check circle (primary color) -->
                    <circle cx="46" cy="44" r="10" fill="oklch(45.3% 0.124 130.933)" />

                    <!-- Check mark (white) -->
                    <path d="M41 44.5 L45 48 L53 40" fill="none" stroke="#ffffff" stroke-width="2.6"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h3 class="report__success-title font-medium text-lg leading-tight text-center">Жалоба получена!</h3>
                <p class="report__success-text text-center text-[#6E6E6E] leading-[1.15] text-sm">В&nbsp;течение
                    7&nbsp;рабочих дней вам будут направлены уведомления о
                    действиях, предпринятых в&nbsp;отношении лица, которому была адресована жалоба.
                    Жалобы рассматриваются в&nbsp;анонимном порядке.</p>
            </div>
        </div>
        <button @click="postReport()" v-if="!report_posted"
            class="block w-full text-center py-1 rounded-xl  bg-black text-white hover:bg-neutral-800 focus:opacity-70 transition-colors duration-150 cursor-pointer">Пожаловаться</button>
        <button @click="closeReport()" v-if="report_posted"
            class="block w-full text-center py-1 rounded-xl  bg-black text-white hover:bg-neutral-800 focus:opacity-70 transition-colors duration-150 cursor-pointer">Готово</button>
    </div>


</template>

<script>

import Radio from '../../ui/buttons/Radio.vue';
export default {
    name: "Report",

    data() {
        return {
            report: [],
            report_posted: false
        }
    },

    components: {
        Radio,
    },

    methods: {
        closeReport() {
            this.report = []
            this.$emit('close-report')
        },

        postReport() {
            this.report_posted = !this.report_posted
        }
    }
}


</script>
