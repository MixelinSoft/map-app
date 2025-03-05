<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
// Map Store
const { isLoadingMap, isLoadingPeoples } = storeToRefs(useMapStore())
</script>

<template>
  <div :class="['loading-overlay', { active: isLoadingPeoples && isLoadingMap }]">
    <p class="loading-text">Завантажуємо...</p>
    <v-progress-circular width="8" size="64" indeterminate color="white"></v-progress-circular>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.5s ease,
    visibility 0.5s ease;
}
.active {
  visibility: visible;
  opacity: 1;
}
.loading-text {
  font-size: 32px;
  color: #fff;
  margin-bottom: 1rem;
}
</style>
