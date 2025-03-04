<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
const mapStore = useMapStore()
// Get ActiveMarker, Nearest Peoples, Show Info Panel States
const { showAddMarkerModal, peoples } = storeToRefs(mapStore)
// Import ref
import { ref } from 'vue'
// Import Utils
import getNearestPeoples from '@/utils/getNearestPeoples.js'

const name = ref('')
const type = ref('')
const latitude = ref('')
const longitude = ref('')

const nameRules = [
  (v) => !!v || 'Це поле обов`язкове!',
  (v) => v.length >= 3 || 'Мінімум 3 символи',
  (v) => v.length <= 20 || 'Максимум 20 символів',
]
const coordinatesRules = [
  (v) => !!v || 'Це поле обов`язкове!',
  (v) => v.length >= 2 || 'Мінімум 2 значення',
  (v) => v.length <= 10 || 'Максимум 10 значеннь',
  (v) => typeof +v === 'number' || 'Це поле має бути числом',
]

// Submit Form
const submitForm = () => {
  mapStore.addPlace({
    id: Date.now(),
    name: name.value,
    type: type.value,
    coordinates: [latitude.value, longitude.value],
  })
}
// Close Modal
const closeModal = () => {
  mapStore.setShowAddMarkerModal(false)
}
</script>

<template>
  <v-dialog max-width="600" v-model="showAddMarkerModal">
    <v-card title="Додати місце" class="pa-4">
      <form @submit.prevent="submitForm">
        <v-row>
          <v-col>
            <v-text-field v-model="name" label="Назва*" required :rules="nameRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="type"
              label="Тип місця"
              :items="['store', 'cafe', 'office']"
              required
              :rules="[(v) => !!v || 'Це поле обов`язкове!']"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="latitude"
              type="number"
              label="Широта*"
              required
              :rules="coordinatesRules"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="longitude"
              type="number"
              label="Довгота*"
              required
              :rules="coordinatesRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="flex justify-end">
          <v-btn text="Відміна" @click="closeModal"></v-btn>
          <v-btn color="primary" text="Додати місце" type="submit"></v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>
