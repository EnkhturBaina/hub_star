import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import LeftFilter from '../Skeleton/LeftFilter';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { Direction, MainDirection, SubDirection } from '@/types/reference';
import { useAppContext } from '@/app/app-context';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

type Props = {
  mainDirection: MainDirection;
};
const SideCheckSubDirection: React.FC<Props> = ({ mainDirection }) => {
  const { setAdParam } = useAppContext();
  const pathUrl = usePathname();
  const router = useRouter();
  const onChangeValue = (value: string[]) => {
    const directions = mainDirection.directions.filter(item => {
      return item.subDirections.some(subdir => value.includes(String(subdir.id)));
    });
    setAdParam(prevState => ({
      ...prevState,
      page: 1,
      limit: 10,
      directionIds: directions.map(item => item.id),
      subDirectionIds: value.map(item => Number(item)),
    }));
  };
  return (
    <div className="shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px] md:w-1/4 lg:w-[20%]">
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft className="text-2xl" />
      </div>
      {!mainDirection ? (
        <LeftFilter />
      ) : pathUrl == '/advice' ? (
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
          {mainDirection.directions.map((direction: Direction, index: number) => {
            return (
              <Checkbox
                value={String(direction.id)}
                classNames={{
                  base: 'w-full max-w-full',
                  label: 'w-full font-bold text-black text-base',
                  wrapper: 'custom-checkbox w-6 h-6',
                }}
                key={index}
              >
                <div className="flex w-full flex-row items-center justify-between">
                  <span className="text-sm leading-none">{direction.name}</span>
                  {/* TODO adv count <span className="text-sm">{subDir.}</span> */}
                </div>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      ) : (
        mainDirection.directions.map((direction: Direction, index: number) => {
          return (
            <CheckboxGroup
              label={direction.name}
              color="warning"
              key={index}
              // value={adParam.subDirectionIds?.map(item => item.toString())}
              classNames={{
                base: 'my-4',
                label: 'font-bold text-black text-base',
              }}
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
        })
      )}
    </div>
  );
};

export default SideCheckSubDirection;
