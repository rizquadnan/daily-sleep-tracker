import { pxToRem } from "./style";

describe("pxToRem", () => {
  it("converts px to rem", () => {
    expect(pxToRem(16)).toBe("1rem");
  });
});
