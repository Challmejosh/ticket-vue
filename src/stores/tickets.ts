import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TicketType } from '../types'

export const useTicketStore = defineStore('tickets', () => {
  const tickets = ref<TicketType[]>([])

  const saveTickets = (ticketList: TicketType[]) => {
    tickets.value = ticketList
  }

  const addTicket = (ticket: TicketType) => {
    tickets.value.push(ticket)
  }

  const updateTicket = (updatedTicket: TicketType) => {
    const index = tickets.value.findIndex(t => t._id === updatedTicket._id)
    if (index !== -1) {
      tickets.value[index] = updatedTicket
    }
  }

  return {
    tickets,
    saveTickets,
    addTicket,
    updateTicket
  }
})
