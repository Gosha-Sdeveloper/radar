<template>
    <ul
        class="card__functions flex flex-col gap-1 max-w-75 w-full z-4 shadow-2xl bg-white border-2 border-white -right-10 rounded-xl transition-opacity duration-100 overflow-hidden">
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'see-later')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#time"></use>
                </svg>
                <span>Смотреть позже</span>
            </button>
        </li>
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'open-save')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#save"></use>
                </svg>
                <span>Сохранить</span>
            </button>
        </li>
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'share')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#share"></use>
                </svg>
                <span>Поделиться</span>
            </button>
        </li>
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'hide-video')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#forbidden"></use>
                </svg>
                <span>Не интересует</span>
            </button>
        </li>
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'hide-chanel')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#spam"></use>
                </svg>
                <span>Не рекомендовать канал</span>
            </button>
        </li>
        <li class="card__functions-item">
            <button @click="showActionInfo($event, 'open-report')"
                class="card__functions__btn rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg width="24" height="24">
                    <use href="#activities"></use>
                </svg>
                <span>Пожаловаться</span>
            </button>
        </li>
    </ul>
</template>

<script>
import { useRipple } from '../../../composables/useRipple';

export default {
    name: "CardActions",

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },
        showActionInfo(e, name) {
            this.createRipple(e)

            if (name === 'see-later') {
                this.$emit('view-later')
            } else if (name === 'open-save') {
                this.$emit('open-save')
            } else if (name === 'share') {
                this.$emit('share-message')
            } else if (name === 'hide-video') {
                this.$emit('hide-video')
            } else if (name === 'hide-chanel') {
                this.$emit('hide-chanel')
            } else if (name === 'open-report') {
                this.$emit('open-report')
            }
        }
    }
}
</script>

<style scoped>
.card__action {
    opacity: 0;
}

.card__action.opened {
    animation: card-action 3600ms cubic-bezier(0.4, 0, 0.1, 1);
}

@keyframes card-action {
    0% {
        opacity: 0;
        transform: translate(0, 0) scale(0.95);
    }

    15% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }

    65% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }

    75% {
        opacity: 1;
    }


    100% {
        opacity: 0;
        transform: translate(40px, 90px) rotate(6deg) scale(1.05);
    }
}
</style>
