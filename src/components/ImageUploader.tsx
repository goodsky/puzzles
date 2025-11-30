import { useAppDispatch } from '../store/hooks'
import { setImage } from '../store/puzzleSlice'
import { ChangeEvent, useState } from 'react'

interface ImageInfo {
  fileName: string
  width: number
  height: number
}

function ImageUploader() {
  const dispatch = useAppDispatch()
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          // Load image to get dimensions
          const img = new Image()
          img.onload = () => {
            setImageInfo({
              fileName: file.name,
              width: img.width,
              height: img.height,
            })
            dispatch(setImage(result))
          }
          img.src = result
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-uploader">
      <h2>Upload Your Puzzle Image</h2>
      <label htmlFor="file-upload" className="file-input-label">
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />
      {imageInfo && (
        <div className="image-info">
          <p><strong>File:</strong> {imageInfo.fileName}</p>
          <p><strong>Dimensions:</strong> {imageInfo.width} × {imageInfo.height} pixels</p>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
