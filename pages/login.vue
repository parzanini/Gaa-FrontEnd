<template>
	<section class="bg-gray-50">
		<div
			class="flex flex-col items-center justify-center px-3 py-4 mx-auto md:my-40 lg:py-0">
			<div
				class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-neutral-700">
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1
						class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
						Sign in to your account
					</h1>
					<form
						class="space-y-4 md:space-y-6"
						@submit.prevent="submitForm">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-white"
								>Your email</label
							>
							<input
								v-model="email"
								type="email"
								name="email"
								id="email"
								class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
								placeholder="name@email.com" />
						</div>
						<div>
							<label
								for="password"
								class="block mb-2 text-sm font-medium text-white"
								>Password</label
							>
							<input
								v-model="password"
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
						</div>
						<div class="flex justify-center text-center">
							<button
								type="submit"
								class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
								Sign in
							</button>
							<nuxt-link
								to="/"
								class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
								Back to Home
							</nuxt-link>
						</div>
						<p class="text-sm font-light text-white">
							Don’t have an account yet?
							<nuxt-link
								to="/register"
								class="font-medium text-primary-600 hover:underline text-primary-500"
								>Sign up</nuxt-link
							>
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
	<!-- Popup component -->
	<Popup
		v-if="popupTriggers.isOpenClose"
		:TogglePopup="() => TogglePopup('isOpenClose')">
		<h2>{{ errorMessage }}</h2>
	</Popup>
</template>

<script setup>
	import { ref } from "vue";

	import { useAuthStore } from "~/stores/myStore";

	let email = ref("");
	let password = ref("");
	const authStore = useAuthStore();
	let errorMessage = ref("");

	// Asyncronous function to submit the form
	async function submitForm() {
		try {
			const response = await fetch(
				"https://gaa-backend.onrender.com/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					// Convert the form data to JSON and send it to Spring Boot
					body: JSON.stringify({
						email: email.value,
						password: password.value,
					}),
				}
			);

			if (!response.ok) {
				errorMessage.value = "Invalid email or password";
				TogglePopup("isOpenClose");
				return;
			}

			const authData = await response.json();
			// Set the DTO response to Pinia store
			authStore.setAuthData(authData);
			console.log("Login successful:", authData);
			// based on the role, navigate to the dashboard if admin or userDashboard if user
			if (authData.role === "ADMIN") {
				navigateTo("/dashboard");
			} else {
				navigateTo("/userDashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	}
	// Popup component functions
	const popupTriggers = ref({
		isOpenClose: false,
	});

	const TogglePopup = (trigger) => {
		popupTriggers.value[trigger] = !popupTriggers.value[trigger];
	};
</script>
