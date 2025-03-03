import definieStore from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    activeMarker: null,
    showAside: false,
  }),
  actions: {
    setActiveMarker(marker) {
      this.activeMarker = marker
      this.showAside = true
    },
    setShowAside(show) {
      this.showAside = show
    },
  },
})
