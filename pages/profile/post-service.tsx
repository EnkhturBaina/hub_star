import { useAppContext } from '@/app/app-context';
import { withTranslationProps } from '@/app/lib/with-translation';
import withAuth from '@/components/Common/withAuth';
import AddService from '@/components/Profile/Content/AddService';
import ProfileLayout from '@/layouts/profile.layout';
import { Card, CardBody } from '@heroui/react';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoAddCircle } from 'react-icons/io5';
const PostService: NextPage = () => {
  const { user } = useAppContext();
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

  return (
    <ProfileLayout>
      {isAddService ? (
        <AddService isSpecial={isSpecial} setIsAddService={setIsAddService} />
      ) : (
        <>
          {!user?.isConfirm && (
            <Card className="bg-orange-300 my-5">
              <CardBody>
                <p>
                  Баталгаажуулалт цэсээр орж мэдээллээ баталгаажуулсанаар үйлчилгээ оруулах
                  боломжтой болно
                </p>
              </CardBody>
            </Card>
          )}
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
        </>
      )}
    </ProfileLayout>
  );
};

export const getStaticProps: GetStaticProps = withTranslationProps();
export default withAuth(PostService);
