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
              <th class="px-4 py-2 text-left border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(appointment, index) in filteredAppointments"
              :key="index"
              :class="{ 'text-gray-400': !appointment.isActive }"
            >
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
              <td class="px-4 py-2 border">
                <button
                  class="px-2 py-1 text-white bg-blue-500 hover:bg-blue-600 mr-2 mb-2 w-16"
                  @click="editAppointment(appointment)"
                  :disabled="!appointment.isActive"
                >
                  Edit
                </button>
                <button
                  class="px-2 py-1 text-white bg-red-500 hover:bg-red-600 w-16"
                  @click="deleteCurrentAppointment(appointment.id)"
                  :disabled="!appointment.isActive"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-between items-center mt-4">
          <button
            class="px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-600"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            Previous
          </button>
          <div>Page {{ currentPage }} of {{ totalPages }}</div>
          <button
            class="px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-600"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
      </template>
      <template v-else>
        <!-- <p class="text-center">Loading...</p> -->
        <p class="text-center">{{ loading ? 'Loading...' : 'No data found.' }}</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { fetchAppointments, deleteAppointment } from '@/api/index'
import { useRouter } from 'vue-router'

const router = useRouter()

const appointments: any = ref([])
const sortBy = ref('appointment_date')
const sortOrder = ref('asc')
const searchQuery = ref('')
const itemsPerPage = ref(4)
const currentPage = ref(1)

const loading = ref(true)

onMounted(async () => {
  try {
    const fetchedAppointments = await fetchAppointments()
    appointments.value = fetchedAppointments.records
  } catch (error) {
    console.error('Error fetching appointments:', error)
  } finally {
    loading.value = false;
  }
})

const formattedAppointments = computed(() => {
  const currentDate = new Date()

  appointments.value.forEach((appointment: any) => {
    const appointmentDate = new Date(appointment.fields.appointment_date)
    appointment.isActive = appointmentDate >= currentDate
  })

  return appointments.value
})

const sortAppointments = (columnName: string) => {
  if (sortBy.value === columnName) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    formattedAppointments.value.reverse()
  } else {
    sortBy.value = columnName
    sortOrder.value = 'asc'
    formattedAppointments.value.sort((a: any, b: any) => {
      const dateA: any = new Date(a.fields[columnName])
      const dateB: any = new Date(b.fields[columnName])
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  }
}

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const filteredAppointments = computed(() => {
  if (!searchQuery.value) {
    return formattedAppointments.value.slice(startIndex.value, endIndex.value)
  }

  const query = searchQuery.value.toLowerCase()
  return formattedAppointments.value.filter((appointment: any) => {
    if (Array.isArray(appointment.fields.agent_name)) {
      return appointment.fields.agent_name.some((agent: any) => agent.toLowerCase().includes(query))
    } else if (typeof appointment.fields.agent_name === 'string') {
      return appointment.fields.agent_name.toLowerCase().includes(query)
    }
    return false
  })
})

const totalPages = computed(() => {
  const dataToPaginate = searchQuery.value
    ? filteredAppointments.value
    : formattedAppointments.value
  return Math.ceil(dataToPaginate.length / itemsPerPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const editAppointment = (appointment: any) => {
  router.replace({
    name: 'EstateEditAppointment',
    params: { id: appointment.id }
  })
}

const deleteCurrentAppointment = async (id: any) => {
  try {
    await deleteAppointment(id)
    const updatedAppointments = await fetchAppointments()
    appointments.value = updatedAppointments.records
    console.log('Appointment deleted successfully.')
  } catch (error) {
    console.error('Error deleting appointment:', error)
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
})
</script>
