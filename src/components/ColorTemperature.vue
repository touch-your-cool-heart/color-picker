<template>
    <div class="color-temperature">
        <div id="picker"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import iro from '@jaames/iro';
import { IroColorPicker } from '@jaames/iro/dist/ColorPicker';

const color = ref('#0000ff');
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
.color-temperature {
    display: flex;
    flex-direction: column;
    align-items: center;
    :deep(#picker) {
        position: relative;
        &::after {
            content: '';
            position: absolute;
            width: calc(100% + 20px);
            height: calc(100% + 20px);
            background: #ffff6d;
            left: -10px;
            top: -10px;
            z-index: -1;
            border-radius: 50%;
        }
        .IroWheelHue {
            background: conic-gradient(#ffff01, white) !important;
        }
        .IroWheelSaturation {
            background: unset !important;
        }
        .IroHandle {
            circle:first-child {
                display: none;
            }
            circle:last-child {
                fill: transparent;
                stroke: #000;
            }
        }
    }
}
</style>
