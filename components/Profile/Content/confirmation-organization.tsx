import UserTabData from '@/app/data/UserTabData';
import ImageUpload from '@/components/Image/image-upload';
import CustomSelect from '@/components/Inputs/Select';
import { MainDirection, UserType } from '@/types/reference';
import Users from '@/types/user';
import { Image, Input, Textarea } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { BsImage } from 'react-icons/bs';
type Props = {
  values: Users;
  setValues: React.Dispatch<React.SetStateAction<Users>>;
  mainDirections: MainDirection[];
};
export const ConfirmationOrganization: React.FC<Props> = ({
  values,
  setValues,
  mainDirections,
}) => {
  const { t } = useTranslation();

  const handleChange =
    (prop: keyof Users) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
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
      <div className="font-bold mt-3">Байгууллагын гэрчилгээ</div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-3">
        <div className="flex w-60 h-80 cursor-pointer flex-col items-center justify-center rounded-lg bg-mainGray">
          <ImageUpload
            className="flex justify-center items-center"
            setFileId={frontPassportImageId => setValues({ ...values, frontPassportImageId })}
          >
            {values?.frontPassportImageId ? (
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_URL + values?.frontPassportImageId}
                alt="Гэрчилгээний урд талын зураг"
                removeWrapper
                className="z-0 w-full h-80 object-cover"
              />
            ) : (
              <div className="w-fit h-fit margin-auto flex gap-2 items-center">
                <BsImage className="text-2xl text-mainBgGray" />
                <span className="text-sm">Гэрчилгээний урд талын зураг</span>
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
    </div>
  );
};
