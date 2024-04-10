<template>
    <div class="color-wheel">
        <div id="picker"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import iro from '@jaames/iro';
import { IroColorPicker } from '@jaames/iro/dist/ColorPicker';

const color = ref('#5eff56');
let colorPicker: IroColorPicker;
onMounted(() => {
    // @ts-ignore
    colorPicker = new iro.ColorPicker('#picker', {
        width: 300,
        color: color.value,
        layout: [
            {
                component: iro.ui.Wheel
            }
        ],
        wheelLightness: false,
        handleRadius: 12
    });
    colorPicker.on('color:change', (c: { hexString: string }) => {
        color.value = c.hexString;
    });
    // 设置颜色
    // colorPicker.color.set('#f00');
});
</script>

<style lang="scss" scoped>
.color-wheel {
    display: flex;
    flex-direction: column;
    align-items: center;
    :deep(#picker) {
        border-radius: 50%;
        border: 10px solid v-bind('color');
        .IroHandle {
            circle:first-child {
                display: none;
            }
        }
    }
}
</style>
