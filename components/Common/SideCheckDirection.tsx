import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Checkbox, CheckboxGroup } from '@nextui-org/react';
import { MainDirection, RefDirection } from '@/types/reference';

type Props = {
  mainDirection: MainDirection;
  onDirectionIds: (directionIds: number[]) => void;
};
const SideCheckDirection: React.FC<Props> = ({ mainDirection, onDirectionIds }) => {
  const onChangeValue = (values: string[]) => {
    const directions = mainDirection.directions.filter(item => values.includes(String(item.id)));
    onDirectionIds(directions.map(item => item.id));
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
      {!mainDirection && (
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
          {mainDirection?.directions.map((direction: RefDirection, index: number) => {
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
      )}
    </div>
  );
};

export default SideCheckDirection;
