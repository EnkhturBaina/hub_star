import UserTabData from '@/app/data/UserTabData';
import ImageUpload from '@/components/Image/image-upload';
import CustomSelect from '@/components/Inputs/Select';
import { MainDirection, UserType } from '@/types/reference';
import Users from '@/types/user';
import { Image, Input, Textarea } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { BsImage } from 'react-icons/bs';
type Props = {
  values: Users;
  setValues: React.Dispatch<React.SetStateAction<Users>>;
  mainDirections: MainDirection[];
};
export const ConfirmationCitizen: React.FC<Props> = ({ values, setValues, mainDirections }) => {
  const { t } = useTranslation();

  return (
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
      <div className="font-bold mt-3">Иргэний үнэмлэхний зураг</div>
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
                className="z-0 !w-full h-40 object-cover"
              />
            ) : (
              <div className="w-fit h-fit margin-auto flex gap-2 items-center">
                <BsImage className="text-2xl text-mainBgGray" />
                <span className="text-sm">Үнэмлэхний урд талын зураг</span>
              </div>
            )}
          </ImageUpload>
        </div>
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
                <span className="text-sm">Үнэмлэхний ард талын зураг</span>
              </div>
            )}
          </ImageUpload>
        </div>
      </div>
    </div>
  );
};
