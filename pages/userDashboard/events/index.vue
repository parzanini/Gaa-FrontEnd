<template>
	<div>
		<h2 class="m-2 text-2xl text-black text-center">
			Explore recent and upcoming match results
		</h2>

		<!-- V-For using Pagination -->
		<div
			class="border border-black rounded-lg md:m-6 m-2 p-5 bg-green-800 text-white"
			v-for="match in paginatedMatches"
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

		<!-- Pagination controls -->

		<div class="flex justify-center my-4">
			<div>
				<button
					class="p-2 border border-black rounded-lg bg-red-400 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
					@click="previousPage"
					:disabled="currentPage === 1">
					Previous
				</button>
			</div>
			<div class="">
				<span class="mx-4 text-xl font-bold"
					>{{ currentPage }} / {{ totalPages }}</span
				>
			</div>
			<div>
				<button
					class="p-2 border border-black rounded-lg bg-red-400 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
					@click="nextPage"
					:disabled="currentPage === totalPages">
					Next
				</button>
			</div>
		</div>

		<!-- Back to Dashboard link -->
		<div class="flex justify-center">
			<nuxt-link
				to="/userDashboard"
				class="p-2 border border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
				Back to Dashboard
			</nuxt-link>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from "~/stores/myStore";
	import { ref, computed } from "vue";
	const authStore = useAuthStore();

	const matches = ref([]);
	const itemsPerPage = 3; // Number of matches per page
	const currentPage = ref(1);

	// Computed property to calculate the total number of pages
	const totalPages = computed(() =>
		Math.ceil(matches.value.length / itemsPerPage)
	);

	// Computed property to slice the matches array based on the current page
	const paginatedMatches = computed(() => {
		const startIndex = (currentPage.value - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return matches.value.slice(startIndex, endIndex);
	});

	// Function to fetch matches
	async function getMatches() {
		try {
			const response = await fetch(
				"https://gaa-backend.onrender.com/api/matches",
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

	// Function to navigate to the previous page
	const previousPage = () => {
		if (currentPage.value > 1) {
			currentPage.value--;
		}
	};

	// Function to navigate to the next page
	const nextPage = () => {
		if (currentPage.value < totalPages.value) {
			currentPage.value++;
		}
	};

	// Fetch matches when the component is mounted
	getMatches();
</script>
