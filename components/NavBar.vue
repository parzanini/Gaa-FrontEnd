<template>
	<nav class="border-gray-200 bg-gray-900">
		<div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">
			<nuxt-link
				to="/"
				class="flex items-center space-x-3 rtl:space-x-reverse w-full justify-center md:w-1/4 md:justify-normal">
				<span
					class="self-center text-3xl font-semibold whitespace-nowrap text-white font-mono p-3"
					>GAA</span
				>
			</nuxt-link>

			<div class="w-full md:w-3/6">
				<ul
					class="md:font-medium text-sm flex flex-row justify-around md:justify-evenly p-1 md:p-2 md:flex-row mt-0 border-0">
					<li>
						<nuxt-link
							to="/about"
							class="block py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white text-center"
							>About GAA</nuxt-link
						>
					</li>
					<li>
						<!-- If the user is authenticated and is an admin, show the Dashboard link -->
						<nuxt-link
							v-if="authStore.isAuthenticated && authStore.getRole === 'ADMIN'"
							to="/dashboard"
							class="block py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white text-center"
							>Dashboard</nuxt-link
						>
						<!-- If the user is authenticated and is a user, show the Dashboard link -->
						<nuxt-link
							v-else-if="
								authStore.isAuthenticated && authStore.getRole === 'USER'
							"
							to="/userDashboard"
							class="block text-center py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white"
							>Dashboard</nuxt-link
						>
						<!-- If the user is not authenticated, show the Login link -->
						<nuxt-link
							v-else
							to="/login"
							class="block text-center py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white"
							>Login</nuxt-link
						>
					</li>
					<!-- If the user is authenticated, show the Logout link -->
					<nuxt-link
						v-if="authStore.isAuthenticated && authStore.getRole === 'ADMIN'"
						to="/userDashboard"
						class="block text-center py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white"
						>User Portal</nuxt-link
					>
					<li>
						<!-- If the user is authenticated, show the Logout link -->
						<button
							v-if="authStore.isAuthenticated"
							@click="logout()"
							class="block text-center py-2 px-3 rounded md:border-0 text-white hover:bg-gray-700 hover:text-white">
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script setup>
	import { useAuthStore } from "~/stores/myStore";
	const authStore = useAuthStore();

	// Logout function clears the auth data and navigates to the home page
	const logout = () => {
		authStore.clearAuthData();
		navigateTo("/");
	};
</script>
