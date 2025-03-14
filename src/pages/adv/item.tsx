'use client';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@heroui/react';
import BreadCrumbs from '@components/atoms/BreadCrumbs';
import { FaStar } from 'react-icons/fa';
import { Advertisement } from '@typeDefs/advertisement';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Advice, RefNotification } from '@typeDefs/reference';
import ReferenceService from '@services/reference';
import { NextPage } from 'next';
// import ImageGallery from 'react-image-gallery';
import Rating from '@components/atoms/Rating';
import UserTabData from '@datas/UserTabData';
import SpecialServiceData from '@datas/SpecialServiceData';
import { dateFormat, moneyFormat } from '@utils/index';
import { BiHeart } from 'react-icons/bi';
import { UserCircleIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import { useAuthState } from '@context/auth';
import ImageGallery from '@components/atoms/gallery';
import AdvertisementCard from '@components/atoms/advertisement';
import AdvertisementService from '@services/advertisement';

const SingleBlogPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useAuthState();
  const advertisements = [];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onOpenChange: onConfirmOpenChange,
  } = useDisclosure();
  const [data, setData] = useState<Advertisement>();
  const [slideImages, setSlideImages] = useState<any>([]);
  const [description, setDescription] = useState<string>('');
  const [advices, setAdvices] = useState<Advice[]>([]);
  const [blogType, setBlogType] = useState('');

  const takeTypeName = () => {
    if (data.userType !== null) {
      UserTabData?.map(el => {
        if (el.type === data.userType) {
          setBlogType(el.title);
        }
      });
    } else if (data.specialService !== null) {
      SpecialServiceData?.map(el => {
        if (el.type === data.specialService) {
          setBlogType(el.title);
        }
      });
    } else {
      setBlogType('');
    }
  };

  const getData = useCallback(async () => {
    if (router.query?.id) {
      await AdvertisementService.getById(router.query?.id).then(res => {
        if (res.success) {
          setData(res.response);
        }
      });
    }
  }, [router.query?.id]);

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
  const handleNotification = (notification: RefNotification, msg?: string) => {
    ReferenceService.createNotification(notification)
      .then(res => {
        if (res.success) {
          toast.success(
            <span className="font-semibold !font-roboto">
              {msg
                ? msg
                : 'Таны үйлчилгээ захиалагдлаа. Таны үйлчилгээ профайл хийгдэж буй үйлчилгээ лүү орно.'}
            </span>,
            {
              duration: 6000,
            }
          );
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
  const handleUpdate = async () => {
    await AdvertisementService.update({ ...data, process: 'DONE' }).then(res => {
      if (res.success) {
        getData();
      }
    });
    handleNotification(
      {
        id: 0,
        receiveBy:
          (data.participants || []).find(item => item.userType == 'EXECUTOR')?.userBy ??
          data.createdBy,
        advertisementId: data.id,
        type: 'NORMAL',
        description,
      },
      'Үйлчилгээний төлөв амжилттай солигдлоо.'
    );
  };
  const handleStarClick = (index: number) => {
    setData({ ...data, rating: index + 1 });
  };
  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (data) {
      takeTypeName();
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      getAdvice();
      setSlideImages(data.images.map(item => process.env.NEXT_PUBLIC_MEDIA_URL + item.id));
    }
  }, [data]);

  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        <Fragment>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
            <div className="mx-auto max-w-screen-xl pt-12 pb-3">
              <div>
                <BreadCrumbs
                  items={[
                    t(blogType),
                    data?.mainDirection?.name,
                    data?.direction?.name,
                    data?.subDirection?.name,
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:px-8 2xl:px-0">
            <div className="lg:w-3/4">
              <div className="animate_top">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    {slideImages && <ImageGallery images={slideImages} />}
                  </div>
                </div>

                <div className="blog-details w-full flex items-center justify-between text-justify">
                  <p className="m-0 p-0 font-semibold text-lg bold">
                    {data?.createdUser?.organizationName}
                  </p>
                </div>
              </div>
            </div>
            <div className="border-l px-4 md:w-2/5">
              <div className="flex flex-col gap-y-2">
                <div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <div className="w-full flex flex-wrap gap-1 items-center text-xl font-bold !text-wrap">
                      #{data?.id}
                      <div className="!w-full text-wrap break-words overflow-hidden">
                        {data?.title}
                      </div>
                    </div>
                    <Button
                      radius="sm"
                      className="ml-4 min-w-unit-10 h-fit py-1 border-1 bg-white !px-0 hover:border-orange-400 hover:text-red-400"
                      onPress={() => onSave()}
                    >
                      <BiHeart className="text-2xl" />
                    </Button>
                  </div>
                  <div className="w-full flex justify-between items-end gap-2">
                    <div className="cursor-pointer">
                      <Rating point={data?.rating} noText />
                    </div>
                  </div>
                </div>
                <div className="w-full border-b border-dashed border-y-gray-500" />
                <div className="flex flex-col">
                  {data?.userType == 'SUPPLIER' ? (
                    <>
                      <span>Нэгжийн үнэ: </span>
                      <strong className="text-4xl ">{moneyFormat(data?.unitAmount)} ₮</strong>
                      <span>Багцын үнэ: </span>
                      <strong className="text-4xl ">{moneyFormat(data?.packageAmount)} ₮</strong>
                    </>
                  ) : (
                    <>
                      <span>Үнэ: </span>
                      <strong className="text-4xl ">{moneyFormat(data?.price)} ₮</strong>
                    </>
                  )}
                </div>
                <div className="w-full border-b border-dashed border-y-gray-500" />
                <div className="flex flex-col">
                  <span>Нийтэлсэн огноо:</span>
                  <span className="font-semibold">{dateFormat(data?.createdAt)}</span>
                </div>
                <div className="flex flex-col">
                  <span>Утасны дугаар:</span>
                  <span className="font-bold">{data?.phone}</span>
                </div>
                {!!data?.createdUser?.firstName && (
                  <div className="flex flex-col">
                    <span>Зар байршуулсан:</span>
                    <span className="font-bold">{data?.createdUser?.firstName || ''}</span>
                  </div>
                )}
                {data?.createdUser?.webUrl && (
                  <div className="flex flex-col">
                    <span>Веб хуудас:</span>
                    <span className="font-bold">{data?.createdUser?.webUrl}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span>Имэйл:</span>
                  <span className="font-bold">{data?.email}</span>
                </div>
                <div className="flex flex-col">
                  <span>Байршил:</span>
                  <span className="font-bold text-sm text-justify">
                    {data?.province?.name}, {data?.district?.name}, {data?.khoroo?.name},{' '}
                    {data?.address}
                  </span>
                </div>
                <Image
                  src={process.env.NEXT_PUBLIC_MEDIA_URL + data?.createdUser?.organizationLogoId}
                  alt="Organization logo"
                  width={40}
                  height={40}
                  className="min-w-[40px] min-h-[40px] w-fit h-fit"
                />
                {user && data?.createdBy !== user?.id && (
                  <Button
                    radius="full"
                    className="mb-2 w-full min-h-[40px] rounded-md bg-mainColor font-bold leading-none text-white"
                    onPress={onConfirmOpen}
                  >
                    {/* <ShoppingCartIcon width={16} height={16} className="mb-1" /> */}
                    Үйлчилгээг захиалах
                  </Button>
                )}
                {data?.process == 'DOING' &&
                  (data?.participants || []).find(item => item.userType == 'SUBSCRIBER')?.userBy ==
                    user?.id && (
                    <Button
                      onPress={() => onOpen()}
                      radius="full"
                      className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                    >
                      Үйлчилгээний төлөв солих
                    </Button>
                  )}
                <Button
                  onPress={() => router.replace(`/other-profile?item=${data.createdBy}`)}
                  className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white"
                >
                  <UserCircleIcon width={18} height={18} />
                  Профайл үзэх
                </Button>
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
              <span className="text-xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
              <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                {advertisements.map(item => (
                  <AdvertisementCard advertisement={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
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
                  <Button color="primary" onPress={onClose} onClick={handleUpdate}>
                    Хадгалах
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isConfirmOpen} onOpenChange={onConfirmOpenChange}>
          <ModalContent>
            {onConfirmClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">Үйлчилгээ захиалах</ModalHeader>
                <ModalBody>
                  <p>Та энэхүү үйлчилгээг захиалахдаа итгэлтэй байна уу.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onConfirmClose}>
                    Үгүй
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      onConfirmClose();
                      handleNotification({
                        id: 0,
                        receiveBy: data.createdBy,
                        advertisementId: data.id,
                        type: 'ORDER',
                        description: 'Таньд ирсэн захиалга.',
                      });
                    }}
                  >
                    Тийм
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
