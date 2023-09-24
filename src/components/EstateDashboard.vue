<template>
  <div>
    <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p class="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p class="text-gray-500 text-lg">Vue and Tailwind CSS in action</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchAppointments } from '@/api/index';

const appointments = ref([]);

onMounted(async () => {
  appointments.value = await fetchAppointments();
});

console.log(appointments)
</script>
