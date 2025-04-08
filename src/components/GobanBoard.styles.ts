import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export const BoardContainer = styled.div`
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: inline-block;
`

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
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`

export const Message = styled.p`
  margin-top: 1rem;
`

export const BoardSelector = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`

export const BoardButton = styled.button<{ active: boolean }>`
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ active }) => (active ? "#2563eb" : "#e5e7eb")};
  color: ${({ active }) => (active ? "white" : "black")};

  &:hover {
    background-color: ${({ active }) => (active ? "#1d4ed8" : "#d1d5db")};
  }

  transition: background-color 0.2s ease;
`
