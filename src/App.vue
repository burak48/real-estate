<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/EstateHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">
    <Header />
    <div class="flex-1 p-4">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
