<template>
    <li @click.prevent="createRipple" class="item rounded-lg ripple-btn p-2 w-full border border-transparent relative">
        <a class="ripple-btn flex gap-2 items-center" href="#">
            <img src="../../../../images/themes/blue-black.jpg" class="item-img relative z-2" alt="Иконка канала">
            <div>
                <div class="flex items-center gap-2 relative z-2">
                    <!-- <svg width="18" height="18" color="oklch(66.6% 0.179 58.318)">
                        <use href="#programming-channel"></use>
                    </svg> -->
                    <h2 class="points w-5/6 leading-[1.3]">Laravel plus group</h2>
                </div>
                <p class="relative z-2 points w-9/10 text-[#6E6E6E] leading-[1.15]"><span
                        class="text-blue-700">@userLaravel</span>,
                    Да там в
                    правду
                    трудность есть в том что</p>
            </div>
        </a>
        <span class="z-2 text-xs time absolute p-0.5 px-0.75  text-white notimportant rounded-full">
            15
        </span>
    </li>
</template>
<!-- <Item></Item> Базовый вызов -->
<script>
import { useRipple } from '../../../composables/useRipple';

export default {
    name: 'Item',
    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        }
    }
}
</script>

<style scoped>
.item-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    pointer-events: none;
    z-index: 2;
}

.time {
    top: 50%;
    right: 9px;
    transform: translateY(-50%);
}


.item {
    transition: background-color 75ms ease;
}

.important {
    background-color: black;
}

.notimportant {
    background-color: rgb(129, 127, 127);
}

.item:hover {
    background-color: #efefef;
}


</style>
