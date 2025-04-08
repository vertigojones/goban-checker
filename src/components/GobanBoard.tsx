import { useState } from "react"
import { isTaken } from "../utils/isTaken"
import { defaultBoard } from "../mocks/boards"
import { Board, Row, Cell, Message } from "./GobanBoard.styles"

// Allow an optional custom board to be passed in as a prop
interface GobanBoardProps {
  board?: Stone[][]
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
