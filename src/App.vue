<script setup>
// Import Components
import Header from './components/layout/Header.vue'
import Main from './components/layout/Main.vue'
import Map from './components/Map/Map.vue'
// Import Functions
import { onMounted } from 'vue'
import { usePeoplesStore } from '@/stores/peoples'
// Get Store
const peoplesStore = usePeoplesStore()
// Fetch Peoples On Mounted
peoplesStore.fetchPeoples()
</script>

<template>
  <v-app>
    <Header />
    <Main>
      <Map />
    </Main>
  </v-app>
</template>

<style scoped></style>
