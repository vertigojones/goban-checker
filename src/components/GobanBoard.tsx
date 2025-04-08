import { useState } from "react"

const GobanBoard: React.FC = () => {
  // TODO:
  // - Render a 3x3 grid representing the goban
  // - Allow clicking on a cell to select it
  // - Highlight the selected cell
  // - Show whether the selected stone is captured (hardcoded at first)

  const board = [
    [".", "B", "."],
    ["B", "W", "B"],
    [".", "B", "."],
  ]

  const [selected, setSelected] = useState<[number, number] | null>(null)

  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
  }

  return (
    <div>
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

      {selected && (
        <p>
          Stone at ({selected[0]}, {selected[1]}) is <strong>captured</strong>.
        </p>
      )}
    </div>
  )
}

export default GobanBoard
