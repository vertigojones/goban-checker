import { useState } from "react"

// Define the type for each stone on the board
// "B" = black, "W" = white, "." = empty
export type Stone = "B" | "W" | "."

// Allow an optional custom board to be passed in as a prop
// If not provided, we'll use a default layout
interface GobanBoardProps {
  board?: Stone[][]
}

// Default board used when no prop is provided
const defaultBoard: Stone[][] = [
  [".", "B", "."],
  ["B", "W", "B"],
  [".", "B", "."],
]

const GobanBoard: React.FC<GobanBoardProps> = ({ board = defaultBoard }) => {
  // Track the selected cell, if any
  const [selected, setSelected] = useState<[number, number] | null>(null)

  // When a button is clicked, remember the selected coordinates
  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
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

      {/* Show a message when a cell is selected (hardcoded capture for now) */}
      {selected && (
        <p data-testid="capture-message">
          Stone at ({selected[0]}, {selected[1]}) is <strong>captured</strong>.
        </p>
      )}
    </div>
  )
}

export default GobanBoard
