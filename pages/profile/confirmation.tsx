import { motion } from 'framer-motion';
import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { ReferenceService } from '@/service/reference/reference.service';
import { MainDirection, UserType } from '@/types/reference';
import toast from 'react-hot-toast';
import ProfileLayout from '@/layouts/profile.layout';
import Users from '@/types/user';
import { useAppContext } from '@/app/app-context';
import ImageUpload from '@/components/Image/image-upload';
import { AuthService } from '@/service/authentication/authentication.service';
import CustomSelect from '@/components/Inputs/Select';
import UserTabData from '@/app/data/UserTabData';
import withAuth from '@/components/Common/withAuth';
import { GrOrganization, GrUser } from 'react-icons/gr';
import { GetStaticProps } from 'next';
import { withTranslationProps } from '@/app/lib/with-translation';
import { useTranslation } from 'react-i18next';

const Confirmation = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAppContext();
  const [step, setStep] = useState<number>(1);
  const [mainDirections, setMainDirections] = useState<MainDirection[]>([]);
  const [values, setValues] = useState<Users>(null);

  useEffect(() => {
    setValues(user);
  }, []);

  const getMainDirection = useCallback(() => {
    ReferenceService.getMainDirection({ userType: values?.userType })
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

  const handleChange =
    (prop: keyof Users) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

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
        console.log('res', res);

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
            onClick={() => handleIsCitizen(false)}
          >
            <GrUser className="text-[150px] text-mainBgGray hover:text-mainBlue cursor-pointer" />
            <div className="font-medium text-center text-2xl">Хувь хүн</div>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <CustomSelect
            label="Хэрэглэгчийн төрөл"
            value={values?.userType}
            onSelectionChange={value => {
              setValues((prevState: Users) => ({
                ...prevState,
                userType: value as UserType,
              }));
            }}
            options={UserTabData.map(item => ({ value: item.type, label: t(item.title) }))}
          />
          <CustomSelect
            label="Үйл ажиллагааны үндсэн чиглэл"
            value={values?.mainDirectionId?.toString()}
            onSelectionChange={value => {
              setValues((prevState: Users) => ({
                ...prevState,
                mainDirectionId: Number(value),
              }));
            }}
            options={mainDirections.map(item => ({ value: item.id, label: item.name }))}
            className="mt-3"
          />
          {user.isCitizen ? (
            <>
              <div className="font-bold mt-3">Иргэний үнэмлэхний зураг</div>
            </>
          ) : (
            <>
              <div className="font-bold mt-3">Байгууллагын гэрчилгээ</div>
            </>
          )}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-3">
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                className="flex justify-center items-center"
                setFileId={frontPassportImageId => setValues({ ...values, frontPassportImageId })}
              >
                {values?.frontPassportImageId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values?.frontPassportImageId}
                    alt="Үнэмлэхний урд талын зураг"
                    removeWrapper
                    className="z-0 w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-fit h-fit margin-auto flex gap-2 items-center">
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="text-sm">Гэрчилгээний урд талын зураг</span>
                  </div>
                )}
              </ImageUpload>
            </div>
            {/* <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload setFileId={selfieImageId => setValues({ ...values, selfieImageId })}>
                {values?.selfieImageId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.selfieImageId}
                    alt="Селфи зураг"
                    removeWrapper
                    className="z-0 w-full h-40 object-cover"
                  />
                ) : (
                  <Fragment>
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Селфи зураг</span>
                  </Fragment>
                )}
              </ImageUpload>
            </div> */}
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                className="!w-full flex justify-center items-center"
                setFileId={behindPassportImageId => setValues({ ...values, behindPassportImageId })}
              >
                {values?.behindPassportImageId ? (
                  <Image
                    alt="Үнэмлэхний ард талын зураг"
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.behindPassportImageId}
                    className="z-0 !w-full h-40 object-cover"
                    removeWrapper
                  />
                ) : (
                  <div className="w-fit h-fit margin-auto flex gap-2 items-center">
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="text-sm">Гэрчилгээний ард талын зураг</span>
                  </div>
                )}
              </ImageUpload>
            </div>
            <div className="flex h-45 w-45 min-w-[180px] cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                className="flex justify-center items-center"
                setFileId={organizationLogoId => setValues({ ...values, organizationLogoId })}
              >
                {values?.organizationLogoId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.organizationLogoId}
                    alt="Лого"
                    removeWrapper
                    className="z-0 w-full h-45 object-cover"
                  />
                ) : (
                  <div className="w-fit h-fit margin-auto flex gap-2 items-center">
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Лого</span>
                  </div>
                )}
              </ImageUpload>
            </div>
          </div>
          {!user.isCitizen && (
            <>
              <div className="flex flex-row gap-4 mt-3">
                <div className="flex w-full flex-col gap-4 p-1">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <Input
                      key="organizationName"
                      type="text"
                      label="Байгууллагын нэр"
                      labelPlacement="outside"
                      placeholder="Байгууллагын нэр"
                      radius="sm"
                      size="lg"
                      variant="bordered"
                      classNames={{
                        label: 'font-bold',
                        inputWrapper: ['custom-input-wrapper', 'bg-white'],
                      }}
                      value={values?.organizationName ?? ''}
                      onChange={handleChange('organizationName')}
                    />
                    <Input
                      key="webUrl"
                      type="text"
                      label="Веб хуудас"
                      labelPlacement="outside"
                      placeholder="Веб хуудас"
                      radius="sm"
                      size="lg"
                      variant="bordered"
                      classNames={{
                        label: 'font-bold',
                        inputWrapper: ['custom-input-wrapper', 'bg-white'],
                      }}
                      value={values?.webUrl ?? ''}
                      onChange={handleChange('webUrl')}
                    />
                    <Input
                      key="organizationRegno"
                      type="text"
                      label="Байгууллагын регистрийн дугаар"
                      labelPlacement="outside"
                      placeholder="Байгууллагын регистрийн дугаар"
                      radius="sm"
                      size="lg"
                      variant="bordered"
                      classNames={{
                        label: 'font-bold',
                        inputWrapper: ['custom-input-wrapper', 'bg-white'],
                      }}
                      value={values?.organizationRegno ?? ''}
                      onChange={handleChange('organizationRegno')}
                    />
                    <Input
                      key="trainingOrg"
                      type="text"
                      label="Байгууллагын үйл ажилгааний чиглэл"
                      labelPlacement="outside"
                      placeholder="Байгууллагын үйл ажилгааний чиглэл"
                      radius="sm"
                      size="lg"
                      variant="bordered"
                      classNames={{
                        label: 'font-bold',
                        inputWrapper: ['custom-input-wrapper', 'bg-white'],
                      }}
                      value={values?.trainingOrg ?? ''}
                      onChange={handleChange('trainingOrg')}
                    />
                  </div>
                </div>
              </div>
              <Textarea
                variant="bordered"
                label="Байгууллагын  танилцуулга ба ажлын туршлага"
                labelPlacement="outside"
                radius="sm"
                minRows={5}
                placeholder="Байгууллагын  танилцуулга ба ажлын туршлага"
                classNames={{
                  base: 'w-full',
                  label: 'font-bold',
                  inputWrapper: ['custom-input-wrapper', 'bg-white'],
                }}
                className="mt-3"
                value={values?.experience ?? ''}
                onChange={handleChange('experience')}
              />
            </>
          )}
        </div>
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
