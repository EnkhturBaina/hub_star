import ReferenceService from '@services/reference';
import IApiResponse from '@typeDefs/response';
import Image from 'next/image';
import process from 'process';
import React, { ChangeEvent, useState, DragEvent } from 'react';
import { BsImage, BsTrash } from 'react-icons/bs';

interface UploadImageProps {
  onImageUpload?: (file: number) => void;
  className?: string;
  accept?: string;
  onImageDelete?: (file: number) => void;
  imageId?: number;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onImageUpload,
  className = '',
  accept = 'image/*',
  onImageDelete,
  imageId = null,
}) => {
  const [fileId, setFileId] = useState(imageId);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result: IApiResponse = await ReferenceService.uploadFile(formData);
      if (result.success) {
        setFileId(result.response.id);
        onImageUpload?.(result.response.id);
      }
    } catch (error) {
      console.log('image upload noop', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDelete = () => {
    onImageDelete(fileId);
    setFileId(null);
  };

  return (
    <div className={`upload-image-container ${className}`}>
      <label
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} 
                    dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 
                    dark:hover:border-gray-500`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {fileId ? (
          <div className="relative w-full h-full">
            <Image
              src={process.env.NEXT_PUBLIC_MEDIA_URL + fileId}
              width={600}
              height={400}
              alt="Preview"
              className="object-contain w-full h-full p-2"
            />
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
            >
              <BsTrash />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <BsImage className="text-2xl text-gray-500" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            {isLoading && <p className="text-sm text-blue-500">Loading...</p>}
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleImageChange}
          accept={accept}
          disabled={isLoading}
        />
      </label>
    </div>
  );
};

export default UploadImage;
