<template>
    <li class="themes__item theme relative rounded-xl overflow-hidden h-36 flex flex-col">
        <img class="theme__preview-img absolute inset-0 w-full h-full object-cover z-0"
            src="../../../../images/themes/green-light.jpg" alt="Изображение темы">

        <div class="theme__info relative z-10 mt-auto">
            <div class="theme__textcontent px-2 mb-1">
                <h3 class="theme__title text-lg text-white leading-1 mb-1">Летсплеи и видеоигры</h3>

                <div class="theme__meta text-sm text-gray-400 flex items-center gap-1">
                    <span>23 канала</span>
                    <svg width="3" height="3" class="fill-current text-gray-400">
                        <use href="#point"></use>
                    </svg>
                    <span>310 видео</span>
                </div>
            </div>

            <LinkMore class="z-20"></LinkMore>

        </div>
    </li>



</template>

<script>
import LinkMore from "../../ui/buttons/LinkMore.vue"
export default {
    name: "Theme",

    components: {
        LinkMore,
    }
}

</script>

<style scoped>
.themes__item::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.523);
    z-index: 2;
    transform-origin: center;
}
</style>
