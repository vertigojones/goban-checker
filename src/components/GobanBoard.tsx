import { useState } from "react"
import { defaultBoard } from "../mocks/boards"

// Allow an optional custom board to be passed in as a prop
interface GobanBoardProps {
  board?: Stone[][]
}

// Determine if a stone is captured (i.e., completely surrounded with no liberties)
const isTaken = (board: Stone[][], x: number, y: number): boolean => {
  const height = board.length
  const width = board[0].length
  const target = board[y][x]

  if (target === "." || !["B", "W"].includes(target)) return false

  const visited = new Set<string>()
  const stack: [number, number][] = [[x, y]]

  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!
    const key = `${cx},${cy}`

    if (visited.has(key)) continue
    visited.add(key)

    const directions = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
    ]

    for (const [dx, dy] of directions) {
      const nx = cx + dx
      const ny = cy + dy

      if (nx < 0 || ny < 0 || ny >= height || nx >= width) continue

      const neighbour = board[ny][nx]

      if (neighbour === ".") {
        return false // liberty found
      } else if (neighbour === target) {
        stack.push([nx, ny]) // continue exploring connected stones
      }
    }
  }

  return true // no liberties found
}

const GobanBoard: React.FC<GobanBoardProps> = ({ board = defaultBoard }) => {
  // Track the currently selected cell, if any
  const [selected, setSelected] = useState<[number, number] | null>(null)
  // Track whether the selected stone is captured or not
  const [captured, setCaptured] = useState<boolean | null>(null)

  // Handle user click on a board cell
  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
    setCaptured(isTaken(board, x, y))
  }

  return (
    <div>
      {/* Render the board as rows of buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {board.map((row, y) => (
          <div key={y} style={{ display: "flex", gap: 4 }}>
            {row.map((cell, x) => (
              <button
                key={`${x},${y}`}
                onClick={() => handleClick(x, y)}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor:
                    cell === "B"
                      ? "black"
                      : cell === "W"
                      ? "white"
                      : "lightgray",
                  color: cell === "W" ? "black" : "white",
                  border:
                    selected?.[0] === x && selected?.[1] === y
                      ? "2px solid blue"
                      : "1px solid #ccc",
                }}
              >
                {cell === "." ? "+" : ""}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Show capture status after a stone is selected */}
      {selected && (
        <p data-testid="capture-message">
          Stone at ({selected[0]}, {selected[1]}) is{" "}
          <strong>{captured ? "captured" : "not captured"}</strong>.
        </p>
      )}
    </div>
  )
}

export default GobanBoard
