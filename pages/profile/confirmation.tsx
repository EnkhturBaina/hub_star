import { motion } from 'framer-motion';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { BsImage } from 'react-icons/bs';
import { ReferenceService } from '@/service/reference/reference.service';
import { MainDirection, UserType } from '@/types/reference';
import toast, { Toaster } from 'react-hot-toast';
import ProfileLayout from '@/layouts/profile.layout';
import Users from '@/types/user';
import { useAppContext } from '@/app/app-context';
import ImageUpload from '@/components/Image/image-upload';
import Image from 'next/image';
import { AuthService } from '@/service/authentication/authentication.service';
import ConfirmSkeleton from '@/components/Skeleton/ConfirmSkeleton';
import CustomSelect from '@/components/Inputs/Select';
import UserTabData from '@/app/data/UserTabData';

const Confirmation = () => {
  const { user, setUser } = useAppContext();
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

  const handleSubmit = async () => {
    AuthService.updateById(user.id, values)
      .then(res => {
        console.log('res', res);

        if (res.success) {
          setUser(res.response.user);
          toast.success('Хэрэглэгчийн мэдээлэл амжилттай баталгаажууллаа.');
        }
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };
  return (
    <ProfileLayout>
      {!values ? (
        <ConfirmSkeleton />
      ) : (
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
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              duration: 5000,
            }}
          />

          <CustomSelect
            label="Хэрэглэгчийн төрөл"
            value={values?.userType}
            onSelectionChange={value => {
              setValues((prevState: Users) => ({
                ...prevState,
                userType: value as UserType,
              }));
            }}
            options={UserTabData.map(item => ({ value: item.type, label: item.title }))}
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
          />
          <div className="font-bold">Байгууллагын гэрчилгээний болон Иргэний үнэмлэхний зураг</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                setFileId={frontPassportImageId => setValues({ ...values, frontPassportImageId })}
              >
                {values?.frontPassportImageId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values?.frontPassportImageId}
                    alt="Үнэмлэхний урд талын зураг"
                    width={45}
                    height={45}
                  />
                ) : (
                  <Fragment>
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Үнэмлэхний урд талын зураг</span>
                  </Fragment>
                )}
              </ImageUpload>
            </div>
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload setFileId={selfieImageId => setValues({ ...values, selfieImageId })}>
                {values?.selfieImageId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.selfieImageId}
                    alt="Селфи зураг"
                    width={45}
                    height={45}
                  />
                ) : (
                  <Fragment>
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Селфи зураг</span>
                  </Fragment>
                )}
              </ImageUpload>
            </div>
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                setFileId={behindPassportImageId => setValues({ ...values, behindPassportImageId })}
              >
                {values?.behindPassportImageId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.behindPassportImageId}
                    alt="Үнэмлэхний ард талын зураг"
                    width={45}
                    height={45}
                  />
                ) : (
                  <Fragment>
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Үнэмлэхний ард талын зураг</span>
                  </Fragment>
                )}
              </ImageUpload>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex h-45 w-45 min-w-[180px] cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
              <ImageUpload
                setFileId={organizationLogoId => setValues({ ...values, organizationLogoId })}
              >
                {values?.organizationLogoId ? (
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_URL + values.organizationLogoId}
                    alt="Лого"
                    width={45}
                    height={45}
                  />
                ) : (
                  <Fragment>
                    <BsImage className="text-2xl text-mainBgGray" />
                    <span className="mt-2 text-sm">Лого</span>
                  </Fragment>
                )}
              </ImageUpload>
            </div>
            <div className="flex w-full flex-col gap-4 p-1">
              <div className="grid grid-cols-2 gap-4">
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
                  label="Сургалтын байгууллага"
                  labelPlacement="outside"
                  placeholder="Сургалтын байгууллага"
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
            value={values?.experience ?? ''}
            onChange={handleChange('experience')}
          />
          <div className="flex flex-row justify-end">
            <Button
              className="mr-4 bg-mainColor !text-white"
              radius="sm"
              size="md"
              onClick={handleSubmit}
            >
              Хадгалах
            </Button>
            <Button
              variant="bordered"
              radius="sm"
              className="border-mainGray !bg-white !text-black"
              size="md"
            >
              Цуцлах
            </Button>
          </div>
        </motion.div>
      )}
    </ProfileLayout>
  );
};

export default Confirmation;
