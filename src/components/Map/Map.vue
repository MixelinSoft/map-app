<script setup>
// Import Pinia
import { storeToRefs } from 'pinia'
// Import Leaflet
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
// Import Components
import LoadingOverlay from '@/components/UI/LoadingOverlay.vue'
// Import Static Data
import places from '@/data/places.json'
// Import Peoples Store
import { usePeoplesStore } from '@/stores/peoples'
// Get Loading State
const { peoples } = storeToRefs(usePeoplesStore())
// Import Icons
import placeIcon from '@/assets/icons/place-icon.svg'
import peopleIcon from '@/assets/icons/people-icon.svg'

// Create Custom Icon
const createIcon = (type) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
    <div class="place-marker">
        <div class="place-marker-dot">
          <img class="place-marker-icon" src="${type === 'place' ? placeIcon : peopleIcon}" alt="place icon" />
        </div>
      </div >`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}
import { ref } from 'vue'
const bounds = ref(0)

const setNewBounds = (coords) => {
  bounds.value = [
    [coords[0] - 0.05, coords[1] - 0.05],
    [coords[0] + 0.05, coords[1] + 0.05],
  ]
}
</script>

<template>
  <div class="map-container">
    <l-map :zoom="4" :center="[50.45059147699683, 30.52445080444961]" :bounds="bounds">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker
        v-for="place in places"
        :key="place.id"
        :lat-lng="place.coordinates"
        :icon="createIcon('place')"
        @click="setNewBounds(place.coordinates)"
      />
      <l-marker
        v-for="people in peoples"
        :key="people.id"
        :lat-lng="[people.address.geo.lat, people.address.geo.lng]"
        :icon="createIcon('people')"
      />
    </l-map>
    <LoadingOverlay />
  </div>
</template>

<style scoped>
.map-container {
  height: 100%;
  width: 100%;
}
</style>
<!-- Marker Styles -->
<style>
.place-marker {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 50% 50% 0 50%;
  transform: rotate(45deg);
  background-color: rgb(71, 95, 255);
  z-index: 1;
  transition: z-index 0.3s ease-in-out;
}
.place-marker:hover {
  z-index: 10;
  border: 1px solid red;
}
.place-marker-dot {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  transform: rotate(-45deg);
}
.place-marker-icon {
  width: 18px;
  height: 18px;
}
</style>
