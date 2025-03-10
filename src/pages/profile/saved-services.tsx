import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import { useAppContext } from '@/context/app-context';
import GridServices from '@/components/Profile/Content/GridServices';
import ListServices from '@/components/Profile/Content/ListServices';
import ProfileLayout from '@/layouts/profile.layout';
import Empty from '@/components/Empty';
import withAuth from '@/components/Common/withAuth';

const SavedServices = () => {
  const { user } = useAppContext();
  const [isGrid, setIsGrid] = useState(true);
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
        {user.saveAdvertisements.length == 0 ? (
          <Empty />
        ) : (
          <div className="mx-auto mt-4 max-w-c-1280">
            {isGrid ? (
              <GridServices servicesData={user.saveAdvertisements} isStars={false} />
            ) : (
              <ListServices servicesData={user.saveAdvertisements} isStars={false} />
            )}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default withAuth(SavedServices);
