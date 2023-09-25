<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Appointments</h2>

    <div class="overflow-x-auto">
      <template v-if="formattedAppointments.length > 0">
        <input
          v-model="searchQuery"
          type="text"
          class="px-2 py-1 border rounded-md w-full mb-4"
          placeholder="Search by Agent Name"
        />
        <table class="table-auto w-full border border-collapse">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left border">ID</th>
              <th class="px-4 py-2 text-left border" @click="sortAppointments('appointment_date')">
                Date
                <font-awesome-icon icon="fa-solid fa-chevron-up" v-if="sortOrder === 'asc'" />
                <font-awesome-icon icon="fa-solid fa-chevron-down" v-else />
              </th>
              <th class="px-4 py-2 text-left border">Postcode</th>
              <th class="px-4 py-2 text-left border">Contact Name</th>
              <th class="px-4 py-2 text-left border">Agent Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(appointment, index) in filteredAppointments" :key="index">
              <td class="px-4 py-2 border">{{ appointment.fields.appointment_id }}</td>
              <td class="px-4 py-2 border">{{ appointment.fields.appointment_date }}</td>
              <td class="px-4 py-2 border">{{ appointment.fields.appointment_postcode }}</td>
              <td class="px-4 py-2 border">
                <ul>
                  <li v-for="(contact, cIndex) in appointment.fields.contact_name" :key="cIndex">
                    {{ contact || 'N/A' }}
                  </li>
                </ul>
              </td>
              <td class="px-4 py-2 border">
                <ul>
                  <li v-for="(agent, aIndex) in appointment.fields.agent_name" :key="aIndex">
                    {{ agent || 'N/A' }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <p class="text-center">Loading...</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { fetchAppointments } from '@/api/index'

const appointments = ref([])
const sortBy = ref('appointment_date')
const sortOrder = ref('asc')
const searchQuery = ref('')

onMounted(async () => {
  const fetchedAppointments = await fetchAppointments()
  appointments.value = fetchedAppointments.records
})

const formattedAppointments = computed(() => {
  console.log('appointments.value: ', appointments.value)
  return appointments.value
})

const sortAppointments = (columnName: string) => {
  if (sortBy.value === columnName) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    formattedAppointments.value.reverse()
  } else {
    sortBy.value = columnName
    sortOrder.value = 'asc'
    formattedAppointments.value.sort((a, b) => {
      const dateA = new Date(a.fields[columnName])
      const dateB = new Date(b.fields[columnName])
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  }
}

const filteredAppointments = computed(() => {
  if (!searchQuery.value) {
    return formattedAppointments.value
  }

  const query = searchQuery.value.toLowerCase()
  return formattedAppointments.value.filter((appointment) => {
    if (Array.isArray(appointment.fields.agent_name)) {
      return appointment.fields.agent_name.some((agent) => agent.toLowerCase().includes(query))
    } else if (typeof appointment.fields.agent_name === 'string') {
      return appointment.fields.agent_name.toLowerCase().includes(query)
    }
    return false
  })
})
</script>
