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
    showFilterPanel: false,
    filters: {
      cafe: true,
      store: true,
      office: true,
    },
    showAddMarkerModal: false,
    isLoadingPeoples: false,
    isLoadingMap: true,
  }),
  actions: {
    // Fetch Peoples From API
    async fetchPeoples() {
      // Set Loading State
      this.isLoadingPeoples = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        // Set Peoples To Store
        this.peoples = response.data
      } catch (error) {
        // Log Error
        console.log(error)
      } finally {
        // Set Loading State
        this.isLoadingPeoples = false
      }
    },
    setBounds(bounds) {
      this.bounds = bounds
    },
    setActiveMarker(marker) {
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
      // Set Active Marker
      this.activeMarker = marker
      // Show Info Panel
      this.setShowInfoPanel(true)
    },
    resetActiveMarker() {
      // Reset Active Marker
      this.activeMarker = null
      // Reset Nearest Peoples
      this.nearestPeoples = []
      // Close Info Panel
      this.showInfoPanel = false
    },
    setIsLoadingMap(isLoading) {
      this.isLoadingMap = isLoading
    },
    setShowInfoPanel(show) {
      // Close Filter Panel
      this.showFilterPanel = false
      // Show Info Panel
      this.showInfoPanel = show
    },
    setShowFilterPanel(show) {
      // Close Info Panel
      this.showInfoPanel = false
      // Show Filter Panel
      this.showFilterPanel = show
    },
    toggleFilter(type) {
      this.filters[type] = !this.filters[type]
    },
    resetFilters() {
      this.filters = {
        store: true,
        cafe: true,
        office: true,
      }
    },
    setShowAddMarkerModal(show) {
      // Close Filter Panel
      this.setShowFilterPanel(false)
      // Show Add Marker Modal
      this.showAddMarkerModal = show
    },
    setCurrentPlaces(places) {
      this.currentPlaces = places
    },
    addPlace(place) {
      // Push Place To Current Places
      this.currentPlaces.push(place)
      // Set Pushed Place As Active Marker
      this.setActiveMarker(place)
    },
  },
})
