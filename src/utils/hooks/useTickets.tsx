import { useState } from "react";

export interface Ticket {
  id: string;
  title: string;
}

export const useTickets = (initialState: Ticket[] = []) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialState);

  const addTickets = (
    ticketString: string,
    onError: () => void,
    onResolve: () => void
  ) => {
    const newTickets = ticketString
      .split(",")
      .map((ticket) => ticket.trim())
      .filter((ticket) => ticket.length)
      .map((ticket) => ({ id: crypto.randomUUID(), title: ticket }));

    if (newTickets.some(({ title }) => title.length > 20)) {
      onError();
      return;
    }

    onResolve();
    setTickets((tickets) => [...tickets, ...newTickets]);
  };
  const removeTicket = (id: string) => () => {
    setTickets((tickets) => tickets.filter((ticket) => ticket.id !== id));
  };

  return { tickets, addTickets, removeTicket };
};
