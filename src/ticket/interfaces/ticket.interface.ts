export interface TicketResponse {
  barCode: string;
  amount: string;
  expirationDate: string;
}

export interface TicketValues {
  bankCode: string;
  coinCode: string;
  verificationCode: string;
  dueDateFactor: string;
  ticketValue: string;
  freeField: string;
}

export interface ConcessionaryValues {
  barCode: string;
  dueDateFactor: string;
  value: string;
}
