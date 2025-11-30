import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PuzzleState, PuzzlePiece } from '../types/puzzle'

const initialState: PuzzleState = {
  image: null,
  gridSize: 3, // 3x3 grid by default
  pieces: [],
  gameStatus: 'not_started', // 'not_started', 'playing', 'completed'
  draggedPiece: null,
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
      state.gameStatus = 'not_started'
      state.pieces = []
    },
    setGridSize: (state, action: PayloadAction<number>) => {
      state.gridSize = action.payload
      state.pieces = []
      state.gameStatus = 'not_started'
    },
    initializePuzzle: (state, action: PayloadAction<PuzzlePiece[]>) => {
      state.pieces = action.payload
      state.gameStatus = 'playing'
    },
    movePiece: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload
      const temp = state.pieces[fromIndex]
      state.pieces[fromIndex] = state.pieces[toIndex]
      state.pieces[toIndex] = temp

      state.pieces[fromIndex].currentIndex = fromIndex
      state.pieces[toIndex].currentIndex = toIndex
    },
    setDraggedPiece: (state, action: PayloadAction<number | null>) => {
      state.draggedPiece = action.payload
    },
    completePuzzle: (state) => {
      state.gameStatus = 'completed'
    },
    resetPuzzle: (state) => {
      state.pieces = []
      state.gameStatus = 'not_started'
      state.draggedPiece = null
    },
  },
})

export const {
  setImage,
  setGridSize,
  initializePuzzle,
  movePiece,
  setDraggedPiece,
  completePuzzle,
  resetPuzzle,
} = puzzleSlice.actions

export default puzzleSlice.reducer
