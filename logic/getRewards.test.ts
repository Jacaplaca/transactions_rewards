import { calculateRewardForTransaction, getOverSteps } from "./getRewards";

describe("getOverSteps", () => {
  it("should return [50, 20] if amount is 120", () => {
    expect(getOverSteps(120)).toEqual([50, 20]);
  });
  it("should return [20, 0] if amount is 70", () => {
    expect(getOverSteps(70)).toEqual([20, 0]);
  });
  it("should return [0, 0] if amount is 0", () => {
    expect(getOverSteps(0)).toEqual([0, 0]);
  });
  it("should return [0, 0] if amount is -10", () => {
    expect(getOverSteps(-10)).toEqual([0, 0]);
  });
  it("should return [50, 100] if amount is 200", () => {
    expect(getOverSteps(200)).toEqual([50, 100]);
  });
});

describe("calculateRewardForTransaction", () => {
  it("should return 90 if amount is 120", () => {
    expect(calculateRewardForTransaction(120)).toEqual(90);
  });
  it("should return 70 if amount is 110", () => {
    expect(calculateRewardForTransaction(110)).toEqual(70);
  });
  it("should return 0 if amount is 0", () => {
    expect(calculateRewardForTransaction(0)).toEqual(0);
  });
  it("should return 1 if amount is 51", () => {
    expect(calculateRewardForTransaction(51)).toEqual(1);
  });
});
