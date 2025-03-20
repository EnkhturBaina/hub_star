import React, { useState } from 'react';
import Image from 'next/image';
import GalleryIcon from '@components/atoms/icons/GalleryIcon';
import IApiResponse from '@typeDefs/response';
import AuthService from '@services/auth';
import { useAuthState } from '@context/auth';
import { RiLoaderLine } from 'react-icons/ri';

interface AvatarUploadProps {
  user: {
    avatarId?: string;
    firstName?: string;
  };
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ user }) => {
  const { loadUserFromCookies } = useAuthState();
  const [avatarUrl, setAvatarUrl] = useState(
    process.env.MEDIA_URL + user?.avatarId || '/images/user/user.png'
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file.type.startsWith('image/')) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const result: IApiResponse = await AuthService.changeAvatar(formData);
      if (result.success) {
        setAvatarUrl(process.env.MEDIA_URL + result.response.avatarId);
        loadUserFromCookies();
      }
    } catch (error) {
      console.log('avatar upload noop =>', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-24 h-24 -mt-12 md:ml-6 md:mx-0 mx-auto">
      <Image
        src={avatarUrl}
        alt={`${user?.firstName}'ийн профайл`}
        fill
        className="rounded-full object-cover border-4 border-white"
      />
      <label
        className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
        title="Change avatar"
        style={{ transform: 'translate(25%, 25%)' }}
      >
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        {isLoading ? <RiLoaderLine /> : <GalleryIcon />}
      </label>
    </div>
  );
};

export default AvatarUpload;
