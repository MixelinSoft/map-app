<script setup>
// Imports
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
import { LMap, LTileLayer, LControlZoom, LControl, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import LoadingOverlay from '@/components/UI/LoadingOverlay.vue'
import MapActions from '@/components/Map/MapActions.vue'
import createMarkerIcon from '@/utils/createMarkerIcon.js'
import filterPlaces from '@/utils/filterPlaces'

// Store
const mapStore = useMapStore()
const { currentPlaces, bounds, peoples, nearestPeoples, activeMarker, filters } =
  storeToRefs(mapStore)

// On Map Ready
const onReady = () => {
  mapStore.setBounds(currentPlaces.value.map((place) => place.coordinates))
  mapStore.setIsLoadingMap(false)
}

// Filtered Places
const filteredPlaces = computed(() => filterPlaces(currentPlaces.value, filters.value))

// Set Active Place
const setActivePlace = (place) => {
  place ? mapStore.setActiveMarker(place) : mapStore.resetActiveMarker()
}
</script>

<template>
  <div class="map-container">
    <l-map
      class="map"
      :zoom="4"
      :min-zoom="2"
      :center="[20.45059147699683, 20.52445080444961]"
      :bounds="bounds"
      :options="{ zoomControl: false }"
      @ready="onReady"
      @click="setActivePlace(null)"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />

      <l-control-zoom position="topright" />
      <l-control position="bottomright">
        <MapActions />
      </l-control>

      <!-- Places Markers -->
      <l-marker
        v-for="place in filteredPlaces"
        :key="place.id"
        :lat-lng="place.coordinates"
        :icon="createMarkerIcon('place', place.id, nearestPeoples, activeMarker, place.name)"
        @click="setActivePlace(place)"
      />

      <!-- Peoples Markers -->
      <l-marker
        v-for="people in peoples"
        :key="people.id"
        :lat-lng="[people.address.geo.lat, people.address.geo.lng]"
        :icon="createMarkerIcon('people', people.id, nearestPeoples, activeMarker)"
      >
        <l-popup>{{ people.name }}</l-popup>
      </l-marker>
    </l-map>

    <!-- UI Components -->
    <LoadingOverlay />
  </div>
</template>

<style scoped>
/* Map styles */
.map-container {
  height: 100%;
  width: 100%;
  padding-left: 0;
  transition: padding-left 0.3s ease-in-out;
}
</style>

<style>
/* Marker Styles */
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
  transition: border 0.1s ease-in-out;
}
.marker-place {
  background-color: rgb(71, 95, 255);
}
.marker-people {
  background-color: rgb(97, 252, 97);
}
.marker-container:hover .marker {
  border: 1px solid white;
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
  border: 1px solid black;
}
.marker-icon {
  width: 18px;
  height: 18px;
}
.highlighted-marker .marker {
  border: 2px solid red;
}
.highlighted-marker .marker-dot {
  background-color: yellow;
}
.marker-name {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: blue;
  color: white;
  text-align: center;
  padding: 4px 8px;
  border: 1px solid white;
  border-radius: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}
.marker-container:hover .marker-name {
  opacity: 1;
  visibility: visible;
}
.leaflet-marker-icon:not(:hover) {
  z-index: 0 !important;
}
.leaflet-marker-icon:has(.marker:hover) {
  z-index: 2 !important;
}
.leaflet-marker-icon:has(.highlighted-marker) {
  z-index: 1 !important;
}
</style>
