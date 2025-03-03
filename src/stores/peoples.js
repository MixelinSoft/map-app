// Import Axios
import axios from 'axios'
// Import Pinia
import { defineStore } from 'pinia'

export const usePeoplesStore = defineStore('peoples', {
  // Initial State
  state: () => ({
    peoples: [],
    isLoading: false,
    errorMessage: null,
  }),
  // Actions
  actions: {
    async fetchPeoples() {
      this.isLoading = true
      this.errorMessage = null

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        console.log(response.data)
        this.peoples = response.data
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
