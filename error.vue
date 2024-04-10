<!-- Custom 404 page -->
<template>
	<div
		class="min-h-screen flex flex-col justify-center items-center bg-gray-200">
		<h1 class="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
		<img
			src="~/assets/sorry-sir-are.jpg"
			alt="404" />
		<p class="text-lg text-gray-600 mb-8">
			Looks like you're lost in the wilderness...
		</p>
		<nuxt-link
			to="/"
			class="text-blue-500 hover:underline"
			>Go back home</nuxt-link
		>
	</div>
</template>
