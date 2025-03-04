<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
// Import Leaflet
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import L, { latLngBounds } from 'leaflet'
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
//Import Functions
import getDistance from '@/utils/getDistance'

// Create Custom Icon
const createIcon = (type) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `
    <div class="marker marker-${type}">
        <div class="marker-dot">
          <img class="marker-icon" src="${type === 'place' ? placeIcon : peopleIcon}" alt="place icon" />
        </div>
      </div >`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}
// Get Map Store
const mapStore = useMapStore()
const { bounds } = storeToRefs(mapStore)
// Set Bounds OnLoad Based On Places, Set Loading State
const setBoundsOnLoad = () => {
  mapStore.setBounds(places.map((place) => place.coordinates))
  mapStore.setIsLoadingMap(false)
}
// Set Active Place
const setActivePlace = (place) => {
  // Get Place Coords
  const placeCoords = place.coordinates
  // Add Distance to ALL peoples
  const distances = peoples.value.map((people) => {
    return {
      ...people,
      distanseToSelectedPlace: getDistance(
        {
          lat: people.address.geo.lat,
          lng: people.address.geo.lng,
        },
        {
          lat: placeCoords[0],
          lng: placeCoords[1],
        },
      ),
    }
  })
  const nearestThreePeoples = distances.sort((a, b) => a.distance - b.distance).slice(0, 3)
  mapStore.setActiveMarker(place, nearestThreePeoples)
}
</script>

<template>
  <div class="map-container">
    <l-map
      :zoom="4"
      :center="[20.45059147699683, 20.52445080444961]"
      :bounds="bounds"
      @ready="setBoundsOnLoad"
    >
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
        @click="setActivePlace(place)"
      />
      <l-marker
        v-for="people in peoples"
        :key="people.id"
        :lat-lng="[people.address.geo.lat, people.address.geo.lng]"
        :icon="createIcon('people')"
        @click="console.log(people)"
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
.marker {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 50% 50% 0 50%;
  transform: rotate(45deg);
  z-index: 1;
  transition: z-index 0.3s ease-in-out;
}
.marker-place {
  background-color: rgb(71, 95, 255);
}
.marker-people {
  background-color: rgb(97, 252, 97);
}
.marker:hover {
  z-index: 10;
  border: 1px solid red;
}
.marker-dot {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  transform: rotate(-45deg);
}
.marker-icon {
  width: 18px;
  height: 18px;
}
</style>
