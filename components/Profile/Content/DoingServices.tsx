import { useCallback, useEffect, useState } from 'react';
import Empty from '@/components/Empty';
import { Button } from '@heroui/react';
import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import GridServices from './GridServices';
import ListServices from './ListServices';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { Advertisement } from '@/types/advertisement';

type Props = {
  userId: number;
};
const DoingServices: React.FC<Props> = ({ userId }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const getData = useCallback(async () => {
    await AdvertisementService.get({
      page: 1,
      limit: 10,
      order: 'DESC',
      process: 'DOING',
      userBy: userId,
    }).then(res => {
      if (res.success) {
        setAdvertisements(res.response.data);
      }
    });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  // const onIgeree = () => {
  //   window.open('http://192.82.92.171:3000/build/1881', '_blank');
  // };
  return (
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
  );
};
export default DoingServices;
