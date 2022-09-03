import { ReactElement } from "react";

type Column = ["date", "sleepStart", "sleepEnd", "totalDuration", "actions"];
type Row = {
  key: string;
  date: string;
  sleepStart: string;
  sleepEnd: string;
  totalDuration: string;
  actions: ReactElement;
};

export type {
  Column,
  Row
}