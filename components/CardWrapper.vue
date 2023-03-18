<script lang="ts" setup>
defineProps<{
  value?: number | null 
}>();

defineEmits(['update']);
</script>

<template>
  <div class="flex">
    <slot />
  </div>
</template>
