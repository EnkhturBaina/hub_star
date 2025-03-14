import React, { useEffect, useState } from 'react';
import { LuSettings2 } from 'react-icons/lu';
import ReferenceService from '@services/reference';
import { RefDirection } from '@typeDefs/reference';
import { useRouter } from 'next/router';
import IApiResponse from '@typeDefs/response';
import Checkbox from './checkbox';

const SideCheckDirection = () => {
  const router = useRouter();
  const [directions, setDirections] = useState<RefDirection[]>([]);

  useEffect(() => {
    const loadDirection = async () => {
      try {
        if (router.query?.mainDirectionId) {
          const result: IApiResponse = await ReferenceService.getDirection({
            mainDirectionId: router.query?.mainDirectionId,
            lang: router.locale,
          });
          if (result.success) {
            setDirections(result.response);
          }
        }
      } catch (error) {
        console.log('noop direction =>', error);
      }
    };
    loadDirection();
  }, [router.query?.mainDirectionId, router.locale]);

  const choosedDir = router.query.directionIds
    ? Array.isArray(router.query.directionIds)
      ? router.query.directionIds
      : [router.query.directionIds]
    : [];
  const handleCheckboxChange = (value: string) => {
    const newSelection = choosedDir.includes(value)
      ? choosedDir.filter(item => item !== value)
      : [...choosedDir, value];
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          directionIds: newSelection,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px]">
      <div className="flex flex-row items-center justify-between border-b py-4 pr-2">
        <strong className="lg:text-lg text-base">Шүүлтүүр</strong>
        <LuSettings2 className="text-xl" />
      </div>

      {directions.map((item, index) => (
        <Checkbox
          key={index}
          label={item.name}
          checked={choosedDir.includes(item.id.toString())}
          onChange={() => handleCheckboxChange(item.id.toString())}
        />
      ))}
    </div>
  );
};

export default SideCheckDirection;
