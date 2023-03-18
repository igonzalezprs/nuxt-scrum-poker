<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue';

const props = defineProps<{ value: number }>();

const instance = getCurrentInstance();

function selectCard() {
  instance?.parent?.emit('update', props.value);
}

const isSelected = computed(() => instance?.parent?.props.value === props.value);

</script>

<template>
  <button class="card" :class="{ 'card--selected': isSelected }" @click="selectCard">
    {{ value }}
  </button>
</template>

<style>
.card {
  @apply h-20 w-16 flex items-center justify-center rounded-md text-xl font-bold bg-gray-200 text-gray-800 cursor-pointer mx-2 hover:bg-primary-base hover:text-white;
}

.card--selected {
  @apply bg-primary-base text-white;
}
</style>