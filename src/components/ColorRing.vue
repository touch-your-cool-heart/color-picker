<template>
    <div class="color-ring">
        <color-picker v-bind="color" @input="onInput" />
        <canvas id="canvas" height="320" width="320"></canvas>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import ColorPicker from '@radial-color-picker/vue-color-picker';
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
import { hueToRgb, rgbToHex } from '../utils/color';

const color = ref({
    hue: 0,
    saturation: 100,
    luminosity: 50,
    alpha: 1
});
const onInput = (hue: number) => {
    color.value.hue = hue;
    createCanvas();
};

const colorHex = computed(() => {
    const rgb = hueToRgb(color.value.hue);
    return rgbToHex(...rgb);
});

let ctx: CanvasRenderingContext2D | null = null;
onMounted(() => {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d');
    createCanvas();
});
const createCanvas = () => {
    if (!ctx) return;
    // 每次绘制前清除上一次的图形
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    // 实心圆
    ctx.arc(160, 10, 5, 0, 2 * Math.PI, true);
    ctx.fillStyle = colorHex.value;
    ctx.fill();
    // 尾部圆弧
    ctx.arc(160, 160, 150, Math.PI / -2, Math.PI, true);
    const grd = ctx.createLinearGradient(150, 0, 0, 150);
    grd.addColorStop(0, colorHex.value);
    grd.addColorStop(1, 'transparent');
    ctx.strokeStyle = grd;
    ctx.stroke();
    ctx.closePath();
};
</script>

<style lang="scss" scoped>
.color-ring {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    :deep(.rcp) {
        .rcp__palette {
            -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 42.5%, black 43%);
            mask-image: radial-gradient(circle at 50% 50%, transparent 42.5%, black 43%);
        }
        &:active:focus {
            transform: scale(1);
        }
        .rcp__rotator .in {
            visibility: hidden;
        }
    }
    #canvas {
        position: absolute;
        top: -20px;
        transform: v-bind('`rotate(${color.hue}deg)`');
        z-index: -1;
        transition: all 0.3s;
    }
}
</style>
