<template>
    <section class="community grid grid-cols-1 p-2">
        <h2 class="community__title text-xl font-medium mb-2">Похожие каналы</h2>
        <ul class="community-chanels grid grid-cols-6 mb-9">
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>

        </ul>
        <h2 class="community__title text-xl font-medium mb-2">Группы по этой теме</h2>
        <ul class="community-groups grid grid-cols-6">
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
            <Preview></Preview>
        </ul>
    </section>
</template>

<script>
import Preview from '../../common/player/Preview.vue';

export default {
    name: "Community",

    components: {
        Preview
    }
}
</script>
