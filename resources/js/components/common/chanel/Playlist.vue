<template>
    <li class="playlist z-0 flex items-center  w-full">
        <router-link class="playlist__link flex items-center gap-2 w-full hover:bg-[#efefef] p-2 rounded-xl transition-colors duration-100 active:bg-[#5353533f] relative"
            href="#">
            <span class="playlist__number">{{ count }}</span>

            <div class="playlist__link-container flex items-center justify-between w-full">
                <div class="playlist__main flex items-center gap-2.5 w-full">
                    <img class="playlist__img w-16 h-16 rounded-xl" src="../../../../images/themes/blue-black.jpg"
                        alt="Изображение плейлиста">
                    <div class="playlist__info flex flex-col justify-between">
                        <div class="playlist__textcontent">
                            <h2 class="playlist__title points leading-tight">{{ title }}
                            </h2>
                            <p class="playlist__description text-[#6E6E6E] text-sm points leading-tight">{{ description
                            }}</p>
                        </div>
                        <ul class="chanel__specifications flex items-center gap-1 cursor-pointer">
                            <li class="chanel__specification">
                                <button class="chanel__specification-btn flex items-center gap-0.5">
                                    <svg class="chanel__specification-icon text-[#6E6E6E] fill-transparent" width="14"
                                        height="14">
                                        <use href="#star"></use>
                                    </svg>
                                    <span class="chanel__specification-text text-xs text-[#6E6E6E]">{{ raiting }}</span>
                                </button>
                            </li>
                            <li class="chanel__decoration mt-px" aria-hidden="true">
                                <svg class="chanel__decoration-icon text-[#6E6E6E]" width="3" height="3">
                                    <use href="#point"></use>
                                </svg>
                            </li>
                            <li class="chanel__specification">
                                <button class="chanel__specification-btn flex items-center gap-0.5">
                                    <svg class="chanel__specification-icon text-[#6E6E6E]" width="16" height="16">
                                        <use href="#views"></use>
                                    </svg>
                                    <span class="chanel__specification-text text-xs text-[#6E6E6E]">{{ views }}</span>
                                </button>
                            </li>

                            <li class="chanel__decoration mt-px" aria-hidden="true">
                                <svg class="chanel__decoration-icon text-[#6E6E6E]" width="3" height="3">
                                    <use href="#point"></use>
                                </svg>
                            </li>
                            <li class="chanel__specification">
                                <button class="chanel__specification-btn flex items-center gap-0.5">
                                    <svg class="chanel__specification-icon text-[#6E6E6E]" width="16" height="16">
                                        <use href="#analysis"></use>
                                    </svg>
                                    <span class="chanel__specification-text text-xs text-[#6E6E6E]">{{ analysis
                                    }}%</span>
                                </button>
                            </li>
                            <li class="chanel__decoration mt-px" aria-hidden="true">
                                <svg class="chanel__decoration-icon text-[#6E6E6E]" width="3" height="3">
                                    <use href="#point"></use>
                                </svg>
                            </li>
                            <li class="chanel__specification">
                                <button class="chanel__specification-btn flex items-center gap-0.5">
                                    <svg class="chanel__specification-icon text-[#6E6E6E]" width="13" height="13">
                                        <use href="#time"></use>
                                    </svg>
                                    <span class="chanel__specification-text text-xs text-[#6E6E6E]">{{ timing }}</span>
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
                <button @click="openFunctions($event)"
                    class="playlist__btn p-0.5 z-2 rounded-full hover:bg-[#5353533f] cursor-pointer">
                    <svg width="30" height="30">
                        <use href="#open"></use>
                    </svg>
                </button>
            </div>
            <Transition name="menu">
                <div v-if="functions_opened" @mouseleave="functions_opened = false"
                    class="absolute z-4 -bottom-30 right-0">
                    <CardActions @view-later="viewLater(title, image)" @share-message="shareVideo()"
                        @open-save="openSave()" @hide-video="hideVideo()" @hide-chanel="hideChanel()"
                        @open-report="openReport()"></CardActions>
                </div>
            </Transition>
        </router-link>
    </li>
    <ActionMsg :title="action_title" :text="action_text" :image_src="action_image" :class="{ opened: action_opened }" />
    <Transition name="opecity">
        <Report v-if="report_opened" @close-report="closeReport()"></Report>
    </Transition>
    <Transition name="opacity">
        <div v-if="dimining_active" class="fixed inset-0 bg-black/50 z-8 blackout"></div>
    </Transition>
</template>

<script>
import CardActions from '../../services/functions/CardActions.vue';
import ActionMsg from '../../services/functions/ActionMsg.vue';
import Report from '../../services/functions/Report.vue';
export default {
    name: "Playlist",

    components: {
        CardActions,
        ActionMsg,
        Report,
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
        description: {
            type: String,
            required: true,
        },
        raiting: {
            type: Number,
            required: true
        },
        analysis: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true
        },
        views: {
            type: String,
            required: true
        },
        timing: {
            type: String,
            required: true
        },

    },

    methods: {
        openFunctions(e) {
            e.stopPropagation()
            this.functions_opened = true
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
            this.action_title = 'Плейлист добавлен в смотреть позже'
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
            this.action_title = 'Плейлист скрыт'
            this.action_text = ''
            this.action_image = ''

            this.playActionMsg()
        },

        hideChanel() {
            setTimeout(() => {
                this.functions_opened = false
            }, 250);
            this.action_title = 'Контент с канала будет реже рекомендован'
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
    },
}
</script>
