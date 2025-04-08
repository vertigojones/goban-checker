import { useEffect, useState } from "react"
import { isTaken } from "../utils/isTaken"
import {
  defaultBoard,
  boardWithLiberty,
  surroundedBlackGroup,
  blackGroupWithLiberty,
  squareGroupSurrounded,
} from "../mocks/boards"
import { Board, Row, Cell, Message } from "./GobanBoard.styles"

// Allow an optional custom board to be passed in as a prop
interface GobanBoardProps {
  board?: Stone[][]
}

const GobanBoard: React.FC<GobanBoardProps> = ({ board: externalBoard }) => {
  // Boards to choose from (for UI preview/demo only)
  const boardOptions: Record<string, Stone[][]> = {
    Default: defaultBoard,
    "White Liberty": boardWithLiberty,
    "Black Captured": surroundedBlackGroup,
    "Black Liberty": blackGroupWithLiberty,
    "Square Captured": squareGroupSurrounded,
  }

  // Active board state (used in UI)
  const [board, setBoard] = useState<Stone[][]>(externalBoard || defaultBoard)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [captured, setCaptured] = useState<boolean | null>(null)

  // Ensure board updates when test prop is provided
  useEffect(() => {
    if (externalBoard) {
      setBoard(externalBoard)
      setSelected(null)
      setCaptured(null)
    }
  }, [externalBoard])

  // Handle user click on a board cell
  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
    setCaptured(isTaken(board, x, y))
  }

  // Handle board selection from the UI (demo mode only)
  const handleBoardSwitch = (label: string) => {
    setBoard(boardOptions[label])
    setSelected(null)
    setCaptured(null)
  }

  return (
    <div>
      {/* Show board buttons only if not using test prop */}
      {!externalBoard && (
        <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
          {Object.keys(boardOptions).map((label) => (
            <button key={label} onClick={() => handleBoardSwitch(label)}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Render the board as rows of buttons */}
      <Board>
        {board.map((row, y) => (
          <Row key={y}>
            {row.map((cell, x) => {
              const isSelected = selected?.[0] === x && selected?.[1] === y
              return (
                <Cell
                  key={`${x},${y}`}
                  onClick={() => handleClick(x, y)}
                  stone={cell}
                  selected={isSelected}
                >
                  {cell === "." ? "+" : ""}
                </Cell>
              )
            })}
          </Row>
        ))}
      </Board>

      {/* Show capture status after a stone is selected */}
      {selected && (
        <Message data-testid="capture-message">
          Stone at ({selected[0]}, {selected[1]}) is{" "}
          <strong>{captured ? "captured" : "not captured"}</strong>.
        </Message>
      )}
    </div>
  )
}

export default GobanBoard
