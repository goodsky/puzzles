import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setGridSize } from '../store/puzzleSlice'
import { ChangeEvent } from 'react'

function PuzzleConfig() {
  const dispatch = useAppDispatch()
  const gridSize = useAppSelector((state) => state.puzzle.gridSize)

  const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setGridSize(parseInt(e.target.value)))
  }

  return (
    <div className="puzzle-config">
      <label htmlFor="grid-size">
        Grid Size: {gridSize}x{gridSize} ({gridSize * gridSize} pieces)
      </label>
      <input
        id="grid-size"
        type="range"
        min="2"
        max="6"
        value={gridSize}
        onChange={handleGridSizeChange}
        className="grid-slider"
      />
    </div>
  )
}

export default PuzzleConfig
