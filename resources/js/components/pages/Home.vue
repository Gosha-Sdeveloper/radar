<template>
    <div class="chat flex flex-col h-screen scrollbar-hidden overflow-x-hidden">
        <!-- <MainPageFunctions></MainPageFunctions> -->
        <!-- Для канала и главной и видеоплеера и аддинки (шапка веб-приложения) -->
        <!-- Для чата -->
        <ChatPageFunctions></ChatPageFunctions>

        <div class="">
            <!-- Для чата -->
            <Chat></Chat>
            <!-- Для канала -->
            <!-- <MainContent></MainContent> -->
            <!-- <Chanel></Chanel> -->
            <!-- <Player></Player> -->

        </div>

    </div>

</template>
<script>
import ChatPageFunctions from '../layouts/chat/ChatPageFunctions.vue';
import MainPageFunctions from '../layouts/home/MainPageFunctions.vue';

import Chat from "../pages/Chat.vue"
import Chanel from './Chanel.vue';
import MainContent from "../layouts/home/MainContent.vue"
import Player from './Player.vue';


export default {
    name: "Home",

    components: {
        // Шапка (header)
        MainPageFunctions,
        ChatPageFunctions,

        // Контент (body)
        Chanel,
        Chat,
        MainContent,
        Player,
    },
}
</script>

<style scoped>
.chat {
    background-image: url("../../../images/themes/blue-black.jpg");
}

.content {
    overflow-y: auto;
}
</style>
