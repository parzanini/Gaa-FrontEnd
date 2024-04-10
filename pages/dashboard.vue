<template>
	<div class="w-full p-4 text-center">
		<h2 class="m-2 text-2xl text-black">
			<!-- Display the name of the user -->
			Welcome to the Admin Portal {{ authStore.getName }}
		</h2>
		<!-- Table for desktop -->
		<div class="md:block hidden">
			<table class="m-auto p-2 table-auto">
				<thead>
					<tr>
						<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
							Email
						</th>
						<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
							Name
						</th>
						<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
							Surname
						</th>
						<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
							Role
						</th>
						<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="member in members"
						:key="member.email"
						class="bg-neutral-300 text-black">
						<td class="md:p-3 md:font-bold">{{ member.email }}</td>
						<td class="md:p-3 md:font-bold">{{ member.name }}</td>
						<td class="md:p-3 md:font-bold">
							{{ member.surname }}
						</td>
						<td class="md:p-3 md:font-bold">{{ member.role }}</td>
						<td class="md:p-3">
							<!-- Edit and Delete buttons -->
							<nuxt-link
								:to="`/addMember/${member.email}`"
								class="md:p-2 p-1 border-2 border-black rounded-lg bg-teal-500 md:m-2 m-1 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
								>Edit</nuxt-link
							>
							<button
								@click="deleteMember(member.email)"
								class="md:p-2 p-1 border-2 border-black rounded-lg bg-rose-400 md:m-2 m-1 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- Responsive table (This is the only way I found to make this table responsive) -->
		<table class="m-autotable-auto md:hidden block">
			<thead>
				<tr>
					<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
						Email
					</th>
					<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
						Name
					</th>
					<th class="md:px-4 md:py-2 rounded-lg bg-gray-900 text-white">
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="member in members"
					:key="member.email"
					class="bg-neutral-300 text-black">
					<td class="md:p-3 md:font-bold">{{ member.email }}</td>
					<td class="md:p-3 md:font-bold">{{ member.name }}</td>
					<td class="md:p-3">
						<!-- Edit and Delete buttons -->
						<nuxt-link
							:to="`/addMember/${member.email}`"
							class="md:p-2 p-1 border-2 border-black rounded-lg bg-teal-500 md:m-2 m-1 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
							>Edit</nuxt-link
						>
						<button
							@click="deleteMember(member.email)"
							class="md:p-2 p-1 border-2 border-black rounded-lg bg-rose-400 md:m-2 m-1 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all">
							Delete
						</button>
					</td>
				</tr>
			</tbody>
		</table>
		<br />
		<!-- Popup component -->
		<Popup
			v-if="popupTriggers.isOpenClose"
			:TogglePopup="() => TogglePopup('isOpenClose')">
			<h2>User Deleted successfully</h2>
		</Popup>
		<!-- Buttons to add a new member and go back to the home page -->
		<nuxt-link
			to="/addMember"
			class="p-2 border border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
			>Add New Member</nuxt-link
		>
		<nuxt-link
			to="/"
			class="p-2 border-2 border-black rounded-lg bg-amber-500 m-2 btn shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_4px_0px_rgb(0,0,0)] text-black ease-out hover:translate-y-1 transition-all"
			>Back to Home</nuxt-link
		>
	</div>
</template>
<script setup>
	import { ref } from "vue";
	import { useAuthStore } from "~/stores/myStore";
	const members = ref([]);

	const authStore = useAuthStore();
	// Fetch all members
	const fetchMembers = async () => {
		try {
			const response = await fetch(
				"https://gaa-backend.onrender.com/api/members",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${authStore.getToken}`,
					},
				}
			);

			members.value = await response.json();
		} catch (error) {
			console.error(error);
		}
	};
	// Delete a member
	const deleteMember = async (email) => {
		try {
			const response = await fetch(
				`https://gaa-backend.onrender.com/api/deletemember/${email}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${authStore.getToken}`,
					},
				}
			);
			if (response.ok) {
				TogglePopup("isOpenClose");
				fetchMembers();
			} else {
				alert("Failed to delete member");
			}
		} catch (error) {
			console.error(error);
		}
	};
	// Fetch members when the component is mounted
	fetchMembers();
	// Popup component functions
	const popupTriggers = ref({
		isOpenClose: false,
	});

	const TogglePopup = (trigger) => {
		popupTriggers.value[trigger] = !popupTriggers.value[trigger];
	};
</script>
