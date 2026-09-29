<template>
    <div class="message-content flex items-end gap-5 w-full max-w-200 relative">

        <div class="message-content__message message w-full  bg-white p-2 rounded-xl relative mb-3">
            <div class="message__info flex justify-between mb-1">
                <div class="message__author flex gap-2 items-start">
                    <img class="message-content__sender-avatar w-10 h-10 rounded-lg cursor-pointer"
                        src="../../../../images/themes/green-black.jpg" alt="Иконка отправителя">
                    <div class="author__textcontent flex flex-col">
                        <button class="message__author-name font-medium leading-3">{{ name }}</button>
                        <span class="message__author-role text-sm text-[#6E6E6E]">{{ role }}</span>
                    </div>

                </div>
                <span class="message__time text-sm text-[#6E6E6E] leading-3">{{ time }}</span>
            </div>
            <div v-if="images.length >= 1" class="message-content__images image grid grid-cols-[3fr_1fr] gap-0.5">
                <div @click="openWatcher()" class="message-content__img-container cursor-pointer relative">
                    <img class="message-content__main-img message-content__img--main w-full h-36 rounded-lg"
                        src="../../../../images/themes/green-light.jpg" alt="Изображение отправенное отправителем">
                    <!-- <button class="image__donload-all"></button> -->
                    <span
                        class="image__watch opacity-0 transition-opacity duration-150 p-1 bg-black/40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg class="image__watch-icon text-white" width="32" height="32">
                            <use href="#search"></use>
                        </svg>
                    </span>
                    <button
                        class="image__donload-all py-1 px-1.5 bg-black/40 rounded-full absolute bottom-1 left-1 backdrop-blur-xs flex items-center gap-1 hover:bg-black cursor-pointer active:opacity-80">
                        <svg class="image__watch-icon text-white" width="14" height="14">
                            <use href="#donload"></use>
                        </svg>
                        <span class="image__watch-text text-xs text-white">Скачать все (19 мб)</span>
                    </button>

                </div>
                <div @click="openWatcher()" class="message-content__other-images flex flex-col gap-0.5">
                    <div class="message-content__img-container cursor-pointer relative">
                        <img class="message-content__img message-content__img--main w-full h-17.75 rounded-lg"
                            src="../../../../images/themes/green-black.jpg" alt="Изображение отправенное отправителем">
                        <span
                            class="image__watch image__watch opacity-0 transition-opacity duration-150  p-1 bg-black/40 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg class="image__watch-icon text-white" width="32" height="32">
                                <use href="#search"></use>
                            </svg>
                        </span>
                    </div>
                    <div
                        class="message-content__img-container cursor-pointer message-content__img-container--all relative">
                        <img class="message-content__img message-content__img--main w-full h-17.75 rounded-lg"
                            src="../../../../images/themes/green-middle.jpg" alt="Изображение отправенное отправителем">
                        <span
                            class="image__watch-all watch-all p-1 px-2 bg-black/60 hover:bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none">+5</span>
                    </div>
                </div>
            </div>

            <Audio class="message__audio mb-2" v-if="audio_src !== ''"></Audio>
            <p v-if="body !== ''" class="message__content">{{ body }}</p>
            <svg class="absolute bottom-0 -left-4 z-2" width="17" height="40" color="#fff">
                <use href="#msg_left"></use>
            </svg>
            <div
                :class="['message-content__bottom message-functions flex items-center justify-between', answers_opened ? 'pb-2' : '']">
                <button @click="toggleAnswers()"
                    class="message-functions__answers cursor-pointer px-2.25 py-0.5  hover:bg-[#efefef] active:bg-[#5353532f]  text-[#6E6E6E] rounded-full hover:text-black">{{
                        this.answers_opened ? 'Скрыть ответы' : `${answers_count} ответов` }}</button>
                <ul class="message-content__reactions-list flex gap-1">
                    <li class="message-content__reactions-item">
                        <button @click="likeMsg($event, 'main')"
                            class="message-content__reactions-button relative flex items-center gap-1 p-0.5 px-2 bg-[#efefef] hover:bg-[#5353532f] transition-colors duration-150 cursor-pointer rounded-full">
                            <svg width="18" height="18">
                                <use href="#like"></use>
                            </svg>
                            <span class="message-content__reaction-count text-sm">21</span>
                        </button>
                    </li>
                </ul>
            </div>
            <Transition name="opacity">
                <ul v-if="answers_opened" class="message__answers  answers relative">
                    <Answer name="@testUserf3b" time="1 мес. назад" answered=""
                        body="Изумрудный Swarovski Rivoli 14 мм (#1122) — если нужен яркий цветовой акцент - выращивается просто и подходит новичку."
                        likes_count="3"></Answer>
                    <Answer name="@userLaravel" time="1 мес. назад" answered="@testUserf3b, " body="Это подходит если у
                    человека уже есть достаточный опыт... " likes_count="2"></Answer>
                </ul>
            </Transition>
        </div>

        <button @click="toggleMainActions()"
            :class="['message__actions-btn answer-btn opacity-0 absolute top-2 -right-11 transition-opacity duration-100 delay-100 p-1.25 rounded-full hover:opacity-100 active:opacity-40 cursor-pointer', main_actions_opened ? 'active' : '']">
            <svg class="answer__btn-icon text-white" width="26" height="26">
                <use href="#open"></use>
            </svg>
        </button>
        <Transition name="functions">
            <div v-if="main_actions_opened" class="message__actions actions absolute top-2 right-1">
                <MessageActions :is_audio="audio_src !== ''" @close-msg-actions="toggleMainActions()"
                    @open-delete="openWarning('Удалить сообщение', 'Сообщение будет удалено из чата для вас. Вы сможете его увидеть и восстановить только через поддержку.', 'Да')"
                    @open-msg-report="openWarning('Пожаловаться на сообщение', 'Жалоба рассматривается анонимно. Если информация подтверждается, сообщение удаляется для всех, а в редких случаях принимаются другие меры.', 'Пожаловаться')"
                    @copy-msg="copyMsg()" @transcription="transcriptAudio()" @open-share="openShare()">
                </MessageActions>
            </div>
        </Transition>
    </div>

    <Transition name="opacity">
        <WarningPopup :title="warning.title" :description="warning.description" :btn_text="warning.btn_text"
            v-if="warning_opened" @close-warning="closeWarning()"></WarningPopup>
    </Transition>
    <Transition name="opacity">
        <div v-if="dimining_active" class="fixed inset-0 bg-black/50 z-8 blackout"></div>
    </Transition>

    <ActionMsg title="Текст сообщения скопирован!" text="" image_src="" :class="{ opened: msg_copied }" />

    <Transition name="opacity">
        <Watcher v-if="watcher_opened" @close-watcher="closeWatcher()"></Watcher>
    </Transition>

    <Transition name="opacity">
        <Share v-if="share_opened" @close-share="closeShare()"></Share>
    </Transition>
</template>

<script>
import { useBurst } from '../../../composables/useBurst';
import MessageActions from '../../services/chat/MessageActions.vue';
import WarningPopup from '../../services/chat/WarningPopup.vue';
import ActionMsg from '../../services/functions/ActionMsg.vue';
import Answer from './Answer.vue';
import Audio from '../../services/chat/Audio.vue';
import Watcher from '../../services/chat/Watcher.vue';
import Share from '../../services/functions/Share.vue';

export default {
    name: "Message",

    components: {
        MessageActions,
        Answer,
        Audio,
        ActionMsg,
        WarningPopup,
        Watcher,
        Share,
    },

    props: {
        name: {
            type: String,
            required: true
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
        audio_src: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },

        answers_count: {
            type: Number,
            required: true,
        },
        reactions: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            watcher_opened: false,
            answers_opened: false,
            main_actions_opened: false,
            warning_opened: false,
            dimining_active: false,
            msg_copied: false,
            warning: {
                title: "",
                description: "",
                btn_text: "",
            },
            share_opened: false,
        }
    },

    // mounted: {
    //     progressAudio
    // },

    methods: {
        toggleAnswers() {
            setTimeout(() => {
                this.answers_opened = !this.answers_opened
            }, 340);
        },

        likeMsg(e, name) {
            this.burst(e)
            const route = 'like-main'


        },

        burst(e) {
            const { burst } = useBurst()
            burst(e)
        },

        toggleMainActions() {
            this.main_actions_opened = !this.main_actions_opened
        },

        openWarning(title, description, btn_text) {
            this.warning.title = title
            this.warning.description = description
            this.warning.btn_text = btn_text
            setTimeout(() => {
                this.warning_opened = true
                this.dimining_active = true
            }, 200);
        },

        closeWarning() {
            this.warning_opened = false
            this.dimining_active = false
        },

        copyMsg() {
            this.msg_copied = true
            navigator.clipboard.writeText(this.body)
            setTimeout(() => {
                this.msg_copied = false
            }, 3200);
        },

        formatTime(seconds) {
            const m = Math.floor(seconds / 60)
            const s = Math.floor(seconds % 60)
            return `${m < 10 ? '' + m : m}:${s < 10 ? '0' + s : s}`
        },

        openWatcher() {
            this.watcher_opened = true
        },

        closeWatcher() {
            this.watcher_opened = false
        },

        openShare() {
            this.dimining_active = true
            this.share_opened = true
        },

        closeShare() {
            this.share_opened = false
            this.dimining_active = false
        }
    }

}
</script>


<style scoped>
.message-content:hover .message__actions-btn {
    opacity: 1;
}

.message__actions-btn:active {
    background-color: #0000003f;
    backdrop-filter: blur(2px);
}

.message-content__message {
    border-bottom-left-radius: 0;
}

.message__answers::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000000;
    border-bottom: 10px;
    width: 1px;
    height: calc(100% - 2px);
}

.message-content__img-container::before {
    content: "";
    position: absolute;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000075;
    transition: opacity 200ms ease;
    will-change: opacity;
    opacity: 0;
}

.message__answer:hover .answer__btn {
    opacity: 1;
}

.message-content__img-container--all::before {
    opacity: 1;
    backdrop-filter: blur(5px);
}

.message-content__img-container:hover::before {
    opacity: 1;
}

.message-content__img-container:hover .image__watch {
    opacity: 1;
}

.message-content__img-container--all:hover .image__watch-all {
    background-color: black;
}
</style>
