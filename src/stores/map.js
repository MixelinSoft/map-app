// Import Axios
import axios from 'axios'
// Import Pinia
import { defineStore } from 'pinia'
// Import Utils
import getNearestPeoples from '@/utils/getNearestPeoples.js'

export const useMapStore = defineStore('map', {
  state: () => ({
    currentPlaces: [],
    bounds: [],
    peoples: [],
    activeMarker: null,
    nearestPeoples: [],
    showInfoPanel: false,
    showAddMarkerModal: false,
    isLoadingPeoples: false,
    isLoadingMap: true,
  }),
  actions: {
    async fetchPeoples() {
      this.isLoadingPeoples = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.peoples = response.data
      } catch (error) {
        this.peoples = []
        console.log(error)
      } finally {
        this.isLoadingPeoples = false
      }
    },
    setBounds(bounds) {
      this.bounds = bounds
    },
    setActiveMarker(marker) {
      // Show Ifo Panel
      this.showInfoPanel = true
      // Set Active Marker
      this.activeMarker = marker
      // Set Three Nearest Peoples
      const nearestPeoples = getNearestPeoples(marker.coordinates, this.peoples, 3)
      this.nearestPeoples = nearestPeoples
      // Set Bounds Based on Nearest Peoples and Active Marker
      this.bounds = [
        marker.coordinates,
        ...nearestPeoples.map((person) => [
          parseFloat(person.address.geo.lat),
          parseFloat(person.address.geo.lng),
        ]),
      ]
    },
    resetActiveMarker() {
      this.activeMarker = null
      this.nearestPeoples = []
      this.showInfoPanel = false
    },
    setIsLoadingMap(isLoading) {
      this.isLoadingMap = isLoading
    },
    setShowInfoPanel(show) {
      this.showInfoPanel = show
    },
    setShowAddMarkerModal(show) {
      if (show) this.showInfoPanel = false
      this.showAddMarkerModal = show
    },
    setCurrentPlaces(places) {
      this.currentPlaces = places
    },
    addPlace(place) {
      this.showAddMarkerModal = false
      this.currentPlaces.push(place)
      this.setActiveMarker(place)
    },
  },
})
