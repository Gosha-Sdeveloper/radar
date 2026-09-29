<template>
    <div
        class="warning max-w-120 px-3 py-2 rounded-lg bg-white flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div class="warning__header flex items-center justify-between">
            <span class="warning__title font-medium text-lg leading-tight">{{ title }}</span>
            <button @click="closeWarning()"
                class="warning__close-btn p-1 rounded-full transition-colors duration-100 hover:bg-[#efefef] cursor-pointer border border-transparent active:border-[#c6c6c6]"
                aria-label="Закрыть окно">
                <svg width="26" height="26" aria-hidden="true">
                    <use href="#close"></use>
                </svg>
            </button>
        </div>
        <p class="warning__description text-sm text-[#6E6E6E] mb-4">{{ description }}</p>
        <div class="warning__buttons flex items-center gap-0.5 ml-auto">
            <button @click="closeWarning()"
                class="warning__btn  px-3 py-1 hover:bg-[#efefef] active:bg-[#5353532f] rounded-full cursor-pointer">Отмена</button>
            <button
                class="warning__btn px-3 py-1 bg-black text-white rounded-full hover:opacity-80 active:opacity-60 cursor-pointer">{{ btn_text }}</button>
        </div>
    </div>

</template>

<script>

export default {
    name: "WarningPopup",

    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        btn_text: {
            type: String,
            required: true
        }
    },

    methods: {
        closeWarning() {
            this.$emit('close-warning')
        }
    }
}
</script>
