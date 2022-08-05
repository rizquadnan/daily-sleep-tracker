import { pxToRem } from "./style";

describe("pxToRem", () => {
  it("converts px to rem", () => {
    expect(pxToRem(16)).toBe("1rem");
  });

  it("converts 0 px to 0 rem", () => {
    expect(pxToRem(0)).toBe("0rem");
  });

  it("converts negative px to 0 rem", () => {
    expect(pxToRem(-1)).toBe("0rem");
  });
});
