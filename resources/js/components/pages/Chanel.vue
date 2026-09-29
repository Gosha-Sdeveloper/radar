<template>

    <div :class="['grid h-full min-h-0', panel_hidden ? 'grid-cols-[70px_1fr]' : 'grid-cols-[300px_1fr]']">
        <Nav @toggle-panel="panel_hidden = !panel_hidden"></Nav>
        <div class="content">
            <ChanelPageFunctions></ChanelPageFunctions>
        </div>
    </div>
</template>

<script>
import ChanelPageFunctions from '../layouts/chanel/ChanelPageFunctions.vue';
import Nav from '../layouts/nav/Nav.vue';


export default {
    name: "Chanel",

    data() {
        return {
            panel_hidden: false,
        }
    },

    components: {
        Nav,
        ChanelPageFunctions,
    }
}
</script>
