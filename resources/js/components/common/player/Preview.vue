<template>
    <li class="chanels__item chanel flex flex-col items-center rounded-xl px-2 py-1 cursor-pointer">
        <img class="chenel__avatar w-16 h-16 rounded-full mb-1" src="../../../../images/themes/green-middle.jpg"
            alt="Аватар канала">
        <h4 class="chanel__title font-medium leading-4">Название канала</h4>
        <span class="chanel__meta text-xs mb-2">12 тыс. подписчиков</span>
        <a href="#" class="chanel__btn flex items-center gap-1 px-2.5 py-1 bg-[#efefef] hover:bg-[#dbdbdb] active:bg-[#c6c6c6] rounded-full">
            <span class="chanel__btn-text">Перейти</span>
            <svg width="16" height="16">
                <use href="#move"></use>
            </svg>
        </a>
    </li>
</template>

<script>
export default {
    name: "Preview",
}
</script>

<style scoped>
.chanels__item:hover {
    background-color: #efefef;
}

</style>
