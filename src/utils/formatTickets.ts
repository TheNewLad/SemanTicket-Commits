import { Ticket } from "./hooks/useTickets.tsx";

export const formatTickets = (tickets: Ticket[]): string =>
  tickets.reduce((acc, { title }) => `${acc}[${title}]`, "");
