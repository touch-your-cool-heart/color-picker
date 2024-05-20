<template>
    <div class="color-wheel">
        <div id="picker"></div>
        <div class="self-wheel" @touchmove="getHandlePosition" @touchend="getHandlePosition">
            <div class="hue"></div>
            <div class="saturation"></div>
            <div class="handle">
                <div class="handle-inner"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import iro from '@jaames/iro';
import { IroColorPicker } from '@jaames/iro/dist/ColorPicker';
import { hueToRgb, rgbToHex } from '../utils/color';

interface Color {
    hsv: {
        h: number;
        s: number;
        v: number;
    };
    rgb: {
        r: number;
        g: number;
        b: number;
    };
    hexString: string;
}
const emit = defineEmits<{
    (event: 'input', v: Color): void;
}>();

const color = ref('#fff');
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
    colorPicker.on('color:change', (c: { rgbString: string }) => {
        color.value = c.rgbString;
        console.log('colorPicker.on ~ color:', c);
    });
    // 设置颜色
    // colorPicker.color.set('#f00');
    const selfWheel = document.querySelector('.self-wheel');
    if (selfWheel) {
        const { top, left } = selfWheel.getBoundingClientRect();
        containerPagex.value = left;
        containerPageY.value = top;
    }
});

// 圆盘半径
const wheelRadius = 150;
// handle半径
const handleRadius = 12;
// handle与圆盘边缘的最小间距
const padding = 6;
// handle移动范围的半径
const handleRange = wheelRadius - handleRadius - padding;
// 容器页面坐标
const containerPagex = ref(0);
const containerPageY = ref(0);
// handle在容器内的坐标
const handleX = ref(wheelRadius);
const handleY = ref(wheelRadius);
// 获取handle最新位置
const getHandlePosition = (e: TouchEvent) => {
    const { pageX, pageY } = e.changedTouches[0];
    handleX.value = pageX - containerPagex.value;
    handleY.value = pageY - containerPageY.value;
    // 目标点距离中心点的偏移量
    const gapX = Math.abs(handleX.value - wheelRadius);
    const gapY = Math.abs(handleY.value - wheelRadius);
    const R = Math.sqrt(gapX * gapX + gapY * gapY);
    if (R > handleRange) {
        const gapx = (gapX / R) * handleRange;
        const gapy = (gapY / R) * handleRange;
        if (handleX.value < wheelRadius) {
            handleX.value = wheelRadius - gapx;
        }
        if (handleX.value > wheelRadius) {
            handleX.value = wheelRadius + gapx;
        }
        if (handleY.value < wheelRadius) {
            handleY.value = wheelRadius - gapy;
        }
        if (handleY.value > wheelRadius) {
            handleY.value = wheelRadius + gapy;
        }
    }
    const C = getColor();
    color.value = C.hexString;
    colorPicker.color.set(color.value);
    emit('input', C);
};
const getColorHsv = () => {
    const x = handleX.value - wheelRadius;
    const y = handleY.value - wheelRadius;
    const angle = x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
    const hue = 360 - Math.round((angle * 360) / (Math.PI * 2));
    console.log('getHandlePosition ~ mod hue:', (hue + 360) % 360);
    const saturation = Math.round((Math.sqrt(x * x + y * y) / handleRange) * 100);
    console.log('getColorHsv ~ saturation:', saturation);
    return {
        h: (hue + 360) % 360,
        s: saturation
    };
};
const getColor = (): Color => {
    const { h, s } = getColorHsv();
    const rgb = hueToRgb(h, s);
    const hexString = rgbToHex(...rgb);
    const C: Color = {
        hsv: { h, s, v: 100 },
        rgb: {
            r: rgb[0],
            g: rgb[1],
            b: rgb[2]
        },
        hexString
    };
    return C;
};
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
    .self-wheel {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        position: relative;
        margin-top: 10px;
        .hue {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            transform: rotateZ(90deg);
            background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red);
        }
        .saturation {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            background: radial-gradient(circle closest-side, rgb(255, 255, 255), transparent);
        }
        .handle {
            position: absolute;
            width: 24px;
            height: 24px;
            left: -12px;
            top: -12px;
            border-radius: 50%;
            background: transparent;
            will-change: transform;
            transform: v-bind('`translate(${handleX}px, ${handleY}px)`');
            border: 3px solid #fff;
            box-sizing: border-box;
        }
    }
}
</style>
