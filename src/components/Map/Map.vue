<script setup>
// Import Pinia and Store
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/stores/map'
// Import Leaflet components
import { LMap, LTileLayer, LMarker, LControlZoom, LControl } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
// Import UI components
import LoadingOverlay from '@/components/UI/LoadingOverlay.vue'
import AddMarkerButton from '@/components/Map/AddMarkerButton.vue'
import AddMarkerModal from '@/components/Map/AddMarkerModal.vue'
// Import static data
import places from '@/data/places.json'
// Import icons for markers
import placeIcon from '@/assets/icons/place-icon.svg'
import peopleIcon from '@/assets/icons/people-icon.svg'
// Import utility Functions
import getNearestPeoples from '@/utils/getNearestPeoples.js'
// Get Map Store, Bounds, NearestPeoples
const mapStore = useMapStore()

const { currentPlaces, bounds, nearestPeoples, activeMarker, peoples } = storeToRefs(mapStore)
// Set Places and Bounds based on Places On Load
const setBoundsOnLoad = () => {
  mapStore.setCurrentPlaces(places)
  mapStore.setBounds(currentPlaces.value.map((place) => place.coordinates))
  mapStore.setIsLoadingMap(false)
}
// Set Active Place
const setActivePlace = (place) => {
  if (place) {
    mapStore.setShowInfoPanel(true)
    const placeCoords = place.coordinates
    // Update Active Marker, Nearest Peaoples
    mapStore.setActiveMarker(place)
  } else {
    mapStore.resetActiveMarker()
  }
}
// Create Custom Leafelet Icon
const createIcon = (type, id = null) => {
  // Check Marker, If Marker is People and People is Nearest to the Marker - Highlight
  const isHighlighted =
    (type === 'people' &&
      nearestPeoples.value.length > 0 &&
      nearestPeoples.value.some((people) => people.id == id)) ||
    (type === 'place' && activeMarker.value?.id == id)
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div class="marker marker-${type} ${isHighlighted ? 'highlighted-marker' : ''}">
        <div class="marker-dot">
          <img class="marker-icon" src="${type === 'place' ? placeIcon : peopleIcon}" alt="${type} icon" />
        </div>
      </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}
</script>

<template>
  <div class="map-container">
    <l-map
      :zoom="4"
      :min-zoom="2"
      :center="[20.45059147699683, 20.52445080444961]"
      :bounds="bounds"
      :options="{ zoomControl: false }"
      @ready="setBoundsOnLoad"
      @click="setActivePlace(null)"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-control position="bottomright">
        <AddMarkerButton />
      </l-control>
      <l-control-zoom position="topright"></l-control-zoom>

      <!-- Places Markers -->
      <l-marker
        v-for="place in currentPlaces"
        :key="place.id"
        :lat-lng="place.coordinates"
        :icon="createIcon('place', place.id)"
        @click="setActivePlace(place)"
      />

      <!-- Peoples Markers -->
      <l-marker
        v-for="people in peoples"
        :key="people.id"
        :lat-lng="[people.address.geo.lat, people.address.geo.lng]"
        :icon="createIcon('people', people.id)"
        @click="console.log(people.name)"
      />
    </l-map>

    <!-- UI Components -->
    <LoadingOverlay />
  </div>
  <AddMarkerModal />
</template>

<style scoped>
/* Map container styles */
.map-container {
  height: 100%;
  width: 100%;
  padding-left: 0;
  transition: padding-left 0.3s ease-in-out;
}
.show-info-panel {
  padding-left: 360px;
}
</style>

<!-- Marker Styles -->
<style>
.marker {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 50% 50% 0 50%;
  transform: rotate(45deg);
  transition: z-index 0.3s ease-in-out;
}
.marker-place {
  background-color: rgb(71, 95, 255);
}
.marker-people {
  background-color: rgb(97, 252, 97);
}
.marker:hover {
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
}
.marker-icon {
  width: 18px;
  height: 18px;
}
.highlighted-marker {
  z-index: 10;
  border: 2px solid red;
}

.highlighted-marker .marker-dot {
  background-color: yellow;
}
</style>
