import { FormValues } from "./components/HomeForm";

export function formatCreateFormValues(formValues: FormValues): {
  date: string;
  sleepStart: string;
  sleepEnd: string;
} {
  const [date, sleepStart] = formValues.sleepStart.split("T");
  const [, sleepEnd] = formValues.sleepEnd.split("T");

  return {
    date,
    sleepStart,
    sleepEnd,
  };
}
