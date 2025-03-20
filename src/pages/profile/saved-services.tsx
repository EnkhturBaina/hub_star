import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';
import GridServices from '@components/molecules/Profile/Content/GridServices';
import ListServices from '@components/molecules/Profile/Content/ListServices';
import Empty from '@components/molecules/Empty';
import withAuth from '@components/atoms/withAuth';
import { useAuthState } from '@context/auth';

const SavedServices = () => {
  const { user } = useAuthState();
  const [isGrid, setIsGrid] = useState(true);
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
  );
};

export default withAuth(SavedServices);
