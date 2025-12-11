import { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import type { ChangeEvent } from 'react';

interface ImageItem {
  url: string;
  name: string;
}

const ImageUploader = () => {
  const [images, setImages] = useState<ImageItem[]>([]);

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    try {
      const newImages = Array.from(files).map(file => {
        // Type assertion to ensure file is treated as File type
        const fileObj = file as File;
        
        if (fileObj.size > 5 * 1024 * 1024) {
          throw new Error(`File ${fileObj.name} is too large. Max size is 5MB`);
        }
        
        return {
          url: URL.createObjectURL(fileObj),
          name: fileObj.name
        };
      });

      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle error appropriately (e.g., show user feedback)
    }
  };

  return (
    <div className="container">
      <label htmlFor="file-input" className="upload-button">
        <CloudUploadIcon sx={{ fontSize: 24 }} />
        <span>Upload Images</span>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden-input"
        />
      </label>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.url}
              alt={image.name}
              width={200}
              height={200}
              style={{ objectFit: 'cover' }}
            />
            <p>{image.name}</p>
          </div>
        ))}
      </div>

      <style>{`
        .container {
          padding: 20px;
        }
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .image-item {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 8px;
        }
        .image-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }
        .image-item p {
          margin-top: 8px;
          text-align: center;
          font-size: 14px;
        }
        .upload-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          border: 2px dashed #ccc;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-button:hover {
          border-color: #888;
          background-color: #f5f5f5;
        }

        .hidden-input {
          display: none;
        }

        .upload-button span {
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader; 
