<template>
    <ul ref="historyList"
        class="history__list absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-140 h-[80%] overflow-y-hidden rounded-xl z-20">
        <HistoryItem :class="{ active: this.history_active }"></HistoryItem>
        <HistoryItem :class="{ active: this.history_active }"></HistoryItem>
        <HistoryItem :class="{ active: this.history_active }"></HistoryItem>

    </ul>
    <div
        class="history__functions flex justify-between absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-140 z-20">
        <button @click="scrollHistory('Up')"
            class="history__functions-btn active:scale-95 text-white/80 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2 border border-white/30 pr-2.5 py-1 cursor-pointer">
            <svg class="rotate-180" width="24" height="24">
                <use href="#arrow-right"></use>
            </svg>
            <span class="font-medium mb-0.5">превидущая</span>
        </button>
        <ul class="history__parceling flex items-center gap-0.5">
            <li
                class="history__parceling-item cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-sm font-medium">
                1</li>
            <li
                class="history__parceling-item cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-transparent text-white/80 text-sm font-medium">
                2</li>
            <li
                class="history__parceling-item cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-transparent text-white/80 text-sm font-medium">
                3</li>
            <li
                class="history__parceling-item cursor-pointer flex h-6 w-6 items-center justify-center rounded-full bg-transparent text-white/80 text-sm font-medium">
                <span class="pb-1.75">...</span>
            </li>


        </ul>
        <button @click="scrollHistory('Down')"
            class="history__functions-btn active:scale-95 text-white/80 flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2 border border-white/30 pl-2.5 py-1 cursor-pointer">
            <span class="font-medium mb-0.5">cледующая</span>
            <svg width="24" height="24">
                <use href="#arrow-right"></use>
            </svg>
        </button>
    </div>

</template>

<script>
import HistoryItem from '../../common/history/HistoryItem.vue';

export default {
    name: 'HistoryList',

    data() {
        return {
            history_active: false,
        }
    },

    methods: {
        scrollHistory(direction) {
            const container = this.$refs.historyList;

            if (!container) return;

            // Определяем высоту видимой области (один слайд)
            const scrollAmount = container.clientHeight;

            if (direction === 'Down') {
                // Скроллим вниз (положительное значение)
                container.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth'
                });
            } else if (direction === 'Up') {
                container.scrollBy({
                    top: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    },

    components: {
        HistoryItem,
    }

}

</script>

<style scoped>
.history__list::-webkit-scrollbar {
    display: none;
}
</style>
