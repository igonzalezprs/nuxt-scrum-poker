<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  value: number | null,
  hidden: boolean
}>();

const classes = computed(() => ({
  'result-card--hidden': props.hidden && props.value,
  'result-card--empty': props.hidden && !props.value,
}));

</script>

<template>
  <div class="result-card" :class="classes">
    {{ hidden ? '' : value }}
  </div>
</template>

<style>
.result-card {
  @apply h-10 w-8 flex items-center justify-center rounded-md text-sm font-bold bg-gray-100 text-gray-800 cursor-pointer mx-2;

}

.result-card--hidden {
  @apply bg-primary-base;
}

.result-card--empty {
  @apply bg-gray-100 border border-gray-300;
}
</style>