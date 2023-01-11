import { BoxProps } from "@chakra-ui/react";

type GradientBoxShadow = Pick<
  BoxProps,
  "_before" | "_after" | "_hover" | "position" | "backgroundColor" | "zIndex"
>;
export const getGradientBoxShadow = (
  colorMode: "dark" | "light"
): GradientBoxShadow => ({
  backgroundColor: colorMode === "dark" ? "#1A202C" : "#FFFFFF",
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
    background:
      colorMode === "dark"
        ? "linear-gradient(-45deg, #210cae 0%, #4dc9e6 100% )"
        : "linear-gradient(-45deg, #f76b1c 0%, #fad961 100% )",
    transform: "translate3d(0px, 30px, 0) scale(1.15)",
    filter: "blur(43px)",
    opacity: 0.8,
    transition: "opacity 0.3s",
    borderRadius: "inherit",
  },
});
