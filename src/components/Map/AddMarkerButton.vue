<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
const mapStore = useMapStore()
// Import Icon
import { PlusIcon } from 'mdi-vue3'

const { showAddMarkerModal } = storeToRefs(mapStore)

const openAddMarkerModal = () => {
  mapStore.setShowAddMarkerModal(true)
}
</script>

<template>
  <v-btn
    class="add-marker-button"
    density="comfortable"
    :icon="PlusIcon"
    @click="openAddMarkerModal"
  ></v-btn>
</template>
