import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { RefDirection, MainDirection, SubDirection } from '@/types/reference';
import { useAppContext } from '@/app/app-context';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  mainDirection: MainDirection;
};
const SideCheckSubDirection: React.FC<Props> = ({ mainDirection }) => {
  const { setAdParam } = useAppContext();
  const [subDirectionIds, setSubDirectionIds] = useState<string[]>([]);
  const pathUrl = usePathname();

  const onChangeValue = (value: string[]) => {
    setSubDirectionIds([...subDirectionIds, ...value]);
  };
  useEffect(() => {
    const directions = mainDirection?.directions.filter(item => {
      return item.subDirections.some(subdir => subDirectionIds.includes(String(subdir.id)));
    });
    setAdParam(prevState => ({
      ...prevState,
      page: 1,
      limit: 10,
      directionIds: directions?.map(item => item.id),
      subDirectionIds: subDirectionIds.map(item => Number(item)),
    }));
  }, [subDirectionIds]);
  return (
    <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft className="text-2xl" />
      </div>
      {mainDirection?.directions.map((direction: RefDirection, index: number) => {
        return (
          <CheckboxGroup
            label={direction.name}
            color="warning"
            key={index}
            classNames={{
              base: 'my-4',
              label: 'font-bold text-black text-base',
            }}
            value={subDirectionIds}
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
                    {/* TODO adv count <span className="text-sm">{subDir.}</span> */}
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
