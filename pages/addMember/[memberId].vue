<template>
	<div class="w-full text-center p-4 my-auto">
		<h1 class="m-2 text-3xl font-bold underline text-black">Edit Member</h1>

		<form
			@submit.prevent="editMember"
			class="max-w-sm mx-auto">
			<div class="mb-5">
				<label
					for="Member Name"
					class="block mb-2 text-2x1 font-medium text-black"
					>Name*</label
				>
				<input
					v-model="member.name"
					type="text"
					id="memberName"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member Surname"
					class="block mb-2 text-2x1 font-medium text-black"
					>Surname*</label
				>
				<input
					v-model="member.surname"
					type="text"
					id="memberSurname"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member eircode"
					class="block mb-2 text-2x1 font-medium text-black"
					>Eircode</label
				>
				<input
					v-model="member.eircode"
					type="text"
					id="memberEircode"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member Address"
					class="block mb-2 text-2x1 font-medium text-black"
					>Address</label
				>
				<input
					v-model="member.address"
					type="text"
					id="memberAddress"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member Town"
					class="block mb-2 text-2x1 font-medium text-black"
					>Town</label
				>
				<input
					v-model="member.town"
					type="text"
					id="memberTown"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member County"
					class="block mb-2 text-2x1 font-medium text-black"
					>County</label
				>
				<input
					v-model="member.county"
					type="text"
					id="memberCounty"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>

			<div class="mb-5">
				<label
					for="Member Role"
					class="block mb-2 text-2x1 font-medium text-black"
					>Role*</label
				>
				<select
					v-model="member.role"
					id="memberRole"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white">
					<option value="ADMIN">Admin</option>
					<option value="USER">User</option>
				</select>
			</div>
			<div class="mb-5">
				<label
					for="Member Password"
					class="block mb-2 text-2x1 font-medium text-black"
					>Password*</label
				>
				<input
					v-model="member.password"
					type="password"
					id="memberPassword"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<div class="mb-5">
				<label
					for="Member Confirm Password"
					class="block mb-2 text-2x1 font-medium text-black"
					>Confirm Password*</label
				>
				<input
					v-model="passwordConfirm"
					type="password"
					id="memberConfirmPassword"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
			<button
				type="submit"
				class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
				Edit Member
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
	import { useAuthStore } from "~/stores/myStore";
	const authStore = useAuthStore();
	const route = useRoute();

	let member = ref({
		email: "",
		name: "",
		surname: "",
		eircode: "",
		address: "",
		town: "",
		county: "",
		role: "",
		password: "",
	});
	let passwordConfirm = ref("");
	let errorMessage = ref("");
	// Asynchronous function to get the member details using fetch
	async function getMember() {
		try {
			const response = await fetch(
				`https://gaa-backend.onrender.com/api/members/${route.params.memberId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authStore.getToken}`,
					},
				}
			);
			if (response.ok) {
				// on success, gets only necessary data
				const data = await response.json();
				member.value.email = data.email;
				member.value.name = data.name;
				member.value.surname = data.surname;
				member.value.eircode = data.eircode;
				member.value.address = data.address;
				member.value.town = data.town;
				member.value.county = data.county;
				member.value.role = data.role;
			} else {
				alert("Failed to get member");
			}
		} catch (error) {
			console.error(error);
		}
	}
	// Asynchronous function to edit the member details using fetch
	async function editMember() {
		//Check if required fields are empty
		if (
			!member.value.email ||
			!member.value.password ||
			!member.value.name ||
			!member.value.surname ||
			!passwordConfirm ||
			!member.value.role
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
				errorMessage.value = "Invalid email";
				TogglePopup("isOpenClose");
				return;
				// Check if password and confirm password match
			} else if (checkPasswordRegex(member.value.password)) {
				errorMessage.value =
					"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
				TogglePopup("isOpenClose");
				return;
			} else if (member.value.password !== passwordConfirm.value) {
				errorMessage.value = "Passwords do not match";
				TogglePopup("isOpenClose");
				return;
			}
		// if all checks pass, send a PUT request to the API
		try {
			const response = await fetch(
				`https://gaa-backend.onrender.com/api/updatemember/${route.params.memberId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authStore.getToken}`,
					},
					body: JSON.stringify(member.value),
				}
			);
			console.log(member.value);
			if (response.ok) {
				alert("Member updated successfully");
				navigateTo("/dashboard");
			} else {
				errorMessage.value = "Failed to update member";
				TogglePopup("isOpenClose");
			}
		} catch (error) {
			console.error(error);
		}
	}
	// Function to check if password meets requirements
	function checkPasswordRegex(password) {
		const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
		return !passwordRegex.test(password);
	}
	// Call the getMember function when the component is mounted
	getMember();
	// Popup component functions
	const popupTriggers = ref({
		isOpenClose: false,
	});

	const TogglePopup = (trigger) => {
		popupTriggers.value[trigger] = !popupTriggers.value[trigger];
	};
</script>
