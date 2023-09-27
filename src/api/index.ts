import axios from 'axios'

const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}/v0/${import.meta.env.VITE_APP_BASE_ID}`
const API_KEY = import.meta.env.VITE_APP_API_KEY

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
})

export async function fetchAppointments() {
  const response = await api.get('/Appointments')
  return response.data
}

export async function getAppointment(id) {
  const response = await api.get(`/Appointments/${id}`)
  return response.data
}

export async function updateAppointment(data) {
  console.log("DATA: ", data)

  const {
    fields: {
      appointment_date,
      appointment_postcode,
      contact_id,
      agent_id,
    },
  } = data;

  const newData = {
    records: [
      {
        fields: {
          appointment_date,
          appointment_postcode,
          contact_id,
          agent_id,
        },
      },
    ],
  };

  console.log("NEW DATA: ", newData);

  const response = await api.post("/Appointments", newData)
  console.log("RESPONSE111: ", response)
  console.log("RESPONSE222: ", response.data)
  // return response.data
}

export async function deleteAppointment(id) {
  const response = await api.delete('/Appointments', {
    params: {
      records: [id]
    }
  })

  return response.data
}

export async function createAppointment(appointmentData) {
  console.log("DATA: ", appointmentData)
  try {
    const requestData = {
      records: [
        {
          fields: {
            appointment_date: appointmentData.appointmentDate,
            appointment_postcode: appointmentData.postCode,
            contact_id: [appointmentData.contactId],
            agent_id: [appointmentData.agentId],
          },
        },
      ],
    };

    const response = await api.post('/Appointments', requestData);

    if (response.status === 200) {
      console.log('Appointment created successfully:', response.data);
    } else {
      console.error('Failed to create appointment:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating appointment:', error);
  }
}

export async function getContacts() {
  const response = await api.get('/Contacts')
  return response.data
}

export async function getAgents() {
  const response = await api.get('/Agents')
  return response.data
}
