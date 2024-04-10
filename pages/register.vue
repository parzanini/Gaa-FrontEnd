<template>
	<div class="w-full text-center p-4 my-auto">
		<h1 class="m-2 text-3xl font-bold underline text-black">
			Create An Account
		</h1>

		<form
			@submit.prevent="submitForm"
			class="max-w-sm mx-auto">
			<div class="mb-5">
				<label
					for="Name"
					class="block mb-2 text-2x1 font-medium text-black"
					>Name*</label
				>
				<input
					v-model="member.name"
					type="text"
					id="name"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Surname"
					class="block mb-2 text-2x1 font-medium text-black"
					>Surname*</label
				>
				<input
					v-model="member.surname"
					type="text"
					id="surname"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Eircode"
					class="block mb-2 text-2x1 font-medium text-black"
					>Eircode</label
				>
				<input
					v-model="member.eircode"
					type="text"
					id="eircode"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Address"
					class="block mb-2 text-2x1 font-medium text-black"
					>Address</label
				>
				<input
					v-model="member.address"
					type="text"
					id="address"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Town"
					class="block mb-2 text-2x1 font-medium text-black"
					>Town</label
				>
				<input
					v-model="member.town"
					type="text"
					id="town"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="County"
					class="block mb-2 text-2x1 font-medium text-black"
					>County</label
				>
				<input
					v-model="member.county"
					type="text"
					id="county"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Email"
					class="block mb-2 text-2x1 font-medium text-black"
					>Email*</label
				>
				<input
					v-model="member.email"
					type="text"
					id="email"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>

			<div class="mb-5">
				<label
					for="Password"
					class="block mb-2 text-2x1 font-medium text-black"
					>Password*</label
				>
				<input
					v-model="member.password"
					type="password"
					id="password"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Confirm Password"
					class="block mb-2 text-2x1 font-medium text-black"
					>Confirm Password*</label
				>
				<input
					v-model="passwordConfirm"
					type="password"
					id="confirmPassword"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<button
				type="submit"
				class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
				Create Account
			</button>
			<nuxt-link
				to="/"
				class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
				Back to Home
			</nuxt-link>
		</form>
		<!-- Popup component -->
		<Popup
			v-if="popupTriggers.isOpenClose"
			:TogglePopup="() => TogglePopup('isOpenClose')">
			<h2>{{ errorMessage }}</h2>
		</Popup>
	</div>
</template>
<script setup>
	import { ref } from "vue";
	//Standard Role is set to User
	let member = ref({
		email: "",
		name: "",
		surname: "",
		eircode: "",
		address: "",
		town: "",
		county: "",
		password: "",
		role: "USER",
	});
	let passwordConfirm = ref("");
	let errorMessage = ref("");
	// Asyncronous function to submit form
	async function submitForm() {
		if (
			// Check if required fields are empty
			!member.value.email ||
			!member.value.password ||
			!passwordConfirm.value ||
			!member.value.name ||
			!member.value.surname
		) {
			errorMessage.value = "Please fill in all required fields";
			TogglePopup("isOpenClose");
			return;
			// Check if email is valid using regex
		} else if (member.value.email !== RegExp)
			if (
				!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
					member.value.email
				)
			) {
				errorMessage.value = "Please enter a valid email address";
				TogglePopup("isOpenClose");
				return;
				// Check if password and confirm password match
			} else if (member.value.password !== passwordConfirm.value) {
				errorMessage.value = "Passwords do not match";
				TogglePopup("isOpenClose");
				return;
			}
		// if all checks pass, send a POST request to the API
		try {
			const response = await fetch(
				"https://gaa-backend.onrender.com/api/addmember",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(member.value),
				}
			);
			if (response.ok) {
				alert(
					"Welcome to the GAA! You will now be redirected to the login page"
				);
				navigateTo("/login");
			} else {
				errorMessage.value = "Failed to create account";
				TogglePopup("isOpenClose");
			}
		} catch (error) {
			console.error(error);
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
