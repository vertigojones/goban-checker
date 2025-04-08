import styled from "styled-components"

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Row = styled.div`
  display: flex;
  gap: 4px;
`

export const Cell = styled.button<{ stone: Stone; selected: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${({ stone }) =>
    stone === "B" ? "black" : stone === "W" ? "white" : "lightgray"};
  color: ${({ stone }) => (stone === "W" ? "black" : "white")};
  border: ${({ selected }) => (selected ? "2px solid blue" : "1px solid #ccc")};
`

export const Message = styled.p`
  margin-top: 1rem;
`
