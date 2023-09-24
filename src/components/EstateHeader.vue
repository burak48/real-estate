<template>
  <nav class="bg-blue-950 p-4 text-white">
    <ul class="space-y-2">
      <li>
        <router-link to="/" class="block py-2 px-4 hover:bg-blue-600">Home</router-link>
      </li>
      <li>
        <router-link to="/appointments" class="block py-2 px-4 hover:bg-blue-600"
          >Appointments</router-link
        >
      </li>
      <li>
        <router-link to="/create-appointment" class="block py-2 px-4 hover:bg-blue-600"
          >Create Appointment</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
