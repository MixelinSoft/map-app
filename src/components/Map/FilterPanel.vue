<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { CloseIcon } from 'mdi-vue3'

// Store
const mapStore = useMapStore()
const { filters, showFilterPanel } = storeToRefs(mapStore)

// Filter Handlers
const toggleFilter = (type) => {
  mapStore.toggleFilter(type)
}

const resetFilters = () => {
  mapStore.resetFilters()
}
</script>

<template>
  <!-- Panel Drawer -->
  <v-navigation-drawer location="right" :width="250" class="pa-2" v-model="showFilterPanel">
    <!-- Header with Close Button -->
    <div class="d-flex justify-space-between mb-4 pa-1">
      <h2>Фільтри:</h2>
      <v-btn
        density="comfortable"
        :icon="CloseIcon"
        @click="showFilterPanel = false"
        aria-label="Close filter panel"
      />
    </div>

    <!-- Filter Options -->
    <v-card class="pa-2">
      <v-switch
        v-for="(value, key) in filters"
        :key="key"
        color="primary"
        :label="key"
        :model-value="value"
        @change="toggleFilter(key)"
      />
    </v-card>

    <!-- Reset Filters Button -->
    <div class="d-flex mt-4 pa-1">
      <v-btn density="comfortable" color="primary" @click="resetFilters" aria-label="Reset filters">
        Скидання
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>
