import React from 'react';
import { useState, useEffect } from 'react';
import PanoramaViewer from './components/PanoramaViewer';
import UploadButton from './components/UploadButton';
import { Box } from '@mui/material';

function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);

  const handleFileSelect = (files: FileList) => {
    Array.from(files).forEach(file => {
      const imageUrl = URL.createObjectURL(file);
      setImages(prev => [...prev, { url: imageUrl, name: file.name }]);
    });
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
      <UploadButton onFileSelect={handleFileSelect} />
      
      {currentImage && (
        <PanoramaViewer 
          imageUrl={currentImage}
          options={{
            autoRotate: false,
            compass: true,
          }}
        />
      )}
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 2,
        mt: 2 
      }}>
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image.url}
            alt={image.name}
            sx={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease'
              }
            }}
            onClick={() => setCurrentImage(image.url)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default App; 
