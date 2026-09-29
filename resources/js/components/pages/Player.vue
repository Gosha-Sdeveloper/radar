<template>
    <div class="player flex flex-col w-full bg-white overflow-y-auto overflow-x-hidden scrollbar-hidden">
        <div :class="['video-wrapper flex gap-2 w-full', retelling_opened ? 'px-1' : '']">
            <div ref="video_container"
                :class="['player__main-content h-full relative w-full', retelling_opened ? 'rounded-xl overflow-hidden' : '']">
                <video ref="video" @click="toggleVideoStatus()" @play="startProgressLoop"
                    src="../../../images/themes/video-preview.mp4"
                    :class="['player__video w-full bg-black', { 'h-160': !video_opened }]"></video>
                <div
                    class="video__controls opacity-0 flex flex-col absolute bottom-0 left-0 z-3 w-full transition-opacity duration-150">
                    <div @mousemove="onVideoHoverTime" ref="progressContainer"
                        class="video__progress-container relative w-full backdrop-blur-md h-1 bg-[#2d2d2dae] rounded-full cursor-pointer">
                        <div ref="bufferBar"
                            class="video__progress-bar absolute top-1/2 -translate-y-1/2 left-1 right-1 h-0.75 bg-indigo-200 w-full rounded-full">
                        </div>
                        <div ref="thumb" class="progress-bar-thumb absolute top-1/2 w-3 h-3 bg-white rounded-full">
                        </div>

                        <div v-show="!settings_opened" ref="videoTimeWindow"
                            class="player__time-info -z-1 time-info w-full max-w-45 flex flex-col absolute bottom-5 rounded-t-xl transition-opacity duration-150 opacity-0">
                            <img class="time-info__decoration-img w-full h-20 rounded-t-xl" :src="video_hover_frame"
                                alt="">
                            <span
                                class="time-info__time text-sm text-center text-white bg-[#2d2d2dbe] px-2 py-0.5 rounded-b-xl">{{
                                    video_hover_time }}</span>
                            <svg class="main-functions__search-select absolute -bottom-2.75 left-21 text-[#2d2d2dbe] w-3 h-3"
                                aria-hidden="true">
                                <use href="#select"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="control-btns flex items-center bg-black/40 py-1.5 justify-between px-2.5">
                        <div class="control-btns__left flex items-center">
                            <button @mouseenter="showRestar()" @mouseleave="showRestar()" @click="restartVideo()"
                                class="controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="18" height="18" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#prev"></use>
                                </svg>
                            </button>
                            <button @mouseenter="showPopupMedia('Pause')" @mouseleave="showPopupMedia('Pause')"
                                @click="toggleVideoStatus()" v-show="video_playing"
                                class="controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="18" height="18" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#stop-media"></use>
                                </svg>
                            </button>
                            <button @mouseenter="showPopupMedia('Play')" @mouseleave="showPopupMedia('Play')"
                                @click="toggleVideoStatus()" v-show="!video_playing"
                                class="controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="18" height="18" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#play-media"></use>
                                </svg>
                            </button>
                            <button @mouseenter="nextVideo()" @mouseleave="nextVideo()"
                                class="controls__btn controls__btn--next cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="18" height="18" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#next"></use>
                                </svg>
                            </button>
                            <button @mouseenter="showVolume()" @mouseleave="showVolume()" @click="toggleVolume()"
                                :class="['controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white mr-2', volume_opened ? 'controls__btn--active' : '']">
                                <svg width="20" height="20" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#volume"></use>
                                </svg>
                            </button>
                            <div
                                class="controls__video-section z-3 py-0.5 bg-[#2d2d2d79] border border-transparent rounded-full text-white px-2.5 mr-2">
                                12:17 / 30:24
                            </div>
                            <div
                                class="controls__video-section z-3 py-0.5 bg-[#2d2d2d79] border border-transparent rounded-full text-white px-2.5 cursor-pointer">
                                Поговорим об кристаллических заводах России
                            </div>
                        </div>
                        <div class="controls__btns-right flex items-center">
                            <button @mouseenter="showAi()" @mouseleave="showAi()"
                                class="controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="26" height="26" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#atom"></use>
                                </svg>
                            </button>
                            <button @click="toggleVideoSettings('subtitles', 'subtitles')" @mouseenter="showSubtitles()"
                                @mouseleave="showSubtitles()"
                                class="controls__btn cursor-pointer z-3 p-1 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white">
                                <svg width="26" height="26" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#subtitles"></use>
                                </svg>
                            </button>
                            <button @click="toggleSettings()" @mouseenter="showSettings()" @mouseleave="showSettings()"
                                :class="['controls__btn cursor-pointer hover:bg-[#2d2d2d] z-3 p-1 bg-transparent border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white transition-transform duration-150', settings_opened ? 'controls__btn--active -rotate-z-60' : '']">
                                <svg width="24" height="24" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#settings"></use>
                                </svg>
                            </button>
                            <button @mouseenter="showPopupScreen()" @mouseleave="showPopupScreen()"
                                @click="toggleFullScreen()"
                                :class="['controls__btn controls__btn--mode cursor-pointer -1or-pointer z-3 p-0.5 bg-transparent hover:bg-[#2d2d2d] border border-transparent flex justify-center items-center w-9 h-9 rounded-full text-white', { 'to-default': video_opened }]">
                                <svg width="24" height="24" class="controls-btn__icon flex items-center justify-center">
                                    <use href="#full-mode"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    :class="['player__next-video next-video w-full max-w-60 bg-[#2d2d2dbe] flex flex-col absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_next ? 'menu-opened' : 'menu-closed']">
                    <div class="next-video__textcontent flex items-center justify-between mb-1">
                        <span class="next-video__title text-white mb-0.5">Следующее видео</span>
                        <span
                            class="next-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Ctrl
                            + N</span>

                    </div>
                    <img class="next-video__img w-full h-20 rounded-xl" src="../../../images/themes/glasmorphism.jpg"
                        alt="">
                </div>
                <div
                    :class="['player__restart-video restart-popup w-full max-w-50 bg-[#2d2d2dbe] flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_restart ? 'menu-opened' : 'menu-closed']">
                    <span class="restart-video__title text-white">Повторить видео</span>
                    <span
                        class="restart-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Ctrl
                        + R</span>
                </div>
                <div
                    :class="['player__pause-video pause-popup w-full max-w-24 bg-[#2d2d2dbe] flex items-center justify-between absolute bottom-16 left-21 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_volume && !volume_opened ? 'menu-opened' : 'menu-closed']">
                    <span class="pause-video__title text-white">Громкость</span>
                </div>
                <div
                    :class="['player__pause-video pause-popup w-full max-w-30 bg-[#2d2d2dbe] flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_pause ? 'menu-opened' : 'menu-closed']">
                    <span class="pause-video__title text-white">Пауза</span>
                    <span
                        class="pause-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Space</span>
                </div>
                <div
                    :class="['player__continue-video continue-popup w-full max-w-42 bg-[#2d2d2dbe] flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_continue ? 'menu-opened' : 'menu-closed']">
                    <span class="continue-video__title text-white">Продолжить</span>
                    <span
                        class="continue-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Space</span>
                </div>
                <div
                    :class="['player__volume volume w-full max-w-42 bg-[#2d2d2d] flex items-center justify-between absolute bottom-12 left-12 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150 z-3', volume_opened ? 'menu-opened' : 'menu-closed']">
                    <span class="volume__max-count text-xs text-white">0</span>
                    <div class="volume__setting w-full h-1 bg-[#5b5b5bbe] mx-1 rounded-full relative cursor-pointer">
                        <div
                            class="volume__slider w-1/2 bg-white h-1 rounded-full absolute top-1/2 left-0 -translate-y-1/2">
                        </div>
                    </div>
                    <span class="volume__max-count text-xs text-white">100</span>

                </div>
                <div
                    :class="['player__subtitles-video bg-[radial-gradient(circle_at_top,#331507,#332b06,#0b2a12,#0a1c33,#1a0b2e,#2b0a1f)] subtitles-popup w-full max-w-42 bg-[#2d2d2dbe] right-2 flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_ai ? 'menu-opened' : 'menu-closed']">
                    <span class="subtitles-video__title text-white">ИИ-помошник</span>
                    <span
                        class="subtitles-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md"><i>Beta</i></span>
                </div>
                <div
                    :class="['player__subtitles-video subtitles-popup w-full max-w-46 bg-[#2d2d2dbe] right-2 flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_subtitles ? 'menu-opened' : 'menu-closed']">
                    <span class="subtitles-video__title text-white">Субтитры</span>
                    <span
                        class="subtitles-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Ctrl
                        + Shift + S</span>
                </div>
                <div
                    :class="['player__settings-video settings-popup w-full max-w-36 bg-[#2d2d2dbe] right-2 flex items-center justify-between absolute bottom-16 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_settings && !settings_opened ? 'menu-opened' : 'menu-closed']">
                    <span class="settings-video__title text-white">Настройки</span>
                    <span
                        class="settings-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Ctrl
                        + S</span>
                </div>
                <div ref="settings"
                    :class="['player__settings settings w-full max-w-90 p-1 bg-[#2d2d2dbe] right-2 flex items-center justify-between absolute bottom-16  rounded-xl transition-opacity duration-150 overflow-hidden', settings_opened ? 'menu-opened' : 'menu-closed']">
                    <Transition name="settings-left">
                        <ul v-show="settings_options_opened === 'default'" class="settings__list flex flex-col w-full">
                            <li class="settings__item w-full">
                                <button @click="toggleSettingsMenu('quality')"
                                    class="settings__btn justify-between flex w-full px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] cursor-pointer ">
                                    <div class="settings__btn-left flex items-center gap-3">
                                        <svg width="20" height="20"
                                            class="controls-btn__icon flex items-center justify-center text-white">
                                            <use href="#filter"></use>
                                        </svg>
                                        <span class="settings__btn-text text-white">Качество видео</span>
                                    </div>
                                    <span
                                        class="settings__btn-info text-xs text-[#c6c6c6] py-0.5 px-1 border border-[#c6c6c6] rounded-md">{{
                                            video_settings[0] }}р</span>
                                </button>
                            </li>
                            <li class="settings__item w-full">
                                <button @click="toggleSettingsMenu('speed')"
                                    class="settings__btn justify-between flex w-full px-1.5 py-1.5 items-center gap-3 rounded-xl hover:bg-[#676767be] cursor-pointer ">
                                    <div class="settings__btn-left flex items-center gap-3">
                                        <svg width="20" height="20"
                                            class="controls-btn__icon flex items-center justify-center text-white">
                                            <use href="#speedometer"></use>
                                        </svg>
                                        <span class="settings__btn-text text-white">Скорость воспроизведения</span>
                                    </div>
                                    <span class="settings__btn-info text-xs text-[#c6c6c6] py-0.5 px-1">{{
                                        video_settings[1]
                                    }}x</span>

                                </button>
                            </li>
                            <li class="settings__item w-full">
                                <button @click="toggleSettingsMenu('subtitles')"
                                    class="settings__btn justify-between flex w-full px-1.5 py-1.5 items-center gap-3 rounded-xl hover:bg-[#676767be] cursor-pointer ">
                                    <div class="settings__btn-left flex items-center gap-3">
                                        <svg width="20" height="20"
                                            class="controls-btn__icon flex items-center justify-center text-white">
                                            <use href="#subtitles"></use>
                                        </svg>
                                        <span class="text-white">Cубтитры</span>
                                    </div>
                                    <span class="settings__btn-info text-xs text-[#c6c6c6] py-0.5 px-1">{{
                                        video_settings[2][1][1] }}</span>

                                </button>
                            </li>
                            <li class="settings__item w-full">
                                <button @click="toggleVideoSettings('lighting', '')"
                                    class="settings__btn settings__btn--lighting justify-between flex w-full px-1.5 py-1.5 items-center gap-3 rounded-xl hover:bg-[#676767be] cursor-pointer overflow-hidden">
                                    <div class="settings__btn-left flex items-center gap-3 overflow-hidden">
                                        <svg width="20" height="20"
                                            class="controls-btn__icon flex items-center justify-center text-white">
                                            <use href="#lamp"></use>
                                        </svg>
                                        <span class="settings__btn-text text-white">Проффесиональное освещение</span>
                                    </div>
                                    <span
                                        class="settings__btn-info settings__btn-info--lighting text-xs text-[#c6c6c6] py-0.5 px-1 rounded-md">{{
                                            video_settings[3] ? 'Вкл.' : 'Выкл.' }}</span>

                                </button>
                            </li>
                            <li class="settings__item w-full">
                                <button @click="retallVideo()"
                                    class="settings__btn justify-between flex w-full px-1.5 py-1.5 items-center gap-3 rounded-xl hover:bg-[#676767be] cursor-pointer ">
                                    <div class="settings__btn-left flex items-center gap-3">
                                        <svg width="20" height="20"
                                            class="controls-btn__icon flex items-center justify-center text-white">
                                            <use href="#book"></use>
                                        </svg>
                                        <span class="settings__btn-text text-white">Краткий пересказ</span>
                                    </div>
                                    <span class="settings__btn-info">
                                        <svg width="20" height="20" class="text-[#c6c6c6] -rotate-z-90">
                                            <use href="#open-btn"></use>
                                        </svg>
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </Transition>
                    <Transition name="settings">
                        <div v-show="settings_options_opened === 'speed'"
                            class="settings__video-speed video-speed w-full px-0.75 flex flex-col">
                            <button @click="toggleSettingsMenu('default')"
                                class="video-speed__return-btn w-full flex items-center gap-1 cursor-pointer pb-1 border-b border-[#5b5b5bbe]">
                                <svg width="20" height="20" class="text-[#c6c6c6] rotate-z-90">
                                    <use href="#open-btn"></use>
                                </svg>
                                <span class="text-white">Скорость воспроизведения</span>
                            </button>
                            <ul class="video-speed__list">
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 3)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        3x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 2)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        2x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 1.75)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        1.75x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 1.5)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        1.5x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 1.25)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        1.25x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 1)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        1x (обычная)
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 0.75)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        0.75x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 0.5)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        0.5x
                                    </button>
                                </li>
                                <li class="video-speed__item">
                                    <button @click="toggleVideoSettings('speed', 0.25)"
                                        class="video-speed__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        0.25x
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                    <Transition name="settings">
                        <div v-show="settings_options_opened === 'quality'"
                            class="settings__video-quality video-quality w-full px-0.75 flex flex-col">
                            <button @click="toggleSettingsMenu('default')"
                                class="video-quality__return-btn w-full flex items-center gap-1 cursor-pointer pb-1 border-b border-[#5b5b5bbe]">
                                <svg width="20" height="20" class="text-[#c6c6c6] rotate-z-90">
                                    <use href="#open-btn"></use>
                                </svg>
                                <span class="text-white">Качество видео</span>
                            </button>
                            <ul class="video-quality__list">
                                <li class="video-quality__item">
                                    <button @click="toggleVideoSettings('quality', 2040)"
                                        class="video-quality__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        2040p
                                    </button>
                                </li>
                                <li class="video-quality__item">
                                    <button @click="toggleVideoSettings('quality', 1080)"
                                        class="video-quality__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        1080p
                                    </button>
                                </li>
                                <li class="video-quality__item">
                                    <button @click="toggleVideoSettings('quality', 720)"
                                        class="video-quality__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        720р
                                    </button>
                                </li>
                                <li class="video-quality__item">
                                    <button @click="toggleVideoSettings('quality', 360)"
                                        class="video-quality__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        360p
                                    </button>
                                </li>
                                <li class="video-quality__item">
                                    <button @click="toggleVideoSettings('quality', 240)"
                                        class="video-quality__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        240p
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                    <Transition name="settings">
                        <div v-show="settings_options_opened === 'subtitles'"
                            class="settings__video-subtitles subtitles w-full px-0.75 flex flex-col">
                            <div
                                class="subtitles__top flex items-center justify-between  pb-1 border-b border-[#5b5b5bbe]">
                                <button @click="toggleSettingsMenu('default')"
                                    class="subtitles__return-btn w-full flex items-center gap-1 cursor-pointer">
                                    <svg width="20" height="20" class="text-[#c6c6c6] rotate-z-90">
                                        <use href="#open-btn"></use>
                                    </svg>
                                    <span class="text-white">Субтитры</span>
                                </button>
                                <button @click="toggleSubtitlesSettings('subtitles', 'subtitles')"
                                    class="subtitles__toggle  text-sm text-[#c6c6c6] cursor-pointer">{{
                                        video_settings[2][0]
                                            ? 'Вкл.' : 'Выкл.' }}</button>
                            </div>
                            <div class="subtitles__functions">
                                <button @click="toggleSubtitlesSettings('mod')"
                                    class="subtitles__mod w-full flex items-center justify-between cursor-pointer px-1.5 py-1.5 rounded-xl hover:bg-[#676767be] text-[#c6c6c6] overflow-hidden">
                                    <div class="subtitles__mod-left flex items-center gap-1">
                                        <svg width="20" height="20" class="text-[#c6c6c6] rotate-z-90">
                                            <use href="#settings"></use>
                                        </svg>
                                        <span class="">Режим субтитров</span>
                                    </div>
                                    <span class="subtitles__mod-setting subtitles__mod-setting--mod text-xs">{{
                                        video_settings[2][2] }}</span>
                                </button>
                                <button @click="toggleSettingsMenu('subtitles_language')"
                                    class="subtitles__mod w-full flex items-center justify-between cursor-pointer px-1.5 py-1.5 rounded-xl hover:bg-[#676767be] text-[#c6c6c6]">
                                    <div class="subtitles__mod-left flex items-center gap-1">
                                        <svg width="20" height="20" class="text-[#c6c6c6]">
                                            <use href="#language"></use>
                                        </svg>
                                        <span class="">Переведено</span>
                                    </div>
                                    <span class="subtitles__mod-setting text-xs">{{ video_settings[2][1][1] }}</span>
                                </button>
                            </div>
                        </div>
                    </Transition>
                    <Transition name="settings">
                        <div v-show="settings_options_opened === 'subtitles_language'"
                            class="settings__subtitles-language subtitles-language h-full max-h-80.5 w-full px-0.75 flex flex-col">
                            <button @click="toggleSettingsMenu('default')"
                                class="subtitles-language__return-btn w-full flex items-center gap-1 cursor-pointer pb-1 border-b border-[#5b5b5bbe]">
                                <svg width="20" height="20" class="text-[#c6c6c6] rotate-z-90">
                                    <use href="#open-btn"></use>
                                </svg>
                                <span class="text-white">Язык субтитров</span>
                            </button>
                            <div
                                class="subtitles-language__search language-search flex items-center gap-1 px-2 py-1 border border-[#c6c6c6] rounded-xl">
                                <svg width="22" height="22" class="language-search__icon text-[#c6c6c6] ">
                                    <use href="#search"></use>
                                </svg>
                                <input class="language-search__input text-[#c6c6c6] text-base outline-none" type="text"
                                    placeholder="Поиск по языкам">
                            </div>
                            <ul class="subtitles-language__list scrollbar-hidden overflow-y-auto">
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['ru', 'рус'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        Русский
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['en', 'англ.'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        English
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['de', 'нем.'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        Deutch
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['fr', 'франц.'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        Français
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['es', 'испанск.'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        Español
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button @click="toggleSubtitlesSettings('language', ['it', 'итальян.'])"
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        Italiano
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        中文
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        한국어
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        العربية
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        日本語
                                    </button>
                                </li>
                                <li class="subtitles-language__item">
                                    <button
                                        class="subtitles-language__option speed-option px-1.5 py-1.5 items-center rounded-xl hover:bg-[#676767be] text-[#c6c6c6] cursor-pointer w-full">
                                        O‘zbek tili
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
                <div
                    :class="['player__screen-video screen-popup w-full bg-[#2d2d2dbe] flex items-center justify-between absolute bottom-16 right-2 px-2 pb-2 rounded-xl pt-1 transition-opacity duration-150', show_screen ? 'menu-opened' : 'menu-closed', video_opened ? 'max-w-36' : 'max-w-42']">
                    <span class="screen-video__title text-white">{{ video_opened ? 'Свернуть' : 'Весь экран' }}</span>
                    <span
                        class="screen-video__title text-[#c6c6c6] text-xs border border-[#c6c6c6] p-px rounded-md">Ctrl
                        +
                        F</span>
                </div>

                <div v-show="video_settings[2][0]" :class="video_settings[2][2]"
                    class="player__subtitles-text z-2 subtitles-text p-2 py-0.5 rounded-lg max-w-[60%] absolute bottom-10 left-1/2 -translate-x-1/2">
                    <p :style="{ fontSize: video_settings[2][3] + 'px' }"
                        class="subtitles-text__content text-xl  leading-tight">Это пример текста в субтитрах.
                        Надеюсь, что в будущем это будет не пример, а настоящий текст...</p>
                    <div :class="video_settings[2][2]"
                        class="subtitles-text__btns flex items-center gap-0.5 absolute right-0 px-1 rounded-lg -top-1 z-100 opacity-0">
                        <button @click="toggleSubtitlesSettings('size', '+')"
                            class="subtitles-text__btn text-2xl w-6 h-6 rounded-full hover:opacity-80 flex items-center justify-center cursor-pointer"><span>+</span></button>
                        <button @click="toggleSubtitlesSettings('size', '-')"
                            class="subtitles-text__btn  text-2xl w-6 h-6 rounded-full hover:opacity-80 flex items-center justify-center cursor-pointer"><span>-</span></button>
                        <button @click="toggleSubtitlesSettings('mod')"
                            class="subtitles-text__btn w-6 h-6 rounded-full hover:opacity-80 flex items-center justify-center cursor-pointer">
                            <svg class="" width="18" height="18">
                                <use href="#reload"></use>
                            </svg>
                        </button>
                    </div>


                </div>
            </div>
            <Transition name="opacity">
                <div v-show="retelling_opened"
                    class="video-retelling flex flex-col w-full max-w-120.5 border border-[#c6c6c6] py-2 rounded-xl max-h-160 overflow-y-auto scrollbar-hidden">
                    <div class="video-retelling__top flex justify-between items-center px-2">
                        <Transition name="opacity">
                            <h3 v-if="!retalling_more_opened" class="video-retelling__title text-xl font-medium mb-1">
                                Пересказ видео</h3>
                        </Transition>
                        <Transition name="opacity">
                            <button @click="retallMoreForVideo()" v-show="retalling_more_opened"
                                class="video-retelling__back flex items-center gap-2 text-black py-1 px-2.5 border border-[#c6c6c6] bg-[#efefef] active:bg-[#5353533f] rounded-full transition-colors duration-100 cursor-pointer">
                                <svg class="video-retelling__back-icon rotate-180" aria-hidden="true" width="21"
                                    height="21">
                                    <use href="#arrow-right"></use>
                                </svg>
                                <span class="video-retelling__text">Назад</span>
                            </button>
                        </Transition>
                        <button @click="retallVideo()"
                            class="video-retelling__close p-1 rounded-full transition-colors duration-100 border border-transparent hover:bg-[#efefef] active:border-[#c6c6c6] cursor-pointer">
                            <svg width="32" height="32" color="black">
                                <use href="#close"></use>
                            </svg>
                        </button>
                    </div>
                    <Transition name="opacity">
                        <ul v-if="!retalling_more_opened" class="video-retelling__list retelling-list">
                            <li class="retelling-list__item">
                                <div class="retelling-list__time-wrapper relative px-2 mb-1">
                                    <span
                                        class="retelling-list__time  relative px-2 py-0.5 bg-indigo-100 hover:bg-indigo-50 cursor-pointer rounded-full z-2">0:05-12:21</span>
                                </div>
                                <div @click="retallMoreForVideo()"
                                    class="retelling-list__textcontent px-2  retelling-text hover:bg-[#efefef] cursor-pointer">
                                    <span class="retelling-text__title text-base font-medium">Знакомство с
                                        преподавателями:
                                    </span>
                                    <span class="retelling-text__description text-[#6E6E6E]">В данном фрагменте видео,
                                        большая
                                        часть видео говорит о том, какой путь прошли преподаватели данного курса, чтоба
                                        так
                                        разговаривать с нами и быть учениками. Они будут вас сопроваждать еще очень
                                        долго!</span>
                                </div>
                            </li>
                            <li class="retelling-list__item">
                                <div class="retelling-list__time-wrapper relative px-2 mb-1">
                                    <span
                                        class="retelling-list__time  relative px-2 py-0.5 bg-indigo-100 hover:bg-indigo-50 cursor-pointer rounded-full z-2">12:21-30:24</span>
                                </div>
                                <div @click="retallMoreForVideo()"
                                    class="retelling-list__textcontent px-2  retelling-text hover:bg-[#efefef] cursor-pointer">
                                    <span class="retelling-text__title text-base font-medium">О чем будет идти речь:
                                    </span>
                                    <span class="retelling-text__description text-[#6E6E6E]">Если обобщить все сказаное
                                        на
                                        этом
                                        промежутке, то можно сказать что курс изучает общую программу по следующим
                                        отравлям:
                                        лабораторное исследование, анализ, строение, оборудывание, и многое
                                        другое...</span>
                                </div>
                            </li>
                        </ul>
                    </Transition>
                    <Transition name="opacity">
                        <div v-if="retalling_more_opened" class="video-retelling__more-info px-2">
                            <h5
                                class="video-retelling__more-title retelling-text__title text-xl mb-0.5 border-b border-[#c6c6c6] font-medium">
                                Знакомство с преподавателями (0:05-12:21)</h5>
                            <div class="video-retelling__more-content">
                                <p class="text-[#6E6E6E]">Первый модуль этого курса будут вести следующие преподаватели
                                    —
                                    признанные
                                    мастера кристаллической промышленности, чьи имена стали синонимами прорыва в науке о
                                    твёрдых телах и технологиях выращивания кристаллов.

                                    Профессор Аркадий Львович Хрусталёв — один из столпов современной кристаллохимии.
                                    Его
                                    карьера началась в середине восьмидесятых, когда он, будучи совсем молодым
                                    аспирантом,
                                    смог впервые в мире стабилизировать метастабильную фазу кварца при комнатной
                                    температуре, используя метод импульсного лазерного отжига. Этот прорыв открыл путь к
                                    созданию сверхчувствительных датчиков давления и температуры, которые сегодня
                                    применяются в аэрокосмической отрасли. В девяностые годы Хрусталёв возглавил
                                    лабораторию, где была разработана уникальная методика «послойного допирования» —
                                    технология, позволяющая вводить примеси в кристалл строго по заданным координатам,
                                    создавая встроенные оптические волноводы прямо в процессе роста. За эти работы он
                                    был
                                    удостоен Государственной премии, а его монография «Кристаллы как программируемые
                                    среды»
                                    стала настольной книгой для инженеров отрасли. На лекциях Аркадий Львович славится
                                    тем,
                                    что любую сложную формулу объясняет через аналогии из повседневной жизни: например,
                                    рост
                                    кристалла он сравнивает с выпеканием слоёного теста, где каждый слой должен быть
                                    идеально раскатан и уложен, иначе структура разрушится.</p>
                            </div>

                        </div>
                    </Transition>
                    <div class="video-retelling__bottom flex items-center gap-1 px-2 mt-auto">
                        <button
                            class="video-retelling__close p-1 rounded-full transition-colors duration-100 border bg-[#efefef] border-[#c6c6c6] hover:bg-[#5353533f] cursor-pointer">
                            <svg width="24" height="24" color="black">
                                <use href="#like"></use>
                            </svg>
                        </button>
                        <button
                            class="video-retelling__close p-1 rounded-full transition-colors duration-100 border bg-[#efefef] border-[#c6c6c6] hover:bg-[#5353533f] cursor-pointer">
                            <svg width="24" height="24" color="black">
                                <use href="#dislike"></use>
                            </svg>
                        </button>
                        <button title="Озвучить (в разработке)"
                            class="video-retelling__close p-1 rounded-full transition-colors duration-100 text-black hover:bg-[#5353533f] cursor-pointer ml-auto">
                            <svg width="21" height="21">
                                <use href="#volume_stroke"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
        <div class="player__other-content grid grid-cols-[1fr_360px] gap-0.5">
            <div class="player__title-block video-info px-4 py-2">
                <h1 class="video-info__title text-xl font-medium mb-1">Промышленное кристалловедение. Начало курса по
                    кристалловедению от
                    экспертов. Урок 1</h1>
                <div class="video__functions flex items-center justify-between w-full mb-2">
                    <div class="video__chanel-info flex items-center gap-2 cursor-pointer">
                        <img src="../../../images/themes/amethysts.jpg" class="w-11 h-11 rounded-full relative z-2"
                            alt="Иконка канала">
                        <div class="video__chanel-textcontent flex flex-col mr-2">
                            <h3 class="video__author-name font-medium leading-tight">Кристаллический лазерный завод</h3>
                            <span class="video__subscribers-count leading-[1.15] text-sm">125 тыс. подписчиков</span>
                        </div>
                        <SubscribeBtn type="chat"></SubscribeBtn>
                    </div>
                    <ul class="video__functions-list relative flex gap-1.5">
                        <li class="video__function-item">
                            <div
                                class="video__function-likes flex items-center border-[#c6c6c6] bg-[#efefef] border  rounded-full">
                                <button @click="likeVideo($event, 'id')"
                                    class="video__function-btn relative px-3 py-2 pr-1 rounded-l-full bg-[#efefef]  cursor-pointer hover:bg-[#5353533f] flex gap-1.5">
                                    <svg width="24" height="24">
                                        <use href="#like"></use>
                                    </svg>
                                    <span>25 тыс.</span>
                                </button>
                                <span class="text-2xl mb-1.5 text-[#6E6E6E]">|</span>
                                <button
                                    class="video__function-btn pl-2 py-2 pr-3 rounded-r-full bg-[#efefef]  cursor-pointer hover:bg-[#5353533f] flex gap-1.5">
                                    <svg class="" width="24" height="24">
                                        <use href="#dislike"></use>
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li class="video__function-item">
                            <button @click="openShare()"
                                class="video__function-btn px-3 py-2 rounded-full border-[#c6c6c6] bg-[#efefef] border cursor-pointer hover:bg-[#5353533f] flex gap-1.5">
                                <svg width="24" height="24">
                                    <use href="#share"></use>
                                </svg>
                                <span>Поделиться</span>
                            </button>
                        </li>
                        <li class="video__function-item">
                            <button @click="openSave()"
                                class="video__function-btn px-3 py-2 rounded-full border-[#c6c6c6] bg-[#efefef] border cursor-pointer hover:bg-[#5353533f] flex gap-1.5">
                                <svg width="24" height="24">
                                    <use href="#save"></use>
                                </svg>
                                <span>Сохранить</span>
                            </button>
                        </li>
                        <li class="video__function-item">
                            <button @click="toggleActions()"
                                class="video__function-btn px-2 py-2 rounded-full border-[#c6c6c6] bg-[#efefef] border cursor-pointer hover:bg-[#5353533f] flex gap-1.5">
                                <svg width="24" height="24">
                                    <use href="#open"></use>
                                </svg>
                            </button>
                        </li>
                        <Transition name="functions">
                            <div v-if="actions_opened" class="absolute right-0 top-0">
                                <MoreActionsModal @open-info="openInfoPanel" @open-report="openReport"
                                    @open-donate="openDonate" />
                            </div>
                        </Transition>
                    </ul>
                </div>

                <div
                    :class="['video-info  p-1.5 border border-[#c6c6c6] bg-[#efefef] rounded-xl mb-1', { 'hover:bg-blue-50': !info_opened }]">
                    <div class="video-info__main w-full flex items-center justify-between">
                        <div class="video-info__main-top flex justify-between px-2">
                            <div class="video-info__specifications flex gap-1 items-center">
                                <span class="z-2 text-sm">183954 просмотров</span>
                                <svg class="z-2" width="4" height="4">
                                    <use href="#point"></use>
                                </svg>
                                <span class="z-2 text-sm">4.9 рейтинг</span>
                                <svg class="z-2" width="4" height="4">
                                    <use href="#point"></use>
                                </svg>
                                <span class="z-2 text-sm">2 нед. назад</span>
                            </div>
                        </div>
                        <button @click="toggleInfo()"
                            class="video-info__toggle-btn px-2 rounded-full bg-transparent hover:bg-[#5353532f] active:bg-[#4343433f] cursor-pointer">{{
                                info_opened ? 'Скрыть' : 'Развернуть' }}</button>
                    </div>
                    <p class="video-info__description px-3 cursor-default leading-5 mb-2">Промышленное кристалловедение
                        изучает рост и свойства технических
                        кристаллов, а также управление их структурой. Курс охватывает принципы формирования решёток и
                        методы контроля качества материалов. Кристаллы влияют на прочность, проводимость и стабильность
                        продукции — это учитывают при разработке технологий для разных отраслей...</p>
                    <Transition name="menu">
                        <div v-if="info_opened" class="video-info__wrapper">
                            <div
                                class="video-info__other-videos flex flex-nowrap overflow-x-auto gap-1 px-1 scrollbar-hidden">
                                <div
                                    class="video-info__other-video flex gap-1 p-1.5 bg-[#9696963f] hover:bg-[#5353533f] rounded-xl w-94 cursor-pointer">
                                    <img class="w-16 h-16 rounded-xl" src="../../../images/themes/blue-black.jpg"
                                        alt="">
                                    <div class="video-info__other-video-textcontent flex flex-col">
                                        <h3 class="video-info__other-video-title font-medium">Статья про лазерные
                                            турели.
                                        </h3>
                                        <div class="video-info__specifications flex gap-1 items-center">
                                            <span class="z-2 text-sm">18954 просмотров</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">4.2 рейтинг</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">1 мес. назад</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="video-info__other-video flex gap-1 p-1.5 bg-[#9696963f] hover:bg-[#5353533f] rounded-xl w-94 cursor-pointer">
                                    <img class="w-16 h-16 rounded-xl" src="../../../images/themes/blue-black.jpg"
                                        alt="">
                                    <div class="video-info__other-video-textcontent flex flex-col">
                                        <h3 class="video-info__other-video-title font-medium">Статья про лазерные
                                            турели.
                                        </h3>
                                        <div class="video-info__specifications flex gap-1 items-center">
                                            <span class="z-2 text-sm">18954 просмотров</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">4.2 рейтинг</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">1 мес. назад</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="video-info__other-video flex gap-1 p-1.5 bg-[#9696963f] hover:bg-[#5353533f] rounded-xl w-94 cursor-pointer">
                                    <img class="w-16 h-16 rounded-xl" src="../../../images/themes/blue-black.jpg"
                                        alt="">
                                    <div class="video-info__other-video-textcontent flex flex-col">
                                        <h3 class="video-info__other-video-title font-medium">Статья про лазерные
                                            турели.
                                        </h3>
                                        <div class="video-info__specifications flex gap-1 items-center">
                                            <span class="z-2 text-sm">18954 просмотров</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">4.2 рейтинг</span>
                                            <svg class="z-2" width="3" height="3">
                                                <use href="#point"></use>
                                            </svg>
                                            <span class="z-2 text-sm">1 мес. назад</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="video-info__author-from px-2">
                                <h4 class="text-lg font-medium">Смотрите также</h4>
                                <ul class=" px-2">
                                    <li class="flex redactor-item gap-1 items-center">
                                        <p class="font-medim">🔭 Видео о работе оборудывания</p>
                                        <a class="leading-tight text-[#3B82F6]" href="https://radar/watch?v=VIDEO_ID_1"
                                            target="_blank">
                                            https://radar/watch?hwdfadfkds
                                        </a>
                                    </li>
                                    <li class="flex redactor-item gap-1 items-center">
                                        <p class="font-medim">⛏️ Преимущества зискуственных кристаллов</p>
                                        <a class="leading-tight text-[#3B82F6]" href="https://radar/watch?v=VIDEO_ID_1"
                                            target="_blank">
                                            https://radar/watch?hwdfadfkds=title="cristall-gsads"
                                        </a>
                                    </li>
                                    <li class="flex redactor-item gap-1 items-center">
                                        <p class="font-medim">💵 Финансовые задачи (примеры)</p>
                                        <a class="leading-tight text-[#3B82F6]" href="https://radar/watch?v=VIDEO_ID_1"
                                            target="_blank">
                                            https://radar/watch?v=VIDEO_ID_1
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="video__advertisement advertisement px-2 mb-5">
                                <div class="advertisement__title-block relative mb-1">
                                    <h5
                                        class="advertisement__title text-lg font-medium bg-[#efefef] z-2 relative inline pr-1">
                                        Покупайте современное оборудывание от
                                        CRISTALLHOUSE</h5>
                                </div>
                                <ul class="advertisement__list">
                                    <li
                                        class="advertisement__item flex gap-3 p-3 rounded-xl bg-[#9696963f] hover:bg-[#5353533f] cursor-pointer">
                                        <img src="../../../images/themes/amethysts.jpg"
                                            class="w-16 h-16 rounded-xl relative z-2" alt="Иконка канала">
                                        <div class="advertisement__item-info">
                                            <h5 class="advertisement__item-title font-medium leading-tight">
                                                CRISTALLHOUSE
                                            </h5>
                                            <p class="advertisement__item-description leading-5">Оффициальный поставщик
                                                горного
                                                оборудывания по всей России. От кирок до экскалаторов. Скидки до 25%.
                                                Кредиты до
                                                20% годовых. Программа лояльности!</p>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                            <div class="video__contacts contacts flex items-center justify-between">
                                <div class="contacts__left flex gap-1">
                                    <a class="flex items-center px-3 py-0.5 gap-1 rounded-full bg-[#9696963f] hover:bg-[#5353533f]"
                                        href="">
                                        <svg class="z-2" width="20" height="20">
                                            <use href="#tik_tok"></use>
                                        </svg>
                                        <span>tiktok</span>
                                    </a>
                                    <a class="flex items-center px-3 py-0.5 gap-1 rounded-full bg-[#9696963f] hover:bg-[#5353533f]"
                                        href="">
                                        <svg class="z-2" width="20" height="20">
                                            <use href="#ozon"></use>
                                        </svg>
                                        <span>ozon</span>
                                    </a>
                                    <a class="flex items-center px-3 py-0.5 gap-1 rounded-full bg-[#9696963f] hover:bg-[#5353533f]"
                                        href="">
                                        <svg class="z-2" width="20" height="20">
                                            <use href="#dzen"></use>
                                        </svg>
                                        <span>dzen</span>
                                    </a>
                                </div>

                                <a class="contacts__similar-videos px-3 py-0.5 gap-1 rounded-full bg-black text-white active:opacity-75"
                                    href="#">Похожие видео</a>
                            </div>
                        </div>
                    </Transition>
                </div>
                <div class="comments flex items-center justify-between px-2 mb-2">
                    <div class="comments__functions flex items-center gap-1 relative">
                        <h5 class="comments__title text-xl font-medium">57 комментариев</h5>
                        <button @click="toggleSort()"
                            :class="['comments__sort flex items-center gap-0.5 text-[#262626] cursor-pointer border px-1 rounded-md', sort_opened ? 'border-black' : 'border-transparent']">
                            <svg class="comments__sort-icon mt-1" width="24" height="24">
                                <use href="#classik-list"></use>
                            </svg>
                            <span class="font-medium">Сортировать: </span>
                            <span class="text-[#6E6E6E] pl-px"> {{ sort_value[1] }}</span>
                        </button>
                        <Transition name="menu">
                            <div v-show="sort_opened"
                                class="comments__sort-panel sort-panel rounded-xl bg-white shadow-md border border-[#c6c6c6]/30 overflow-hidden absolute -bottom-50 left-0">
                                <!-- ВНИМАНИЕ!!! НА ЭТИ КНОПКИ НУЖНО БУДЕТ ПОДКЛЮЧИТЬ RIPPLE-BTN -->
                                <button @click="sortComments(['popular', 'популярные'])"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Популярные</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Показать
                                        комментрарии, которые многим понравились</span>
                                </button>
                                <button @click="sortComments(['new', 'новые'])"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Новые</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Показать
                                        последние
                                        коментарии</span>
                                </button>
                                <button @click="sortComments(['important', 'полезные'])"
                                    class="sort-panel__btn px-2 py-1.5 flex flex-col w-full hover:bg-[#9696963f] active:bg-[#5353533f] cursor-pointer">
                                    <span class="sort-panel__btn-title font-medium leading-5">Полезные</span>
                                    <span class="sort-panel__btn-description leading-5 text-[#6E6E6E]">Показать полезные
                                        коментарии по мнению алгоритмов</span>
                                </button>


                            </div>
                        </Transition>
                    </div>
                    <ul class="comments__raiting flex items-center">
                        <li class="comments__raiting-item">
                            <h5 class="comments__raiting-count comments__title text-xl font-medium mr-1">4.9</h5>
                        </li>
                        <li class="comments__raiting-item">
                            <button @mousemove="fillRaiting(1)" @mouseleave="fillRaiting('Unhovered')"
                                class="comments__raiting-btn cursor-pointer text-black group hover:text-amber-300">
                                <svg class="comments__raiting-icon mt-1 w-6.5 h-6.5">
                                    <use href="#star" :class="[
                                        'group-hover:fill-amber-300 transition-colors',
                                        {
                                            'fill-transparent': !fill_raiting[0],
                                            'fill-amber-300 text-amber-300': fill_raiting[0]
                                        }
                                    ]"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="comments__raiting-item">
                            <button @mousemove="fillRaiting(2)" @mouseleave="fillRaiting('Unhovered')"
                                class="comments__raiting-btn cursor-pointer text-black group hover:text-amber-300">
                                <svg class="comments__raiting-icon mt-1 w-6.5 h-6.5">
                                    <use href="#star" :class="[
                                        'group-hover:fill-amber-300 transition-colors',
                                        {
                                            'fill-transparent': !fill_raiting[1],
                                            'fill-amber-300 text-amber-300': fill_raiting[1]
                                        }
                                    ]"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="comments__raiting-item">
                            <button @mousemove="fillRaiting(3)" @mouseleave="fillRaiting('Unhovered')"
                                class="comments__raiting-btn cursor-pointer text-black group hover:text-amber-300">
                                <svg class="comments__raiting-icon mt-1 w-6.5 h-6.5">
                                    <use href="#star" :class="[
                                        'group-hover:fill-amber-300 transition-colors',
                                        {
                                            'fill-transparent': !fill_raiting[2],
                                            'fill-amber-300 text-amber-300': fill_raiting[2]
                                        }
                                    ]"></use>
                                </svg>
                            </button>
                        </li>

                        <li class="comments__raiting-item">
                            <button @mousemove="fillRaiting(4)" @mouseleave="fillRaiting('Unhovered')"
                                class="comments__raiting-btn cursor-pointer text-black group hover:text-amber-300">
                                <svg class="comments__raiting-icon mt-1 w-6.5 h-6.5">
                                    <use href="#star" :class="[
                                        'group-hover:fill-amber-300 transition-colors',
                                        {
                                            'fill-transparent': !fill_raiting[3],
                                            'fill-amber-300 text-amber-300': fill_raiting[3]
                                        }
                                    ]"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="comments__raiting-item">
                            <button @mousemove="fillRaiting(5)" @mouseleave="fillRaiting('Unhovered')"
                                class="comments__raiting-btn cursor-pointer text-black group hover:text-amber-300">
                                <svg class="comments__raiting-icon mt-1 w-6.5 h-6.5">
                                    <use href="#star" :class="[
                                        'group-hover:fill-amber-300 transition-colors',
                                        {
                                            'fill-transparent': !fill_raiting[4],
                                            'fill-amber-300 text-amber-300': fill_raiting[4]
                                        }
                                    ]"></use>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
                <!-- <ul class="comments__list flex flex-col rounded-t-xl comments-list w-full h-full p-4 px-2">
                    <li class="comments__item">
                        <Message></Message>
                    </li>
                    <li class="comments__item self-end">
                        <SecondMsg></SecondMsg>
                    </li>
                    <li class="comments__item">
                        <Message></Message>
                    </li>
                    <li class="comments__item self-end">
                        <SecondMsg></SecondMsg>
                    </li>
                    <li class="comments__item">
                        <Message></Message>
                    </li>
                    <li class="comments__item self-end">
                        <SecondMsg></SecondMsg>
                    </li>
                     <ConversationPanel></ConversationPanel>
                </ul> -->
            </div>
            <ul class="flex flex-col gap-1.5 pt-3 pr-2">
                <li class="w-full flex justify-between items-center pr-2">
                    <span class="text-xl font-medium mb-1 leading-none">Может заинтересовать</span>
                    <button title="Подробности" class="p-0.5 rounded-full hover:bg-[#e5e5e5] cursor-pointer">
                        <svg width="24" height="24">
                            <use href="#open-btn"></use>
                        </svg>
                    </button>
                </li>

                <PlayerCard title="Промышленное кристалловедение. Начало курса по кристалловедению от экспертов. Урок 1"
                    name="Кристаллический лазерный завод" views="1.6 млн" raiting="4.8 рейтинг" date="2 месяца назад"
                    time="15:42" author_img="../../../../images/themes/amethysts.jpg"
                    image="../../../../images/themes/glasmorphism.jpg"></PlayerCard>
                <PlayerCard title="Промышленное кристалловедение. Начало курса по кристалловедению от экспертов. Урок 1"
                    name="Кристаллический лазерный завод" views="1.6 млн" raiting="4.8 рейтинг" date="2 месяца назад"
                    time="15:42" author_img="../../../../images/themes/amethysts.jpg"
                    image="../../../../images/themes/glasmorphism.jpg"></PlayerCard>
                <PlayerCard title="Промышленное кристалловедение. Начало курса по кристалловедению от экспертов. Урок 1"
                    name="Кристаллический лазерный завод" views="1.6 млн" raiting="4.8 рейтинг" date="2 месяца назад"
                    time="15:42" author_img="../../../../images/themes/amethysts.jpg"
                    image="../../../../images/themes/glasmorphism.jpg"></PlayerCard>
                <PlayerCard title="Промышленное кристалловедение. Начало курса по кристалловедению от экспертов. Урок 1"
                    name="Кристаллический лазерный завод" views="1.6 млн" raiting="4.8 рейтинг" date="2 месяца назад"
                    time="15:42" author_img="../../../../images/themes/amethysts.jpg"
                    image="../../../../images/themes/glasmorphism.jpg"></PlayerCard>
            </ul>
        </div>
    </div>

    <Transition name="opacity">
        <ChanelPanel v-if="chanel_info_opened" @close-info="closeInfoPanel()"></ChanelPanel>
    </Transition>
    <Transition name="opacity">
        <Report v-if="report_opened" @close-report="closeReport()"></Report>
    </Transition>
    <Transition name="opacity">
        <Donate v-if="donate_opened" @close-donate="closeDonate()"></Donate>
    </Transition>
    <Transition name="opacity">
        <Save @close-save="closeSave()" v-if="save_opened"></Save>
    </Transition>
    <Transition name="opacity">
        <Share @close-share="closeShare()" v-if="share_opened"></Share>
    </Transition>
    <Transition name="opacity">
        <div v-if="dimining_active" class="fixed inset-0 bg-black/50 z-8 blackout"></div>
    </Transition>
</template>
<script>
import { useBurst } from '../../composables/useBurst.js';
import Message from '../common/chat/Message.vue';
import SubscribeBtn from '../ui/buttons/SubscribeBtn.vue';
import PlayerCard from '../common/player/PlayerCard.vue';
import ConversationPanel from '../services/chat/ConversationPanel.vue';
import MoreActionsModal from '../services/functions/MoreActionsModal.vue';
import ChanelPanel from '../services/functions/ChanelPanel.vue';
import Donate from '../services/functions/Donate.vue';
import Report from '../services/functions/Report.vue';
import Save from '../services/functions/Save.vue';
import Share from '../services/functions/Share.vue';



export default {
    name: "Player",

    data() {
        return {
            video_playing: true,
            video_settings: [720, 1, [false, ['ru', 'рус'], 'mod-1', 20], false], // 1 - качество, 2 - скорость, 3 - субтитры, 4 - проффесиональное освещение
            mod_index: 0,
            video_modes: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5', 'mod-6'],
            video_liked: false,
            info_opened: false,
            sort_opened: false,
            sort_value: ['popular', 'популярные'],
            volume_opened: false,
            retelling_opened: false,
            retalling_more_opened: false,
            settings_opened: false,
            settings_options_opened: 'default',
            video_hover_time: 0,
            // sprite = response.data.sprite
            // qualities = response.data.qualities
            // subtitles = response.data.subtitles
            show_next: false,
            show_restart: false,
            show_pause: false,
            show_continue: false,
            show_volume: false,
            show_subtitles: false,
            show_settings: false,
            show_screen: false,
            show_ai: false,
            video_opened: false,
            fill_raiting: [],

            // Компонеты функционала:
            actions_opened: false,
            chanel_info_opened: false,
            report_opened: false,
            donate_opened: false,
            save_opened: false,
            share_opened: false,
            dimining_active: false,
        }
    },

    components: {
        PlayerCard,
        Message,
        ConversationPanel,
        MoreActionsModal,
        ChanelPanel,
        SubscribeBtn,
        Donate,
        Report,
        Save,
        Share,
    },

    mounted() {
        const el = this.$refs.settings
        el.style.height = 'auto'
    },

    watch: {
        activeBlock() {
            const el = this.$refs.settings

            el.style.height = 'auto'
            const targetHeight = el.scrollHeight + 'px'

            el.style.height = el.offsetHeight + 'px'

            requestAnimationFrame(() => {
                el.style.height = targetHeight
            })
        }
    },

    methods: {
        toggleInfo() {
            this.info_opened = !this.info_opened
        },

        likeVideo(e, name) {
            this.burst(e)
            const route = 'like-main'
        },

        fillRaiting(count) {
            if (count === 'Unhovered') {
                this.fill_raiting = []
                return
            }

            this.fill_raiting = Array(count).fill(true)
        },

        toggleVideoStatus() {
            this.video_playing = !this.video_playing

            if (this.video_playing) {
                this.$refs.video.play()
            } else {
                this.$refs.video.pause()

            }
        },


        toggleFullScreen() {
            this.video_opened = !this.video_opened
            const container = this.$refs.video_container
            if (this.video_opened) {
                if (container.requestFullscreen) {
                    container.requestFullscreen()
                }
            } else {
                // Выходим из fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
            }
        },

        // Время видео
        restartVideo() {
            this.$refs.video.currentTime = 0

            video.play()
        },

        // Функционал пропуска быстрого или перезапуска
        skipVideo() {
            this.$refs.video.currentTime = this.$refs.video.currentTime - 10
        },

        nextVideo() {
            this.show_next = !this.show_next
        },

        showRestar() {
            this.show_restart = !this.show_restart
        },

        showPopupMedia(name) {
            if (name === 'Pause') {
                this.show_pause = !this.show_pause
            } else {
                this.show_continue = !this.show_continue
            }
        },

        showPopupScreen() {
            this.show_screen = !this.show_screen
        },

        showSubtitles() {
            this.show_subtitles = !this.show_subtitles
        },

        showSettings() {
            this.show_settings = !this.show_settings
        },

        showAi() {
            this.show_ai = !this.show_ai
        },

        showVolume() {
            this.show_volume = !this.show_volume
        },

        toggleVolume() {
            this.volume_opened = !this.volume_opened
        },

        toggleSettings() {
            this.settings_opened = !this.settings_opened
        },

        toggleSettingsMenu(name) {
            if (name === 'default') {
                this.settings_options_opened = 'default'
            } else if (name === 'speed') {
                this.settings_options_opened = 'speed'
            } else if (name === 'quality') {
                this.settings_options_opened = 'quality'
            } else if (name === 'subtitles') {
                this.settings_options_opened = 'subtitles'
            } else if (name === 'subtitles_language') {
                this.settings_options_opened = 'subtitles_language'
            }
        },

        toggleVideoSettings(setting, value) {
            this.toggleSettingsMenu('default')
            if (setting === 'quality') {
                this.video_settings[0] = value
                // Логика с качеством видео (полностью возможно только с backend)
            } else if (setting === 'speed') {
                this.video_settings[1] = value
                this.$refs.video.playbackRate = value
            } else if (setting === 'lighting') {
                this.video_settings[3] = !this.video_settings[3]
            } else if (setting === 'subtitles') {
                this.toggleSubtitlesSettings(value)
            }
        },

        toggleSubtitlesSettings(name, value = '') {
            // Настройка субтитров: 1 - открыто или нет, 2 - язык ([имя, краткое имя]), 3 - mod ('имя, размер текста'))
            if (name === 'subtitles') {
                this.video_settings[2][0] = !this.video_settings[2][0]
            } else if (name === 'language') {
                this.video_settings[2][1] = value
                console.log(this.video_settings[2][1])
                this.settings_options_opened = 'default'
            } else if (name === 'mod') {
                this.mod_index++
                if (this.mod_index > 5) {
                    this.mod_index = 0
                }

                this.video_settings[2][2] = this.video_modes[this.mod_index]
            } else if (name === 'size') {
                if (value === '+') {
                    this.video_settings[2][3] += 1;
                } else {
                    this.video_settings[2][3] -= 1;
                }
            }
        },

        startProgressLoop() {
            const video = this.$refs.video
            const bar = this.$refs.bufferBar
            const thumb = this.$refs.thumb
            const wrapper = thumb.parentElement

            const loop = () => {
                const percent = video.currentTime / video.duration

                bar.style.transform = `scaleX(${percent})`

                const width = wrapper.clientWidth
                const thumbWidth = thumb.clientWidth
                const x = width * percent - thumbWidth / 2

                thumb.style.transform = `translateX(${x}px) translateY(-50%)`

                requestAnimationFrame(loop)
            }

            requestAnimationFrame(loop)
        },

        onVideoHoverTime(e) {
            const rect = this.$refs.progressContainer.getBoundingClientRect()
            const window = this.$refs.videoTimeWindow

            const x = e.clientX - rect.left
            const percent = x / rect.width
            const time = percent * this.$refs.video.duration

            window.style.left = `${x}px`
            window.style.transform = 'translateX(-50%)'

            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            const decimal = ((time % 1).toFixed(1)).substring(1)

            this.video_hover_time =
                `${minutes.toString().padStart(2, '0')}:` +
                `${seconds.toString().padStart(2, '0')}${decimal}`

            // this.updateSpriteFrame(time) Cпрайт пока что отсутствует

        },

        retallVideo() {
            this.retelling_opened = !this.retelling_opened
        },

        retallMoreForVideo(interval) {
            this.retalling_more_opened = !this.retalling_more_opened
            // По интервалу получаем субтитры пересказываем видео, делаем пересказ + доп. информация
        },

        toggleSort() {
            this.sort_opened = !this.sort_opened
        },

        sortComments(value) {
            this.toggleSort()

            this.sort_value = value
            // Логика с сортировкой с бэкэнда...
        },

        // Методы функционала:
        openInfoPanel(e) {
            this.actions_opened = false        // скрываем список
            this.chanel_info_opened = true            // открываем панель
            this.toggleDimming(true)           // включаем blackout
        },

        closeInfoPanel() {
            setTimeout(() => {
                this.chanel_info_opened = false
                this.toggleDimming(false)
            }, 300) // время твоей transition
        },

        toggleActions() {
            this.actions_opened = !this.actions_opened
        },

        // -----------------------------
        // REPORT PANEL
        // -----------------------------
        openReport(e) {
            this.actions_opened = false
            this.report_opened = true
            this.toggleDimming(true)
        },

        closeReport() {
            setTimeout(() => {
                this.report_opened = false
                this.toggleDimming(false)
            }, 300)
        },

        // -----------------------------
        // DONATE PANEL
        // -----------------------------
        openDonate(e) {
            this.actions_opened = false
            this.donate_opened = true
            this.toggleDimming(true)
        },

        closeDonate() {
            setTimeout(() => {
                this.donate_opened = false
                this.toggleDimming(false)
            }, 300)
        },

        openSave() {
            this.save_opened = true
            this.toggleDimming(true)
        },

        closeSave() {
            this.save_opened = false
            this.toggleDimming(false)
        },

        openShare() {
            this.share_opened = true
            this.toggleDimming(true)
        },

        closeShare() {
            this.share_opened = false
            this.toggleDimming(false)
        },


        // -----------------------------
        // DIMMING
        // -----------------------------
        toggleDimming(state) {
            this.dimining_active = state
        },

        burst(e) {
            const { burst } = useBurst()
            burst(e)
        },


        // Спрайт пока что отсутствует
        // updateSpriteFrame(time) {
        //     if (!this.sprite) return // пока нет спрайта — просто выходим

        //     const index = Math.floor(time) // 1 кадр/сек
        //     const col = index % this.sprite.columns
        //     const row = Math.floor(index / this.sprite.columns)

        //     this.framePos = {
        //         x: col * this.sprite.frameWidth,
        //         y: row * this.sprite.frameHeight
        //     }
        // }

        // ВАЖНО !!!!!!!!!!!!!!!!!!!
        //  Конспект: как работает предпросмотр кадров через спрайты
        // // 1) Фронтенд сейчас
        // Показываешь только время (mm:ss.d)
        // sprite = null
        // <img> предпросмотра скрыт через v-if="sprite"
        // 2) Когда появится бэкенд
        // Laravel/C++ должны:
        // Принять видео
        // Запустить FFmpeg
        // Сгенерировать миниатюры (thumb_0001.jpg, thumb_0002.jpg, …)
        // Собрать их в один спрайт (sprite.jpg)
        // Создать JSON‑метаданные:
        // json
        // {
        //   "sprite": "/videos/123/sprite.jpg",
        //   "frameWidth": 160,
        //   "frameHeight": 90,
        //   "columns": 10,
        //   "rows": 10,
        //   "totalFrames": 100
        // }
        // Отдать JSON фронтенду
        // 3) Фронтенд после появления бэкенда
        // В mounted():
        // js
        // mounted() {
        //     axios.get(`/api/video/${this.videoId}/sprite`)
        //         .then(response => {
        //             this.sprite = response.data
        //         })
        // }
        // 4) Фронтенд‑логика предпросмотра
        // В onVideoHoverTime:
        // js
        // this.updateSpriteFrame(time)
        // Метод:
        // js
        // updateSpriteFrame(time) {
        //     if (!this.sprite) return
        //     const index = Math.floor(time)
        //     const col = index % this.sprite.columns
        //     const row = Math.floor(index / this.sprite.columns)
        //     this.framePos = {
        //         x: col * this.sprite.frameWidth,
        //         y: row * this.sprite.frameHeight
        //     }
        // }
        // 5) HTML предпросмотра
        // html
        // <img
        //   v-if="sprite"
        //   :src="sprite.sprite"
        //   :style="{
        //     width: sprite.frameWidth + 'px',
        //     height: sprite.frameHeight + 'px',
        //     objectFit: 'none',
        //     objectPosition: `-${framePos.x}px -${framePos.y}px`
        //   }"
        // />
        // Изменение качества тоже делаются через backend: video с разными вариантами разделяются и отправляются на фронтент, а при переключения качества, тайминг сохраняется, а пользователь переключается на видео более низкого или высокого качества.


    }
}
</script>

<style scoped>
.player__video:fullscreen {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* или cover */
}

.video__progress-container:hover .player__time-info {
    opacity: 1;
}

.video__progress-bar {
    transform-origin: left;
    will-change: transform;
    transform: scaleX(0);
    transition: transform 80ms linear;
}

.progress-bar-thumb {
    transform-origin: left;
    transform: translateY(-50%);
    will-change: transform;
}

.controls__btn--active {
    background-color: #2d2d2d;
    border-color: rgb(89, 89, 89);

}



.settings__btn--lighting {
    overflow: hidden;
}

.settings__btn-info--lighting {
    transition: transform 120ms ease;
    will-change: transform;
}

.subtitles__mod-setting--mod {
    transition: transform 120ms ease;
    will-change: transform;
}

.settings__btn--lighting:active .settings__btn-info--lighting {
    transform: translateX(110%);
    transition: transform 100ms ease;

}

.subtitles__mod:active .subtitles__mod-setting--mod {
    transform: translateX(130%);
    transition: transform 100ms ease;
}

.subtitles-text:hover .subtitles-text__btns {
    opacity: 1;
}

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

.controls__btn:active .controls-btn__icon {
    opacity: 0.7;
}

.controls__btn:hover {
    border-color: rgb(89, 89, 89);
}

.player__main-content:hover .video__controls {
    opacity: 1;
}

.controls__btn--mode:hover .controls-btn__icon {
    animation: full-mode 0.5s;
}

.controls__btn--mode.to-default:hover .controls-btn__icon {
    animation: default-mode 0.5s;
}

.advertisement__title-block::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    background-color: #000;
}

.volume__slider::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 50%;
}

@keyframes full-mode {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.07);
    }

    100% {
        transform: scale(1);

    }
}

@keyframes default-mode {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(0.95);
    }

    100% {
        transform: scale(1);

    }
}

.subtitles-language__search:focus-within {
    background-color: #676767be;
}

/* Стили мода субтитров */
.mod-1 {
    background: #1a1a1a;
    color: #f2f2f2;
}

.mod-2 {
    background: rgb(45, 45, 45);
    border: 1px solid #c6c6c6;
    color: #e0e0e0;
    backdrop-filter: blur(3px);
}


.mod-3 {
    background: #ffffff;
    border: 1px solid #222222;
    color: #222222;
}


.mod-4 {
    background: #ffffff9a;
    backdrop-filter: blur(3px);
    color: #000000;
}

.mod-5 {
    backdrop-filter: blur(30px);
    color: #ffffff;

}

.mod-6 {
    background-image: radial-gradient(circle at top,
            #5a2a12,
            #5a4a0f,
            #134d22,
            #123566,
            #2f155a,
            #4a1433);
    color: #ffffff;

}

/* Стили мода субтитров (окончание) */

.retelling-list__time-wrapper::before {
    position: absolute;
    content: "";
    width: 100%;
    background-color: oklch(93% 0.034 272.788);
    height: 1px;
    left: 0;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
}

.comments-list {
    background-image: url("../../../../images/themes/green-light.jpg");
}

/* ВНИМАНИЕ!!! ПОВТОРЕНИЕ TRANSITION C ФИЛЬТРАЦИЕЙ */
.settings-enter-active {
    transition: transform 360ms ease;
}

.settings-enter-from {
    transform: translateX(100%);
}

.settings-leave-to {
    transform: scaleY(0.6);
}

.settings-left-enter-active {
    transition: transform 360ms ease;
}

.settings-left-enter-from {
    transform: translateX(-100%);
}

.settings-left-leave-to {
    transform: scaleY(0.6);
}
</style>
