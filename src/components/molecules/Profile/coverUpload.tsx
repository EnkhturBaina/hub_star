import React, { useState, useRef } from 'react';
import Image from 'next/image';
import GalleryIcon from '@components/atoms/icons/GalleryIcon';
import IApiResponse from '@typeDefs/response';
import AuthService from '@services/auth';
import { useAuthState } from '@context/auth';
import classNames from '@utils/classNames';

interface CoverUploadProps {
  coverId?: number;
  edit?: boolean;
}

const CoverUpload: React.FC<CoverUploadProps> = ({ coverId, edit = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loadUserFromCookies } = useAuthState();
  const [fileId, setFileId] = useState<number>(coverId);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result: IApiResponse = await AuthService.changeCover(formData);
      if (result.success) {
        setFileId(result.response.coverId);
        loadUserFromCookies();
      }
    } catch (error) {
      console.log('cover upload noop =>', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (edit) fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(
        'relative w-full h-[200px] bg-gray-100 rounded overflow-hidden flex items-center justify-center',
        edit ? 'cursor-pointer' : ''
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      {fileId ? (
        <>
          <Image src={process.env.MEDIA_URL + fileId} alt="Cover" layout="fill" objectFit="cover" />
          <h2>{process.env.MEDIA_URL + fileId}</h2>
        </>
      ) : isLoading ? (
        <h2>Уншиж байна...</h2>
      ) : edit ? (
        <div className="text-center">
          <button
            className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            title="Change cover"
          >
            <GalleryIcon />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CoverUpload;
