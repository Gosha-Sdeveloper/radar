<template>
    <div class="fd-panel__body fd-panel flex flex-col w-90 h-full top-0 right-0 fixed bg-white z-20 px-2 py-2">
        <div class="fd-panel__header flex items-center justify-between pb-0.5 border-b border-[#c6c6c6] mb-2">
            <h3 class="fd-panel__title text-xl font-medium">Упорядочить</h3>
            <button @click="closeFilter()"
                class="fd-panel__close p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] cursor-pointer">
                <svg width="32" height="32" color="black">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
        <ul class="fd-panel__sort-list fd-list mb-2 flex flex-col gap-1">
            <li class="fd-list__item">
                <Radio label="По релевантности" id="relevance" name="sorting-btn" model-value="true" />
            </li>
            <li class="fd-list__item">
                <Radio label="По популярности" id="popular" name="sorting-btn" />
            </li>
            <li class="fd-list__item">
                <Radio label="По рейтингу" id="rating" name="sorting-btn" />
            </li>
            <li class="fd-list__item">
                <Radio label="Сначала новые" id="newContent" name="sorting-btn" />
            </li>
            <li class="fd-list__item">
                <Radio label="По сложности" id="complexity" name="sorting-btn" />
            </li>
            <li class="fd-list__item">
                <Radio label="Длительность от 15 минут" id="duration" name="sorting-btn" />
            </li>
        </ul>
        <button @click.prevent="toggleSort()"
            class="fd-panel__toggle w-full py-1 border border-transparent bg-[#efefef] rounded-xl flex items-center justify-center gap-1 cursor-pointer hover:bg-[#efefef] active:bg-transparent transition-colors duration-100">
            <span class="text-gray-900">{{ this.sort_block_opened ? 'Скрыть' : 'Развернуть' }}</span>
            <svg :class="['mt-0.5 transition-transform duration-300 ease', sort_block_opened ? 'rotate-180' : '']"
                width="15" height="15" color="#4a5565">
                <use href="#open-btn"></use>
            </svg>

        </button>
        <div class="fd-panel__filters fd-content">
            <h3 class="fd-panel__title  text-xl font-medium pb-1.5 mb-2 border-b border-[#c6c6c6]">Фильтровать</h3>
            <ul class="fd-panel__filter-list fd-list">
                <li class="fd-list__item">
                    <Checkbox v-model="all" label="Все" id="all" :disabled="all && selectedCheckboxes.length === 0" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Последние новости" id="news" value="news" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Кампании" id="campaigns" value="campaigns" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Мероприятия" id="events" value="events" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Опросы" id="surveys" value="surveys" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Благотворительность" id="charity" value="charity" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Темы по моим интересам" id="sections"
                        value="sections" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Видео" id="videos" value="videos" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Статьи" id="articles" value="articles" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Курсы" id="courses" value="courses" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Для специалистов" id="specialists"
                        value="specialists" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Premium контент" id="premium" value="premium" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Каналы" id="chanels" value="chanels" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Группы" id="groups" value="groups" />
                </li>
                <li class="fd-list__item">
                    <Checkbox v-model="selectedCheckboxes" label="Знакомства" id="acquaintances"
                        value="acquaintances" />
                </li>
            </ul>
        </div>
        <div class="fd-panel__bottom mt-auto pb-2">
            <button @click.prevent="toggleCheckboxes()"
                class="fd-panel__toggle--seccodary w-full py-1 border border-transparent bg-[#efefef] rounded-xl flex items-center justify-center gap-1 cursor-pointer hover:bg-[#efefef] active:bg-transparent transition-colors duration-100 mb-1">
                <span class="text-gray-900">{{ this.filter_block_opened ? 'Скрыть' : 'Развернуть' }}</span>
                <svg :class="['mt-0.5 transition-transform duration-300 ease', filter_block_opened ? 'rotate-180' : '']"
                    width="15" height="15" color="#4a5565">
                    <use href="#open-btn"></use>
                </svg>
            </button>
            <button
                class="fd-panel__apply block w-full text-center py-1 rounded-xl  bg-black text-white hover:bg-neutral-800 focus:opacity-70 transition-colors duration-150 cursor-pointer">Применить</button>
        </div>
    </div>
</template>

<script>
import Checkbox from '../../ui/buttons/Checkbox.vue';
import Radio from '../../ui/buttons/Radio.vue';
import { ref, watch } from 'vue';


export default {
    name: 'FilterPanel',

    data() {
        return {
            sort_block_opened: false,
            filter_block_opened: false,

            // Функционал чекбокса
            all: true,
            selectedCheckboxes: [], // Данные активных чекбоксов
        }
    },

    watch: {
        all(newValue) {
            if (newValue === true) {
                this.selectedCheckboxes = [];
            }
        },
        selectedCheckboxes: {
            handler(newValue) {
                if (newValue.length > 0) {
                    this.all = false;
                } else {
                    this.all = true;
                }
            },
            deep: true
        }
    },

    components: {
        Checkbox,
        Radio,
    },

    methods: {
        toggleSort() {
            this.sort_block_opened = !this.sort_block_opened
        },
        toggleCheckboxes() {
            this.filter_block_opened = !this.filter_block_opened
        },
        closeFilter() {
            this.sort_block_opened = false
            this.filter_block_opened = false
            this.selectedCheckboxes = []
            this.$emit('close-panel')
        },
    }
}
</script>

<style scoped>
.fd-panel__close {
    border: 1px solid transparent;

}

.fd-panel__close:active {
    border-color: #c6c6c6;
}
</style>
