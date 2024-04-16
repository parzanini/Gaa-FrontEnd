<template>
	<div class="w-full text-center p-4 my-auto">
		<h1 class="m-2 text-3xl font-bold underline text-black">Add Member</h1>

		<form
			@submit.prevent="addMember"
			class="max-w-sm mx-auto">
			<div class="mb-5">
				<label
					for="Member Email"
					class="block mb-2 text-2x1 font-medium text-black"
					>Email*</label
				>
				<input
					v-model="lowercaseEmail"
					type="text"
					id="memberEmail"
					class="text-2x1 rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white" />
			</div>
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
				Add Member
			</button>
			<nuxt-link
				to="/dashboard"
				class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
				Back to Dashboard
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
	// member object using ref
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
	// computed property to convert email to lowercase
	const lowercaseEmail = computed({
		get: () => member.value.email,
		set: (value) => {
			member.value.email = value.toLowerCase();
		},
	});
	// Asynchronous function to add a member to the database
	async function addMember() {
		if (
			// Check if required fields are empty
			!member.value.email ||
			!member.value.password ||
			!passwordConfirm.value ||
			!member.value.name ||
			!member.value.role ||
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
				member.value = {
					email: "",
					name: "",
					surname: "",
					eircode: "",
					address: "",
					town: "",
					county: "",
					role: "",
					password: "",
				};
				passwordConfirm.value = "";
				errorMessage.value = "Member added successfully";
				TogglePopup("isOpenClose");
			} else {
				errorMessage.value = "Failed to add member";
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

	// Popup component functions
	const popupTriggers = ref({
		isOpenClose: false,
	});

	const TogglePopup = (trigger) => {
		popupTriggers.value[trigger] = !popupTriggers.value[trigger];
	};
</script>
