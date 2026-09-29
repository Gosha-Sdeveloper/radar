<template>
    <header class="explorer-panel__header w-75 flex items-centers justify-between">
        <div class="explorer-panel__header-main flex items-centers gap-1">
            <button class="explorer-panel__menu-btn cursor-pointer" aria-label="Открыть меню пользователя">
                <svg class="">
                    <use href="#nav-menu"></use>
                </svg>
            </button>
            <div class="explorer-panel__logo-wrapper pt-1">
                <svg class="explorer-panel__logotype max-w-40 max-h-12" aria-label="Логотип сервиса">
                    <use href="#logo"></use>
                </svg>
            </div>
        </div>
        <div class="explorer-panel__history-block history flex items-center pr-2">
            <ul class="history__list bg-gray-100 pr-2 flex relative">
                <li @click="toggleHistory()"
                    class="history__item flex items-center justify-center history__item--first"><img
                        class="history__item-img" src="../../../../images/themes/amethysts.jpg"
                        alt="У канала (название) появилась исотрия" srcset=""></li>
                <li @click="toggleHistory()"
                    class="history__item flex items-center justify-center history__item--second"><img
                        class="history__item-img" src="../../../../images/themes/glasmorphism.jpg"
                        alt="У канала (название) появилась история"></li>
                <li @click="toggleHistory()"
                    class="history__item flex items-center justify-center history__item--third"><img
                        class="history__item-img" src="../../../../images/themes/green-black.jpg"
                        alt="У канала (название) появилась история" srcset=""></li>

            </ul>
        </div>
    </header>
    <teleport to="body">
        <div v-if="history_opened" class="history-wrapper fixed inset-0 z-50">
            <div class="fixed inset-0 bg-black/70 blackout rounded-lg"></div>
            <HistoryList class="relative z-20"></HistoryList>
            <button @click="toggleHistory()"
                class="absolute active:scale-95 top-3 right-3 z-30 text-white/80 p-1 border border-white/80 rounded-full bg-white/20 backdrop-blur-md cursor-pointer">
                <svg width="36" height="36">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
    </teleport>
</template>

<script>
import HistoryList from '../history/HistoryList.vue';
export default {
    name: "Header",

    components: {
        HistoryList,
    },

    data() {
        return {
            history_opened: false
        }
    },

    methods: {
        toggleHistory() {
            this.history_opened = !this.history_opened
        }
    }

}
</script>

<style scoped>
.explorer-panel__header {
    padding-left: 15px;
    padding-top: 5px;
}

.explorer-panel__menu-btn {
    position: relative;
    margin-bottom: 4px;
    z-index: 2;
}

.explorer-panel__menu-btn svg {
    width: 18px;
    height: 18px;
}

.explorer-panel__logotype {
    width: 139px;
    height: 41px;
}

.explorer-panel__menu-btn::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    z-index: -1;
    border-radius: 1.4rem;
    border: 1px solid transparent;
    background-color: oklch(92.8% 0.006 264.531);
    opacity: 0;
    transition: opacity 100ms ease;
    will-change: opacity;
}

.explorer-panel__menu-btn:hover::before {
    opacity: 1;
    border-color: transparent;
}

.explorer-panel__menu-btn:active::before {
    border-color: oklch(70.7% 0.022 261.325);
}

.history__item {
    width: 37px;
    height: 37px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.history__item--first {
    background: linear-gradient(to right in oklch, #6366f1, #2dd4bf);
    right: 47px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    z-index: 2;
}

.history__item--second {
    background: linear-gradient(to right in oklch longer hue, oklch(0.585 0.233 277.117), oklch(0.792 0.141 189.002));
    right: 24px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    z-index: 3;

}

.history__item--third {
    background: linear-gradient(to right in hsl, #2dd4bf, #6366f1);
    right: 0;
    z-index: 1;

}

.history__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000049;
    border-radius: 50%;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
    will-change: opacity;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.history__item:hover::before {
    opacity: 1;
}

.history__item-img {
    position: relative;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
}
</style>
