import sum from "./sum";

describe("Test sum Function", () => {
  it("1 + 1 = 2", () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});
