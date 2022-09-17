export const formatToHHMM = (hours: number, minutes: number) => {
  const HH = hours < 10 ? `0${hours}` : String(hours);
  const MM = minutes < 10 ? `0${minutes}` : String(minutes);

  return `${HH}:${MM}`;
};
