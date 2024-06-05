import { LuChevronLeft, LuSettings2 } from 'react-icons/lu';
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { RefDirection, SubDirection } from '@/types/reference';
import { useCallback, useEffect, useState } from 'react';
import { ReferenceService } from '@/service/reference/reference.service';
import { useTypedSelector } from '@/app/lib/reducer';
import { useDispatch } from 'react-redux';
import { setAdvParam } from '@/app/lib/features/adv-param';
import SpecialServiceData from '@/app/data/SpecialServiceData';

type Props = {
  closeFnc?: () => void;
};
const SideCheckSpecialDirection: React.FC<Props> = ({ closeFnc }) => {
  const advParam = useTypedSelector(state => state.advParam);
  const dispatch = useDispatch();
  const [directions, setDirections] = useState<RefDirection[]>([]);

  const onChangeValue = (value: string[]) => {
    const currentDirections = directions.filter(item => {
      return item.subDirections.some(subdir => value.includes(String(subdir.id)));
    });
    dispatch(
      setAdvParam({
        ...advParam,
        page: 1,
        limit: 10,
        directionIds: currentDirections?.map(item => item.id),
        subDirectionIds: value.map(item => Number(item)),
      })
    );
  };
  const getDirection = useCallback(async () => {
    console.log(
      'types',
      SpecialServiceData.map(item => item.type)
    );
    await ReferenceService.getDirection({
      specialServices: advParam.specialService
        ? [advParam.specialService]
        : SpecialServiceData.map(item => item.type),
    }).then(res => {
      if (res.success) {
        setDirections(res.response);
      }
    });
  }, [advParam.specialService]);
  useEffect(() => {
    getDirection();
  }, [getDirection]);
  return (
    <div className={`shadow-[rgba(0,0,15,0.5)_5px_0px_5px_-5px]`}>
      <div className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex flex-row items-center justify-center">
          <LuSettings2 className="text-xl" />
          <span className="ml-3 font-bold">Шүүлтүүр</span>
        </div>
        <LuChevronLeft
          className="text-2xl"
          onClick={closeFnc == undefined ? null : () => closeFnc()}
        />
      </div>
      <Accordion>
        {directions.map((direction: RefDirection, index: number) => {
          return (
            <AccordionItem
              key={index}
              title={<span className="text-sm text-black leading-normal">{direction.name}</span>}
            >
              <CheckboxGroup
                color="warning"
                value={(advParam.subDirectionIds || []).map(item => item.toString())}
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
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideCheckSpecialDirection;
