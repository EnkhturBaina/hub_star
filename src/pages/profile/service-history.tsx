import React from 'react';
import { Button } from '@heroui/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import { useCallback, useEffect, useState } from 'react';
import GridServices from '@components/molecules/Profile/Content/GridServices';
import ListServices from '@components/molecules/Profile/Content/ListServices';
import { Advertisement } from '@typeDefs/advertisement';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';
import ProfileLayout from '@components/molecules/Profile/ProfileLayout';
import AdvertisementService from '@services/advertisement';

const ServiceHistory = () => {
  const { user } = useAuthState();
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const getData = useCallback(async () => {
    await AdvertisementService.get({
      page: 1,
      limit: 10,
      order: 'DESC',
      process: 'DONE',
      userBy: user?.id,
    }).then(res => {
      if (res.success) {
        setAdvertisements(res.response.data);
      }
    });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <ProfileLayout>
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
    </ProfileLayout>
  );
};

export default withAuth(ServiceHistory);
