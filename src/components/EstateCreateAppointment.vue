<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Create Appointment</h2>

    <div class="mt-6">
      <!-- Appointment Form -->
      <form @submit.prevent="createCurrentAppointment">
        <!-- Postal Code of Appointment Address -->
        <div class="mb-4">
          <label for="postalCode" class="block text-sm font-medium text-gray-700"
            >Appointment Postal Code</label
          >
          <input
            type="text"
            id="postalCode"
            v-model="destinationPostcode"
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
            v-model="appointment.appointmentDate"
            class="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <!-- Contact Selection (Select Box) -->
        <div class="mb-4">
          <label for="contact" class="block text-sm font-medium text-gray-700"
            >Select Contact</label
          >
          <select
            id="contact"
            v-model="appointment.contactId"
            class="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select a contact</option>
            <option
              v-for="(contact, index) in contactOptions"
              :key="index"
              :value="contact.contact_id"
            >
              <!-- {{ contact.contact_id }} - {{ contact.contact_name }} {{ contact.contact_surname }} -->
              {{
                contact.contact_name || contact.contact_surname
                  ? `${contact.contact_id} - ${contact.contact_name} ${contact.contact_surname}`
                  : contact.contact_id
              }}
            </option>
          </select>
        </div>

        <!-- Estate Agent Selection (Select Box) -->
        <div class="mb-4">
          <label for="agent" class="block text-sm font-medium text-gray-700"
            >Select Estate Agent</label
          >
          <select
            id="agent"
            v-model="appointment.agentId"
            class="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select an estate agent</option>
            <option
              v-for="(agent, index) in agentOptions"
              :key="index"
              :value="agent.agent_id"
            >
              <!-- {{ agent.agent_id }} - {{ agent.agent_name }} {{ agent.agent_surname }} -->
              {{
                agent.agent_name || agent.agent_surname
                  ? `${agent.agent_id} - ${agent.agent_name} ${agent.agent_surname}`
                  : agent.agent_id
              }}
            </option>
          </select>
        </div>

        <!-- Map component -->
        <Map @destinationPostcode="handleDestinationPostcode" />

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
import { ref, onMounted, watch } from 'vue'
import Map from '@/components/EstateMap.vue'
import { createAppointment, getContacts, getAgents } from '@/api/index'

const appointment = ref({
  appointmentDate: '',
  appointmentPostCode: '',
  postCode: 'cm27pj',
  contactId: '',
  contactName: '',
  contactSurname: '',
  contactEmail: '',
  contactPhone: '',
  agentId: '',
  agentName: '',
  agentSurname: ''
})

const resetForm = () => {
  appointment.value = {
    appointmentDate: '',
    appointmentPostCode: '',
    postCode: 'cm27pj',
    contactId: '',
    contactName: '',
    contactSurname: '',
    contactEmail: '',
    contactPhone: '',
    agentId: '',
    agentName: '',
    agentSurname: ''
  };
  destinationPostcode.value = ''
};


const contactOptions = ref([])
const agentOptions = ref([])
const destinationPostcode = ref('');

const handleDestinationPostcode = (postcode: string) => {
  destinationPostcode.value = postcode;
};

const createCurrentAppointment = async () => {
  await createAppointment(appointment.value, destinationPostcode)
  resetForm();
}

onMounted(async () => {
  try {
    const contactsResponse = await getContacts()
    const agentsResponse = await getAgents()

    contactOptions.value = contactsResponse.records.map(
      (record: {
        id: any,
        fields: {
          contact_id: any
          contact_name: any
          contact_surname: any
          contact_email: any
          contact_phone: any
        }
      }) => ({
        contact_id: record.id,
        contact_name: record.fields.contact_name,
        contact_surname: record.fields.contact_surname,
        contact_email: record.fields.contact_email,
        contact_phone: record.fields.contact_phone
      })
    )

    agentOptions.value = agentsResponse.records.map(
      (record: { id: any, fields: { agent_id: any; agent_name: any; agent_surname: any } }) => ({
        agent_id: record.id,
        agent_name: record.fields.agent_name,
        agent_surname: record.fields.agent_surname
      })
    )
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

watch(() => appointment.value.contactId, (newContactId) => {
  const selectedContact = contactOptions.value.find(
    (contact) => contact.contact_id === newContactId
  );

  if (selectedContact) {
    appointment.value.contactName = selectedContact.contact_name;
    appointment.value.contactSurname = selectedContact.contact_surname;
    appointment.value.contactEmail = selectedContact.contact_email;
    appointment.value.contactPhone = selectedContact.contact_phone;
  } else {
    appointment.value.contactName = '';
    appointment.value.contactSurname = '';
    appointment.value.contactEmail = '';
    appointment.value.contactPhone = '';
  }
})

watch(() => appointment.value.agentId, (newAgentId) => {
  const selectedAgent = agentOptions.value.find(
    (agent) => agent.agent_id === newAgentId
  );

  if (selectedAgent) {
    appointment.value.agentName = selectedAgent.agent_name;
    appointment.value.agentSurname = selectedAgent.agent_surname;
  } else {
    appointment.value.agentName = '';
    appointment.value.agentSurname = '';
  }
})

watch(destinationPostcode, (newDestinationPostcode) => {
  destinationPostcode.value = newDestinationPostcode;
});

</script>
