<template>
    <div class="rhythm">
        <div class="outer">
            <div class="inner">
                <div class="circle-wrapper">
                    <div
                        class="circle-item"
                        v-for="n in RING_BAR_NUM"
                        :key="n"
                        :style="{
                            transform: getTransformValue(n - 1),
                            '--height': circleHeightArr[n - 1] + 'px',
                            '--bgc': n > RING_BAR_NUM / 3 && n < (RING_BAR_NUM * 3) / 5 ? '#e97fa3' : '#7aa7ec'
                        }"
                    ></div>
                </div>
                <div class="line-wrapper">
                    <div class="line-item" v-for="n in LINEAR_BAR_NUM" :key="n" :style="{ height: `${linearHeightArr[n - 1]}px` }"></div>
                </div>
            </div>
        </div>
        <div class="operation">
            <button @click="handlePlay">play</button>
            <button @click="handleStop">stop</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';

// 环形柱子的数量
const RING_BAR_NUM = 80;
// 环形柱子组成的圆半径
const radius = 126;
// 计算环形柱子的偏移量和旋转角度
const getTransformValue = (index: number) => {
    const angle = (index * 2 * Math.PI) / RING_BAR_NUM;
    const x = radius * Math.sin(angle);
    const y = radius * (1 - Math.cos(angle));
    const deg = (index * 360) / RING_BAR_NUM;
    return `translate(${x}px, ${y}px) rotate(${deg}deg)`;
};
// 环形柱子的延伸长度
const circleHeightArr = ref<number[]>(new Array(RING_BAR_NUM).fill(0));
// 环形柱子跳动部分的索引集
const elementIndex: number[] = [];
const getElementIndex = () => {
    const first = Math.floor(Math.random() * RING_BAR_NUM);
    const second = Math.floor(first + RING_BAR_NUM / 3);
    const third = Math.floor(first + (RING_BAR_NUM * 2) / 3);
    const getRangeArr = (n: number) => [n - 2, n - 1, n, n + 1, n + 2];
    const target = [...getRangeArr(first), ...getRangeArr(second), ...getRangeArr(third)].map((v, i) => {
        return (v + i) % (RING_BAR_NUM - 1);
    });
    elementIndex.length = 0;
    elementIndex.push(...target);
};
getElementIndex();

// 线性柱子数量
const LINEAR_BAR_NUM = 9;
const linearHeightArr = [1, 2, 3, 4, 5, 4, 3, 2, 1].map((v) => v * 3);

// 播放
const timer = ref(0);
const count = ref(0);
const handlePlay = () => {
    timer.value = setInterval(() => {
        count.value++;
        if (count.value % 3 === 0) {
            getElementIndex();
        }
        console.log(elementIndex);
        const circleEles = resetCircle();
        elementIndex.forEach((v) => {
            const ele = circleEles[v];
            if (!ele) return;
            circleHeightArr.value[v] = Math.random() * 10 + 3;
            ele.classList.add('active');
        });
    }, 300);
    const eles = document.querySelectorAll('.line-item');
    eles.forEach((ele) => ele.classList.add('active'));
};
// 重置环形柱子
const resetCircle = () => {
    const eles = document.querySelectorAll('.circle-item');
    eles.forEach((ele) => ele.classList.remove('active'));
    circleHeightArr.value.forEach((_v, i) => (circleHeightArr.value[i] = 0));
    return eles;
};
// 重置线性柱子
const resetLine = () => {
    const eles = document.querySelectorAll('.line-item');
    eles.forEach((ele) => ele.classList.remove('active'));
};

// 停止
const handleStop = () => {
    clearInterval(timer.value);
    resetCircle();
    resetLine();
};
onUnmounted(handleStop);
</script>

<style lang="scss" scoped>
.rhythm {
    display: flex;
    flex-direction: column;
    align-items: center;
    .outer {
        position: relative;
        width: 300px;
        height: 300px;
        border: 1px solid #ccc;
        background: #16343c;
        border-radius: 50%;
        .inner {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 220px;
            height: 220px;
            background: radial-gradient(#fbc9a8, #ea66ff);
            border-radius: 50%;
            .circle-wrapper {
                .circle-item {
                    position: absolute;
                    left: 109px;
                    top: -20px;
                    width: 2px;
                    height: 4px;
                    background: var(--bgc);
                    transform-origin: center bottom;
                    border-radius: 1px;
                    &::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        transform: translateY(-95%);
                        width: 100%;
                        height: 0;
                        border-top-left-radius: 1px;
                        border-top-right-radius: 1px;
                        background: var(--bgc);
                        transition: all 400ms;
                    }
                    &.active {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        &::before {
                            height: var(--height);
                        }
                    }
                }
            }
            .line-wrapper {
                width: 50%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .line-item {
                    width: 3px;
                    background: #fff;
                    border-radius: 50%;
                    @keyframes radius-animation {
                        100% {
                            height: 9px;
                            border-radius: 50%;
                            filter: contrast(2);
                        }
                    }
                    &.active {
                        animation: radius-animation 300ms ease alternate infinite;
                    }
                }
            }
        }
    }
    .operation {
        margin-top: 20px;
        display: flex;
        column-gap: 20px;
        button {
            cursor: pointer;
        }
    }
}
</style>
