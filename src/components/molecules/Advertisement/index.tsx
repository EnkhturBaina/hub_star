import React, { useEffect, useState } from 'react';
import PaginationComp from '../Pagination';
import Title from '../../atoms/Title';
import { useTranslations } from 'next-intl';
import AdvertisementCard from '@components/atoms/advertisement';
import AdvertisementService from '@services/advertisement';
import { PageMeta } from '@typeDefs/reference';
import { useRouter } from 'next/router';

const AdvertisementSection = () => {
  const t = useTranslations();
  const router = useRouter();
  const [advertisements, setAdvertisements] = useState([]);
  const [pageMeta, setPageMeta] = useState<PageMeta>({
    itemCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    limit: 9,
    page: 1,
    pageCount: 0,
  });

  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const result = await AdvertisementService.getAd({ process: 'CREATED', ...router.query });
        if (result.success) {
          setAdvertisements(result.response.data);
          setPageMeta(result.response?.meta);
        }
      } catch (error) {
        console.log('noop advertisement', error);
      }
    };
    loadAdvertisement();
  }, [router.query]);
  return (
    <section className="mt-4">
      <div className="w-full overflow-hidden">
        <Title label={t('services')} />
      </div>
      <div className="mx-auto mt-10 max-w-c-1280">
        <div className="grid grid-cols-2 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {advertisements &&
            advertisements.map(item => <AdvertisementCard advertisement={item} key={item.id} />)}
        </div>
        <PaginationComp
          page={pageMeta.page}
          pageCount={pageMeta.pageCount}
          limit={pageMeta.limit}
        />
      </div>
    </section>
  );
};

export default AdvertisementSection;
