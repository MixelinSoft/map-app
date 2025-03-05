<script setup>
// Imports
import { useMapStore } from '@/stores/map'
import { PlusIcon, FilterIcon } from 'mdi-vue3'
// Map Store
const mapStore = useMapStore()
// Handlers
const openAddMarkerModal = () => {
  mapStore.setShowAddMarkerModal(true)
}
const openFilterPanel = () => {
  mapStore.setShowFilterPanel(true)
}
</script>

<template>
  <div class="d-flex flex-column">
    <v-btn density="comfortable" :icon="FilterIcon" @click="openFilterPanel"></v-btn>
    <v-btn class="mt-4" density="comfortable" :icon="PlusIcon" @click="openAddMarkerModal"></v-btn>
  </div>
</template>
