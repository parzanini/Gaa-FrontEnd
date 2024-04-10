<template>
	<h2 class="m-2 text-2xl text-black text-center">
		<!-- Get the event name from the store -->
		Matches for {{ authStore.getEventName }}
	</h2>
	<div
		class="border border-black rounded-lg md:m-6 m-2 p-5 bg-green-800 text-white"
		v-for="match in matches"
		:key="match.id">
		<h3 class="text-center font-bold text-2xl">{{ match.name }}</h3>
		<p class="text-center text-1xl">{{ match.description }}</p>
		<div class="flex justify-between">
			<div class="w-1/3 text-center">
				<p>{{ match.date }}</p>
			</div>
			<div class="w-1/3 text-center">
				<p>{{ match.location }}</p>
			</div>
			<div class="w-1/3 text-center">
				<p>{{ match.time }}</p>
			</div>
		</div>
		<div class="flex justify-evenly">
			<div class="w-1/3 font-bold text-center text-lg md:text-2xl">
				<p>{{ match.team1 }}</p>
			</div>
			<div class="w-1/3 font-bold text-lg md:text-3xl text-black text-center">
				<p>{{ match.score }}</p>
			</div>
			<div class="w-1/3 font-bold text-center text-lg md:text-2xl">
				<p>{{ match.team2 }}</p>
			</div>
		</div>
		<p class="text-center">{{ match.referee }}</p>
	</div>
	<div class="flex justify-center">
		<nuxt-link
			to="/userDashboard"
			class="p-2 border border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
			Back to Dashboard
		</nuxt-link>
	</div>
</template>
<script setup>
	// Import the store and other dependencies
	import { useAuthStore } from "~/stores/myStore";
	import { ref } from "vue";
	const authStore = useAuthStore();
	const route = useRoute();
	const eventId = route.params.eventId;

	const matches = ref({
		id: "",
		name: "",
		description: "",
		date: "",
		location: "",
		time: "",
		team1: "",
		team2: "",
		score: "",
		result: "",
		referee: "",
	});
	// Fetch the matches for the event
	async function getMatchesByEvent() {
		try {
			const response = await fetch(
				`https://gaa-backend.onrender.com/api/events/${eventId}/matches`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authStore.getToken}`,
					},
				}
			);
			const data = await response.json();
			matches.value = data;
			console.log(matches.value);
		} catch (error) {
			console.error(error);
		}
	}
	// Call the function to get the matches
	getMatchesByEvent();
</script>
