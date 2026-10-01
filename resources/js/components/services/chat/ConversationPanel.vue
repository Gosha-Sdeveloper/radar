<template>
    <form
        class="conversation-panel shadow-md sticky bottom-1 z-5 flex flex-col justify-center w-[75%] bg-white mx-auto rounded-xl px-3 py-2 mb-2">
        <EditorContent class="conversation-panel__textarea mb-1.5 outline-none" :editor="editor" />
        <div v-if="has_message" class="conversation-panel__functions conversation-functions flex justify-between">
            <div class="btn-left__wrapper flex items-center">
                <button type="button"
                    class="z-3 conversation-panel__btn--attach attach-btn relative flex items-center px-1.5 py-2 cursor-pointer bg-black opacity-90 rounded-full hover:opacity-100"
                    aria-label="Добавить файл">
                    <svg width="25" height="21" color="#e5e7eb" aria-hidden="true">
                        <use href="#attach"></use>
                    </svg>
                </button>
                <span class="text-[#6E6E6E] pr-0.5 mb-0.5 attach-btn__text">Добавить файл</span>
            </div>

            <div class="flex items-center gap-0.5">
                <button @click="toggleAiBlock()" type="button" data-tooltip="Улучшить текст"
                    :class="['conversation-panel__btn conversation-panel__btn--ai conversation-panel__btn--send relative p-1 cursor-pointer rounded-full bg-[#efefef]', ai_block_opened ? 'active' : '']"
                    aria-label="Улучшить текст">
                    <svg width="26" height="26" class="fill-current relative z-2">
                        <use href="#atom"></use>
                    </svg>
                </button>
                <button ref="delay" @click="toggleDelay()" type="button" data-tooltip="Откладка"
                    class="conversation-panel__btn conversation-panel__btn--function relative p-1 cursor-pointer rounded-full bg-[#efefef] hover:bg-[#5353533f]"
                    aria-label="Откладка сообщений">
                    <svg width="26" height="26" color="oklch(27.8% 0.033 256.848)">
                        <use href="#time"></use>
                    </svg>
                </button>
                <button type="button" data-tooltip="Эмодзи"
                    class="conversation-panel__btn conversation-panel__btn--function relative p-1 cursor-pointer rounded-full bg-[#efefef] hover:bg-[#5353533f]"
                    aria-label="добавить эмодзи">
                    <svg width="26" height="26" color="oklch(27.8% 0.033 256.848)">
                        <use href="#emoji"></use>
                    </svg>
                </button>
                <button @click="toggleRedactor()" type="button" data-tooltip="Редактор"
                    :class="['conversation-panel__btn conversation-panel__btn--function relative p-1 cursor-pointer rounded-full bg-[#efefef] hover:bg-[#5353533f]', redactor_opened ? 'active' : '']"
                    aria-label="Редактор">
                    <svg width="26" height="23" color="oklch(27.8% 0.033 256.848)">
                        <use href="#text"></use>
                    </svg>
                </button>
                <button type="button" data-tooltip="Видеосообщение"
                    class="conversation-panel__btn conversation-panel__btn--function relative p-1 cursor-pointer rounded-full bg-[#efefef] hover:bg-[#5353533f]"
                    aria-label="Видеосообщение">
                    <svg width="26" height="26" color="oklch(27.8% 0.033 256.848)">
                        <use href="#camera"></use>
                    </svg>
                </button>
                <button @click="toggleVoise()" type="button" data-tooltip="Голосовое сообщение"
                    :class="['conversation-panel__btn conversation-panel__btn--function relative p-1 cursor-pointer rounded-full bg-[#efefef] hover:bg-[#5353533f]', voise_opened ? 'active' : '']"
                    aria-label="Голосовое сообщение">
                    <svg width="26" height="26" color="oklch(27.8% 0.033 256.848)">
                        <use href="#voice"></use>
                    </svg>
                </button>
                <button type="button" data-tooltip="Отправить"
                    class="conversation-panel__btn  relative conversation-panel__btn--function conversation-panel__btn--send bg-indigo-900 rounded-full p-1.5 cursor-pointer hover:bg-indigo-700 transition-color duration-100"
                    aria-label="Отправить сообщение">
                    <svg width="26" height="26" color="#e5e7eb">
                        <use href="#send"></use>
                    </svg>
                </button>
            </div>
        </div>
        <svg class="absolute bottom-0 -right-4 z-10" width="17" height="40" color="#fff">
            <use href="#msg"></use>
        </svg>
        <Transition name="delay">
            <div v-show="delay_block_opened"
                class="z-2 shadow-md delay-block absolute -top-22 p-2 right-[20%] bg-white rounded-xl">
                <div class="delay-block__top flex items-center justify-between mb-2">
                    <h3 class="delay-block__title text-base font-medium">Отправить сообщение:</h3>
                    <button type="button" @click="toggleDelay()" class="delay-block__close rounded-full cursor-pointer">
                        <svg width="15" height="15" color="#000">
                            <use href="#close"></use>
                        </svg>
                    </button>
                </div>
                <form class="delay-block__time grid grid-cols-[1fr_34px] items-center gap-2">
                    <div class="delay-block__time-inputs relative flex items-center gap-2">
                        <div
                            class="delay-block__input-wrapper border transition-background duration-150 z-2 bg-gray-100 border-gray-100 rounded-xl py-1 flex items-center">
                            <input v-model="year"
                                class="delay-block__time-input outline-0 w-15 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" placeholder="год" id="delay-year">
                        </div>
                        <div
                            class="delay-block__input-wrapper border transition-background duration-150 z-2 bg-gray-100 border-gray-100 rounded-xl py-1 flex items-center">
                            <input v-model="month"
                                class="delay-block__time-input outline-0 w-15 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" placeholder="месяц" id="delay-month">
                            <span class="text-xl font-medium text-gray-600">:</span>
                            <input v-model="day"
                                class="delay-block__time-input outline-0 w-15 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" placeholder="день" id="delay-day">
                        </div>
                        <div
                            class="delay-block__input-wrapper border transition-background duration-150 z-2 bg-gray-100 border-gray-100 rounded-xl py-1 flex items-center">
                            <input v-model="hour"
                                class="delay-block__time-input outline-0 w-15 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" placeholder="час" id="delay-hour">
                            <span class="text-xl font-medium text-gray-600">:</span>
                            <input v-model="minute"
                                class="delay-block__time-input outline-0 w-15 text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" placeholder="минут" id="delay-minutes">
                        </div>
                    </div>
                    <button type="button"
                        class="delay-block__submit p-1 rounded-xl bg-black focus:outline-2 cursor-pointer">
                        <svg width="24" height="24" color="#fff">
                            <use href="#good"></use>
                        </svg>
                    </button>
                </form>
            </div>
        </Transition>
        <Transition name="ai-block">
            <div v-show="ai_block_opened" class="ai-block absolute -top-75 px-2 py-1 right-0 bg-white rounded-xl w-150">
                <div
                    class="ai-block__main flex justify-between items-center pb-0.5 border-b border-gray-300 relative mb-1">
                    <h3 class="ai-block__title text-base font-medium">Улучшить текст</h3>
                    <div @click="openAiModels()"
                        class="p-1 flex items-center gap-1 cursor-pointer bg-transparent transition-background-color duration-100 hover:bg-[#efefef] rounded-xl active:bg-[#5353533f]">
                        <svg ref="active_ai_img" width="20" height="20" color="#000">
                            <use :href="active_ai_svg"></use>
                        </svg>
                        <span ref="active_ai_name" class="ai-block__active-name mb-0.5 block">{{ this.active_ai_name
                            }}</span>
                    </div>
                    <Transition name="ai-models">
                        <div v-show="ai_models_opened"
                            class="ai-block__models-wrapper flex flex-col absolute top-1 right-0 bg-white p-2 rounded-xl shadow-xl w-30 z-3">
                            <ul class="ai-block__models">
                                <li @click="toggleAiHelper('deepseek')"
                                    class="ai-block__model p-1 flex items-center gap-1 cursor-pointer bg-transparent transition-background-color duration-100 hover:bg-[#efefef] rounded-xl text-black transition-color hover:text-[#4D6BFE]">
                                    <svg width="20" height="20">
                                        <use href="#deepseek"></use>
                                    </svg>
                                    <span class="ai-block__active-name mb-0.5 block">DeepSeek</span>
                                </li>
                                <li @click="toggleAiHelper('gigachat')"
                                    class="ai-block__model ai-block__model--gigachat p-1 flex items-center gap-1 cursor-pointer bg-transparent transition-background-color duration-100 hover:bg-[#efefef] rounded-xl text-black transition-color">
                                    <svg class="ai-block__model--gigachat-img" width="20" height="20">
                                        <use href="#gigachat"></use>
                                    </svg>
                                    <span class="ai-block__active-name mb-0.5 block">GigaChat</span>
                                </li>
                                <li @click="toggleAiHelper('gemini')"
                                    class="ai-block__model relative p-1 flex items-center gap-1 cursor-pointer bg-transparent transition-background-color duration-100 hover:bg-[#efefef] rounded-xl">
                                    <svg class="ai-block__model-img--gemini" width="20" height="20">
                                        <use href="#gemini"></use>
                                    </svg>
                                    <svg class="ai-block__model-img--gemini_active absolute top-1.5 left-0.75 z-2"
                                        width="22" height="22">
                                        <defs>
                                            <linearGradient id="geminiGradientHover" gradientUnits="userSpaceOnUse"
                                                x1="0" y1="256" x2="256" y2="0">
                                                <stop offset="0%" stop-color="#4285F4" />
                                                <stop offset="35%" stop-color="#9B72CB" />
                                                <stop offset="70%" stop-color="#D96AAE" />
                                                <stop offset="100%" stop-color="#E5AE7A" />
                                            </linearGradient>
                                        </defs>
                                        <use href="#geminihover"></use>
                                    </svg>
                                    <span
                                        class="ai-block__active-name ai-block__active-name--gemini transition-background duration-100 mb-0.5 block">Gemini</span>
                                </li>
                            </ul>
                        </div>
                    </Transition>
                </div>
                <ul class="ai-block__main-functions flex items-center gap-1.5 flex-wrap">
                    <li @click="toggleRule('Расширить')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Расширить') ? 'active' : '']"
                        title="расширить текст, добавить детали">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer"
                            type="button">Расширить</button>
                    </li>
                    <li @click="toggleRule('Сжать')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Сжать') ? 'active' : '']"
                        title="сократить, оставить главное">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Сжать</button>
                    </li>
                    <li @click="toggleRule('Исправить ошибки')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Исправить ошибки') ? 'active' : '']"
                        title="орфо/грамм/стилистика">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Исправить
                            ошибки
                        </button>
                    </li>
                    <li @click="toggleRule('Прояснить')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Прояснить') ? 'active' : '']"
                        title="сделать понятнее (упростить формулировки)">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer"
                            type="button">Прояснить</button>
                    </li>
                    <li @click="toggleRule('Детализировать')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Детализировать') ? 'active' : '']"
                        title="указать дополнительные подробности">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer"
                            type="button">Детализировать</button>
                    </li>
                    <li @click="toggleRule('Убрать повторы')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Убрать повторы') ? 'active' : '']"
                        title="сделать текст компактнее и чище">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Убрать
                            повторы</button>
                    </li>
                    <li @click="toggleRule('Укрепить аргументы')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Укрепить аргументы') ? 'active' : '']"
                        title=" добавить факты, примеры, логику">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Укрепить
                            аргументы</button>
                    </li>
                    <li @click="toggleRule('Подготовить вопрос')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Подготовить вопрос') ? 'active' : '']"
                        title="сформулировать чёткий вопрос">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Подготовить
                            вопрос</button>
                    </li>
                    <li @click="toggleRule('Создать заголовки')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Создать заголовки') ? 'active' : '']"
                        title="несколько вариантов заголовков и вступлений">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Создать
                            заголовки
                        </button>
                    </li>
                    <li @click="toggleRule('Аннотация')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Аннотация') ? 'active' : '']"
                        title="краткое резюме ключевых мыслей">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer"
                            type="button">Аннотация</button>
                    </li>
                    <li @click="toggleRule('Эмодзи')"
                        :class="['ai-block__main-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Эмодзи') ? 'active' : '']"
                        title="предложение подходящих эмодзи и их расположение">
                        <button class="ai-block__main-function ai-main-btn cursor-pointer" type="button">Эмодзи</button>
                    </li>
                </ul>
                <div class="ai-block__other mb-2">
                    <h3 class="ai-block__title text-base font-medium pb-0.75 border-b border-gray-300 mb-1">Изменить
                        стиль
                    </h3>
                    <ul class="ai-block__other-functions flex items-center gap-1.5 flex-wrap">
                        <li @click="toggleRule('Формальный')"
                            :class="['ai-block__other-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Формальный') ? 'active' : '']""
                            title=" официальный, нейтральный тон для документов и деловой переписки">
                            <button class="ai-block__other-function ai-main-btn cursor-pointer"
                                type="button">Формальный</button>
                        </li>
                        <li @click="toggleRule('Разговорный')"
                            :class="['ai-block__other-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Разговорный') ? 'active' : '']""
                            title=" дружелюбный, простой язык для блогов и чатов">
                            <button class="ai-block__other-function ai-main-btn cursor-pointer"
                                type="button">Разговорный</button>
                        </li>
                        <li @click="toggleRule('Академический')"
                            :class="['ai-block__other-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Академический') ? 'active' : '']""
                            title=" строгая структура и обоснования для исследований и статей">
                            <button class="ai-block__other-function ai-main-btn cursor-pointer"
                                type="button">Академический</button>
                        </li>
                        <li @click="toggleRule('Технический')"
                            :class="['ai-block__other-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Технический') ? 'active' : '']""
                            title=" точные инструкции и терминология для руководств">
                            <button class="ai-block__other-function ai-main-btn cursor-pointer"
                                type="button">Технический</button>
                        </li>
                        <li @click="toggleRule('Убедительный')"
                            :class="['ai-block__other-function ai-block__setting relative p-1 px-2 rounded-full bg-indigo-50 border border-indigo-200 transition-background-color hover:bg-indigo-100 duration-50 text-gray-700', ai_rules.includes('Убедительный') ? 'active' : '']"
                            title="фокус на выгодах и призыве к действию">
                            <button class="ai-block__other-function ai-main-btn cursor-pointer"
                                type="button">Убедительный</button>
                        </li>
                    </ul>
                </div>
                <button
                    class="ai-block__submit w-full p-1.5 bg-black/80 text-white rounded-full transition-opacity active:opacity-70 duration-100 cursor-pointer relative">
                    <span>Редактировать</span>
                </button>
            </div>
        </Transition>
        <Transition name="ai-block">
            <div v-show="voise_opened"
                class="voise-block absolute bg-white w-full py-2 px-3 -top-1 left-0 rounded-md z-3">
                <Transition name="ai-block">
                    <div v-show="audio_recording"
                        class="voise-block__record record grid grid-cols-[50px_1fr_86px] items-center gap-1">
                        <div class="record__functions flex items-center gap-1">
                            <button @click="vioseSubmit()"
                                class="record__submit p-2 rounded-full bg-black/80 cursor-pointer transition-opacity duration-75 active:opacity-50"
                                type="button">
                                <div class="w-3 h-3 bg-gray-100"></div>
                            </button>
                            <button @click="toggleAudioRecording()" v-show="!audio_recording_paused"
                                class="record__pause text-black/80 transition-opacity duration-75 active:opacity-50 cursor-pointer"
                                type="button">
                                <svg class="" width="17" height="17">
                                    <use href="#stop-media"></use>
                                </svg>
                            </button>
                            <button @click="toggleAudioRecording()" v-show="audio_recording_paused"
                                class="record__continue text-black/80 transition-opacity duration-75 active:opacity-50 cursor-pointer"
                                type="button">
                                <svg class="" width="17" height="17">
                                    <use href="#play-media"></use>
                                </svg>
                            </button>
                        </div>
                        <div ref="waveContainer"
                            class="record__audio-forse bg-[#efefef] w-full h-8 rounded-xl grid grid-cols-1 items-center">
                            <canvas ref="waveCanvas" class="w-full h-8"></canvas>
                        </div>
                        <div class="record__animations flex items-center gap-2">
                            <span class="record__time font-medium">0.05.35</span>
                            <span
                                :class="['record__is-recording', audio_recording && !audio_recording_paused ? 'active' : '']"></span>
                        </div>
                    </div>
                </Transition>
                <Transition name="ai-block">
                    <div v-show="audio_is_record"
                        class="voise-block__submit flex justify-between items-center pb-0.5 border-b border-gray-300">
                        <button type="button" @click="toggleListening()"
                            class="voise-block__result flex items-center gap-1 text-gray-100 bg-black/80 px-2 py-0.75 rounded-full cursor-pointer">
                            <svg v-show="audio_listening" class="" width="12" height="12">
                                <use href="#stop-media"></use>
                            </svg>
                            <svg v-show="!audio_listening" class="" width="12" height="12">
                                <use href="#play-media"></use>
                            </svg>
                            <span class="">Записано, {{ formattedCurrentTime }} / {{ formattedDuration }}</span>
                        </button>
                        <div class="voise-block__functions flex items-center">
                            <audio ref="audioPlayer" class="hidden" :src="audio_src" controls @ended="onAudioEnded"
                                @timeupdate="updateTime" @loadedmetadata="onMetadataLoaded"></audio>
                            <button type="button"
                                class="voise-block__cansel text-gray-500 hover:text-black/80 cursor-pointer active:scale-90"
                                aria-label="Преобразовать в текст" title="Преобразовать в текст">
                                <svg class="" width="26" height="26">
                                    <use href="#reload"></use>
                                </svg>
                            </button>
                            <button @click="toggleVoise()" type="button"
                                class="voise-block__cansel text-gray-500 hover:text-black/80 cursor-pointer active:scale-90"
                                aria-label="Отменить отправку аудиосообщения" title="Отменить">
                                <svg class="" width="26" height="26">
                                    <use href="#delete"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
        <Transition name="ai-block">
            <div v-show="redactor_opened"
                class="editor absolute bg-white w-full px-3 -top-8 left-0 z-3 rounded-t-xl pb-0.5 flex py-1">
                <div class="editor__content border-b border-transparent flex w-full pb-0.5">
                    <ul class="editor__text-function relative h-full flex items-center border-r border-gray-600">
                        <li class="editor__text-function h-full">
                            <button @click="toggleRedactorRule('bold')" type="button" data-tooltip="Жирный   Ctrl + B"
                                :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 px-2 cursor-pointer', redactor_rules.includes('bold') ? 'active' : '']"
                                aria-label="Выделить жирным шрифтом">
                                <svg class="" width="24" height="23">
                                    <use href="#text-bold"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="editor__text-function h-full">
                            <button @click="toggleRedactorRule('italic')" type="button"
                                :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center px-2 py-1.25  cursor-pointer', redactor_rules.includes('italic') ? 'active' : '']"
                                aria-label="Выделить кривым шрифтом" data-tooltip="Кривой   Ctrl + I">
                                <svg class="" width="24" height="21">
                                    <use href="#text-italic"></use>
                                </svg>
                            </button>
                        </li>
                        <li @click="toggleRedactorRule('underline')" class="editor__text-function h-full">
                            <button type="button"
                                :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 px-2 cursor-pointer', redactor_rules.includes('underline') ? 'active' : '']"
                                aria-label="Выделить подчёркнутым шрифтом" data-tooltip="Подчёркнутый   Ctrl + U">
                                <svg class="" width="24" height="23">
                                    <use href="#text-underline"></use>
                                </svg>
                            </button>
                        </li>
                        <li @click="toggleRedactorRule('crossed')" class="editor__text-function h-full">
                            <button type="button"
                                :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 pt-0.75 px-2 cursor-pointer', redactor_rules.includes('crossed') ? 'active' : '']"
                                aria-label="Выделить зачёркнутым шрифтом" data-tooltip="Зачёркнутый   Ctrl + Shift + S">
                                <svg class="" width="24" height="24">
                                    <use href="#text-crossed"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="editor__text-function h-full">
                            <button @click="toggleRedactorWindows('link')" type="button"
                                :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 px-2 pt-0.75 cursor-pointer', redactor_windows.includes('link') ? 'active' : '']"
                                aria-label="Создать кастомную ссылку" data-tooltip="Cсылка   Ctrl + L">
                                <svg class="" width="24" height="24">
                                    <use href="#text-link"></use>
                                </svg>
                            </button>
                        </li>
                        <li class="editor__text-function h-full">
                            <button @click="toggleRedactorWindows('color')" type="button"
                                :class="['editor__btn relative bg-transparent rounded-l-lg flex justify-center items-center py-1 px-2 pt-0.75 cursor-pointer', redactor_windows.includes('color') ? 'active' : '']"
                                aria-label="Выделить текст маркером" data-tooltip="Оформление   Ctrl + E">
                                <svg class="" width="24" height="24">
                                    <use href="#edit"></use>
                                </svg>
                            </button>
                        </li>
                        <div
                            :class="['editor__link editor__window absolute bg-white p-1.5 rounded-xl shadow-md w-50 -top-30 left-42 pt-2', redactor_windows.includes('link') ? 'active' : '']">
                            <div class="editor__link-block flex flex-col gap-0.5">
                                <Input v-model="new_link_url" id="new_link_url" class="mb-0.5"
                                    label="Url-адрес"></Input>

                                <Input v-model="new_link_text" id="new_link_text" class="mb-1"
                                    label="Текст ссылки"></Input>

                                <button @click.prevent="createLink"
                                    class="p-0.5 bg-black/80 rounded-xl text-white active:opacity-70 cursor-pointer w-1/2 ml-auto"
                                    type="button">Вставить</button>
                            </div>
                        </div>

                        <div
                            :class="['editor__colors editor__window absolute bg-white p-1.5 rounded-xl shadow-md  -top-19 left-52 w-48', redactor_windows.includes('color') ? 'active' : '']">
                            <div class="editor__colors-color flex items-center justify-between">
                                <span class="font-medium">Цвет</span>
                                <div>
                                    <button @click="toggleColor('color', 'oklch(45.3% 0.124 130.933)')" type="button"
                                        class="w-4.5 h-4.5 bg-lime-800 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('color', 'oklch(51.4% 0.222 16.935)')" type="button"
                                        class="w-4.5 h-4.5 bg-rose-700 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('color', 'oklch(68.5% 0.169 237.323)')" type="button"
                                        class="w-4.5 h-4.5 bg-sky-500 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('color', 'oklch(43.2% 0.232 292.759)')" type="button"
                                        class="w-4.5 h-4.5 bg-violet-800 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('color', '#000')" type="button"
                                        class="w-4.5 h-4.5 bg-black rounded-full cursor-pointer"></button>
                                    <button title="Выбрать свой цвет" type="button"
                                        class="p-0.75 cursor-pointer rounded-full hover:bg-white">
                                        <svg class="" width="20" height="20">
                                            <use href="#theme"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="editor__colors-color flex items-center justify-between">
                                <span class="font-medium">Фон </span>
                                <div>
                                    <button @click="toggleColor('background', '#dcfce7')" type="button"
                                        class="w-4.5 h-4.5 bg-green-100 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('background', 'oklch(94.1% 0.03 12.58)')" type="button"
                                        class="w-4.5 h-4.5 bg-rose-100 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('background', '#dff2fe')" type="button"
                                        class="w-4.5 h-4.5 bg-sky-100 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('background', 'oklch(89.4% 0.057 293.283)')"
                                        type="button"
                                        class="w-4.5 h-4.5 bg-violet-200 rounded-full cursor-pointer"></button>
                                    <button @click="toggleColor('background', 'transparent')" type="button"
                                        class="w-4.5 h-4.5 bg-white border rounded-full cursor-pointer"></button>

                                    <button title="Выбрать свой фон" type="button"
                                        class="p-0.75 cursor-pointer rounded-full hover:bg-white">
                                        <svg class="" width="20" height="20">
                                            <use href="#theme"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <div class="editor__typography relative flex border-r border-gray-600">
                        <button @click="toggleRedactorWindows('title')" type="button"
                            :class="['editor__btn relative bg-transparent rounded-r-lg flex justify-center items-center py-1 px-2 cursor-pointer gap-0', redactor_windows.includes('title') ? 'active' : '']"
                            data-tooltip="Заголовок   Ctrl + Н">
                            <svg class="" width="24" height="24">
                                <use href="#text-title"></use>
                            </svg>
                            <svg class="" width="14" height="14">
                                <use href="#open-btn"></use>
                            </svg>
                        </button>
                        <button @click="toggleRedactorWindows('list')" type="button"
                            :class="['editor__btn relative bg-transparent rounded-l-lg flex justify-center items-center py-1 px-2 cursor-pointer gap-0', redactor_windows.includes('list') ? 'active' : '']"
                            data-tooltip="Список   Ctrl + Shift + U">
                            <svg class="" width="24" height="24">
                                <use href="#list"></use>
                            </svg>
                            <svg class="" width="14" height="14">
                                <use href="#open-btn"></use>
                            </svg>
                        </button>
                        <ul
                            :class="['editor__typography-titles editor__window py-2 px-1 bg-white absolute -top-24 -right-34 w-60 rounded-xl shadow-md', redactor_windows.includes('title') ? 'active' : '']">
                            <li class="editor__typography-title">
                                <button type="button"
                                    class="w-full flex items-center gap-2 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <span class="text-neutral-500 font-medium text-md">H1</span>
                                    <p class="text-sm">Главный заголовок</p>
                                </button>
                            </li>
                            <li class="editor__typography-title">
                                <button type="button"
                                    class="w-full flex items-center gap-2 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <span class="text-neutral-500 font-medium text-md">H2</span>
                                    <p class="text-sm">Основной заголовок</p>
                                </button>
                            </li>
                            <li class="editor__typography-title">
                                <button type="button"
                                    class="w-full flex items-center gap-2 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <span class="text-neutral-500 font-medium text-md">H3</span>
                                    <p class="text-sm">Второстепенный заголовок</p>
                                </button>
                            </li>
                        </ul>
                        <ul
                            :class="['editor__typography-lists editor__window py-2 px-1 bg-white absolute -top-29 left-15 w-55 rounded-xl shadow-md', redactor_windows.includes('list') ? 'active' : '']">
                            <li class="editor__typography-list">
                                <button type="button"
                                    class="w-full flex items-center gap-1 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <svg class="" width="24" height="24">
                                        <use href="#classik-list"></use>
                                    </svg>
                                    <p class="text-sm pb-0.75">Классический список</p>
                                </button>
                            </li>
                            <li class="editor__typography-list">
                                <button type="button"
                                    class="w-full flex items-center gap-1 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <svg class="" width="24" height="24">
                                        <use href="#number-list"></use>
                                    </svg>
                                    <p class="text-sm pb-0.75">Числовой список</p>
                                </button>
                            </li>
                            <li class="editor__typography-list">
                                <button type="button"
                                    class="w-full flex items-center gap-1 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <svg class="" width="24" height="24">
                                        <use href="#task-list"></use>
                                    </svg>
                                    <p class="text-sm">Список задач</p>
                                </button>
                            </li>
                            <li class="editor__typography-list">
                                <button type="button"
                                    class="w-full flex items-center gap-2 cursor-pointer hover:bg-[#efefef] rounded-md pl-1 focus:bg-[#5353533f]">
                                    <svg class="" width="20" height="20">
                                        <use href="#analysis"></use>
                                    </svg>
                                    <p class="text-sm">Опрос</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="editor__position flex">
                        <button @click="toggleRedactorCentering('left')" type="button"
                            class="editor__btn editor__btn--text-left transition-colors duration-250 relative bg-transparent rounded-r-lg flex justify-center items-center py-1 px-2 pt-0.75 cursor-pointer"
                            data-tooltip="Слева Ctrl + Shift + L" aria-label="Создать кастомную ссылку">
                            <svg class="" width="24" height="24">
                                <use href="#text-left"></use>
                            </svg>
                        </button>
                        <button @click="toggleRedactorCentering('center')" type="button"
                            :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 px-2 pt-0.75 cursor-pointer', redactor_centering === 'center' ? 'active' : '']"
                            data-tooltip="По центру Ctrl + Shift + E" aria-label="Создать кастомную ссылку">
                            <svg class="" width="24" height="24">
                                <use href="#text-center"></use>
                            </svg>
                        </button>
                        <button @click="toggleRedactorCentering('right')" type="button"
                            :class="['editor__btn relative bg-transparent rounded-lg flex justify-center items-center py-1 px-2 pt-0.75 cursor-pointer', redactor_centering === 'right' ? 'active' : '']"
                            data-tooltip="Справа Ctrl + Shift + R" aria-label="Создать кастомную ссылку">
                            <svg class="" width="24" height="24">
                                <use href="#text-right"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </form>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import Input from "../../ui/buttons/Input.vue"
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import {TextStyle} from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'

export default {
    name: "ConversationPanel",

    components: {
        EditorContent,
        Input,
    },

    data() {
        //* Модель нейросети и правила нейросети можно получать из настроек пользователя...
        return {
            has_message: true,
            // Запись ии на данный момент
            ai_block_opened: false,
            delay_block_opened: false,
            ai_models_opened: false,
            active_ai_svg: '#deepseek',
            active_ai_name: 'DeepSeek',
            ai_rules: [],
            // Запись голоса на данный момент
            voise_opened: false,
            audio_recording: false,
            audio_is_record: false,
            audio_listening: false,
            audio_recording_paused: false,
            media_recorder: null,
            audio_context: null,
            media_stream_source: null,
            audio_chunks: [],
            freq_array: [],
            time_array: [],
            canvas: null,
            ctx: null,
            audio_src: null,
            analyser: null,
            wave_raf: null,
            currentTime: 0,
            duration: 0,
            // Запись даты на данный момент
            year: null,
            month: null,
            day: null,
            hour: null,
            minute: null,
            // Запись текстовый редактор на данный момент
            editor: null,
            redactor_opened: false,
            redactor_windows: [],
            redactor_rules: [],
            redactor_centering: 'left',
            new_link_url: '',
            new_link_text: '',
        }
    },

    computed: {
        formattedCurrentTime() {
            return this.formatTime(this.currentTime);
        },
        formattedDuration() {
            return this.formatTime(this.duration);
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                TextAlign.configure({
                    types: ['paragraph', 'heading'],
                }),
                Link.configure({
                    openOnClick: false
                }),
                Color,
                TextStyle,
                Highlight.configure({
                    multicolor: true,
                }),
            ],


            content: '<p>Сообщение...</p>',
        })
    },


    methods: {
        // Функционал блок откладки

        toggleDelay() {
            this.delay_block_opened = !this.delay_block_opened
            if (this.delay_block_opened) {
                this.$refs.delay.classList.add('active')
                const now = new Date();
                const dateArray = [
                    now.getFullYear(),
                    now.getMonth() + 1,
                    now.getDate(),
                    now.getHours(),
                    now.getMinutes()
                ].map(this.dateForInput);
                this.year = dateArray[0]
                this.month = dateArray[1]
                this.day = dateArray[2]
                this.hour = dateArray[3]
                this.minute = dateArray[4]
            } else {
                this.$refs.delay.classList.remove('active')
            }
        },

        // Функционал ии-блок
        toggleAiBlock() {
            this.ai_block_opened = !this.ai_block_opened
        },

        toggleAiHelper(name) {
            switch (name) {
                case 'deepseek':
                    this.active_ai_name = 'DeepSeek'
                    this.active_ai_svg = '#deepseek'
                    break;
                case 'gigachat':
                    this.active_ai_name = 'GigaChat'
                    this.active_ai_svg = '#gigachat'
                    break;
                case 'gemini':
                    this.active_ai_name = 'Gemini'
                    this.active_ai_svg = '#gemini'
                    break;
            }
            setTimeout(() => {
                this.ai_models_opened = false
            }, 200);
        },

        dateForInput(n) {
            return String(n).padStart(2, '0');
        },

        openAiModels() {
            this.ai_models_opened = true
        },

        toggleRule(ruleName) {
            const index = this.ai_rules.indexOf(ruleName)

            if (index === -1) {
                this.ai_rules.push(ruleName)
            } else {
                this.ai_rules.splice(index, 1)
            }
        },

        // Функуионал голосовая запись
        toggleVoise() {
            if (this.voise_opened) {
                this.audio_recording = false;
                this.audio_recording_paused = false;
                this.deleteAudio();
                this.audio_is_record = false;
            } else {
                this.audio_recording = true;
                this.createAudio();
            }

            this.voise_opened = !this.voise_opened;
        },

        toggleAudioRecording() {
            this.audio_recording_paused = !this.audio_recording_paused;
            this.audio_recording_paused ? this.pauseAudio() : this.continueAudio();
        },

        toggleListening() {
            if (!this.audio_src) return;

            const player = this.$refs.audioPlayer;
            const isPaused = player.paused;

            isPaused ? player.play() : player.pause();
            this.audio_listening = isPaused;
        },

        vioseSubmit() {
            this.audio_recording_paused = false;
            this.audio_recording = false;
            this.audio_is_record = true;
            this.stopAudio();
        },

        createAudio() {
            if (navigator.mediaDevices?.getUserMedia) {
                console.log("getUserMedia supported.");
            }

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    this.media_recorder = new MediaRecorder(stream);
                    this.audio_context = new AudioContext();

                    this.audio_context.resume().then(() => {
                        this.media_stream_source = this.audio_context.createMediaStreamSource(stream);
                        this.analyser = this.audio_context.createAnalyser();
                        this.analyser.fftSize = 2048;

                        this.media_stream_source.connect(this.analyser);

                        this.canvas = this.$refs.waveCanvas;
                        this.ctx = this.canvas.getContext('2d');
                        this.time_array = new Uint8Array(this.analyser.fftSize);

                        if (this.resizeHandler) {
                            window.removeEventListener('resize', this.resizeHandler);
                        }
                        this.resizeHandler = this.resizeCanvas.bind(this);
                        window.addEventListener('resize', this.resizeHandler);

                        this.resizeCanvas();

                        if (this.wave_raf) {
                            cancelAnimationFrame(this.wave_raf);
                        }

                        this.animateWave();
                    });

                    this.media_recorder.ondataavailable = (e) => {
                        if (e.data?.size > 0) {
                            this.audio_chunks.push(e.data);
                        }
                    };

                    this.media_recorder.onstop = () => {
                        if (!this.audio_chunks.length) {
                            console.error("No audio data captured.");
                            return;
                        }

                        const blob = new Blob(this.audio_chunks, { type: "audio/ogg; codecs=opus" });
                        this.audio_chunks = [];
                        this.audio_src = URL.createObjectURL(blob);

                        console.log("Audio URL created:", this.audio_src);
                    };

                    this.startAudio();
                    console.log(this.media_recorder.state);
                })
                .catch((error) => {
                    console.error('Ошибка записи голоса:', error);
                });
        },

        startAudio() {
            this.audio_chunks = [];
            this.media_recorder.start();
        },

        stopAudio() {
            if (this.media_recorder && this.media_recorder.state !== 'inactive') {
                this.media_recorder.stop();
                this.stopRecording();
            }
        },

        pauseAudio() {
            this.media_recorder.pause();
        },

        continueAudio() {
            this.media_recorder.resume();
        },

        onAudioEnded() {
            this.audio_listening = false;
            this.currentTime = 0;
        },

        onMetadataLoaded() {
            this.duration = this.$refs.audioPlayer.duration;
        },

        updateTime() {
            this.currentTime = this.$refs.audioPlayer.currentTime;
        },

        formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        },

        deleteAudio() {
            this.stopRecording();

            try {
                const tracks = this.media_recorder?.stream?.getTracks() || [];
                tracks.forEach(track => {
                    if (track.readyState === 'live') track.stop();
                });
            } catch (error) {
                console.error("Ошибка при остановке аудио-треков:", error);
            } finally {
                this.media_recorder = null;
                this.audio_src = null;
                this.audio_chunks = [];
                this.currentTime = 0;
                this.duration = 0;
            }
        },

        stopRecording() {
            if (this.wave_raf) cancelAnimationFrame(this.wave_raf);
            if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
        },

        animateWave() {
            this.analyser.getByteTimeDomainData(this.time_array);

            const canvas = this.canvas;
            const ctx = this.ctx;
            const rect = canvas.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';
            ctx.beginPath();

            const sliceWidth = w / this.time_array.length;
            const amplitudeMultiplier = 2.0;

            let x = 0;

            for (let i = 0; i < this.time_array.length; i++) {
                const normalized = (this.time_array[i] - 128) / 128;
                const y = (h / 2) + normalized * (h / 2) * amplitudeMultiplier;

                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                x += sliceWidth;
            }

            ctx.stroke();
            this.wave_raf = requestAnimationFrame(this.animateWave.bind(this));
        },

        resizeCanvas() {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            this.canvas.width = Math.round(rect.width * dpr);
            this.canvas.height = Math.round(rect.height * dpr);

            this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        },

        // Функционал текстовый редактор

        toggleRedactor() {
            this.redactor_opened = !this.redactor_opened
        },

        toggleRedactorWindows(name) {
            const index = this.redactor_windows.indexOf(name)
            if (index === -1) {
                this.redactor_windows = []
                this.redactor_windows.push(name)
            } else {
                this.redactor_windows.splice(index, 1)
            }
        },

        toggleRedactorRule(name) {
            const index = this.redactor_rules.indexOf(name)
            if (index === -1) {
                this.redactor_rules.push(name)
            } else {
                this.redactor_rules.splice(index, 1)
            }

            this.applyRedactorRule(name)
            console.log(this.redactor_rules)
        },

        applyRedactorRule(name) {
            switch (name) {
                case 'bold':
                    this.editor.chain().focus().toggleBold().run()
                    break

                case 'italic':
                    this.editor.chain().focus().toggleItalic().run()
                    break

                case 'underline':
                    this.editor.chain().focus().toggleUnderline().run()
                    break

                case 'crossed':
                    this.editor.chain().focus().toggleStrike().run()
                    break
            }
        },

        toggleRedactorCentering(name) {
            this.redactor_centering = name

            this.editor
                .chain()
                .focus()
                .setTextAlign(name)
                .run()
        },

        createLink() {
            const url = this.new_link_url
            const text = this.new_link_text

            this.editor
                .chain()
                .focus()
                .insertContent({
                    type: 'text',
                    text: text,
                    marks: [
                        {
                            type: 'link',
                            attrs: {
                                href: url
                            }
                        }
                    ]
                })
                .run()

            this.new_link_url = ''
            this.new_link_text = ''
        },

        toggleColor(name, color) {
            if (!this.editor || !color) {
                return
            }

            if (name === 'color') {
                this.editor
                    .chain()
                    .focus()
                    .setColor(color)
                    .run()
            } else if (name === 'background') {
                this.editor
                    .chain()
                    .focus()
                    .setHighlight({
                        color: color
                    })
                    .run()
            }
        }
    }
}

</script>

<style scoped>
.conversation-panel {
    border-bottom-right-radius: 0;

}

.conversation-panel__textarea {
    min-height: 1.1rem;
    padding-bottom: 2px;
    font-size: 1.1rem;
    border-bottom: 1px solid #c6c6c6;
}

.conversation-panel__textarea :deep(.ProseMirror:focus) {
    outline: none;
}

.conversation-panel__textarea :deep(.ProseMirror a) {
    text-decoration: underline;
    text-decoration-color: transparent;
    color: #3B82F6;
    cursor: pointer;
}

.conversation-panel__textarea :deep(.ProseMirror a:hover) {
    text-decoration-color: #3B82F6;
    cursor: pointer;
}

.conversation-panel__textarea :deep(.ProseMirror a:focus) {
    text-decoration-color: transparent;
    cursor: pointer;
}


.conversation-panel__textarea :deep(.ProseMirror a:visited) {
    color: #7c3aed;
}


.conversation-panel__btn:hover {
    transition: background-color 100ms ease;
}

.conversation-panel__btn--ai {
    color: oklch(27.8% 0.033 256.848);
}

.conversation-panel__btn--ai:hover {
    color: #fff;
}

.conversation-panel__btn--ai.active {
    color: #fff;
}

.conversation-panel__btn--ai::before {
    content: "";
    position: absolute;
    width: 100%;
    border-radius: 50%;
    height: 100%;
    top: 0;
    left: 0;
    background: #1200CC;
    background-size: 300% 300%;
    /* background-image: radial-gradient(ellipse farthest-corner at center center, #1200CC 0%, #159E6A 100%); */
    background-image: linear-gradient(45deg,
            #1200CC 0%,
            #159E6A 50%,
            #1200CC 100%);
    transition: opacity 200ms ease;
    will-change: opacity;
    opacity: 0;
}

.conversation-panel__btn--ai:hover::before {
    opacity: 1;
    animation: glowing 5.8s linear infinite;
}

.conversation-panel__btn--ai.active::before {
    opacity: 1;
    animation: glowing 5.8s linear infinite;
}

.ai-block__model:active {
    transform: scale(0.95);
    transform-origin: center;
}

.conversation-panel__btn::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 4px 7px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 10;
}


.conversation-panel__btn:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-5px);
}

.conversation-panel__btn--send.active::after {
    transition: opacity 150ms ease;
    opacity: 0;
}

.conversation-panel__btn--function::before {
    content: "";
    position: absolute;
    width: 100%;
    border-radius: 50%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000027;
    transition: transform 200ms ease;
    will-change: transform;
    transform: scale(0);
    transform-origin: center;
}

.conversation-panel__btn--function.active::before {
    transform: scale(1);
}

.btn-left__wrapper {
    position: relative;
    cursor: pointer;
}

.attach-btn {
    transition: transform 500ms ease;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.attach-btn__text {
    position: absolute;
    top: 50%;
    right: -128px;
    height: 100%;
    padding: 5px 10px 5px 27px;
    display: block;
    background-color: #efefef;
    border-radius: 0 1rem 1rem 0;
    transform-origin: left;
    transform: translateY(-50%) scaleX(0);
    transition: transform 250ms ease, background-color 100ms ease;
    will-change: transform background-color;
}

.btn-left__wrapper:hover .attach-btn__text {
    transform: translateY(-50%) scaleX(1);
}

.btn-left__wrapper:hover .attach-btn {
    transform: rotate(360deg);
}

.btn-left__wrapper:active .attach-btn__text {
    background-color: #5353533f;
}

/* Animation */
@keyframes glowing {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 300% 60%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.delay-block {
    border-bottom-right-radius: 3px;
}

.delay-block__time-inputs::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    z-index: 1;
    left: 0;
    background-color: oklch(70.7% 0.022 261.325);
    transform: translateY(-50%);
}

.delay-block__input-wrapper:focus-within {
    background-color: #fff;
    border-color: oklch(70.5% 0.015 286.067)
}

.delay-enter-active {
    transition: transform 250ms ease;
    transform-origin: bottom right;
}

.delay-enter-from {
    transform: scale(0);
}

.delay-enter-to {
    transform: scale(1);
}


.delay-leave-active {
    transition: opacity 250ms ease;
}

.delay-leave-from {
    opacity: 1;
}

.delay-leave-to {
    opacity: 0;
}

.ai-block__model--gigachat-img {
    transition: transform 400ms ease;
    transform-origin: center;
    will-change: transform;
}

.ai-block__model--gigachat:hover .ai-block__model--gigachat-img {
    transform: rotate(360deg);
}

.ai-block__model:hover .ai-block__active-name--gemini {
    background: #121FCF;
    background: linear-gradient(to right, #121FCF 0%, #CF1512 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;

}

.ai-block__model-img--gemini_active {
    opacity: 0;
    transition: opacity 150ms ease 150ms;
    will-change: opacity;
}

.ai-block__model-img--gemini {
    opacity: 1;
    transition: opacity 50ms ease;
    will-change: opacity;
}

.ai-block__model:hover .ai-block__model-img--gemini {
    opacity: 0;
}

.ai-block__model:hover .ai-block__model-img--gemini_active {
    opacity: 1;
}

.ai-models-enter-active {
    transition: transform 250ms ease;
    transform-origin: top right;
}

.ai-models-enter-from {
    transform: scale(0);
}

.ai-models-enter-to {
    transform: scale(1);
}


.ai-models-leave-active {
    transition: opacity 250ms ease;
}

.ai-models-leave-from {
    opacity: 1;
}

.ai-models-leave-to {
    opacity: 0;
}

.ai-block__setting::before {
    content: "";
    position: absolute;
    width: 100%;
    border-radius: 16px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000027;
    transition: transform 200ms ease;
    will-change: transform;
    transform: scaleX(0);
    transform-origin: center center;
    pointer-events: none;
}

.ai-block__setting.active::before {
    transform: scaleX(1);
}

.ai-block-enter-active {
    transition: transform 250ms ease;
    transform-origin: bottom;
}

.ai-block-enter-from {
    transform: scaleY(0);
}

.ai-block-enter-to {
    transform: scaleY(1);
}


.ai-block-leave-active {
    transition: transform 250ms ease, opacity 100ms linear 150ms;
    transform-origin: bottom center;
}

.ai-block-leave-from {
    transform: scaleY(1);
}

.ai-block-leave-to {
    transform: scaleY(0);
}

.voise-block {
    display: grid;
}

.voise-block>* {
    grid-area: 1 / 1;
}

.record__is-recording {
    width: 15px;
    height: 15px;
    margin-top: 6px;
    margin-right: 10px;
    background-color: #fb2c36;
    border-radius: 50%;
    display: inline-block;
    /* Изменили анимацию на более плавную и добавили ease-out */
    animation: pulse-recording 2s infinite ease-out;
}

.record__is-recording {
    width: 15px;
    height: 15px;
    margin-bottom: 4px;
    margin-right: 10px;
    background-color: #fb2c36;
    border-radius: 50%;
    display: inline-block;
}

.record__is-recording.active {
    animation: blink-sharp 1s infinite steps(1, start);
}

@keyframes blink-sharp {

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }
}

/* Функционал блока текстовый редактор */

.editor__btn::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 4px 7px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.1s ease, transform 0.1s ease;
    z-index: 10;
    /*!!!! ВНИМАНИЕ повторение с data-tooltip. Вынести в отдельный класс !!!!*/
}

.editor__btn:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-5px);
}

.editor__btn.active::after {
    opacity: 0;
}

.editor__btn::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.15);
    transform: scale(0);
    transform-origin: center;
    will-change: transform;
    pointer-events: none;
    border-radius: inherit;
}

.editor__btn--text-left::before {
    display: none;
}

.editor__btn--text-left:active {
    background-color: rgba(0, 0, 0, 0.15);
}

.editor__btn.active::before {
    animation: editor-pulse 300ms cubic-bezier(.2, .9, .3, 1) forwards;
}

.editor__btn:focus {
    outline: none;
}

@keyframes editor-pulse {
    0% {
        transform: scale(0);
    }

    30% {
        transform: scale(0.5 0.5 1);
    }

    100% {
        transform: scale(1);
    }

}

.editor__window {
    opacity: 0;
    pointer-events: none;
    border-bottom-left-radius: 0;
    transition: opacity 100ms ease;
}

.editor__window.active {
    opacity: 1;
    pointer-events: all;
}


.editor__link-color::-webkit-color-swatch-wrapper {
    padding: 0;
    cursor: pointer;
    overflow: hidden;
    border: none;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
}

.editor__link-text:focus-within {
    background-color: white;
}
</style>
