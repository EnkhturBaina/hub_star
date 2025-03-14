import ReferenceService from '@services/reference';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  className?: string;
  children: React.ReactNode;
  setFileId: (fileId: number) => void;
  maxSize?: number; // Optional max file size in bytes
  onError?: (error: string) => void; // Optional error callback
}

const ImageUpload: React.FC<IProps> = ({
  className,
  children,
  setFileId,
  maxSize = 5 * 1024 * 1024, // Default 5MB
  onError,
}) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      try {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
          const error = 'Unsupported file type. Please upload JPEG, PNG, or JPG files.';
          onError?.(error);
          return;
        }

        if (file.size > maxSize) {
          const error = `File size too large. Maximum size is ${maxSize / 1024 / 1024}MB`;
          onError?.(error);
          return;
        }

        const response = await ReferenceService.fileUpload(file);
        if (response.success) {
          setFileId(response.response.id);
        } else {
          throw new Error('File upload failed.');
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : 'File upload failed';
        console.error('File upload error:', err);
        onError?.(error);
      }
    },
    [setFileId, maxSize, onError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  return (
    <div className={className} {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default ImageUpload;
