<template>
  <div>
    <h2>Appointments</h2>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchAppointments } from '@/api/index'

const appointments = ref([])

onMounted(async () => {
  appointments.value = await fetchAppointments()
})
</script>
@/api
