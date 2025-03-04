<script setup>
// Import Components
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import Map from './components/Map/Map.vue'
import InfoPanel from '@/components/Map/InfoPanel.vue'
import FilterPanel from '@/components/Map/FilterPanel.vue'
// Import Functions
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/map'
// Get Store
const mapStore = useMapStore()
// Fetch Peoples On Mounted
mapStore.fetchPeoples()
</script>

<template>
  <v-app>
    <Header />
    <InfoPanel />
    <FilterPanel />
    <Main>
      <Map />
    </Main>
  </v-app>
</template>

<style scoped></style>
