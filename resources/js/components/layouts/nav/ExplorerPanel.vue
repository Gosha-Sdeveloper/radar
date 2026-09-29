<template>
    <div class="explorer-panel w-90 flex flex-col items-start">
        <div>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
        </div>
    </div>


</template>

<script>
import Item from '../../common/nav/Item.vue';

export default {
    name: "ExplorerPanel",

    components: {
        Item,
    },
}
</script>

<style scoped>

</style>
