import { Button } from '@nextui-org/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { AdvertisementService } from '@/service/advertisement/advertisement.service';
import { AdvertisementProgress } from '@/types/advertisement';
import toast from 'react-hot-toast';
import GridServices from '@/components/Profile/Content/GridServices';
import ListServices from '@/components/Profile/Content/ListServices';
import ProfileLayout from '@/layouts/profile.layout';

const DoingServices = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [adProgress, setAdProgress] = useState<AdvertisementProgress[]>([]);
  useEffect(() => {
    AdvertisementService.getProgress({ page: 1, limit: 10, order: 'DESC' })
      .then(res => {
        if (res.success) {
          setAdProgress(res.response.data);
        }
      })
      .catch(err => toast.error(err));
  }, []);
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
        <div className="mx-auto mt-4 max-w-c-1280">
          {isGrid ? (
            <GridServices
              servicesData={adProgress.map(item => item.advertisement)}
              showAddBtn={false}
              isStars={false}
            />
          ) : (
            <ListServices
              servicesData={adProgress.map(item => item.advertisement)}
              showAddBtn={false}
              isStars={false}
            />
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default DoingServices;
