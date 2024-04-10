import { useAuthStore } from '~/stores/myStore.js'
//Rules for blocking access to routes based on user roles
export default defineNuxtRouteMiddleware((to, from) => {
    
    const authStore = useAuthStore();
    const role = authStore.getRole;
    const pathUrl = to.path.toLowerCase();
    // Redirect to login if user is not authenticated
    if (pathUrl.startsWith('/dashboard') && role !== "ADMIN") {
        return navigateTo('/login');
    }
     if (pathUrl.startsWith('/userdashboard') && role === "") {
        return navigateTo('/login');
    }
}
);