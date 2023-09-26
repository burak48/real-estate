<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Create Appointment</h2>

    <div class="mt-6">
      <!-- Appointment Form -->
      <form @submit.prevent="createAppointment">
        <!-- Postal Code of Appointment Address -->
        <div class="mb-4">
          <label for="postalCode" class="block text-sm font-medium text-gray-700"
            >Appointment Postal Code</label
          >
          <input
            type="text"
            id="postalCode"
            v-model="appointment.postalCode"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <!-- Appointment Date -->
        <div class="mb-4">
          <label for="appointmentDate" class="block text-sm font-medium text-gray-700"
            >Appointment Date</label
          >
          <input
            type="date"
            id="appointmentDate"
            v-model="appointment.date"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <!-- Personal Information (Name and Surname) -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="appointment.name"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="surname" class="block text-sm font-medium text-gray-700">Surname</label>
          <input
            type="text"
            id="surname"
            v-model="appointment.surname"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <!-- Contact Information (Email and Phone) -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="appointment.email"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            v-model="appointment.phone"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <!-- Estate Agent Employee Selection (Select Box) -->
        <div class="mb-4">
          <label for="agent" class="block text-sm font-medium text-gray-700"
            >Estate Agent Employee</label
          >
          <select id="agent" v-model="appointment.agent" class="mt-1 p-2 w-full border rounded-md">
            <option value="agent1">Agent 1</option>
            <option value="agent2">Agent 2</option>
          </select>
        </div>

        <!-- Map component -->
        <Map />

        <!-- Submit Button -->
        <div class="mt-4">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-600"
          >
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Map from '@/components/EstateMap.vue'

const appointment = ref({
  postalCode: 'cm27pj',
  date: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
  agent: ''
})

const createAppointment = () => {
  console.log(appointment.value)
}
</script>
