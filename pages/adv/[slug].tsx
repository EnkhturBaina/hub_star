import { Button, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { PiFlagThin } from 'react-icons/pi';
import BreadCrumbs from '@/components/BreadCrumbs';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { Advertisement } from '@/types/advertisement';
import toast from 'react-hot-toast';
import Gallery from '@/components/Image/gallery';
import { AuthService } from '@/service/authentication/authentication.service';
import { useRouter } from 'next/router';
import { SubDirection } from '@/types/reference';
import { ReferenceService } from '@/service/reference/reference.service';
import { NextPage } from 'next';
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const data = await AdvertisementService.getById(slug)
    .then(response => {
      if (response.success) {
        return response.response;
      }
    })
    .catch(error => {
      console.error('Error fetching :', error);
    });
  return { props: { data } };
}
const SingleBlogPage: NextPage<{ data: Advertisement }> = ({ data }) => {
  const router = useRouter();
  const [subDirections, setSubDirections] = useState<SubDirection[]>([]);
  const getAdById = () => {};
  const getSubDirections = () => {
    ReferenceService.getSubDirection({ directionId: data.directionId }).then(res => {
      if (res.success) {
        setSubDirections(res.response);
      }
    });
  };
  const onOrder = () => {
    ReferenceService.createNotification({
      advertisementId: data.id,
      id: 0,
      authorId: data.createdBy,
      subject: 'Таньд ирсэн захиалга',
      description: data.desciption,
    })
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
  useEffect(() => {
    getAdById();
  }, []);
  useEffect(() => {
    data && getSubDirections();
  }, [data]);
  return (
    <>
      <section className="pt-35 lg:pt-40 xl:pt-42.5">
        {' '}
        (
        <>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
            <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-7.5 py-10 md:flex-row md:py-18 lg:flex-row xl:gap-12.5">
              <div className="flex flex-col">
                <span className="text-xl font-bold">{data?.title}</span>
                <div>
                  <BreadCrumbs />
                </div>
              </div>
              <div className="flex flex-row">
                <Button
                  onClick={() => onOrder()}
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
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:px-8 2xl:px-0">
            <div className="lg:w-3/4">
              <div className="animate_top">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Gallery
                      images={data.images.map(item => process.env.NEXT_PUBLIC_MEDIA_URL + item.id)}
                    />
                  </div>
                </div>

                <div className="blog-details">
                  <p>{data?.desciption}</p>
                </div>
              </div>
            </div>
            <div className="border-l px-4 md:w-1/4 lg:w-[20%]">
              <div className="flex flex-col gap-y-2">
                <span className="font-bold">Үнэлгээ</span>
                <div className="flex flex-row items-center">
                  <FaStar className="text-2xl text-mainColor" />
                  <FaStar className="text-2xl text-mainColor" />
                  <FaStar className="text-2xl text-mainColor" />
                  <FaStar className="text-2xl text-mainColor" />
                  <FaStar className="text-2xl text-mainColor" />
                  <span className="ml-4">8,5/10</span>
                </div>
                <span className="font-bold">Үнэ</span>
                <span className="">{data?.price} ₮</span>
                <span className="font-bold">Нийтэлсэн огноо</span>
                <span className="">{data.createdAt}</span>
                <span className="font-bold">Зарын дугаар</span>
                <span className="">{data?.id}</span>
                <span className="font-bold">Утасны дугаар</span>
                <span className="">{data?.phone}</span>
                <span className="font-bold">Зар байршуулсан</span>
                <span className="">-</span>
                <span className="font-bold">Веб хуудас</span>
                <span className="">-</span>
                <span className="font-bold">Имэйл</span>
                <span className="">{data?.email}</span>
                <span className="font-bold">Байршил</span>
                <span className="">{data?.address}</span>
                <Button
                  onClick={() => viewProfile()}
                  radius="full"
                  className="mb-2 w-full rounded-md bg-mainColor font-bold leading-none text-white md:w-72"
                >
                  Профайл үзэх
                </Button>
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
              {[...new Array(4)].map((element, i) => {
                return (
                  <div
                    key={i}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-1 bg-white p-8"
                  >
                    <Image
                      src="/pdf_icon.png"
                      alt={'alt' + i}
                      width={100}
                      height={80}
                      className="h-full w-12"
                    />
                    <span className="mt-2 text-center text-sm leading-none">
                      Ажил гүйцэтгэхэд мөрдөж хөтлөх бичиг баримт
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-100 px-4 md:px-8 2xl:px-0">
            <div className="mx-auto max-w-screen-xl py-10">
              <span className="text-xl font-bold">Онцгой үйлчилгээ</span>
              <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                {/* TODO {BlogData?.splice(0, 4).map((blog, key) => <SpecialPost blog={blog} key={key} />)} */}
              </div>
              <span className="text-xl font-bold">Ижил төсөөтэй үйлчилгээ</span>
              <div className="my-4 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4 xl:gap-10">
                {/* TODO {BlogData?.splice(0, 4).map((blog, key) => <RelatedPost blog={blog} key={key} />)} */}
              </div>
            </div>
          </div>
        </>
        )
      </section>
    </>
  );
};

export default SingleBlogPage;