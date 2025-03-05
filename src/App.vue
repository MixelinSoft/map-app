<script setup>
// Imports
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Map from '@/components/Map/Map.vue'
import InfoPanel from '@/components/Map/InfoPanel.vue'
import FilterPanel from '@/components/Map/FilterPanel.vue'
import AddMarkerModal from '@/components/Map/AddMarkerModal.vue'
import { onMounted } from 'vue'
import { useMapStore } from '@/stores/map'
import places from '@/data/places.json'

// Store
const mapStore = useMapStore()

// Fetch Peoples, Set Places
onMounted(() => {
  mapStore.fetchPeoples()
  mapStore.setCurrentPlaces(places)
})
</script>

<template>
  <v-app>
    <AddMarkerModal />
    <Header />
    <InfoPanel />
    <FilterPanel />
    <Main>
      <Map />
    </Main>
  </v-app>
</template>
