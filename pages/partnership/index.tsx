import BreadCrumbs from '@/components/BreadCrumbs';
import { ReferenceService } from '@/service/reference/reference.service';
import { dateFormat } from '@/utils/util';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';

const PartnershipPage: NextPage = () => {
  const router = useRouter();
  const [partnership, setPartnership] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      const result = await ReferenceService.getByIdPartnership(router.query.choosedId);
      setPartnership(result.response);
    };
    if (router.query?.choosedId) {
      loadData();
    }
  }, [router.query?.choosedId]);

  return (
    <section className="xl:pt-18">
      <div className="bg-gray-100 px-4 md:px-8 2xl:px-0 ">
        <div className="mx-auto max-w-screen-xl pt-12 pb-3">
          <div>
            <BreadCrumbs
              items={['Салбарын байгууллагууд', partnership?.branch?.name, partnership?.name]}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:px-8 2xl:px-0">
        <div className="lg:w-3/4">
          <div className="animate_top">
            <div className="mb-10 w-full overflow-hidden ">
              <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                <ReactImageGallery
                  items={(partnership?.photoIds ?? []).map((item: string) => ({
                    original: process.env.NEXT_PUBLIC_MEDIA_URL + item,
                    thumbnail: process.env.NEXT_PUBLIC_MEDIA_URL + item,
                  }))}
                  showPlayButton={false}
                  autoPlay={true}
                  slideInterval={2000}
                />
              </div>
            </div>

            <div className="blog-details w-full flex items-center justify-between text-justify">
              <div dangerouslySetInnerHTML={{ __html: partnership?.description }} />
            </div>
          </div>
        </div>
        <div className="border-l px-4 md:w-2/5">
          <div className="flex flex-col gap-y-2">
            <div>
              <div className="w-full flex justify-between items-center gap-2">
                <div className="w-full flex flex-wrap gap-1 items-center text-xl font-bold !text-wrap">
                  <div className="!w-full text-wrap break-words overflow-hidden">
                    {partnership?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full border-b border-dashed border-y-gray-500" />
            <div className="flex flex-col">
              <span>Үүсгэн байгуулагдсан огноо:</span>
              <span className="font-semibold">{dateFormat(partnership?.createdDate)}</span>
            </div>
            <div className="flex flex-col">
              <span>Утасны дугаар:</span>
              <span className="font-bold">{partnership?.phone}</span>
            </div>
            <div className="flex flex-col">
              <span>Веб хуудас:</span>
              <a className="font-bold" href={partnership?.website} target="_blank">
                {partnership?.website}
              </a>
            </div>
            <div className="flex flex-col">
              <span>Имэйл:</span>
              <span className="font-bold">{partnership?.email}</span>
            </div>
            <div className="flex flex-col">
              <span>Байршил:</span>
              <span className="font-bold text-sm text-justify">{partnership?.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PartnershipPage;
