import withAuth from '@/components/Common/withAuth';
import AddService from '@/components/Profile/Content/AddService';
import ProfileLayout from '@/layouts/profile.layout';
import { NextPage } from 'next';
import { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
const PostService: NextPage = () => {
  const [isAddService, setIsAddService] = useState<boolean>(false);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);

  const handleChoose = (isSpecial: boolean) => {
    setIsAddService(true);
    setIsSpecial(isSpecial);
  };

  return (
    <ProfileLayout>
      {isAddService ? (
        <AddService isSpecial={isSpecial} setIsAddService={setIsAddService} />
      ) : (
        <div className="flex justify-center items-start gap-6">
          <div
            className="flex h-50 p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
            onClick={() => {}}
          >
            <IoAddCircle
              className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer"
              onClick={() => handleChoose(true)}
            />
            <div className="font-medium text-center text-3xl">Онцгой үйлчилгээ</div>
          </div>
          <div className="flex h-50 p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0">
            <IoAddCircle
              className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer"
              onClick={() => handleChoose(false)}
            />
            <div className="font-medium text-center text-3xl">Энгийн үйлчилгээ</div>
          </div>
        </div>
      )}
    </ProfileLayout>
  );
};

export default withAuth(PostService);
