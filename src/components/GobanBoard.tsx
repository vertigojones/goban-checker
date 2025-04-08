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
  Wrapper,
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
  // Predefined boards for visual testing or demonstration
  const boardOptions: Record<string, Stone[][]> = {
    Default: defaultBoard,
    "White Liberty": boardWithLiberty,
    "Black Captured": surroundedBlackGroup,
    "Black Liberty": blackGroupWithLiberty,
    "Square Captured": squareGroupSurrounded,
  }

  // State to manage the board data, selected cell, and capture status
  const [board, setBoard] = useState<Stone[][]>(externalBoard || defaultBoard)
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [captured, setCaptured] = useState<boolean | null>(null)
  const [activeLabel, setActiveLabel] = useState<string>("Default")

  // Sync internal board state with external prop (used in testing)
  useEffect(() => {
    if (externalBoard) {
      setBoard(externalBoard)
      setSelected(null)
      setCaptured(null)
    }
  }, [externalBoard])

  // Handle click on a board cell to determine capture
  const handleClick = (x: number, y: number) => {
    setSelected([x, y])
    setCaptured(isTaken(board, x, y))
  }

  // Handle switching between predefined boards
  const handleBoardSwitch = (label: string) => {
    setBoard(boardOptions[label])
    setSelected(null)
    setCaptured(null)
    setActiveLabel(label)
  }

  return (
    <Wrapper>
      {/* Only show board switcher in demo mode (not testing) */}
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

      {/* Render the board */}
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

      {/* Display capture result for selected stone */}
      {selected && (
        <Message data-testid="capture-message">
          Stone at ({selected[0]}, {selected[1]}) is{" "}
          <strong>{captured ? "captured" : "not captured"}</strong>.
        </Message>
      )}
    </Wrapper>
  )
}

export default GobanBoard
