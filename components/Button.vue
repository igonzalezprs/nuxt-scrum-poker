<script lang="ts" setup>
defineEmits(['click'])
</script>

<template>
  <button class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style>
.button {
  @apply bg-primary-base hover:bg-primary-hover text-white px-4 py-2 rounded;
}
</style>