import React from 'react';
import { Button } from '@heroui/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import GridServices from '@components/molecules/Profile/Content/GridServices';
import ListServices from '@components/molecules/Profile/Content/ListServices';
import { Advertisement } from '@typeDefs/advertisement';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';
import AdvertisementService from '@services/advertisement';
import IApiResponse from '@typeDefs/response';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const ServiceHistory = () => {
  const t = useTranslations('profile');
  const { user } = useAuthState();
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const result: IApiResponse = await AdvertisementService.getAd({
        page: 1,
        limit: 10,
        order: 'DESC',
        process: 'DONE',
        userBy: user?.id,
      });
      if (result.success) {
        setAdvertisements(result.response?.data);
      }
    };
    loadData();
  }, []);
  return (
    <>
      <Head>
        <title>{t('serviceHistory')} | Hub Star</title>
      </Head>
      <div className="mb-4 w-full overflow-hidden ">
        <div className="flex justify-end">
          <Button
            className="min-w-unit-12 !px-0"
            radius="sm"
            onPress={() => {
              setIsGrid(!isGrid);
            }}
          >
            {isGrid ? <CiGrid2H className="text-4xl" /> : <CiGrid41 className="text-4xl" />}
          </Button>
        </div>
        {advertisements.length == 0 ? (
          <Empty />
        ) : (
          <div className="mx-auto mt-4 max-w-c-1280">
            {isGrid ? (
              <GridServices servicesData={advertisements} isStars={true} />
            ) : (
              <ListServices servicesData={advertisements} isStars={true} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default withAuth(ServiceHistory);
