<template>
    <div class="about-chanel-wrapper px-1 py-1 ">
        <h2 class="about-chanel__title text-xl font-medium mb-2">Главная</h2>
        <div class="about-chanel__main w-full grid grid-cols-2 shadow-md rounded-xl mb-2  border border-[#c6c6c6] ">
            <a class="about-chanel__video-link relative" href="#">
                <img class="about-chanel__video-img w-full h-90 rounded-xl"
                    src="../../../../images/themes/green-black.jpg" alt="Фоновая изображение канала">
                <div
                    class="about-chanel__video-decoration absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-18 h-18 bg-black/30  backdrop-blur-xs hover:bg-black/60">
                    <svg class="about-chanel__video-icon text-white pl-1" width="32" height="32">
                        <use href="#play-media"></use>
                    </svg>
                </div>
            </a>

            <div class="about-chanel__content flex flex-col rounded-r-xl w-full h-90 p-3">
                <div class="about-chanel__content-top flex justify-between">
                    <h3 class="about-chanel__title text-lg font-medium">О канале</h3>
                    <div class="about-chanel__parcel flex items-center gap-2 mb-1">
                        <button
                            class="about-chanel__parcel-btn p-0.5 rounded-full bg-[#efefef] hover:bg-[#5353533f] cursor-pointer">
                            <svg class="" width="20" height="20">
                                <use href="#arrow-left"></use>
                            </svg>
                        </button>
                        <div class="about-chanel__counts flex items-center gap-1">
                            <button class="about-chanel__parcel-count cursor-pointer hover:underline ">1</button>
                            <button class="about-chanel__parcel-count cursor-pointer hover:underline">2</button>
                            <button class="about-chanel__parcel-count cursor-pointer hover:underline">3</button>
                            <button class="about-chanel__parcel-count cursor-pointer hover:underline">4</button>
                        </div>

                        <button
                            class="about-chanel__parcel-btn p-0.5 rounded-full bg-[#efefef] hover:bg-[#5353533f] cursor-pointer">
                            <svg class="z-0" width="20" height="20">
                                <use href="#arrow-right"></use>
                            </svg>
                        </button>
                    </div>
                </div>
                <p class="about-chanel__text text-[#6E6E6E]">Организация посвящена тому, чтобы люди узнали о современном
                    кристаллическом лазерном заводе и понимали о том, из чего в основном делают процессоры, электронные
                    устройства, энергоносители, а также украшения. Нельзя не сказать о том, что проект сделан для
                    обучения молодёжи.кристаллическом лазерном заводе и понимали о том, из чего в основном делают
                    процессоры, электронные устройства, энергоносители, а также украшения. Нельзя не сказать о том, что
                    проект сделан для обучения молодёжи.</p>
                <div
                    :class="['about-chanel__share flex items-center justify-between pl-2.5 pr-1 py-1 rounded-full border border-[#c6c6c6] mt-auto', link_shared]">
                    <span
                        :class="['about-chanel__share-text px-1 rounded-md outline', link_shared ? ' outline-black' : 'outline-transparent']">https:radar.ru/chanel/h2efrf34qwfdsd/about</span>
                    <button @click="copyChanelLink()"
                        :class="['about-chanel__share-btn share-btn w-34 h-8 py-1 px-3 rounded-full cursor-pointer active:opacity-80 transition-colors duration-300 relative', link_shared ? 'bg-black hover:opacity-100' : 'bg-indigo-900 hover:opacity-90']">

                        <span :class="['share-btn__title text-white', link_shared ? 'menu-closed' : 'menu-opened']">
                            Поделиться
                        </span>

                        <div
                            :class="['share-btn__copied text-white flex items-center gap-1', !link_shared ? 'menu-closed' : 'menu-opened']">
                            <svg width="20" height="20">
                                <use href="#checked"></use>
                            </svg>
                            <span>Скопировано</span>
                        </div>

                    </button>
                </div>
            </div>
        </div>
        <section class="about-chanel__advertisement-section mb-2">
            <h2 class="about-chanel__title text-xl font-medium mb-2">Реклама от спонсоров канала и площадки</h2>
            <!-- <p>Рекламный лист сломан, нужно найти причину, ниже строка</p> -->
            <ul class="about-chanel__advertisement-list flex gap-1 min-w-0 max-w-full overflow-x-auto">

                <li class="advertisement-list__item w-95   shrink-0 rounded-xl p-1.5">
                    <a class="advertisement-list__link flex items-center gap-2.5" href="#">
                        <img class="advertisement-list__banner-img w-16 h-16 rounded-xl"
                            src="../../../../images/themes/red.jpg" alt="Картинка рекламного баннера">
                        <div class="advertisement-list__link-container flex flex-col">
                            <h5
                                class="advertisement-list__banner-title font-medium text-[#4e4e4e] leading-4 transition-colors duration-100 ease-in">
                                Искуственные рубины по выгодным ценам</h5>
                            <p class="advertisement-list__banner-descr text-sm text-[#6E6E6E]">Покупайте дёшево,
                                покупайте оптом на rubinmagazin.ru</p>
                        </div>
                    </a>
                </li>
                <li class="advertisement-list__item w-95   shrink-0 rounded-xl p-1.5">
                    <a class="advertisement-list__link flex items-center gap-2.5" href="#">
                        <img class="advertisement-list__banner-img w-16 h-16 rounded-xl"
                            src="../../../../images/themes/red.jpg" alt="Картинка рекламного баннера">
                        <div class="advertisement-list__link-container flex flex-col">
                            <h5
                                class="advertisement-list__banner-title font-medium text-[#4e4e4e] leading-4 transition-colors duration-100 ease-in">
                                Искуственные рубины по выгодным ценам</h5>
                            <p class="advertisement-list__banner-descr text-sm text-[#6E6E6E]">Покупайте дёшево,
                                покупайте оптом на rubinmagazin.ru</p>
                        </div>
                    </a>
                </li>


                <li class="advertisement-list__item w-95  shrink-0  rounded-xl p-1.5">
                    <a class="advertisement-list__link flex items-center gap-2.5" href="#">
                        <img class="advertisement-list__banner-img w-16 h-16 rounded-xl"
                            src="../../../../images/themes/red.jpg" alt="Картинка рекламного баннера">
                        <div class="advertisement-list__link-container flex flex-col">
                            <h5 class="advertisement-list__banner-title font-medium text-[#4e4e4e] leading-4">
                                Искуственные рубины по выгодным ценам</h5>
                            <p class="advertisement-list__banner-descr text-sm text-[#6E6E6E]">Покупайте дёшево,
                                покупайте оптом на rubinmagazin.ru</p>
                        </div>
                    </a>
                </li>
            </ul>
        </section>

        <footer class="about-chanel__footer footer">
            <h2 class="about-chanel__title text-xl font-medium mb-2">Дополнительая информация</h2>
            <div class="footer__info grid grid-cols-3">
                <div class="footer__info-block info-block flex flex-col gap-2">
                    <a class="info-block__item inline-flex items-center gap-1" href="#">
                        <svg width="22" height="22">
                            <use href="#phone"></use>
                        </svg>
                        <span>+7-(911)-337-49-85</span>
                    </a>
                    <a class="info-block__item inline-flex items-center gap-1" href="#">
                        <svg width="22" height="22">
                            <use href="#email"></use>
                        </svg>
                        <span class="text-lg">cristall.warehouse@mail.ru</span>
                    </a>
                    <a class="info-block__item inline-flex items-center gap-1" href="#">
                        <svg width="22" height="22">
                            <use href="#group"></use>
                        </svg>
                        <span class="text-lg">3 группы</span>
                    </a>

                    <a class="info-block__item inline-flex items-center gap-1" href="#">
                        <svg width="22" height="22">
                            <use href="#user"></use>
                        </svg>
                        <span class="text-lg">12 администраторов</span>
                    </a>

                </div>
                <div class="footer__info-block info-block flex flex-col gap-2">
                    <div class="info-block__item inline-flex items-center gap-1 cursor-default">
                        <svg width="22" height="22">
                            <use href="#science"></use>
                        </svg>
                        <span class="text-lg">Научный канал</span>
                    </div>
                    <div class="info-block__item inline-flex items-center gap-1 cursor-default">
                        <svg width="22" height="22">
                            <use href="#country"></use>
                        </svg>
                        <span class="text-lg">Российская Федерация (ru)</span>
                    </div>
                    <div class="info-block__item inline-flex items-center gap-1 cursor-default">
                        <svg width="22" height="22">
                            <use href="#media"></use>
                        </svg>
                        <span class="text-lg">31 видео, 12 статей</span>
                    </div>
                    <div class="info-block__item inline-flex items-center gap-1 cursor-default">
                        <svg width="22" height="22">
                            <use href="#views"></use>
                        </svg>
                        <span class="text-lg"> 150 млн. просмотров</span>
                    </div>
                </div>
                <div class="footer__info-block info-block flex flex-col gap-2">
                    <a class="info-block__item inline-flex items-center gap-1.5 bg-[#efefef] px-1 py-0.5 rounded-full"
                        href="#">
                        <svg class="rounded-full" width="22" height="22">
                            <use href="#ozon"></use>
                        </svg>
                        <span class="text-center">Ozon: https//ozon.ru/shop/dkfjsdwew2383fefdg/show</span>
                    </a>
                    <a class="info-block__item inline-flex items-center gap-1.5 bg-[#efefef] px-1 py-0.5 rounded-full"
                        href="#">
                        <svg class="rounded-full" width="22" height="22">
                            <use href="#dzen"></use>
                        </svg>
                        <span class="text-center">Dzen: https//dsen.ru/dkfjsdwew2383fefdg/show</span>
                    </a>
                    <a class="info-block__item inline-flex items-center gap-1.5 bg-[#efefef] px-1 py-0.5 rounded-full"
                        href="#">
                        <svg class="rounded-full" width="22" height="22">
                            <use href="#tiktok"></use>
                        </svg>
                        <span class="text-center">TikTok: https//tiltok.ru/dkfjsdwew2383fefdg</span>
                    </a>
                </div>
            </div>

        </footer>
    </div>

</template>

<script>
export default {
    name: "AboutChanel",

    data() {
        return {
            link_shared: false,
        }
    },

    methods: {
        copyChanelLink() {
            this.link_shared = true
            navigator.clipboard.writeText('https:radar.ru/chanel/h2efrf34qwfdsd/about')
            setTimeout(() => {
                this.link_shared = false
            }, 1500);
        }
    }
}
</script>

<style scoped>
.share-btn__title,
.share-btn__copied {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .15s;
    white-space: nowrap;
}

.advertisement-list__item {
    transition: border-color 100ms ease;
}

.advertisement-list__item:hover {
    border-color: #6E6E6E;
}

.about-chanel__video-link:hover .about-chanel__video-decoration {
    background-color: rgb(0, 0, 0, 0.4);
}
</style>
