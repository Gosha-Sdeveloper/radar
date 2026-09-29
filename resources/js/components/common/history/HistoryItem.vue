<template>
    <li class="history__item flex flex-col  w-full h-full">
        <img class="absolute w-full h-full object-cover" src="../../../../images/themes/amethysts.jpg"
            alt="Описание изображения с истории">
        <div class="bg-black/70 z-20">
            <div class="history__timer relative z-20 w-full h-0.75 bg-white/80"></div>
        </div>
        <div class="history__top flex justify-between relative z-10 p-2 bg-black/70">
            <div class="history__author flex gap-1.5 items-center">
                <img class="history__author-avatar w-10 h-10 rounded-full" src="../../../../images/themes/blue-black.jpg"
                    alt="Иконка канала">
                <div class="history__author-info">
                    <span class="history__author-name text-white font-medium cursor-pointer">Кристалический лазерный
                        завод</span>
                    <div class="history__views flex items-center gap-0.5 text-gray-400 text-xs cursor-default">
                        <span>150 просмотров</span>
                        <svg width="3" height="3">
                            <use href="#point"></use>
                        </svg>
                        <span>16:39</span>
                    </div>
                </div>

            </div>
            <button
                class="history__like flex items-center gap-1 rounded-full px-4 py-0.5 text-white bg-gray-600/30 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#love"></use>
                </svg>
                <span class="history__likes-count">27</span>
            </button>
        </div>
        <div @mouseenter="this.text_uncovered = true" @mouseleave="this.text_uncovered = false"
            class="history__bottom mt-auto py-3 px-2.5 bg-black/60 shadow-[inset_0_20px_30px_-10px_rgba(0,0,0,0.9)] z-10 cursor-default">

            <p :class="[
                'text-white/90 transition-all duration-1000 overflow-hidden',
                text_uncovered ? 'max-h-125' : 'max-h-12 points-two']">Искусственный алмазный завод выращивает
                кристаллы из углерода под высоким давлением и температурой. Полученные камни используют в
                промышленности
                — для резки, шлифовки и сверления, а также в электронике, где нужны сверхтвёрдые материалы. В
                ювелирных
                изделиях выращенные алмазы позволяют получать сияющие камни с заданными свойствами, снижая
                зависимость
                от редких природных запасов. Заходите на наш канал, чтобы узнать подробнее как всё это работает!</p>
        </div>
    </li>

</template>

<script>
export default {
    name: "HistoryItem",

    data() {
        return {
            text_uncovered: false

        }
    }
}

</script>

<style scoped>
.history__author-avatar {
    border: 1px solid #ffffff4d;
}

.history__timer {
    transform: scaleX(0);
}

.history__timer {
    transform-origin: left;
    animation: history-timer 12s linear;
}


@keyframes history-timer {
    0% {
        transform: scaleX(0);
    }

    100% {
        transform: scaleX(1);
    }
}
</style>
