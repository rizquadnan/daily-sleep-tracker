import { BoxProps } from "@chakra-ui/react";

export const mobileSpacedBox: Pick<
  BoxProps,
  "h" | "position" | "top" | "justifyContent"
> = {
  h: { base: "73vh", md: "initial" },
  position: { base: "relative", md: "initial" },
  top: { base: "2vh", md: "initial" },
  justifyContent: { base: "space-around", md: "initial" },
};
