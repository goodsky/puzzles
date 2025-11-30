export interface PuzzlePiece {
  id: number
  correctIndex: number
  currentIndex: number
  imageData: string
  row: number
  col: number
}

export type GameStatus = 'not_started' | 'playing' | 'completed'

export interface PuzzleState {
  image: string | null
  gridSize: number
  pieces: PuzzlePiece[]
  gameStatus: GameStatus
  draggedPiece: number | null
}
