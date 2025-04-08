import { useEffect, useState } from "react"
import { isTaken } from "../utils/isTaken"
import {
  defaultBoard,
  boardWithLiberty,
  surroundedBlackGroup,
  blackGroupWithLiberty,
  squareGroupSurrounded,
} from "../mocks/boards"
import {
  BoardContainer,
  Board,
  Row,
  Cell,
  Message,
  BoardSelector,
  BoardButton,
} from "./GobanBoard.styles"

// Allow an optional custom board to be passed in as a prop
interface GobanBoardProps {
  board?: Stone[][]
}

const GobanBoard: React.FC<GobanBoardProps> = ({ board: externalBoard }) => {
  const boardOptions: Record<string, Stone[][]> = {
    Default: defaultBoard,
    "White Liberty": boardWithLiberty,
    "Black Captured": surroundedBlackGroup,
    "Black Liberty": blackGroupWithLiberty,
    "Square Captured": squareGroupSurrounded,
  }

  const [board, setBoard] = useState<Stone[][]>(externalBoard || defaultBoard)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [captured, setCaptured] = useState<boolean | null>(null)
  const [activeLabel, setActiveLabel] = useState<string>("Default")

  useEffect(() => {
    if (externalBoard) {
      setBoard(externalBoard)
      setSelected(null)
      setCaptured(null)
    }
  }, [externalBoard])

  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
    setCaptured(isTaken(board, x, y))
  }

  const handleBoardSwitch = (label: string) => {
    setBoard(boardOptions[label])
    setSelected(null)
    setCaptured(null)
    setActiveLabel(label)
  }

  return (
    <div>
      {!externalBoard && (
        <BoardSelector>
          {Object.keys(boardOptions).map((label) => (
            <BoardButton
              key={label}
              onClick={() => handleBoardSwitch(label)}
              active={label === activeLabel}
            >
              {label}
            </BoardButton>
          ))}
        </BoardSelector>
      )}

      {/* Board UI */}
      <BoardContainer>
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
      </BoardContainer>

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
