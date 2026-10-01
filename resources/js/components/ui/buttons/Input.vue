<template>
    <div :class="['field relative', { active: has_value }]">
        <label :class="[
            'field__label absolute top-px left-1 pointer-events-none text-neutral-700',
            { active: has_value }
        ]" :for="id">
            {{ label }}
        </label>

        <input ref="input" :id="id" :value="modelValue" :disabled="disabled" @input="onInput" autocomplete="off"
            class="field__control p-1.5 py-0.5 border-b border-neutral-500 outline-none w-full" type="text"
            name="field-input">
    </div>
</template>

<script>
export default {
    name: 'Input',

    props: {
        label: {
            type: String,
            required: true
        },

        id: {
            type: String,
            required: true
        },

        modelValue: {
            type: String,
            default: ''
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    emits: ['update:modelValue'],

    data() {
        return {
            has_value: false
        }
    },

    methods: {
        onInput(event) {
            const value = event.target.value

            this.has_value = value !== ''

            this.$emit('update:modelValue', value)
        }
    }
}
</script>

<style scoped>
.field__label {

    transition: transform 200ms ease, color 100ms ease;
    transform-origin: left top;
    padding-left: 3px;
    will-change: transform, color;
    border-radius: 3rem;
    padding-right: 3px;

    /* background-color: white; */

}

.field::before {

    content: "";

    position: absolute;
    width: 100%;

    height: 2px;
    bottom: 0;
    left: 0;
    background-color: oklch(35.9% 0.144 278.697);

    transition: transform 200ms ease;
    transform-origin: 30%;

    transform: scaleX(0);

    will-change: transform;

}

.field.active::before {

    background-color: oklch(35.9% 0.144 278.697);

    transform: scaleX(1);

}

.field:focus-within .field__label {

    transform: translate(-3px, -16px) scale(0.9);

    color: #000000;

}

.field__label.active {

    transform: translate(-3px, -16px) scale(0.9);

    color: #000000;

}

.field:focus-within::before {

    transform: scaleX(1);

}

.field:focus-within {

    margin-top: 5px;

}

.field.active {

    margin-top: 6px;

}
</style>
