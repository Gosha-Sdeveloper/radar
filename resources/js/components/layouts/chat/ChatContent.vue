<template>
    <Message name="Пользователь-нулевой" role="участник" time="26 авг. 14:14"
        body="Подскажите самые простые для изготовления, но дорогие кристаллы, что купить?" answers_count="3" audio_src="" images="[path-1, path-2]"></Message>
    <Message name="Пользователь-нулевой" role="участник" time="12 сен. 14:26" body="" audio_src="path" answers_count="1" images=""></Message>
    <!-- <Message name="Пользователь-тестовый" role="участник, 2 ур." time="26 авг. 14:18"
        body="Геоды с аметистом — выращивание синтетических аметистов относительно простое, а геоды ценятся выше обычных кристаллов."
        answers_count="0"></Message> -->
    <!-- <Message name="Пользователь-тестовый" role="участник, 1 ур." time="26 авг. 14:24"
        body="Для новичка проще всего: Висмут — плавится на обычной плитке, формируется сам.Галит (соль) — растёт быстро, но дешёвый, так что не подходит. Кварц (гидротермальный) — технология простая, но нужна автоклавная камера."
        answers_count="0"></Message> -->

    <ConversationPanel class="mt-auto"></ConversationPanel>
</template>

<script>
import Message from "../../common/chat/Message.vue";
import ConversationPanel from "../../services/chat/ConversationPanel.vue";

export default {
    name: "ChatContent",

    components: {
        Message,
        ConversationPanel
    }
}
</script>
