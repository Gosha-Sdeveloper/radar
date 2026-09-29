<template>
    <div class="action-msg flex items-center gap-1 px-2 py-1.5 bg-black rounded-lg fixed left-1.5 bottom-1.5 z-5">
        <svg v-if="image_src === ''" class="action-msg__icon text-white" width="24" height="24">
            <use href="#info"></use>
        </svg>

        <img class="action-msg__image w-18 h-8 rounded-md mr-1" v-if="image_src !== ''"
            src="../../../../images/themes/blue-black.jpg" alt="...">
        <span class="action-msg__title text-white">{{ title }}</span>

        <p class="action-msg__text text-[#A8A8A8]">
            {{ text }}
        </p>
    </div>

</template>

<script>
export default {
    name: "ActionMsg",

    props: {
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },

        image_src: {
            type: String,
            required: true,
            default: '',
        }
    }
}
</script>

<style scoped>
.action-msg {
    opacity: 0;
}

.action-msg.opened {
    animation: card-action 3600ms cubic-bezier(0.4, 0, 0.1, 1);
}

@keyframes card-action {
    0% {
        opacity: 0;
        transform: translate(0, 0) scale(0.95);
    }

    15% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }

    65% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }

    75% {
        opacity: 1;
    }


    100% {
        opacity: 0;
        transform: translate(40px, 90px) rotate(6deg) scale(1.05);
    }
}
</style>
