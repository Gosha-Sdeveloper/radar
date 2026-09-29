<template>
    <div class="radio-container" role="radio" aria-checked="modelValue">
        <input class="radio" type="radio" :id="id" :name="name" :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)">
        <label class="radio-label text-base leading-none" :for="id">
            {{ label }}
        </label>
    </div>

</template>

<script>
export default {
    name: "Radio",

    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }
}
</script>

<style scoped>
.radio-container {
    display: flex;
    align-items: center
}

.radio-label {
    padding-left: .33rem;
    cursor: pointer;
    transition: color 120ms;
    font-size: 1.1rem
}

.radio-label:hover {
    color: oklch(55.6% 0 0)
}

.radio {
    appearance: none;
    position: relative;
    width: 1.35rem;
    height: 1.35rem;
    background-color: transparent;
    border: 1px solid oklch(87.2% 0.01 258.338);
    border-radius: 50%;
    transition: background-color 230ms
}

.radio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: 7px solid oklch(87.168% 0.00944 258.479 / 0.516);
    transition: opacity 100ms ease, border-color 300ms ease;
    width: 1rem;
    height: 1rem;
    opacity: 0;
    border-radius: 50%;
}

.radio:hover::after {
    opacity: 1;
}

.radio:checked::after {
    opacity: 1;
    border-color: #000;
}

.radio:checked {
    border-color: #000;
    outline: 1px solid #000;
}
</style>
