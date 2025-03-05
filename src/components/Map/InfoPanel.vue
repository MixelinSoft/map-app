<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { CloseIcon } from 'mdi-vue3'

// Store
const mapStore = useMapStore()
const { activeMarker, nearestPeoples, showInfoPanel } = storeToRefs(mapStore)
</script>

<template>
  <!-- Panel Drawer -->
  <v-navigation-drawer :width="360" class="info-panel pa-1" v-model="showInfoPanel">
    <!-- Header -->
    <div class="d-flex justify-space-between mb-4 pa-1">
      <h2>Інформація:</h2>
      <v-btn
        density="comfortable"
        :icon="CloseIcon"
        @click="showInfoPanel = false"
        aria-label="Close information panel"
      />
    </div>

    <!-- Content -->
    <v-card class="pa-2">
      <v-list>
        <!-- Marker Details -->
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

        <!-- Nearest Peoples -->
        <div v-if="nearestPeoples.length">
          <v-list-item>
            <h3>Найближчі люди:</h3>
          </v-list-item>
          <v-list-item v-for="people in nearestPeoples" :key="people.id">
            <v-card class="pa-2 mb-4">
              <h3>Ім'я: {{ people.name }}</h3>
              <p>Відстань - {{ Math.round(people.distanseToSelectedPlace) }} км</p>
            </v-card>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>
