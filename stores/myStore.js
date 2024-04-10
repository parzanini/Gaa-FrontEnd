import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  // Short name of the store
  id: 'authStore', 
  // State used for login and logout
  state: () => ({
    token: '',
    role: '',
    name: '',
    isAuthenticated: false
  }),
  //State used for event name
  state: () => ({
    eventName: ''
  }),
  actions: {
    // Set the token, role, name and isAuthenticated state when user logs in
    setAuthData({ token, role, name }) {
      this.token = token,
      this.role = role,
        this.name = name,
      this.isAuthenticated = true
    },
    // Clear the token, role, name and isAuthenticated state when user logs out
    clearAuthData() {
      this.token = ''
      this.role = ''
      this.name = ''
      this.isAuthenticated = false
    },
    // Set the event name state
    setEventName(eventName) {
      this.eventName = eventName
    }
  },
  // Getters to access the state
  getters: {
    getToken() {
      return this.token;
    },
    getRole() {
      return this.role;
    },
    getName() {
      return this.name;
    },
    getIsAuthenticated() {
      return this.isAuthenticated;
    },
    getEventName() {
      return this.eventName;
    }
  }
})

