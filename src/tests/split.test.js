const { test, expect } = require("@jest/globals");
const split = require("../split-the-treasure/split");

test("When All same returns the array length", () => {
  const result = split.splitTreasure([4, 4, 4]);
  expect(result.length).toEqual(3);
});

test("canSplitTreasure for value of 8 [5,4,4,3]", () => {
  const result = split.canSplitTreasure(8, [5, 4, 4, 3]);
  expect(result.length).toEqual(2);
  expect(result[0]).toContain(5, 3);
  expect(result[1]).toContain(4, 4);
});

test("splitTreasure([8,5,4,4,3])", () => {
  const result = split.splitTreasure([8, 5, 4, 4, 3]);
  expect(result.length).toEqual(3);
  expect(result[0]).toContain(8);
  expect(result[1]).toContain(5, 3);
  expect(result[2]).toContain(4, 4);
});

test("splitTreasure([3,2,1])", () => {
  const result = split.splitTreasure([3, 2, 1]);
  expect(result.length).toEqual(2);
  expect(result[0]).toContain(3);
  expect(result[1]).toContain(2, 1);
});

test("splitTreasure([9,7,8]) returns empty array", () => {
  const result = split.splitTreasure([9, 7, 8]);
  expect(result.length).toEqual(0);
});

test("splitTreasure([9,7,8,8])", () => {
  const result = split.splitTreasure([9, 7, 8, 8]);
  expect(result.length).toEqual(2);
  expect(result[0]).toContain(9, 7);
  expect(result[1]).toContain(8, 8);
});

test("splitTreasure([4,7,8,9,4])", () => {
  const result = split.splitTreasure([4, 7, 8, 9, 4]);
  expect(result.length).toEqual(2);
  expect(result[0]).toContain(9, 7);
  expect(result[1]).toContain(8, 4, 4);
});
