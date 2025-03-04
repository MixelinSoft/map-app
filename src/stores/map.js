// Import Pinia
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    bounds: [],
    activeMarker: null,
    nearestPeoples: [],
    showInfoPanel: false,
    isLoadingMap: true,
  }),
  actions: {
    setBounds(bounds) {
      this.bounds = bounds
    },
    setActiveMarker(marker, nearestPeoples) {
      // Set Active Marker
      this.activeMarker = marker
      // Set Three Nearest Peoples
      this.nearestPeoples = nearestPeoples
      // Set Bounds Based on Nearest Peoples and Active Marker
      this.bounds = [
        marker.coordinates,
        ...nearestPeoples.map((person) => [
          parseFloat(person.address.geo.lat),
          parseFloat(person.address.geo.lng),
        ]),
      ]
      // Show Ifo Panel
      this.showInfoPanel = true
    },
    setIsLoadingMap(isLoading) {
      this.isLoadingMap = isLoading
    },
  },
})
