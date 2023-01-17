export function toDDMMYYYY(yyyyMmDd: string) {
  const [yyyy, mm, dd] = yyyyMmDd.split("-");

  return `${dd}-${mm}-${yyyy}`;
}

function getHH(minutes: number) {
  return Math.floor(minutes / 60);
}

function getMM(minutes: number) {
  return minutes % 60;
}

export function minutesToHHMM(minutes: number) {
  const HH = getHH(minutes) < 10 ? `0${getHH(minutes)}` : getHH(minutes);
  const MM = getMM(minutes) < 10 ? `0${getMM(minutes)}` : getMM(minutes);

  return `${HH}:${MM}`;
}

export function toYYYYMMDD(ddMmYy: string) {
  const [dd, mm, yy] = ddMmYy.split("-");

  return `${yy}-${mm}-${dd}`;
}

export function toMinutesDuration(hhMM: string) {
  const [hh, mm] = hhMM.split(":");

  return Number(hh) * 60 + Number(mm);
}
