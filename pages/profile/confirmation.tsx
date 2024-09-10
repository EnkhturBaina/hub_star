import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';
import { MainDirection } from '@/types/reference';
import toast from 'react-hot-toast';
import ProfileLayout from '@/layouts/profile.layout';
import Users from '@/types/user';
import { useAppContext } from '@/app/app-context';
import { AuthService } from '@/service/authentication/authentication.service';
import withAuth from '@/components/Common/withAuth';
import { GrOrganization, GrUser } from 'react-icons/gr';
import { GetStaticProps } from 'next';
import { withTranslationProps } from '@/app/lib/with-translation';
import { ConfirmationOrganization } from '@/components/Profile/Content/confirmation-organization';
import { ConfirmationCitizen } from '@/components/Profile/Content/confirmation-citizen';
import { useRouter } from 'next/router';

const Confirmation = () => {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  const [step, setStep] = useState<number>(1);
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [values, setValues] = useState<Users>(null);

  useEffect(() => {
    setValues(user);
  }, []);

  const getMainDirection = useCallback(() => {
    ReferenceService.getMainDirection({ userType: values?.userType, lang: router.locale })
      .then(res => {
        if (res.success) {
          setMainDirections(res.response);
        }
      })
      .catch(err => toast.error(err));
  }, [values?.userType]);

  useEffect(() => {
    getMainDirection();
  }, [getMainDirection]);

  const handleIsCitizen = (value: boolean) => {
    setValues((prevState: Users) => ({
      ...prevState,
      isCitizen: value,
    }));
    setStep(2);
  };
  const handleSubmit = async () => {
    AuthService.updateById(user.id, { ...values, isConfirm: true })
      .then(res => {
        if (res.success) {
          setUser(res.response);
          toast.success('Хэрэглэгчийн мэдээлэл амжилттай баталгаажууллаа.');
        }
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };

  return (
    <ProfileLayout>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mb-4 grid w-full grid-cols-1 gap-y-4 overflow-hidden p-2"
      ></motion.div>
      {step == 1 ? (
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          <div
            className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
            onClick={() => handleIsCitizen(false)}
          >
            <GrOrganization className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
            <div className="font-medium text-center text-2xl">Хуулийн этгээд</div>
          </div>
          <div
            className="flex h-50 md:w-1/2 w-full p-2 flex-col justify-center items-center gap-2 rounded bg-slate-100 flex-grow flex-shrink-0"
            onClick={() => handleIsCitizen(true)}
          >
            <GrUser className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
            <div className="font-medium text-center text-2xl">Хувь хүн</div>
          </div>
        </div>
      ) : (
        <>
          {values.isCitizen ? (
            <ConfirmationCitizen
              values={values}
              setValues={setValues}
              mainDirections={mainDirections}
            />
          ) : (
            <ConfirmationOrganization
              values={values}
              setValues={setValues}
              mainDirections={mainDirections}
            />
          )}
        </>
      )}
      <div className="flex flex-row justify-end my-2">
        {step > 1 && (
          <Button
            variant="bordered"
            radius="sm"
            className="border-mainGray !bg-white !text-black"
            size="md"
            onClick={() => setStep(1)}
          >
            Өмнөх
          </Button>
        )}
        {step == 2 && (
          <Button
            className="mr-4 bg-mainColor !text-white"
            radius="sm"
            size="md"
            onClick={handleSubmit}
          >
            Хадгалах
          </Button>
        )}
      </div>
    </ProfileLayout>
  );
};
export const getStaticProps: GetStaticProps = withTranslationProps();
export default withAuth(Confirmation);
