<template>
    <div :class="['grid h-full min-h-0', panel_hidden ? 'grid-cols-[70px_1fr]' : 'grid-cols-[300px_1fr]']">
        <Nav @toggle-panel="panel_hidden = !panel_hidden"></Nav>
        <section class="home__content home-content mx-1 my-0.5 bg-white rounded-xl backdrop-blur-xs p-1">
            <div class="home-content__last-news mb-3">
                <div class="home-content__section-performance flex items-center justify-between px-1 mb-2">
                    <h2 class="home-content__videos-title flex items-center gap-1">
                        <svg class="home-content__section-icon" width="24" height="24">
                            <use href="#news"></use>
                        </svg>
                        <span class="home-content__section-title text-lg font-medium">Последние новости</span>
                    </h2>
                    <button
                        class="home-content__section-hide p-0.75 rounded-full bg-[#efefef] border border-[#c6c6c6] cursor-pointer hover:bg-[#9696963f]"
                        aria-label="Скрыть раздел" title="Скрыть раздел">
                        <svg class="home-content__hide-icon" width="22" height="22" aria-hidden>
                            <use href="#hide"></use>
                        </svg>
                    </button>
                </div>
                <ul class="home-content__news grid grid-cols-4 gap-2">
                    <Card title="Кристаллы запускаются. Основные принципы" name="Кристаллический лазерный завод"
                        description="Первые импульсы пробуждают материю и задают направление роста. Энергия собирается в ядре и формирует будущую структуру. Каждый кристалл следует своему уникальному алгоритму рождения."
                        raiting="4.1" views="61 тыс." date="2 нед. назад" time="12:23"></Card>
                    <Card title="Рождение структуры" name="Кристаллический лазерный завод"
                        description="Молекулы выстраиваются в упорядоченные цепи, создавая первичную форму. Контуры постепенно проявляются, становясь всё более чёткими."
                        raiting="4.3" views="350 тыс." date="1.5 мес назад" time="12:23"></Card>
                    <Card title="Кристаллический шторм" name="Кристаллический лазерный завод"
                        description="Энергия вспыхивает, создавая вихри частиц и света. В этом хаосе рождаются самые редкие формы структуры."
                        raiting="4.9" views="257 тыс." date="3 мес назад" time="12:23"></Card>
                    <Card title="Сердце реактора. Главный механизм в выращивании кристаллов"
                        name="Кристаллический лазерный завод"
                        description="Внутренний узел управляет потоками энергии и температурой. Именно здесь зарождается стабильность будущего кристалла."
                        raiting="3.7" views="25 тыс." date="6 мес назад" time="12:23"></Card>
                </ul>
            </div>

            <div class="home-content__entertaining-video">
                <div class="home-content__section-performance flex items-center justify-between px-1 mb-2">
                    <h2 class="home-content__videos-title flex items-center gap-1">
                        <svg class="home-content__section-icon" width="24" height="24">
                            <use href="#congratulations"></use>
                        </svg>
                        <span class="home-content__section-title text-lg font-medium">Развлекательные видео</span>
                    </h2>
                    <button
                        class="home-content__section-hide p-0.75 rounded-full bg-[#efefef] border border-[#c6c6c6] cursor-pointer hover:bg-[#9696963f]"
                        aria-label="Скрыть раздел" title="Скрыть раздел">
                        <svg class="home-content__hide-icon" width="22" height="22" aria-hidden>
                            <use href="#hide"></use>
                        </svg>
                    </button>
                </div>
                <ul class="home-content__videos grid grid-cols-4 gap-2 gap-y-2.5 mb-2.5">
                    <Card title="Кристаллы запускаются. Основные принципы" name="Кристаллический лазерный завод"
                        description="Первые импульсы пробуждают материю и задают направление роста. Энергия собирается в ядре и формирует будущую структуру. Каждый кристалл следует своему уникальному алгоритму рождения."
                        raiting="4.1" views="61 тыс." date="2 нед. назад" time="12:23"></Card>
                    <Card title="Рождение структуры" name="Кристаллический лазерный завод"
                        description="Молекулы выстраиваются в упорядоченные цепи, создавая первичную форму. Контуры постепенно проявляются, становясь всё более чёткими."
                        raiting="4.3" views="350 тыс." date="1.5 мес назад" time="12:23"></Card>
                    <Card title="Кристаллический шторм" name="Кристаллический лазерный завод"
                        description="Энергия вспыхивает, создавая вихри частиц и света. В этом хаосе рождаются самые редкие формы структуры."
                        raiting="4.9" views="257 тыс." date="3 мес назад" time="12:23"></Card>
                    <Card title="Сердце реактора. Главный механизм в выращивании кристаллов"
                        name="Кристаллический лазерный завод"
                        description="Внутренний узел управляет потоками энергии и температурой. Именно здесь зарождается стабильность будущего кристалла."
                        raiting="3.7" views="25 тыс." date="6 мес назад" time="12:23"></Card>
                    <Card title="Лаборатория света" name="Кристаллический лазерный завод"
                        description="Потоки фотонов освещают процессы формирования материи. Световые спектры регулируют рост и чистоту кристаллов."
                        raiting="4.0" views="132 тыс." date="7 мес назад" time="12:23"></Card>
                    <Card title="Сборочный конвейер. Доступная работа каждому" name="Кристаллический лазерный завод"
                        description="Автоматизированные модули собирают элементы в единое целое. Процесс понятен, безопасен и открыт для любого участника."
                        raiting="4.0" views="57 тыс." date="9 мес назад" time="12:23"></Card>
                    <Card title="Геометрия идеала" name="Кристаллический лазерный завод"
                        description="Линии, углы и плоскости сходятся в безупречную симметрию. Каждый элемент подчинён строгим законам формы. Так проявляется совершенство, к которому стремится материя."
                        raiting="3.5" views="17 тыс." date="1 год назад" time="12:23"></Card>
                    <Card title="Транспортный отсек" name="Кристаллический лазерный завод"
                        description="Готовые кристаллы проходят финальную проверку и упаковку. Система бережно перемещает их к месту назначения. Это точка, где завершённый продукт отправляется в путь."
                        raiting="3.5" views="17 тыс." date="1 год назад" time="12:23"></Card>

                </ul>
                <More></More>
            </div>

            <div class="home-content__themes mb-3">
                <div class="home-content__section-performance flex items-center justify-between px-1 mb-2">
                    <a href="#" class="home-content__videos-title flex items-center gap-1">
                        <svg class="home-content__section-icon" width="24" height="24">
                            <use href="#hashtag"></use>
                        </svg>
                        <span class="home-content__section-title text-lg font-medium">Популярные темы</span>
                    </a>
                    <button
                        class="home-content__section-hide p-0.75 rounded-full bg-[#efefef] border border-[#c6c6c6] cursor-pointer hover:bg-[#9696963f]"
                        aria-label="Скрыть раздел" title="Скрыть раздел">
                        <svg class="home-content__hide-icon" width="22" height="22" aria-hidden>
                            <use href="#hide"></use>
                        </svg>
                    </button>
                </div>

                <ul class="themes grid grid-cols-4 gap-2">
                    <Theme></Theme>
                    <Theme></Theme>
                    <Theme></Theme>
                    <Theme></Theme>
                </ul>
            </div>

            <div class="home-content__useful-videos">
                <div class="home-content__section-performance flex items-center justify-between px-1 mb-2">
                    <h2 class="home-content__videos-title flex items-center gap-1">
                        <svg class="home-content__section-icon" width="24" height="24">
                            <use href="#lamp"></use>
                        </svg>
                        <span class="home-content__section-title text-lg font-medium">Полезные видео</span>
                    </h2>
                    <button
                        class="home-content__section-hide p-0.75 rounded-full bg-[#efefef] border border-[#c6c6c6] cursor-pointer hover:bg-[#9696963f]"
                        aria-label="Скрыть раздел" title="Скрыть раздел">
                        <svg class="home-content__hide-icon" width="22" height="22" aria-hidden>
                            <use href="#hide"></use>
                        </svg>
                    </button>
                </div>

                <ul class="home-content__videos grid grid-cols-4 gap-2 gap-y-2.5 mb-2.5">
                    <Card title="Кристаллы запускаются. Основные принципы" name="Кристаллический лазерный завод"
                        description="Первые импульсы пробуждают материю и задают направление роста. Энергия собирается в ядре и формирует будущую структуру. Каждый кристалл следует своему уникальному алгоритму рождения."
                        raiting="4.1" views="61 тыс." date="2 нед. назад" time="12:23"></Card>
                    <Card title="Рождение структуры" name="Кристаллический лазерный завод"
                        description="Молекулы выстраиваются в упорядоченные цепи, создавая первичную форму. Контуры постепенно проявляются, становясь всё более чёткими."
                        raiting="4.3" views="350 тыс." date="1.5 мес назад" time="12:23"></Card>
                    <Card title="Кристаллический шторм" name="Кристаллический лазерный завод"
                        description="Энергия вспыхивает, создавая вихри частиц и света. В этом хаосе рождаются самые редкие формы структуры."
                        raiting="4.9" views="257 тыс." date="3 мес назад" time="12:23"></Card>
                    <Card title="Сердце реактора. Главный механизм в выращивании кристаллов"
                        name="Кристаллический лазерный завод"
                        description="Внутренний узел управляет потоками энергии и температурой. Именно здесь зарождается стабильность будущего кристалла."
                        raiting="3.7" views="25 тыс." date="6 мес назад" time="12:23"></Card>
                    <Card title="Лаборатория света" name="Кристаллический лазерный завод"
                        description="Потоки фотонов освещают процессы формирования материи. Световые спектры регулируют рост и чистоту кристаллов."
                        raiting="4.0" views="132 тыс." date="7 мес назад" time="12:23"></Card>
                    <Card title="Сборочный конвейер. Доступная работа каждому" name="Кристаллический лазерный завод"
                        description="Автоматизированные модули собирают элементы в единое целое. Процесс понятен, безопасен и открыт для любого участника."
                        raiting="4.0" views="57 тыс." date="9 мес назад" time="12:23"></Card>
                    <Card title="Геометрия идеала" name="Кристаллический лазерный завод"
                        description="Линии, углы и плоскости сходятся в безупречную симметрию. Каждый элемент подчинён строгим законам формы. Так проявляется совершенство, к которому стремится материя."
                        raiting="3.5" views="17 тыс." date="1 год назад" time="12:23"></Card>
                    <Card title="Транспортный отсек" name="Кристаллический лазерный завод"
                        description="Готовые кристаллы проходят финальную проверку и упаковку. Система бережно перемещает их к месту назначения. Это точка, где завершённый продукт отправляется в путь."
                        raiting="3.5" views="17 тыс." date="1 год назад" time="12:23"></Card>

                </ul>
                <More></More>
            </div>

            <div class="home-content__chanels-block">
                <div class="home-content__section-performance flex items-center justify-between px-1 mb-2">
                    <h2 class="home-content__videos-title flex items-center gap-1">
                        <svg class="home-content__section-icon" width="24" height="24">
                            <use href="#chanel"></use>
                        </svg>
                        <span class="home-content__section-title text-lg font-medium cursor-pointer">Каналы</span>
                    </h2>
                    <button
                        class="home-content__section-hide p-0.75 rounded-full bg-[#efefef] border border-[#c6c6c6] cursor-pointer hover:bg-[#9696963f]"
                        aria-label="Скрыть раздел" title="Скрыть раздел">
                        <svg class="home-content__hide-icon" width="22" height="22" aria-hidden>
                            <use href="#hide"></use>
                        </svg>
                    </button>
                </div>
                <ul class="home-content__chanels grid grid-cols-5">
                    <Preview></Preview>
                    <Preview></Preview>
                    <Preview></Preview>
                    <Preview></Preview>
                    <Preview></Preview>

                </ul>
            </div>

        </section>
    </div>
</template>

<script>
import Card from '../../common/player/Card.vue';
import Nav from '../nav/Nav.vue';
import More from '../../ui/home/More.vue';
import Theme from '../../common/player/Theme.vue'
import Preview from '../../common/player/Preview.vue';

export default {
    name: "MainContent",

    components: {
        Nav,
        Card,
        More,
        Theme,
        Preview,
    },

    data() {
        return {
            panel_hidden: false,
        }
    }
}
</script>
