<template>
    <ul
        class="message-actions actions  flex flex-col gap-1 max-w-65 w-full z-4 shadow-2xl bg-white backdrop-blur-3xl border-2 border-white rounded-xl transition-opacity duration-100 overflow-hidden">
        <li class="actions__item action">
            <button @click="createRipple"
                class="action__btn hover:bg-[#efefef] rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#chat-icon"></use>
                </svg>
                <span class="action__description">Написать сообщение</span>
            </button>
        </li>
        <li v-if="!is_audio" class="actions__item action">
            <button @click="copyMsg($event)"
                class="action__btn hover:bg-[#efefef] rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#save"></use>
                </svg>
                <span class="action__description">Скопировать сообщение</span>
            </button>
        </li>
        <li v-if="is_audio" class="actions__item action">
            <button @click="transcription($event)"
                class="action__btn hover:bg-[#efefef] rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#voice"></use>
                </svg>
                <span class="action__description">Транскрипция аудио</span>
            </button>
        </li>
        <li class="actions__item action">
            <button @click="openShare($event)"
                class="action__btn hover:bg-[#efefef] rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#share"></use>
                </svg>
                <span class="action__description">Переслать</span>
            </button>
        </li>
        <li class="actions__item action">
            <button @click="openMsgReport($event)"
                class="action__btn hover:bg-[#efefef] rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#activities"></use>
                </svg>
                <span class="action__description">Пожаловаться</span>
            </button>
        </li>
        <li class="actions__item action">
            <button @click="openDelete($event)"
                class="action__btn hover:bg-[#efefef] hover:text-red-600 rounded-md ripple-btn px-2 py-1.5 w-full p-0.5 flex items-center gap-1.5 cursor-pointer">
                <svg class="action__icon" width="24" height="24">
                    <use href="#delete"></use>
                </svg>
                <span class="action__description">Удалить у меня</span>
            </button>
        </li>
    </ul>
</template>

<script>
import { useRipple } from '../../../composables/useRipple';
export default {
    name: "MessageActions",

    props: {
        is_audio: {
            type: Boolean,
            required: true,
            default: false,
        },
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        openDelete(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('close-msg-actions')
                this.$emit('open-delete')
            }, 250)
        },

        openMsgReport(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('close-msg-actions')
                this.$emit('open-msg-report')
            }, 250)
        },

        copyMsg(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('close-msg-actions')
                this.$emit('copy-msg')
            }, 250)
        },

        transcription(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('close-msg-actions')
                this.$emit('transcription')
            }, 250)
        },

        openShare(e) {
            this.createRipple(e)
            setTimeout(() => {
                this.$emit('close-msg-actions')
                this.$emit('open-share')
            }, 250)
        }
    }
}
</script>
