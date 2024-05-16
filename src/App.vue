<template>
    <div class="app-vue">
        <div class="type-wrapper">
            <a-select v-model:value="type" :options="options" />
        </div>
        <component :is="comp" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Select as ASelect } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ColorWheel from './components/ColorWheel.vue';
import ColorRing from './components/ColorRing.vue';
import ColorTemperature from './components/ColorTemperature.vue';
import BlackWhite from './components/BlackWhite.vue';
import Rhythm from './components/Rhythm.vue';

const type = ref(4);
const options = [
    { label: '色盘', value: 0 },
    { label: '色环', value: 1 },
    { label: '色温', value: 2 },
    { label: '黑白', value: 3 },
    { label: '律动', value: 4 }
];
const comp = computed(() => {
    switch (type.value) {
        case 0:
            return ColorWheel;
        case 1:
            return ColorRing;
        case 2:
            return ColorTemperature;
        case 3:
            return BlackWhite;
        case 4:
            return Rhythm;
        default:
            return ColorWheel;
    }
});
</script>

<style scoped>
.type-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 20px;
    margin-bottom: 40px;
    .ant-select {
        width: 100px;
    }
}
</style>
<style>
    body {
        overflow: hidden;
        background: url('./assets/light_background.png');
        background-size: cover;
    }
</style>
