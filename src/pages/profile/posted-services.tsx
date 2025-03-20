import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import GridServices from '@components/molecules/Profile/Content/GridServices';
import ListServices from '@components/molecules/Profile/Content/ListServices';
import { NextPage } from 'next';
import { Advertisement } from '@typeDefs/advertisement';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import AddService from '@components/molecules/Profile/Content/AddService';
import toast from 'react-hot-toast';
import { useAuthState } from '@context/auth';
import AdvertisementService from '@services/advertisement';
import IApiResponse from '@typeDefs/response';

const PostedServices: NextPage = () => {
  const { user } = useAuthState();
  const [isGrid, setIsGrid] = useState(true);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isSpecial, setIsSpecial] = useState<boolean>(false);
  const [isEditService, setIsEditService] = useState<boolean>(false);
  const [updateAdv, setUpdateAdv] = useState<any>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result: IApiResponse = await AdvertisementService.getAd({
          page: 1,
          limit: 10,
          order: 'DESC',
          createdBy: user?.id,
        });
        if (result.success) {
          setAdvertisements(result.response?.data);
        }
      } catch (error) {
        console.log('noop my advertisement =>', error);
      }
    };
    loadData();
  }, [user?.id, isEditService]);

  const removeAdv = async (id: number) => {
    await AdvertisementService.remove(id)
      .then(res => {
        if (res.success) {
          toast.error('Амжилттай устгалаа.');
          setIsEditService(prevState => !prevState);
        }
      })
      .catch(err => {
        toast.error('Алдаа:' + err);
      });
  };

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
          {isEditService ? (
            <AddService
              isSpecial={isSpecial}
              setIsAddService={setIsEditService}
              updateAdv={updateAdv}
            />
          ) : isGrid ? (
            <GridServices
              servicesData={advertisements}
              isStars={false}
              editAdv={advertisement => {
                setIsEditService(true);
                setIsSpecial(advertisement.specialService !== null);
                setUpdateAdv({
                  ...advertisement,
                  imageIds: advertisement.images.map(item => item.id),
                });
              }}
              removeAdv={id => removeAdv(id)}
            />
          ) : (
            <ListServices
              servicesData={advertisements}
              isStars={false}
              editAdv={advertisement => {
                setIsEditService(true);
                setIsSpecial(advertisement.specialService !== null);
                setUpdateAdv({
                  ...advertisement,
                  imageIds: advertisement.images.map(item => item.id),
                });
              }}
              removeAdv={id => removeAdv(id)}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default withAuth(PostedServices);
