<template>
    <button @click="toggleSearch()"
        :class="['chat-panel__button p-1.25 rounded-full cursor-pointer hover:bg-[#efefef] bg-white z-2 text-black', { 'is_active': search_opened }, { 'has_value': search_has_value }]"
        type="button" aria-label="Искать сообщения в чате по дате или символам">
        <svg width="25" height="25" class="z-1 rotate-90">
            <use href="#search"></use>
        </svg>
    </button>
    <input ref="search" type="text" @input="searchValue"
        :class="['chat-panel__search absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border w-80 px-4 py-1.25 border-[#c6c6c6] outline-none rounded-l-full', { 'is_active': search_opened || search_has_value }, { 'has_value': search_has_value }]"
        placeholder="Поиск по символам или дате" />
</template>

<script>
export default {
    name: "Search",

    data() {
        return {
            search_opened: false,
            search_has_value: false,
            search_data: [['text'], ['date']],
            searchQuery: '',
        }
    },

    methods: {
        toggleSearch() {
            this.search_opened = !this.search_opened
        },

        searchValue() {
            this.searchQuery = this.$refs.search.value.trim()
            this.search_has_value = this.searchQuery !== ''
            console.log(this.search_has_value)
        },

    }
}
</script>

<style scoped>
.chat-panel__button {
    position: relative;
    display: block;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    transition: background-color 100ms ease, color 100ms ease;
}

.chat-panel__button::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    background-color: #5353533f;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 0;
    z-index: -1;
    transition: transform 550ms ease, opacity 10ms ease;
    will-change: transform, opacity;
    pointer-events: none;
}

.chat-panel__button.is_active::before {
    opacity: 1;
    transform: translate(-50%, -50%) scale(2);
}

.chat-panel__button.has_value {
    background-color: #312c85;
    color: rgb(229, 229, 229);
    /* box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3) */
}

.chat-panel__search {
    transition: transform 250ms ease;
    transform-origin: right center;
    will-change: transform;
    transform: scaleX(0);
}

.chat-panel__search.is_active {
    transform: scaleX(1);
}

.chat-panel__search.has_value {
    border-color: rgba(0, 0, 0, 0.726);
}

.chat-panel__button.has_value:active {
    background-color: rgb(96, 91, 186)
}
</style>
