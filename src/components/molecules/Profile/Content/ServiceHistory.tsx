import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Empty from '@components/molecules/Empty';
import { Button } from '@heroui/react';
import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import GridServices from './GridServices';
import ListServices from './ListServices';
import { Advertisement } from '@typeDefs/advertisement';
import AdvertisementService from '@services/advertisement';

interface Props {
  userId: number;
}
const ServiceHistory: React.FC<Props> = ({ userId = 0 }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const getData = useCallback(async () => {
    await AdvertisementService.getAd({
      page: 1,
      limit: 10,
      order: 'DESC',
      process: 'DONE',
      executorBy: userId,
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
  );
};
export default ServiceHistory;
