<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
const mapStore = useMapStore()
// Import Icons
import { PlusIcon, FilterIcon } from 'mdi-vue3'

const { showAddMarkerModal } = storeToRefs(mapStore)

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
