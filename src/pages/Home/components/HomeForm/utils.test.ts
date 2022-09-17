import { formatToHHMM } from "./utils";

describe("home form uitls", () => {
  describe("formatToHHMM", () => {
    test("prepend zero when hours are single digits", () => {
      expect(formatToHHMM(7, 27)).toBe("07:27");
    });

    test("prepend zero when minutes are single digits", () => {
      expect(formatToHHMM(20, 7)).toBe("20:07");
    });

    test("prepend zero when hours and minutes are single digits", () => {
      expect(formatToHHMM(7, 7)).toBe("07:07");
    });

    test("normal case", () => {
      expect(formatToHHMM(18, 20)).toBe("18:20");
    });
  });
});
