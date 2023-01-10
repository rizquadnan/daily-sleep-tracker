import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { BASE_FONT_SIZE } from "./constant";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: BASE_FONT_SIZE,
      },
    },
  },
  config,
});
