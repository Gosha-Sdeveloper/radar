<template>
    <div class="switch__wrapper" role="checkbox">
        <input class="visually-hidden switch__input" type="checkbox" :id="id" v-model="model" :disabled="disabled">
        <label class="switch__slider" :for="id"></label>
    </div>
</template>

<!-- Использование  <Switch id="dark-mode" v-model="darkMode" /> -->
<script>
export default {
    name: "Switch",

    props: {
        id: {
            type: String,
            required: true
        },

        disabled: {
            type: Boolean,
            default: false
        },

        modelValue: {
            type: [Boolean, Array],
            default: false
        },
    },

    computed: {
        model: {
            get() { return this.modelValue },
            set(val) { this.$emit('update:modelValue', val) }
        }
    }
}
</script>

<style scoped>
.switch__wrapper {
    display: inline-block;
    position: relative;
    width: 2.5rem;
    height: 1.5rem;
}

.switch__slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    border-radius: 30px;
    background: transparent;
    border: 1px solid #99a1af;
    transition: transform 250ms ease, background-color 250ms ease;
}

.switch__slider::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: center left;
    left: 0.12rem;
    width: 1.05rem;
    height: 1.05rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, .8);
    transition: 250ms ease;
}

.switch__wrapper:hover .switch__slider::before {
    transform: translateY(-50%) scale(1.2);
}

.switch__input:checked+.switch__slider {
    background-color: oklch(35.9% 0.144 278.697);
    border-color: oklch(35.9% 0.144 278.697);
}

.switch__input:checked+.switch__slider::before {
    transform: translate(1.1rem, -50%);
    background-color: #fff;
}
</style>
