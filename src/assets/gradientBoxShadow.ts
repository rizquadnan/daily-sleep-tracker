import { BoxProps } from "@chakra-ui/react";

export const gradientBoxShadow: Pick<
  BoxProps,
  "_before" | "_after" | "_hover" | "position" | "backgroundColor" | "zIndex"
> = {
  backgroundColor: "white",
  zIndex: 1,
  position: "relative",
  _after: {
    content: '""',
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "inherit",
    borderRadius: "inherit",
  },
  _hover: {
    _before: {
      opacity: 0.4,
    },
  },
  _before: {
    content: '""',
    zIndex: -1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: "linear-gradient(-172deg, #f76b1c 0%, #fad961 100% )",
    transform: "translate3d(24px, 0px, 0) scale(1.09)",
    filter: "blur(43px)",
    opacity: 1,
    transition: "opacity 0.3s",
    borderRadius: "inherit",
  },
};
