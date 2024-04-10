<template>
	<div class="w-full p-4 text-center">
		<h2 class="m-2 text-2xl text-black">
			<!-- Display the user's name using Pinia Store -->
			Welcome to our Member Portal {{ authStore.getName }}
		</h2>
		<h3 class="m-2 text-1xl font-bold text-black">
			These are our current events, click on any event for more details
		</h3>
		<div
			class="border border-black rounded-lg md:m-6 m-2 p-5 bg-green-800 text-white"
			v-for="event in events"
			:key="event.id">
			<button @click="setAndNavigate(event.name, event.id)">
				<h3 class="text-center font-bold text-2xl">{{ event.name }}</h3>
				<p class="text-center text-1xl">{{ event.description }}</p>
			</button>
		</div>
		<h3 class="m-2 text-1xl font-bold text-black">
			Or click below to view all matches
		</h3>
		<nuxt-link
			to="/userDashboard/events"
			@click="getMatches"
			class="p-2 border border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
			View Matches
		</nuxt-link>
	</div>
</template>
<script setup>
	import { useAuthStore } from "~/stores/myStore";
	import { ref } from "vue";
	const authStore = useAuthStore();

	const events = ref({
		id: "",
		name: "",
		description: "",
	});

	// Function to get all events
	async function getEvents() {
		try {
			const response = await fetch(
				"https://gaa-backend.onrender.com/api/events",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authStore.getToken}`,
					},
				}
			);
			const data = await response.json();
			events.value = data;
			console.log(events.value);
		} catch (error) {
			console.error(error);
		}
	}
	// Function to set the event name using Pinia and navigate to the event page
	const setAndNavigate = (name, id) => {
		authStore.setEventName(name);
		navigateTo(`/userDashboard/events/${id}`);
	};
	// Call the function to get the events
	getEvents();
</script>
