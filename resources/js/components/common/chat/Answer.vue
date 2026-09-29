<template>
    <li class="message__answer answer w-full pl-6 pt-4 relative">
        <div class="message__answers-data flex gap-1 relative">
            <img class="answer__author-avatar w-8 h-8 rounded-full cursor-pointer"
                src="../../../../images/themes/blue-black.jpg" alt="Иконка отправителя">
            <div class="answer__content">
                <div class="answer__data flex items-center justify-between relative">
                    <div class="answer__top">
                        <div class="answer__msg-info flex items-center gap-1">
                            <span class="answer__author-name text-xs font-medium">{{ name }}</span>
                            <span class="answer__author-date text-xs text-[#6E6E6E]">{{ time }}</span>
                        </div>
                    </div>
                    <svg class="message__answers-decoration text-black absolute -left-15 -top-1" width="12" height="12"
                        transform="rotate(270)">
                        <use href="#tree"></use>
                    </svg>
                </div>

                <p class="answer__text text-sm leading-tight"><span class="text-blue-700 cursor-pointer">{{ answered }}
                    </span>{{ body }}</p>
            </div>


        </div>
        <button @click="toggleActions()" :class="['answer__btn answer-btn opacity-0 absolute top-5 -right-11 p-1 rounded-full cursor-pointer', answer_actions_opened ? 'active' : '']">
            <svg class="answer__btn-icon text-white" width="24" height="24">
                <use href="#open"></use>
            </svg>
        </button>
        <div class="answers__bottom flex items-center justify-between">

            <button
                class="answer__button-answer text-sm cursor-pointer px-2.25 py-0.5  hover:bg-[#efefef] active:bg-[#5353532f]  text-[#6E6E6E] rounded-full hover:text-black">Ответить</button>
            <div class="answer__reactions flex items-center ">
                <button @click="likeMsg($event)"
                    class="message-content__reactions-button relative flex items-center gap-1 p-0.5 px-1 hover:bg-[#5353532f] transition-colors duration-150 cursor-pointer rounded-full">
                    <svg width="18" height="18">
                        <use href="#like"></use>
                    </svg>
                    <span class="message-content__reaction-count text-sm">{{ likes_count }}</span>
                </button>
                <button
                    class="message-content__reactions-button flex items-center gap-1 p-0.5 hover:bg-[#5353532f] transition-colors duration-150 cursor-pointer rounded-full">
                    <svg width="18" height="18">
                        <use href="#dislike"></use>
                    </svg>
                </button>
            </div>
        </div>
        <Transition name="functions">
        <div v-show="answer_actions_opened" class="actions absolute top-2 -right-1 z-4">
            <MessageActions></MessageActions>
        </div>
        </Transition>
    </li>
</template>

<script>
import { useBurst } from '../../../composables/useBurst';
import MessageActions from '../../services/chat/MessageActions.vue';


export default {
    name: "Answer",

    components: {
        MessageActions,
    },

    props: {
        name: {
            type: String,
            required: true
        },
        answered: {
            type: String,
            required: false
        },
        role: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true,
        },
        icon_url: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true,
        },
        answers_count: {
            type: Number,
            required: true,
        },
        likes_count: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            answer_actions_opened: false,
        }
    },

    methods: {
        likeMsg(e) {
            this.burst(e)
            const route = 'answer-main'
        },

        burst(e) {
            const { burst } = useBurst()
            burst(e)
        },

        toggleActions() {
            this.answer_actions_opened = !this.answer_actions_opened
        }
    }
}

</script>

<style scoped>

.message__answer:hover .answer__btn {
opacity: 1;
}
</style>
