import { useAuthStore } from '~/stores/myStore.js'
//Rules for blocking access to routes based on user roles
export default defineNuxtRouteMiddleware((to, from) => {
    
    const authStore = useAuthStore();
    const role = authStore.getRole;
    // Redirect to login if user is not authenticated
    if (to.path.startsWith('/dashboard') && role !== "ADMIN") {
        return navigateTo('/login');
    }
     if (to.path.startsWith('/userDashboard') && role === "") {
        return navigateTo('/login');
    }
}
);