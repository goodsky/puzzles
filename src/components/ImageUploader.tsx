import { useAppDispatch } from '../store/hooks'
import { setImage } from '../store/puzzleSlice'
import { ChangeEvent } from 'react'

function ImageUploader() {
  const dispatch = useAppDispatch()

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          dispatch(setImage(result))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-uploader">
      <h2>Upload Your Puzzle Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />
    </div>
  )
}

export default ImageUploader
