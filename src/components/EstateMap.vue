<template>
  <div id="map" class="w-full h-400"></div>

  <div class="directions-panel" v-if="showDirections">
    <p class="font-semibold text-lg">Total Duration: {{ totalDuration }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, defineEmits } from 'vue'
import { Loader, type LoaderOptions } from '@googlemaps/js-api-loader'

const position = ref({ lat: 51.7292, lng: 0.478 })
const showDirections = ref(false)
const directionsSteps = ref([])
const totalDuration = ref('')
let marker: google.maps.Marker | null = null
let destinationMarker: google.maps.Marker | null = null
let directionsRenderer: google.maps.DirectionsRenderer | null = null // Track directions renderer

const emit = defineEmits(['destinationPostcode'])

const initMap = async () => {
  const loaderOptions: LoaderOptions = {
    apiKey: `${import.meta.env.VITE_APP_GOOGLE_API_KEY}`,
    version: 'beta'
  }

  const loader = new Loader(loaderOptions)

  try {
    await loader.load()
  } catch (error) {
    console.error('Failed to load Google Maps API:', error)
    return
  }

  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    zoom: 16,
    center: position.value
  })

  directionsRenderer = new google.maps.DirectionsRenderer({
    map,
    panel: document.getElementById('directions-panel') as HTMLElement // Add a panel to display directions
  })

  // Create an origin marker
  new google.maps.Marker({
    map,
    position: position.value,
    title: 'Origin',
    clickable: false
  })

  google.maps.event.addListener(map, 'click', (event: google.maps.MouseEvent) => {
    if (destinationMarker) {
      // Remove the old destination marker
      destinationMarker.setMap(null)
    }

    if (marker) {
      marker.setPosition(event.latLng)
    } else {
      marker = new google.maps.Marker({
        map,
        position: event.latLng,
        title: 'Real Estate',
        clickable: true
      })
    }

    calculateDirections(map, marker)
  })

  return { map }
}

// TODO: 
const reverseGeocode = async (latLng) => {
  const geocoder = new google.maps.Geocoder();

  try {
    const results = await new Promise((resolve, reject) => {
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });

    if (results && results[0] && results[0].address_components) {
      for (const component of results[0].address_components) {
        if (component.types.includes('postal_code')) {
          return component.short_name; // Extract the postcode
        }
      }
    }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
  }

  return null;
}

const calculateDirections = (map: google.maps.Map, marker: google.maps.Marker) => {
  const directionsService = new google.maps.DirectionsService()

  const request = {
    origin: marker.getPosition(),
    destination: { lat: 51.729157, lng: 0.478027 },
    travelMode: google.maps.TravelMode.DRIVING
  }

  // TODO: 
  reverseGeocode(request.destination).then((postcode: any) => {
    if (postcode) {
      console.log("POST CODE from MAP: ", postcode)
      emit('destinationPostcode', postcode);
    }
  })

  directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const route = result.routes[0]
      const steps = route.legs[0].steps.map((step) => step.instructions)
      const duration = route.legs[0].duration.text

      directionsSteps.value = steps
      totalDuration.value = duration

      if (directionsRenderer) {
        // Clear old directions
        directionsRenderer.setDirections({ routes: [] })
      }

      // Create a new destination marker and track it
      destinationMarker = new google.maps.Marker({
        map,
        position: request.destination,
        title: 'Destination'
      })

      // Render new directions
      directionsRenderer.setDirections(result)
      showDirections.value = true
    } else {
      console.error('Directions request failed:', status)
    }
  })
}

const { map } = onMounted(initMap)

watchEffect(() => {
  if (map && marker) {
    const initialPosition = map.getCenter()
    calculateDirections(map, new google.maps.Marker({ position: initialPosition }))
  }
})
</script>

<style scoped>
.h-400 {
  height: 400px;
}
</style>
