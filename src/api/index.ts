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
