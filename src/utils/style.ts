import { BASE_FONT_SIZE } from "theme";

export const pxToRem = (px: number) => {
  if (px < 0) return "0rem";
  else return `${px / BASE_FONT_SIZE}rem`;
};
