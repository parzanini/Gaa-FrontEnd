<template>
	<div class="p-2 w-full">
		<h1 class="text-center text-3xl font-semibold p-4">
			Welcome to GAA Club Membership Management System
		</h1>
		<!-- Swiper component for image carousel -->
		<Swiper
			:modules="[SwiperAutoplay, SwiperPagination]"
			:slides-per-view="1"
			:loop="true"
			:effect="'creative'"
			:pagination="{ clickable: true }"
			:autoplay="{
				delay: 5000, // image changes every 5 seconds
				disableOnInteraction: true,
			}">
			<!-- Slide images -->
			<SwiperSlide
				v-for="slide in slides"
				:key="slide.id">
				<img
					class="flex items-center justify-center m-auto p-6"
					:src="slide.img"
					:alt="slide.description" />
			</SwiperSlide>
		</Swiper>
	</div>
	<div class="p-4 w-4/5 text-2xl m-auto">
		<p>
			The Gaelic Athletic Association (GAA) is an Irish volunteer-led
			organization that promotes and regulates Gaelic games such as hurling,
			Gaelic football, camogie, and handball. It was founded in 1884 and has a
			rich history deeply intertwined with Irish culture and identity.
		</p>
		<br />
		<p>
			The GAA is responsible for organizing inter-county competitions, club
			championships, and grassroots development programs across Ireland and
			around the world. It plays a significant role in community life, providing
			opportunities for people of all ages to participate in Gaelic games and
			fostering a sense of belonging and camaraderie.
		</p>
		<br />
		<p>
			With hundreds of clubs and thousands of members, the GAA continues to be a
			cornerstone of Irish sport, promoting inclusivity, amateurism, and the
			preservation of Gaelic culture.
		</p>
		<br />
		<p>
			Welcome to our GAA Club Membership Management System. This platform is
			designed to provide access to event and match details, allowing you to
			create an account or log in using the link above. Additionally,
			administrators have the capability to view members and make necessary
			edits as required.
		</p>
	</div>
</template>
<script setup>
	// Images imported from assets folder to be used in the carousel
	import img1 from "~/assets/imgs/image1.jpeg";
	import img2 from "~/assets/imgs/image2.jpeg";
	import img3 from "~/assets/imgs/image3.jpeg";
	import img4 from "~/assets/imgs/image4.jpeg";

	const slides = [
		{
			id: 1,
			img: img1,
			description: "Slide 1 image generated using AI",
		},
		{
			id: 2,
			img: img2,
			description: "Slide 2 image generated using AI",
		},
		{
			id: 3,
			img: img3,
			description: "Slide 3 image generated using AI",
		},
		{
			id: 4,
			img: img4,
			description: "Slide 4",
		},
	];
</script>
