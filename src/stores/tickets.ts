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

  const deleteTicket = (ticketId: string) => {
    tickets.value = tickets.value.filter(t => t._id !== ticketId)
  }

  return {
    tickets,
    saveTickets,
    addTicket,
    updateTicket,
    deleteTicket
  }
})
