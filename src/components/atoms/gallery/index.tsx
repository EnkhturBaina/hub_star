import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from '@utils/classNames';

const ImageGallery = (props: { images: string[] }) => {
  const [mainImage, setMainImage] = useState(props.images[0]);
  const currentIndex = props.images.indexOf(mainImage);

  useEffect(() => {
    if (props.images.length > 0) {
      setMainImage(props.images[0]);
    }
  }, [props.images]);
  const handlePrevImage = () => {
    const newIndex = currentIndex === 0 ? props.images.length - 1 : currentIndex - 1;
    setMainImage(props.images[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentIndex === props.images.length - 1 ? 0 : currentIndex + 1;
    setMainImage(props.images[newIndex]);
  };
  return (
    <div className="grid gap-4">
      <div>
        <Image
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={mainImage}
          alt="Main Image"
          width={480}
          height={480}
        />
        {props.images.length > 1 ? (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full opacity-80 hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full opacity-80 hover:opacity-100"
            >
              ›
            </button>
          </>
        ) : null}
      </div>
      {props.images.length > 1 ? (
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
          {props.images.map((img, index) => (
            <div
              className={classNames(
                'cursor-pointer rounded-lg border-2 transition-all',
                mainImage == img ? 'border-blue-500 shadow-md' : 'border-transparent'
              )}
              key={index}
              onClick={() => setMainImage(img)}
            >
              <Image
                className="object-cover object-center h-20 max-w-full rounded-lg"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default ImageGallery;
