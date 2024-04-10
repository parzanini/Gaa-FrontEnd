<template>
	<div
		class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-20 flex items-center justify-center">
		<div class="bg-white p-8">
			<slot />
			<div class="flex justify-center">
				<button
					@click="TogglePopup"
					class="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600">
					OK
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	// Define props for the component
	const props = defineProps({
		TogglePopup: Function,
	});
</script>
