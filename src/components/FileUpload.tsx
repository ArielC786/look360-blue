import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadContainer = styled('div')`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background: #fafafa;
  cursor: pointer;
  margin: 20px 0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1976d2;
    background: #f0f7ff;
  }
`;

const UploadIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto 8px;
  color: #1976d2;
`;

const UploadText = styled('p')`
  margin: 0;
  color: #666;
  font-size: 16px;
`;

interface FileUploadProps {
  onFileSelect: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files);
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <UploadContainer
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <UploadIcon>
        <CloudUploadIcon sx={{ fontSize: 36 }} />
      </UploadIcon>
      <UploadText>
        Click to upload or drag and drop<br />
        your 360° images here
      </UploadText>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
        multiple
      />
    </UploadContainer>
  );
};

export default FileUpload; 
