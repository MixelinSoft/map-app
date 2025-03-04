<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
const mapStore = useMapStore()
// Import Icon
import { CloseIcon } from 'mdi-vue3'
// Get ActiveMarker, Nearest Peoples, Show Info Panel States
const { filters, showFilterPanel } = storeToRefs(mapStore)

const toggleFilter = (type) => {
  mapStore.toggleFilter(type)
}
const resetFilters = () => {
  mapStore.resetFilters()
}
</script>

<template>
  <v-navigation-drawer location="right" :width="300" class="pa-2" v-model="showFilterPanel">
    <div class="d-flex justify-space-between mb-4 pa-1">
      <h2>Фільтри:</h2>
      <v-btn density="comfortable" :icon="CloseIcon" @click="showFilterPanel = false"></v-btn>
    </div>
    <v-card class="pa-2">
      <v-switch
        color="primary"
        label="store"
        :model-value="filters.store"
        @change="toggleFilter('store')"
      ></v-switch>
      <v-switch
        color="primary"
        label="cafe"
        :model-value="filters.cafe"
        @change="toggleFilter('cafe')"
      ></v-switch>
      <v-switch
        color="primary"
        label="office"
        :model-value="filters.office"
        @change="toggleFilter('office')"
      ></v-switch>
    </v-card>
    <div class="d-flex mt-4 pa-1">
      <v-btn class="mr-4" @click="resetFilters">Скидання</v-btn>
      <v-btn color="primary">Застосувати</v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style scoped></style>
