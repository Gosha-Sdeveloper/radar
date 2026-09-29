<template>
    <li
        :class="['card  w-full bg-white transition-opacity duration-300 rounded-xl shadow-md border border-gray-300 cursor-pointer relative', video_hidden ? 'opacity-0' : 'opacity-100']">
        <img class="card__image w-full h-30.5 z-1 rounded-t-xl" src="../../../../images/themes/glasmorphism.jpg"
            alt="Изображение видео/статьи">
        <span class="card__video-time absolute top-24 right-1 bg-black/70 text-white rounded-xl text-sm px-1.5 z-2">
            {{ time }}
        </span>
        <div @click="createRipple" class="card__content flex-col ripple-btn pb-2 rounded-b-xl">
            <div class="card__title-block flex items-start justify-between pl-2 pr-1 relative z-2">

                <h3 class="card__title font-medium points-two leading-tight">{{ title }}</h3>
                <button @mouseenter="functions_opened = true" class="card__menu-btn p-0.5 rounded-full">
                    <svg width="30" height="30">
                        <use href="#open"></use>
                    </svg>
                </button>
            </div>
            <div class="card__content px-2">
                <div class="card__from flex items-center justify-between mb-1">
                    <div class="card__author-wrapper flex items-center gap-1">
                        <img class="card__author-icon w-7 h-7 rounded-full z-2"
                            src="../../../../images/themes/amethysts.jpg" alt="Изображение аватара">
                        <span class="card__author-name points text-sm z-2">{{ name }}</span>
                    </div>
                </div>

                <div class="card__bottom flex justify-between">
                    <p class="card__specifications flex items-center gap-1 text-[#6E6E6E] text-sm">
                        <span class="z-2">{{ views }} просмотров</span>
                        <svg class="z-2" width="3" height="3">
                            <use href="#point"></use>
                        </svg>
                        <span class="z-2">{{ raiting }}</span>
                    </p>
                    <span class="card__time text-sm text-[#6E6E6E] z-2">{{ date }}</span>
                </div>
            </div>
        </div>
        <Transition name="menu">
            <div v-if="functions_opened" @mouseleave="functions_opened = false" class="absolute z-4 -bottom-20 right-0">
                <CardActions @view-later="viewLater(title, image)" @share-message="shareVideo()" @open-save="openSave()"
                    @hide-video="hideVideo()" @hide-chanel="hideChanel()" @open-report="openReport()"></CardActions>
            </div>
        </Transition>
    </li>
    <ActionMsg :title="action_title" :text="action_text" :image_src="action_image" :class="{ opened: action_opened }" />
    <Transition name="opecity">
        <Report v-if="report_opened" @close-report="closeReport()"></Report>
    </Transition>
    <Transition name="opacity">
        <Save v-if="save_opened" @close-save="closeSave()"></Save>
    </Transition>
    <Transition name="opacity">
        <div v-if="dimining_active" class="fixed inset-0 bg-black/50 z-8 blackout"></div>
    </Transition>
</template>

<script>
import { useRipple } from '../../../composables/useRipple.js';
import CardActions from '../../services/functions/CardActions.vue';
import ActionMsg from '../../services/functions/ActionMsg.vue';
import Report from '../../services/functions/Report.vue';
import Save from '../../services/functions/Save.vue';

export default {
    name: "PlayerCard",


    components: {
        CardActions,
        ActionMsg,
        Report,
        Save,
    },

    data() {
        return {
            functions_opened: false,
            video_hidden: false,
            save_opened: false,
            report_opened: false,
            dimining_active: false,
            action_opened: false,
            action_title: '',
            action_text: '',
            action_image: '',
        }
    },

    props: {
        title: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        raiting: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        author_img: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true,
            default: 'src',
        }
    },

    methods: {
        createRipple(e) {
            const { createRipple } = useRipple()
            createRipple(e)
        },

        closeFunctions() {
            setTimeout(() => {
                this.functions_opened = false
            }, 300)
        },

        playActionMsg() {
            this.action_opened = false
            setTimeout(() => {
                this.action_opened = true
                setTimeout(() => {
                    this.action_opened = false
                }, 3600)
            }, 20)
        },

        viewLater(text, src) {
            setTimeout(() => {
                this.functions_opened = false
            }, 250);
            this.action_title = 'Добавлено в смотреть позже'
            this.action_text = this.title
            this.action_image = src

            this.playActionMsg()
        },

        shareVideo() {
            setTimeout(() => {
                this.functions_opened = false
            }, 250);
            this.action_title = 'Ссылка скопирована'
            this.action_text = ''
            this.action_image = ''
            navigator.clipboard.writeText(this.link)

            this.playActionMsg()
        },

        hideVideo() {
            setTimeout(() => {
                this.functions_opened = false
            }, 250);
            setTimeout(() => {
                this.video_hidden = true
            }, 300);
            this.action_title = 'Видео скрыто с рекомендаций'
            this.action_text = ''
            this.action_image = ''

            this.playActionMsg()
        },

        hideChanel() {
            setTimeout(() => {
                this.functions_opened = false
            }, 250);
            this.action_title = 'Видео с канала будет реже рекомендовано'
            this.action_text = ''
            this.action_image = ''

            this.playActionMsg()
        },

        openReport() {
            setTimeout(() => {
                this.dimining_active = true
                this.report_opened = true
            }, 250);
        },

        closeReport() {
            setTimeout(() => {
                this.dimining_active = false
                this.report_opened = false
            }, 250);
        },


        openSave() {
            setTimeout(() => {
                this.save_opened = true
                this.dimining_active = true
            }, 250);
        },

        closeSave() {
            setTimeout(() => {
                this.dimining_active = false
                this.save_opened = false
            }, 250);
        }
    },
}


</script>

<style scoped>
.card__content::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 102%;
    top: 0;
    left: 0;
    background-color: #ebebeb;
    transition: transform 360ms ease, opacity 240ms ease;
    will-change: transform;
    opacity: 0;
    transform: scale(0.86, 0.5);
    transform-origin: top center;
    border-radius: 0 0 1rem 1rem;
    z-index: 0;
}

.card:hover .card__content::before {
    transform: scale(1);
    opacity: 1;
}
</style>
