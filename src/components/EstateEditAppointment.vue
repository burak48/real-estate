<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Edit Appointment</h2>
    <p>Appointment ID: {{ id }}</p>
    <!-- <pre>Appointment Data: {{ formattedAppointment }}</pre> -->

    <div class="mt-6" v-if="isDataLoaded">
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="appointmentDate" class="block text-sm font-medium text-gray-700"
            >Appointment Date</label
          >
          <input
            v-model="formattedAppointment.fields.appointment_date"
            type="date"
            id="appointmentDate"
            class="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>

        <div class="mb-4">
          <label for="appointmentPostcode" class="block text-sm font-medium text-gray-700"
            >Appointment Postcode</label
          >
          <input
            v-model="formattedAppointment.fields.appointment_postcode"
            type="text"
            id="appointmentPostcode"
            class="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label for="contactName" class="block text-sm font-medium text-gray-700"
            >Contact Name</label
          >
          <input
            v-model="formattedAppointment.fields.contact_name[0]"
            type="text"
            id="contactName"
            class="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label for="agentName" class="block text-sm font-medium text-gray-700">Agent Name</label>
          <input
            v-model="formattedAppointment.fields.agent_name[0]"
            type="text"
            id="agentName"
            class="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">Save</button>
        <button
          type="button"
          class="bg-gray-300 text-gray-700 p-2 rounded-md ml-2"
          @click="cancelEdit"
        >
          Cancel
        </button>
      </form>
    </div>

    <div class="mt-6" v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAppointment, updateAppointment } from '@/api/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const { id } = defineProps(['id'])

const isDataLoaded = ref(false)
const formattedAppointment: any = ref({})

onMounted(async () => {
  formattedAppointment.value = await getAppointment(id)
  isDataLoaded.value = true
})

const submitForm = async () => {
  await updateAppointment(formattedAppointment.value)
  router.push('/appointments')
}

const cancelEdit = () => {
  router.push('/appointments')
}
</script>
