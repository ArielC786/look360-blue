import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 20px;

  &:hover {
    border-color: #1976d2;
    background-color: rgba(25, 118, 210, 0.04);
  }
`;

const IconWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  color: #1976d2;
`;

const HiddenInput = styled('input')`
  display: none;
`;

interface UploadButtonProps {
  onFileSelect: (files: FileList) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelect }) => {
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <UploadBox
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <IconWrapper>
        <CloudUploadIcon sx={{ fontSize: 48 }} />
      </IconWrapper>
      <Box sx={{ color: '#666', textAlign: 'center' }}>
        Click to upload or drag and drop<br />
        your 360° images here
      </Box>
      <HiddenInput
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleChange}
        multiple
      />
    </UploadBox>
  );
};

export default UploadButton; 
