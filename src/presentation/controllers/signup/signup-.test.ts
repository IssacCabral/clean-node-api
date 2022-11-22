function sum(a: number, b: number): number{
  return a + b
}

test('ensure 1 + 1 to be 2', () => {
  expect(sum(1, 1)).toBe(2)
})