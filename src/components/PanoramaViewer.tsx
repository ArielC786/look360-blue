import React from 'react';
import { useEffect, useRef } from 'react';
import 'pannellum/build/pannellum.css';
import pannellum from 'pannellum';

interface PanoramaViewerProps {
  imageUrl: string;
  options?: any;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ imageUrl, options = {} }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewer = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current && !viewer.current) {
      viewer.current = pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: imageUrl,
        autoLoad: true,
        autoRotate: false,
        ...options
      });
    }

    return () => {
      if (viewer.current) {
        viewer.current.destroy();
      }
    };
  }, []);

  // Update panorama when imageUrl changes
  useEffect(() => {
    if (viewer.current && imageUrl) {
      viewer.current.loadScene('default', {
        panorama: imageUrl,
        type: 'equirectangular',
        autoLoad: true,
        ...options
      });
    }
  }, [imageUrl, options]);

  return (
    <div 
      ref={viewerRef} 
      style={{ 
        width: '100%', 
        height: '500px'
      }} 
    />
  );
};

export default PanoramaViewer; 
