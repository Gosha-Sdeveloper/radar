<template>
    <div class="home-content__more-wrapper relative">
        <button
            class="home-content__more mx-auto flex items-center gap-1 px-9 py-1 rounded-full  bg-[#efefef]  hover:bg-[#dbdbdb] active:bg-[#c6c6c6] cursor-pointer">
            <span class="home-content__more-text">Больше</span>
            <svg class="home-content__more-icon" width="15" height="15" aria-hidden>
                <use href="#open-btn"></use>
            </svg>
        </button>
    </div>
</template>

<script>

export default {
    name: "More",
}
</script>

<style scoped>
.home-content__more-wrapper::before {
    content: "";
    width: 100%;
    position: absolute;
    z-index: -1;
    top: 50%;
    transform: translateY(-50%);
    height: 1px;
    background: #c6c6c6;
}

</style>
