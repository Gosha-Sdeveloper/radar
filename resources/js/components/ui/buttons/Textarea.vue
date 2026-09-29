<template>
    <div class="field relative">
        <label :class="['field__label absolute top-0 left-1 pointer-events-none text-[#6E6E6E]/60', { active: has_value }]"
            for="field-input">{{ label }}</label>

        <textarea v-model="message" @input="onInput" id="field-input" :disabled="disabled" maxlength="250" autocomplete="off"
            class="field__control p-1.5 pt-2 py-0.5 border border-[#c6c6c6] outline-none w-full rounded-lg h-40 leading-[1.15]"
            name="field-input"></textarea>

        <span class="field__count absolute bottom-1.5 right-1.5 border-[#c6c6c6] text-sm">
            {{ message_length }}/250
        </span>
    </div>
</template>

<script>
export default {
    props: ['label', 'disabled'],
    data() {
        return {
            message: '',
            has_value: false,
            message_length: 0,
        }
    },
    methods: {
        onInput(event) {
            const value = event.target.value
            this.message = value
            this.message_length = value.length
            this.has_value = value !== ''
        }
    }
}
</script>

<style scoped>
.field__label {
    transition: transform 200ms ease, color 100ms ease;
    transform-origin: left top;
    will-change: transform, color;
    padding-right: 3px;

}

.field:focus-within .field__label {
    transform: translate(6px, -12px) scale(0.9);
    background-color: white;
    color: #000000;
}

.field__label.active {
    transform: translate(6px, -12px) scale(0.9);
    background-color: white;
    color: #000000;
}

.field__control {
    resize: none;
    transition: border-color 250ms ease;
    appearance: none;
}

.field:focus-within .field__control {
    border: 2px solid oklch(35.9% 0.144 278.697)
}
</style>
