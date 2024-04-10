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

const type = ref(1);
const options = [
    { label: '色盘', value: 0 },
    { label: '色环', value: 1 },
    { label: '色温', value: 2 },
    { label: '律动', value: 3 }
];
const comp = computed(() => {
    switch (type.value) {
        case 0:
            return ColorWheel;
        case 1:
            return ColorRing;
        default:
            return ColorWheel;
    }
});
</script>

<style scoped>
.type-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px 0 40px;
    .ant-select {
        width: 100px;
    }
}
</style>
