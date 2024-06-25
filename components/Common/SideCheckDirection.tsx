import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';
import { RefDirection } from '@/types/reference';
import { useRouter } from 'next/router';

type Props = {
  mainDirectionId?: number;
  onDirectionIds: (directionIds: number[]) => void;
  className?: string;
};
const SideCheckDirection: React.FC<Props> = ({
  mainDirectionId,
  onDirectionIds,
  className = '',
}) => {
  const router = useRouter();
  const [directions, setDirections] = useState<RefDirection[]>([]);
  const onChangeValue = (values: string[]) => {
    const currentDirections = directions.filter(item => values.includes(String(item?.id)));
    onDirectionIds(currentDirections.map(item => item?.id));
  };
  const getDirection = useCallback(async () => {
    await ReferenceService.getDirection({ mainDirectionId, lang: router.locale }).then(res => {
      if (res.success) {
        setDirections(res.response);
      }
    });
  }, [mainDirectionId, router.locale]);

  useEffect(() => {
    getDirection();
  }, [getDirection]);

  return (
    <div className={`shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%] ${className}`}>
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft className="text-2xl" />
      </div>
      <CheckboxGroup
        label={''}
        color="warning"
        key={1}
        // value={adParam.subDirectionIds?.map(item => item.toString())}
        classNames={{
          base: 'my-4',
        }}
        onValueChange={onChangeValue}
      >
        {directions.map((item, index) => {
          return (
            <Checkbox
              value={String(item?.id)}
              classNames={{
                base: 'w-full max-w-full',
                label: 'w-full font-bold text-black text-base',
                wrapper: 'custom-checkbox w-6 h-6',
              }}
              key={index}
            >
              <div className="flex w-full flex-row items-center justify-between">
                <span className="text-sm leading-none">{item?.name}</span>
                <span className="text-sm">{item?.advices.length}</span>
              </div>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
    </div>
  );
};

export default SideCheckDirection;
