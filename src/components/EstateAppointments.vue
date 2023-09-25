<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Appointments</h2>

    <template v-if="formattedAppointments.length > 0">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2" @click="sortAppointments('appointment_date')">Date</th>
            <th class="px-4 py-2">Postcode</th>
            <th class="px-4 py-2">Contact Name</th>
            <th class="px-4 py-2">Agent Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in formattedAppointments" :key="index">
            <td class="px-4 py-2">{{ appointment.fields.appointment_id }}</td>
            <td class="px-4 py-2">{{ appointment.fields.appointment_date }}</td>
            <td class="px-4 py-2">{{ appointment.fields.appointment_postcode }}</td>
            <td class="px-4 py-2">{{ appointment.fields.contact_name || 'N/A' }}</td>
            <td class="px-4 py-2">{{ appointment.fields.agent_name || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </template>

    <template v-else>
      <p class="text-center">Loading data...</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchAppointments } from '@/api/index'

const appointments = ref([])
const sortBy = ref('appointment_date')

onMounted(async () => {
  const fetchedAppointments = await fetchAppointments()
  appointments.value = fetchedAppointments.records
})

const formattedAppointments = computed(() => {
  console.log('appointments.value: ', appointments.value)
  return appointments.value
})

const sortAppointments = (columnName: string) => {
  sortBy.value = columnName
  formattedAppointments.value.sort((a, b) => {
    const dateA = new Date(a.fields[columnName])
    const dateB = new Date(b.fields[columnName])
    return dateA - dateB
  })
}
</script>
