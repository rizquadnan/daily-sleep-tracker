export type Sleep = {
  date: string;
  id: number;
  sleepEnd: string;
  sleepStart: string;
  sleepDuration: number;
};

export type GetSleepsResponse = {
  rows: Sleep[];
  totalPage?: number;
  totalRows?: number;
};
