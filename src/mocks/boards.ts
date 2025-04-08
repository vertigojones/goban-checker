// Default board (used when no prop is provided)
export const defaultBoard: Stone[][] = [
  [".", "B", "."],
  ["B", "W", "B"],
  [".", "B", "."],
]

// Board with a white stone that has adjacent liberties (should not be captured)
export const boardWithLiberty: Stone[][] = [
  [".", ".", "."],
  ["B", "W", "B"],
  [".", ".", "."],
]

// Black group fully surrounded by white stones (should be captured)
export const surroundedBlackGroup: Stone[][] = [
  ["W", "W", "."],
  ["B", "B", "W"],
  ["W", "B", "W"],
  [".", "W", "."],
]

// Black group with at least one liberty (should not be captured)
export const blackGroupWithLiberty: Stone[][] = [
  ["W", "W", "."],
  ["B", "B", "."],
  ["W", "B", "W"],
  [".", "W", "."],
]

// Square-shaped black group completely surrounded (should be captured)
export const squareGroupSurrounded: Stone[][] = [
  ["W", "W", "."],
  ["B", "B", "W"],
  ["B", "B", "W"],
  ["W", "W", "."],
]
