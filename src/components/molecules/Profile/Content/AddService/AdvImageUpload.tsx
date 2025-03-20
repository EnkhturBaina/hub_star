import React, { useState } from 'react';
import UploadImage from '@components/atoms/uploadImage';
interface IProps {
  adData: any;
  setAdData: React.Dispatch<React.SetStateAction<any>>;
}
const AdvImageUpload: React.FC<IProps> = ({ adData, setAdData }) => {
  const [countImg, setCountImg] = useState(1);
  return (
    <>
      <span className="font-bold">Зураг оруулах</span>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: countImg }).map((_, index) => (
          <UploadImage
            key={index}
            onImageUpload={id => {
              adData.imageIds.push(id);
              setAdData({ ...adData });
              setCountImg(prev => prev + 1);
            }}
            onImageDelete={id => {
              adData.imageIds = adData.imageIds.filter(imgId => imgId !== id);
              setAdData({ ...adData });
              setCountImg(prev => prev - 1);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AdvImageUpload;
