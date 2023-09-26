<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Edit Appointment</h2>
    <p>Appointment ID: {{ id }}</p>
    <pre>Appointment Data: {{ formattedAppointment }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAppointment } from '@/api/index'
import { defineProps } from 'vue'

const { id } = defineProps(['id'])
const appointment = ref({})

onMounted(async () => {
  appointment.value = await getAppointment(id)
  console.log('appointment.value: ', appointment.value)
})

const formattedAppointment = computed(() => {
  console.log('appointment.value: ', appointment.value)
  return appointment.value
})
</script>
