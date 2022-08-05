import { extendTheme } from "@chakra-ui/react";
import { BASE_FONT_SIZE } from "./constant";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: BASE_FONT_SIZE,
      },
    },
  },
});
