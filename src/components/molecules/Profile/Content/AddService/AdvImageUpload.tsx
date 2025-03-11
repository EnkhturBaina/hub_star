import ImageUpload from '@components/molecules/Image/image-upload';
import { ICreateAd } from '@/interfaces/request.interface';
import { Button, Card, CardFooter, Chip, Image } from '@heroui/react';
import { BsImage } from 'react-icons/bs';
type Props = {
  adData: ICreateAd;
  setAdData: React.Dispatch<React.SetStateAction<ICreateAd>>;
};
const AdvImageUpload: React.FC<Props> = ({ adData, setAdData }) => {
  const onEdit = (index: number, fileId: number) => {
    adData.imageIds[index] = fileId;
    setAdData({ ...adData, imageIds: adData.imageIds });
  };
  const onDelete = (fileId: number) => {
    const index = adData.imageIds.indexOf(fileId);
    if (index > -1) {
      adData.imageIds.splice(index, 1);
    }
    setAdData({ ...adData });
  };
  return (
    <>
      <span className="font-bold">Зураг оруулах</span>
      <div className="grid grid-cols-3 gap-4">
        {adData.imageIds.map((item, index) => {
          return (
            <Card key={index} isFooterBlurred className="flex h-40">
              <Image
                removeWrapper
                alt=""
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={process.env.NEXT_PUBLIC_MEDIA_URL + item}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <Button
                  className="text-tiny"
                  color="danger"
                  radius="full"
                  size="sm"
                  onClick={() => onDelete(item)}
                >
                  Устгах
                </Button>
                <ImageUpload setFileId={fileId => onEdit(index, fileId)} className="cursor-pointer">
                  <Chip color="primary">Солих</Chip>
                </ImageUpload>
              </CardFooter>
            </Card>
          );
        })}
        <ImageUpload
          className="flex h-40 cursor-pointer items-center justify-center rounded-lg bg-mainGray"
          setFileId={fileId =>
            setAdData(previousValue => ({
              ...previousValue,
              imageIds: [...previousValue.imageIds, fileId],
            }))
          }
        >
          <BsImage className="text-2xl text-gray-500" />
        </ImageUpload>
      </div>
    </>
  );
};

export default AdvImageUpload;
