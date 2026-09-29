<template>
    <button
        class="button-more flex items-center gap-4 p-1 pr-2 px-3 rounded-b-xl bg-blue-900 text-white w-full justify-between cursor-pointer hover:bg-indigo-900 self-end">
        <span class="font-medium z-2">Подробнее</span>
        <svg class="z-2 arrow size-6 transition-transform group-hover:translate-x-1">
            <use href="#arrow-right"></use>
        </svg>
    </button>
</template>

<!-- <LinkMore></LinkMore> Вызов компонентаы -->

<script>
export default {
    name: "LinkMore",
}
</script>

<style scoped>
.button-more {
    position: relative;
    transition: background-color 150ms linear
}

.button-more::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    z-index: 0;
    left: 0;
    transform: translateY(-50%);
    background: linear-gradient(180deg, #312c85 0%, oklch(49% 0.22 262.88) 100%);
    border-radius: 0.75rem;
    transition: background 150ms linear, opacity 150ms ease;
    opacity: 0;
}

.button-more:active::before {
    opacity: 1;
}

.arrow {
    transform-origin: center;
    transition: transform 0.3s ease;
}

.button-more:hover .arrow {
    transform: rotateZ(-20deg) scale(1.1);
}
</style>
