<script lang="ts" setup>
defineProps<{
  value?: number | null 
}>();

defineEmits(['update']);
</script>

<template>
  <div class="flex flex-wrap justify-center">
    <slot />
  </div>
</template>
