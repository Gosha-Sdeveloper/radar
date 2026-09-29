<template>

    <div :class="['grid h-full min-h-0', panel_hidden ? 'grid-cols-[70px_1fr]' : 'grid-cols-[300px_1fr]']">
        <Nav @toggle-panel="panel_hidden = !panel_hidden"></Nav>
        <div class="content flex flex-col px-8 pt-2">
            <ChatContent></ChatContent>
        </div>
    </div>
</template>

<script>
import Nav from '../layouts/nav/Nav.vue';
import ChatContent from '../layouts/chat/ChatContent.vue';


export default {
    name: "Chat",

    components: {
        Nav,
        ChatContent,
    },

        data() {
        return {
            panel_hidden: false,
        }
    },

}
</script>
