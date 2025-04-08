export const getCellStyle = (
  cell: Stone,
  selected: boolean
): React.CSSProperties => ({
  width: 40,
  height: 40,
  backgroundColor:
    cell === "B" ? "black" : cell === "W" ? "white" : "lightgray",
  color: cell === "W" ? "black" : "white",
  border: selected ? "2px solid blue" : "1px solid #ccc",
})
