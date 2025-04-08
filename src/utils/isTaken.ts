/**
 * Checks whether a group of stones is captured on a Go board.
 * A group is considered captured if it has no liberties — that is,
 * no adjacent empty (".") cells. The check is done via a depth-first
 * search starting from the target cell, traversing through connected
 * same-colour stones.
 *
 * @param board - 2D array representing the board
 * @param x - X coordinate of the stone to check
 * @param y - Y coordinate of the stone to check
 * @returns true if the stone and its group are fully surrounded; false otherwise
 */
export const isTaken = (board: Stone[][], x: number, y: number): boolean => {
  const height = board.length
  const width = board[0].length
  const target = board[y][x]

  // Only check capture status for actual stones
  if (target === "." || !["B", "W"].includes(target)) return false

  const visited = new Set<string>()
  const stack: [number, number][] = [[x, y]]

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    const key = `${cx},${cy}`

    // Skip already-visited cells
    if (visited.has(key)) continue
    visited.add(key)

    // Neighbouring directions (up, down, left, right)
    const directions = [
      [0, -1], // up
      [0, 1], // down
      [-1, 0], // left
      [1, 0], // right
    ]

    for (const [dx, dy] of directions) {
      const nx = cx + dx
      const ny = cy + dy

      // Skip out-of-bounds positions
      if (nx < 0 || ny < 0 || ny >= height || nx >= width) continue

      const neighbour = board[ny][nx]

      // If we find a liberty (adjacent empty cell), the group is not captured
      if (neighbour === ".") {
        return false
      } else if (neighbour === target) {
        // Same-colour stone — continue DFS
        stack.push([nx, ny])
      }
    }
  }

  // If we exhaust all connected stones without finding a liberty, it's captured
  return true
}
