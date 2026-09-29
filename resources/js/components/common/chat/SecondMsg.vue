<template>
    <div class="message-content flex items-end gap-5 max-w-200">
        <div class="message-content__message message bg-white p-2 rounded-xl relative mb-3">
            <div class="message__info flex justify-between items-center mb-1">
                <button class="message__author-name font-medium leading-3">Пользователь-нулевой</button>
                <span class="message__time text-sm text-[#6E6E6E] leading-3">1 июль, 11:27</span>
            </div>
            <p class="message__content">Знаешь, это плохо, когда они с самого начала могут тренировать магическое
                убийство в сочетании с дэд-каем.</p>
            <svg class="absolute bottom-0 -right-4 z-10" width="17" height="40" color="#fff">
                <use href="#msg"></use>
            </svg>
            <div class="message-content__bottom message-functions flex items-center justify-between">
                <button
                    class="message-functions__answers cursor-pointer px-1.75 py-0.5 hover:bg-[#5353532f] active:bg-[#4343433f] rounded-full">15
                    ответов</button>
                <ul class="message-content__reactions-list flex gap-1">
                    <li class="message-content__reactions-item">
                        <button
                            class="message-content__reactions-button flex items-center gap-1 p-0.5 px-2 bg-indigo-100 hover:bg-indigo-200 cursor-pointer rounded-full">
                            <svg width="18" height="18">
                                <use href="#like"></use>
                            </svg>
                            <span class="message-content__reaction-count text-sm">21</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <img class="message-content__sender-avatar w-10 h-10 rounded-full cursor-pointer"
            src="../../../images/themes/amethysts.jpg" alt="Иконка отправителя">
    </div>
</template>

<script>
export default {
    name: "SecondMsg",


}
</script>


<style scoped>
.message-content__message {
    border-bottom-right-radius: 0;
}
</style>
