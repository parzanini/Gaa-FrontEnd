<template>
	<footer class="shadow bg-gray-800 flex flex-row flex-wrap w-full p-4">
		<div class="text-sm text-white md:w-1/2 text-center w-full p-1">
			Made By Thiago Gomes Parzanini {{ year }}
		</div>

		<div class="text-sm font-medium text-white md:w-1/2 text-center w-full p-1">
			Current time: {{ currentTime }}
		</div>
		<div class="text-sm font-medium text-white w-full text-center p-1">
			<a
				href="https://github.com/TUS-DEVMR/project-40-parzanini"
				class="hover:underline"
				>Github</a
			>
		</div>
	</footer>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	let currentTime = ref("");
	// timeOfDay function gets the current time and sets it to the currentTime variable
	const timeOfDay = () => {
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		currentTime.value = hours + ":" + formattedMinutes;
	};
	// onMounted runs the timeOfDay function when the component is mounted
	onMounted(() => {
		timeOfDay();
		setInterval(timeOfDay, 10000);
	});
	// year variable gets the current year
	const year = new Date().getFullYear();
</script>
