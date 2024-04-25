'use client';
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { PiFlagThin } from 'react-icons/pi';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FaStar } from 'react-icons/fa';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { AdProcess, Advertisement } from '@/types/advertisement';
import toast from 'react-hot-toast';
import { AuthService } from '@/service/authentication/authentication.service';
import { useRouter } from 'next/router';
import { Advice, RefNotification, SubDirection } from '@/types/reference';
import { ReferenceService } from '@/service/reference/reference.service';
import { NextPage } from 'next';
import ImageGallery from 'react-image-gallery';
import { useAppContext } from '@/app/app-context';
import SpecialPost from '@/components/Blog/SpecialPost';
import RelatedPost from '@/components/Blog/RelatedPost';

const SingleBlogPage: NextPage = () => {
  const router = useRouter();
  const { user, advertisements } = useAppContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [data, setData] = useState<Advertisement>();
  const [slideImages, setSlideImages] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [subDirections, setSubDirections] = useState<SubDirection[]>([]);
  const [advices, setAdvices] = useState<Advice[]>([]);

  const getData = useCallback(async () => {
    if (router.query.slug) {
      await AdvertisementService.getById(router.query.slug).then(res => {
        if (res.success) {
          setData(res.response);
        }
      });
    }
  }, [router.query.slug]);

  const getSubDirections = () => {
    ReferenceService.getSubDirection({ directionId: data.directionId }).then(res => {
      if (res.success) {
        setSubDirections(res.response);
      }
    });
  };
  const getAdvice = () => {
    ReferenceService.getAdvice({
      page: 1,
      limit: 10,
      order: 'DESC',
      mainDirectionId: data.mainDirectionId,
      directionIds: [data.directionId],
    }).then(res => {
      if (res.success) {
        setAdvices(res.response.data);
      }
    });
  };
  const handleNotification = (notification: RefNotification) => {
    ReferenceService.createNotification(notification)
      .then(res => {
        if (res.success) {
          toast.success('Үйлчилгээг амжилттай захиаллаа.');
        }
      })
      .catch(err => {
        toast.error(err);
      });
  };
  const onSave = () => {
    AdvertisementService.save(data.id)
      .then(res => {
        if (res.success) {
          toast.success('Үйлчилгээ амжилттай хадгаллаа.');
        }
      })
      .catch(err => toast.error(err));
  };
  const viewProfile = () => {
    AuthService.otherProfile(data.createdBy).then(res => {
      if (res.success) {
        router.push('/profile/' + data.createdBy);
      }
    });
  };
  const handleUpdate = async () => {
    await AdvertisementService.update(data).then(res => {
      if (res.success) {
        getData();
      }
    });
    handleNotification({
      id: 0,
      authorId: data.doingBy,
      advertisementId: data.id,
      process: data.process,
      description,
    });
  };
  const handleStarClick = (index: number) => {
    setData({ ...data, rating: index + 1 });
  };
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (data) {
      getSubDirections();
      getAdvice();
      slideImages?.length !== data.images?.length &&
        data.images?.map((el: any) => {
          setSlideImages(slideImages => [
            ...slideImages,
            {
              original: process.env.NEXT_PUBLIC_MEDIA_URL + el.id,
              thumbnail: process.env.NEXT_PUBLIC_MEDIA_URL + el.id,
            },
          ]);
        });
    }
  }, [data]);

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        (
        <Fragment>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
            <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-7.5 py-10 md:flex-row md:py-18 lg:flex-row xl:gap-12.5">
              <div className="flex flex-col">
                <span className="text-xl font-bold">{data?.title}</span>
                <div>
                  <BreadCrumbs />
                </div>
              </div>
              {user && (
                <div className="flex flex-row">
                  <Button
                    onClick={() =>
                      handleNotification({
                        id: 0,
                        authorId: data.createdBy,
                        advertisementId: data.id,
                        process: 'DOING',
                        description: 'Таньд ирсэн захиалга.',
                      })
                    }
                    radius="full"
                    className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                  >
                    Үйлчилгээг захиалах
                  </Button>
                  <Button
                    className="ml-4 min-w-unit-12 border-1 bg-white !px-0"
                    radius="sm"
                    onClick={() => onSave()}
                  >
                    <PiFlagThin className="text-2xl" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:px-8 2xl:px-0">
            <div className="lg:w-3/4">
              <div className="animate_top">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    {slideImages && (
                      <ImageGallery
                        items={slideImages}
                        showPlayButton={false}
                        autoPlay={true}
                        slideInterval={2000}
                      />
                    )}
                  </div>
                </div>

                <div className="blog-details">
                  <p>{data?.desciption}</p>
                </div>
              </div>
            </div>
            <div className="border-l px-4 md:w-1/4 lg:w-[20%]">
              <div className="flex flex-col gap-y-2">
                {user && (
                  <Fragment>
                    <span className="font-bold">Үнэлгээ</span>
                    <div
                      className="flex flex-row items-center"
                      onClick={() => {
                        if (user.id == data.createdBy) {
                          setData({ ...data, process: 'DONE' });
                          onOpen();
                        }
                      }}
                    >
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-2xl cursor-pointer ${index < data?.rating ? 'text-mainColor' : 'text-blue-300'}`}
                        />
                      ))}
                      <span className="ml-4">{data?.rating}/5</span>
                    </div>
                  </Fragment>
                )}
                <span className="font-bold">Үнэ</span>
                <span className="">{data?.price} ₮</span>
                <span className="font-bold">Нийтэлсэн огноо</span>
                <span className="">{data?.createdAt}</span>
                <span className="font-bold">Зарын дугаар</span>
                <span className="">{data?.id}</span>
                <span className="font-bold">Утасны дугаар</span>
                <span className="">{data?.phone}</span>
                <span className="font-bold">Зар байршуулсан</span>
                <span className="">{data?.createdUser?.firstName}</span>
                <span className="font-bold">Веб хуудас</span>
                <span className="">{data?.createdUser?.webUrl}</span>
                <span className="font-bold">Имэйл</span>
                <span className="">{data?.email}</span>
                <span className="font-bold">Байршил</span>
                <span className="">
                  {data?.province?.name}, {data?.district?.name}, {data?.khoroo?.name},{' '}
                  {data?.address}
                </span>
                <Button
                  onClick={() => viewProfile()}
                  radius="full"
                  className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                >
                  Профайл үзэх
                </Button>
                {data?.process == 'DOING' && user.id == data.createdBy && (
                  <Button
                    onClick={() => {
                      setData({ ...data, process: 'CREATED' });
                      onOpen();
                    }}
                    radius="full"
                    className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                  >
                    Үйлчилгээний төлөв солих
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
            <div className="mx-auto flex max-w-screen-xl flex-row justify-between gap-7.5 py-10 lg:flex-row xl:gap-12.5">
              <div className="flex flex-col">
                <span className="mb-4 font-bold">ТӨРӨЛ</span>
                <div>
                  {subDirections.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        classNames={{
                          base: 'mr-2 mb-2 border-1 bg-white p-4',
                          content: 'font-bold',
                        }}
                      >
                        {item.name}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-4 my-14 max-w-screen-xl md:mx-auto">
            <span className="text-xl font-bold">Таны авсан үйлчилгээтэй холбоотой зөвлөмжүүд</span>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-7">
              {advices.map((item, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-1 bg-white p-8"
                >
                  <Image src="/pdf_icon.png" alt={'alt' + i} width={50} height={50} />
                  <span className="mt-2 text-center text-sm leading-none">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0">
            <div className="mx-auto max-w-screen-xl py-10">
              <span className="text-xl font-bold">Онцгой үйлчилгээ</span>
              {/* <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                TODO {BlogData?.splice(0, 4).map((blog, key) => <SpecialPost blog={blog} key={key} />)}
              </div> */}
              <span className="text-xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
              <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                {/* {advertisements.map((blog, key) => (
                  <RelatedPost blog={blog} key={key} />
                ))} */}
              </div>
            </div>
          </div>
        </Fragment>
        )
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">Үйлчилгээнд төлөв солих</ModalHeader>
                <ModalBody>
                  <Textarea
                    variant="bordered"
                    label="Тэмдэглэл"
                    labelPlacement="outside"
                    radius="sm"
                    minRows={5}
                    placeholder="Тэмдэглэл"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    classNames={{
                      base: 'w-full',
                      label: 'font-bold',
                      inputWrapper: ['custom-input-wrapper', 'bg-white'],
                    }}
                  />

                  <div className="flex flex-row items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-2xl cursor-pointer ${index < data.rating ? 'text-mainColor' : 'text-blue-300'}`}
                        onClick={() => handleStarClick(index)}
                      />
                    ))}
                    <span className="ml-4">{data.rating}/5</span>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Хаах
                  </Button>
                  <Button color="primary" onPress={onClose} onClick={() => handleUpdate()}>
                    Хадгалах
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </section>
    </>
  );
};

export default SingleBlogPage;
