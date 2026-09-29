<template>
    <!-- Добавлено двоеточие перед aria-checked, чтобы значение было динамическим -->
    <div class="checkbox" role="checkbox" :aria-checked="modelValue">
        <input class="checkbox-input" type="checkbox" :id="id" :value="value" v-model="model" :disabled="disabled">
        <label class="checkbox-label text-base" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<script>
export default {
    name: "Checkbox",
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
            type: [Boolean, Array],
            default: false
        },
        value: {
            type: [String, Number, Object],
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
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
.checkbox {
    display: flex;
    align-items: center
}

.checkbox-label {
    padding-left: .33rem;
    cursor: pointer;
    transition: color 120ms;
    font-size: 1.1rem
}

.checkbox-label:hover {
    color: oklch(55.6% 0 0)
}

.checkbox-input {
    appearance: none;
    position: relative;
    width: 1.35rem;
    height: 1.35rem;
    background-color: transparent;
    border: 1px solid oklch(87.2% 0.01 258.338);
    border-radius: .3rem;
    transition: background-color 230ms
}

.checkbox-input::after {
    content: "";
    position: absolute;
    top: -3px;
    left: -2px;
    width: 0;
    height: 0;
    font-size: 1.8rem;
    background-image: url("../../../../images/svg/checkbox.svg");
    background-repeat: no-repeat;
    transition: width .4s, height .4s, opacity .2s;
    overflow: hidden;
    opacity: 0
}

.checkbox-input:checked::after {
    width: 1.60rem;
    height: 1.60rem;
    opacity: 1
}

.checkbox-input:checked {
    background-color: #000
}
</style>
