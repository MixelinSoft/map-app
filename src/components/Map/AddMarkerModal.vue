<script setup>
// Imports
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { reactive } from 'vue'

// Store
const mapStore = useMapStore()
const { showAddMarkerModal } = storeToRefs(mapStore)

// Form Data
const formData = reactive({
  name: '',
  type: '',
  latitude: '',
  longitude: '',
})

// Form Rules
const nameRules = [
  (v) => !!v || 'Це поле обовязкове!',
  (v) => v.length >= 3 || 'Мінімум 3 символи',
  (v) => v.length <= 20 || 'Максимум 20 символів',
]
const typesRules = [(v) => !!v || 'Це поле обовязкове!']
const coordinatesRules = [
  (v) => !!v || 'Це поле обовязкове!',
  (v) => v.length >= 2 || 'Мінімум 2 значення',
  (v) => v.length <= 10 || 'Максимум 10 значеннь',
  (v) => typeof +v === 'number' || 'Це поле має бути числом',
]
const lngRules = [(v) => (+v >= -180 && +v <= 180) || 'Мінімум -180, Максимум 180']
const latRules = [(v) => (v >= -90 && v <= 90) || 'Мінімум -90, Максимум 90']

// Submit Form Handler
const submitForm = () => {
  const place = {
    id: Date.now(),
    name: formData.name,
    type: formData.type,
    coordinates: [+formData.latitude, +formData.longitude],
  }
  mapStore.addPlace(place)
  closeModal()
}

// Close Modal Handler
const closeModal = () => {
  mapStore.setShowAddMarkerModal(false)
  formData.name = ''
  formData.type = ''
  formData.latitude = ''
  formData.longitude = ''
}
</script>

<template>
  <v-dialog max-width="600" v-model="showAddMarkerModal">
    <v-card title="Додати місце" class="pa-4">
      <form @submit.prevent="submitForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model="formData.name"
              label="Назва*"
              required
              :rules="nameRules"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="formData.type"
              label="Тип місця"
              :items="['store', 'cafe', 'office']"
              required
              :rules="typesRules"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="formData.latitude"
              type="number"
              label="Широта*"
              required
              :rules="[...coordinatesRules, ...latRules]"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="formData.longitude"
              type="number"
              label="Довгота*"
              required
              :rules="[...coordinatesRules, ...lngRules]"
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
