'use client';
import { Button } from '@nextui-org/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '@/app/app-context';
import GridServices from '@/components/Profile/Content/GridServices';
import ListServices from '@/components/Profile/Content/ListServices';
import ProfileLayout from '@/layouts/profile.layout';
import { NextPage } from 'next';
import { Advertisement } from '@/types/advertisement';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import Empty from '@/components/Empty';
import withAuth from '@/components/Common/withAuth';

const PostedServices: NextPage = () => {
  const { user } = useAppContext();
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const getData = useCallback(async () => {
    await AdvertisementService.get({
      page: 1,
      limit: 10,
      order: 'DESC',
      createdBy: user?.id,
    }).then(res => {
      if (res.success) {
        setAdvertisements(res.response.data);
      }
    });
  }, [user?.id]);

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
            onClick={() => {
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
              <GridServices servicesData={advertisements} isStars={false} />
            ) : (
              <ListServices servicesData={advertisements} isStars={false} />
            )}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default withAuth(PostedServices);
