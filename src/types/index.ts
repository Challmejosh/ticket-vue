export interface TicketType {
  title: string
  status: "open" | "in_progress" | "closed"
  desc: string
  priority: "high" | "medium" | "low" | "none"
  _id?: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}
