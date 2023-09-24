<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">
    <Header />

    <!-- <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10"> -->
    <div class="flex-1 p-4">
      <p class="text-3xl text-gray-700 font-bold mb-5">Welcome!</p>
      <p class="text-gray-500 text-lg">Vue and Tailwind CSS in action</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAppointments } from '@/api/index'
import Header from '@/components/EstateHeader.vue'

const appointments = ref([])

onMounted(async () => {
  appointments.value = await fetchAppointments()
})

console.log(appointments)
</script>

<style scoped></style>
