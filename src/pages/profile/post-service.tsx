import React from 'react';
import withAuth from '@components/atoms/withAuth';
import AddService from '@components/molecules/Profile/Content/AddService';
import { Card, CardBody } from '@heroui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddCircle } from 'react-icons/io5';
import { useAuthState } from '@context/auth';

const PostService: NextPage = () => {
  const { user } = useAuthState();
  const [isAddService, setIsAddService] = useState<boolean>(false);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);

  const handleChoose = (isSpecial: boolean) => {
    if (!user?.isConfirm) {
      toast.error('Баталгаажуулалт хийнэ үү.');
      return;
    }
    setIsAddService(true);
    setIsSpecial(isSpecial);
  };
  if (isAddService) return <AddService isSpecial={isSpecial} setIsAddService={setIsAddService} />;
  else {
    if (!user?.isConfirm)
      return (
        <Card className="bg-orange-300 my-5">
          <CardBody>
            <p>
              Баталгаажуулалт цэсээр орж мэдээллээ баталгаажуулсанаар үйлчилгээ оруулах боломжтой
              болно
            </p>
          </CardBody>
        </Card>
      );
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6">
      <div
        className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
        onClick={() => handleChoose(true)}
      >
        <IoAddCircle className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
        <div className="font-medium text-center text-2xl">Онцгой үйлчилгээ</div>
      </div>
      <div
        className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
        onClick={() => handleChoose(false)}
      >
        <IoAddCircle className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
        <div className="font-medium text-center text-2xl">Энгийн үйлчилгээ</div>
      </div>
    </div>
  );
};

export default withAuth(PostService);
