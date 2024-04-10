<template>
    <div class="color-ring">
        <color-picker v-bind="color" @input="onInput" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ColorPicker from '@radial-color-picker/vue-color-picker';
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

const color = ref({
    hue: 50,
    saturation: 100,
    luminosity: 50,
    alpha: 1
});
const onInput = (hue: number) => {
    color.value.hue = hue;
};
</script>

<style lang="scss" scoped>
.color-ring {
    display: flex;
    flex-direction: column;
    align-items: center;
    :deep(.rcp) {
        .rcp__palette {
            -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 42.5%, black 43%);
            mask-image: radial-gradient(circle at 50% 50%, transparent 42.5%, black 43%);
        }
        .rcp__rotator .in {
            visibility: hidden;
        }
    }
}
</style>
