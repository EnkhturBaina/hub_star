import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { RefDirection, SubDirection, SpecialServiceType } from '@/types/reference';
import { useAppContext } from '@/app/app-context';
import { useCallback, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';

type Props = {
  mainDirectionId?: number;
  specialService?: SpecialServiceType;
};
const SideCheckSubDirection: React.FC<Props> = ({ mainDirectionId, specialService }) => {
  const { adParam, setAdParam } = useAppContext();
  const [directions, setDirections] = useState<RefDirection[]>([]);

  const onChangeValue = (value: string[]) => {
    const currentDirections = directions.filter(item => {
      return item.subDirections.some(subdir => value.includes(String(subdir.id)));
    });
    setAdParam(prevState => ({
      ...prevState,
      page: 1,
      limit: 10,
      directionIds: currentDirections?.map(item => item.id),
      subDirectionIds: value.map(item => Number(item)),
    }));
  };
  const getDirection = useCallback(async () => {
    await ReferenceService.getDirection({ mainDirectionId, specialService }).then(res => {
      if (res.success) {
        setDirections(res.response);
      }
    });
  }, [mainDirectionId, specialService]);
  useEffect(() => {
    getDirection();
  }, [getDirection]);
  return (
    <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft className="text-2xl" />
      </div>
      {directions.map((direction: RefDirection, index: number) => {
        return (
          <CheckboxGroup
            label={direction.name}
            color="warning"
            key={index}
            classNames={{
              base: 'my-4',
              label: 'font-bold text-black text-base',
            }}
            value={(adParam.subDirectionIds || []).map(item => item.toString())}
            onValueChange={onChangeValue}
          >
            {direction.subDirections.map((subDir: SubDirection, index: number) => {
              return (
                <Checkbox
                  value={String(subDir.id)}
                  classNames={{
                    base: 'w-full max-w-full',
                    label: 'w-full',
                    wrapper: 'custom-checkbox w-6 h-6',
                  }}
                  key={index}
                >
                  <div className="flex w-full flex-row items-center justify-between">
                    <span className="text-sm leading-none">{subDir.name}</span>
                    <span className="text-sm">{subDir.advertisements.length}</span>
                  </div>
                </Checkbox>
              );
            })}
          </CheckboxGroup>
        );
      })}
    </div>
  );
};

export default SideCheckSubDirection;
