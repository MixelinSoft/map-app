<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
const mapStore = useMapStore()
// Import Icon
import { CloseIcon } from 'mdi-vue3'
// Get ActiveMarker, Nearest Peoples, Show Info Panel States
const { activeMarker, nearestPeoples, showInfoPanel } = storeToRefs(mapStore)
</script>

<template>
  <v-navigation-drawer :width="360" class="info-panel pa-1" v-model="showInfoPanel">
    <div class="d-flex justify-space-between mb-4 pa-1">
      <h2>Інформація:</h2>
      <v-btn density="comfortable" :icon="CloseIcon" @click="showInfoPanel = false"></v-btn>
    </div>
    <v-card class="pa-2">
      <v-list>
        <div v-if="activeMarker">
          <v-list-item>
            <h2>{{ activeMarker.name }}</h2>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <h3>Тип: {{ activeMarker.type }}</h3>
          </v-list-item>
          <v-list-item>
            <h4>
              Координати: {{ activeMarker.coordinates[0] }}, {{ activeMarker.coordinates[1] }}
            </h4>
          </v-list-item>
        </div>
        <div v-if="nearestPeoples.length > 0" class="mt-">
          <v-list-item>
            <h3>Найближчі люди:</h3>
          </v-list-item>
          <v-list-item>
            <v-card class="pa-2 mb-4" v-for="people in nearestPeoples" :key="people.id">
              <h3>Ім'я: {{ people.name }}</h3>
              <p>Відстань - {{ Math.round(people.distanseToSelectedPlace) }} км</p>
            </v-card>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<style scoped>
.info-panel {
}
</style>
