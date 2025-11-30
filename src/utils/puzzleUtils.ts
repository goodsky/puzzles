import { PuzzlePiece } from '../types/puzzle'

/**
 * Splits an image into puzzle pieces
 * @param imageUrl - The data URL of the image
 * @param gridSize - Number of rows/columns (e.g., 3 for 3x3)
 * @returns Array of puzzle piece objects
 */
export const createPuzzlePieces = (
  imageUrl: string,
  gridSize: number
): Promise<PuzzlePiece[]> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const pieces: PuzzlePiece[] = []
      const pieceWidth = img.width / gridSize
      const pieceHeight = img.height / gridSize

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const canvas = document.createElement('canvas')
          canvas.width = pieceWidth
          canvas.height = pieceHeight
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            throw new Error('Failed to get canvas context')
          }

          // Draw the piece of the image
          ctx.drawImage(
            img,
            col * pieceWidth,
            row * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
          )

          const correctIndex = row * gridSize + col
          pieces.push({
            id: correctIndex,
            correctIndex: correctIndex,
            currentIndex: correctIndex,
            imageData: canvas.toDataURL(),
            row: row,
            col: col,
          })
        }
      }

      // Shuffle the pieces
      const shuffled = [...pieces]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }

      // Update current indices after shuffle
      shuffled.forEach((piece, index) => {
        piece.currentIndex = index
      })

      resolve(shuffled)
    }
    img.src = imageUrl
  })
}

/**
 * Checks if the puzzle is solved
 * @param pieces - Array of puzzle pieces
 * @returns True if puzzle is solved
 */
export const isPuzzleSolved = (pieces: PuzzlePiece[]): boolean => {
  console.log('Checking if puzzle is solved:', pieces)
  return pieces.every((piece) => piece.currentIndex === piece.correctIndex)
}
