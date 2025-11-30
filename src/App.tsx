import { useAppDispatch, useAppSelector } from './store/hooks'
import { initializePuzzle, resetPuzzle } from './store/puzzleSlice'
import { createPuzzlePieces } from './utils/puzzleUtils'
import ImageUploader from './components/ImageUploader'
import PuzzleConfig from './components/PuzzleConfig'
import PuzzleBoard from './components/PuzzleBoard'
import './App.css'

function App() {
  const dispatch = useAppDispatch()
  const { image, gridSize, gameStatus } = useAppSelector((state) => state.puzzle)

  const handleStartPuzzle = async () => {
    if (image) {
      const pieces = await createPuzzlePieces(image, gridSize)
      dispatch(initializePuzzle(pieces))
    }
  }

  const handleReset = () => {
    dispatch(resetPuzzle())
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Puzzles Online</h1>
      </header>

      <main className="app-main">
        {gameStatus === 'not_started' && (
          <div className="setup-panel">
            <ImageUploader />
            {image && (
              <>
                <PuzzleConfig />
                <button onClick={handleStartPuzzle} className="start-button">
                  Start Puzzle
                </button>
              </>
            )}
          </div>
        )}

        {gameStatus === 'playing' && (
          <>
            <button onClick={handleReset} className="reset-button">
              Reset Puzzle
            </button>
            <PuzzleBoard />
          </>
        )}

        {gameStatus === 'completed' && (
          <>
            <PuzzleBoard />
            <button onClick={handleReset} className="reset-button">
              New Puzzle
            </button>
          </>
        )}
      </main>
    </div>
  )
}

export default App
