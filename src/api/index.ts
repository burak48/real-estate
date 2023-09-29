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
  try {
    const response = await api.get('/Appointments')
    return response.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

export async function getAppointment(id: any) {
  try {
    const response = await api.get(`/Appointments/${id}`)
    return response.data
  } catch (error) {
    console.error('Error getting appointment:', error)
    throw error
  }
}

export async function updateAppointment(data: any) {
  try {
    const {
      fields: { appointment_date, appointment_postcode, contact_id, agent_id }
    } = data

    const newData = {
      records: [
        {
          fields: {
            appointment_date,
            appointment_postcode,
            contact_id,
            agent_id
          }
        }
      ]
    }

    const response = await api.post('/Appointments', newData)
    return response.data
  } catch (error) {
    console.error('Error updating appointment:', error)
    throw error
  }
}

export async function deleteAppointment(id: any) {
  try {
    const response = await api.delete('/Appointments', {
      params: {
        records: [id]
      }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting appointment:', error)
    throw error
  }
}

export async function createAppointment(appointmentData: any, destinationPostcode: any) {
  try {
    const requestData = {
      records: [
        {
          fields: {
            appointment_date: appointmentData.appointmentDate,
            appointment_postcode: destinationPostcode.value,
            contact_id: [appointmentData.contactId],
            agent_id: [appointmentData.agentId]
          }
        }
      ]
    }

    const response = await api.post('/Appointments', requestData)

    if (response.status === 200) {
      console.log('Appointment created successfully:', response.data)
    } else {
      console.error('Failed to create appointment:', response.statusText)
    }
  } catch (error) {
    console.error('Error creating appointment:', error)
  }
}

export async function getContacts() {
  try {
    const response = await api.get('/Contacts')
    return response.data
  } catch (error) {
    console.error('Error getting contacts:', error)
    throw error
  }
}

export async function getAgents() {
  try {
    const response = await api.get('/Agents')
    return response.data
  } catch (error) {
    console.error('Error getting agents:', error)
    throw error
  }
}
